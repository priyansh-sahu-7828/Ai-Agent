import mimetypes
from app.services.file_processing.file_extractor import FileExtractor


class ParserRouter:

    @staticmethod
    async def parse_file(
        file_id: str,
        file_name: str,
        mime_type: str,
        file_bytes: bytes
    ) -> str:

        mime_type = mime_type or ""

        # PDF
        if "pdf" in mime_type:
            return FileExtractor.extract_pdf(file_bytes)

        # DOCX
        if (
            "word" in mime_type
        ):
            return FileExtractor.extract_docx(file_bytes)

        # TXT
        if "text" in mime_type:
            return FileExtractor.extract_text(file_bytes)

        # JSON
        if "json" in mime_type:
            return FileExtractor.extract_text(file_bytes)

        # CSV
        if "csv" in mime_type:
            return FileExtractor.extract_text(file_bytes)

        # IMAGE
        if "image" in mime_type:
            return (
                f"""
                IMAGE FILE DETECTED:

                NOTE:
                OCR extraction not implemented yet.
                """
            )

        return (
            f"""
            UNSUPPORTED FILE TYPE:
            """
        )