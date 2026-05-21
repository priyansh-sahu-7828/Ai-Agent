import json
import google.generativeai as genai

from app.core.config import (
    GOOGLE_API_KEY,
    GEMINI_MODEL
)

# ---------------------------------------------------
# Configure Gemini
# ---------------------------------------------------

genai.configure(
    api_key=GOOGLE_API_KEY
)

model = genai.GenerativeModel(
    GEMINI_MODEL
)


# ---------------------------------------------------
# Common AI Call Function
# ---------------------------------------------------

async def generate_response(
    prompt: str,
    temperature: float = 0.2,
    max_output_tokens: int = 4096,
) -> str:
    
    try:
        enhanced_prompt = f"""
            You must return ONLY valid JSON.

            Do not add markdown.
            Do not add explanation.
            Do not wrap in ```json.

            {prompt}
            """

        response = model.generate_content(
            enhanced_prompt,
            generation_config={
                "temperature": temperature,
                "max_output_tokens": max_output_tokens,
            }
        )

        return response.text

    except Exception as e:

        print(
            "[LLM ERROR]",
            str(e)
        )

        raise Exception(
            f"LLM generation failed: {str(e)}"
        )


# ---------------------------------------------------
# JSON Structured Output
# ---------------------------------------------------

async def generate_json_response(
    prompt: str,
    temperature: float = 0.1,
    max_output_tokens: int = 4096,
) -> dict:

    try:

        enhanced_prompt = f"""
You must return ONLY valid JSON.

Do not add markdown.
Do not add explanation.
Do not wrap in ```json.

{prompt}
"""

        response = model.generate_content(
            enhanced_prompt,
            generation_config={
                "temperature": temperature,
                "max_output_tokens": max_output_tokens,
                "response_mime_type": "application/json",
            }
        )

        text = response.text.strip()

        return json.loads(text)

    except json.JSONDecodeError as e:

        print(
            "[JSON PARSE ERROR]",
            str(e)
        )

        raise Exception(
            "Invalid JSON returned from LLM"
        )

    except Exception as e:

        print(
            "[LLM ERROR]",
            str(e)
        )

        raise Exception(
            f"LLM JSON generation failed: {str(e)}"
        )