import json
import asyncio

from app.services.pipeline.prompt_builder import (
    build_master_prompt
)

from app.services.file_processing.parser_routes import ParserRouter

from app.core.gemini_llm import (
    generate_json_response,generate_response
)

from app.services.pipeline.onboarding_data_collector import (
    OnboardingDataCollector
)

from app.services.file_processing.file_downloader import (
    FileDownloader
)


async def run_extraction_pipeline(
    client_id: str
):

    try:

        # =====================================================
        # FETCH ALL REQUIRED DATA
        # =====================================================

        collector = OnboardingDataCollector()

        onboarding_data = (
            await collector.collect(
                client_id=client_id
            )
        )
       
        client_data = onboarding_data["client"]

        raw_input = onboarding_data["raw_inputs"][0]

        field_schemas = onboarding_data["field_schemas"]
        

        # =====================================================
        # FILE EXTRACTION
        # =====================================================

        extracted_files = []

        files = (
            raw_input
            .get("payload", {})
            .get("files", [])
        )

        async def process_single_file(file):

            try:

                file_url = file.get("url")

                if not file_url:

                    return {
                        "success": False,
                        "error": "Missing file URL"
                    }

                # ---------------------------------------------
                # DOWNLOAD FILE
                # ---------------------------------------------

                file_bytes = (
                    await FileDownloader.download_file(
                        file_url
                    )
                )

                if not file_bytes:

                    return {
                        "success": False,
                        "file_name": file.get("file_name"),
                        "error": "Failed to download file"
                    }

                # ---------------------------------------------
                # EXTRACT FILE CONTENT
                # ---------------------------------------------
                
                extracted = await ParserRouter.parse_file(
                    file_id=file.get("id"),
                    file_name=file.get("file_name"),
                    mime_type=file.get("mime_type"),
                    file_bytes=file_bytes
                )

                return {
                    "file_name": file.get("file_name"),
                    "mime_type": file.get("mime_type"),
                    "raw_text": extracted
                }

            except Exception as e:

                return {
                    "success": False,
                    "file_name": file.get("file_name"),
                    "error": str(e)
                }

        # =====================================================
        # PROCESS FILES CONCURRENTLY
        # =====================================================

        extraction_results = await asyncio.gather(
            *[
                process_single_file(file)
                for file in files
            ]
        )

        extracted_files.extend(
            extraction_results
        )

        # =====================================================
        # BUILD MASTER PROMPT
        # =====================================================

        prompt = build_master_prompt(
            client_data=client_data,
            raw_input=raw_input.get("payload", {}).get("text", ""),
            field_schemas=field_schemas,
            extracted_files=extracted_files
        )

        # =====================================================
        # SINGLE GEMINI CALL
        # =====================================================

        response = await generate_response(
            prompt=prompt
        )
        

        # =====================================================
        # CLEAN RESPONSE
        # =====================================================

        # Strip potential markdown code blocks dynamically (handles lowercase 'json' or uppercase 'JSON')
        cleaned = response.strip()

        if cleaned.startswith("```"):
            # Split by newlines and remove the first line (e.g., ```json) and the last line (```)
            lines = cleaned.splitlines()
            if len(lines) >= 2 and lines[0].startswith("```") and lines[-1] == "```":
                cleaned = "\n".join(lines[1:-1]).strip()
        else:
            # Fallback to standard replace rules if it's a single-line or inline wrap
            cleaned = (
                cleaned
                .replace("```json", "")
                .replace("```JSON", "")
                .replace("```", "")
                .strip()
            )

        # =====================================================
        # PARSE JSON
        # =====================================================
        try:
            parsed = json.loads(cleaned)

            return {
                "success": True,
                "client_id": client_id,
                "structured_data": parsed,
                "files_processed": len(extracted_files)
            }

        except json.JSONDecodeError as json_err:
            # Catches cases where the LLM breaks JSON formatting rules completely
            return {
                "success": False,
                "client_id": client_id,
                "error": f"LLM returned invalid JSON structure: {str(json_err)}",
                "raw_response": response # Helps you debug what the LLM actually said
            }

    except Exception as e:
            return {
                "success": False,
                "client_id": client_id,
                "error": str(e)
            }
