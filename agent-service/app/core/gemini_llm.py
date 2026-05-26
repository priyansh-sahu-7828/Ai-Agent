import json
from google import genai

from app.core.config import (
    GOOGLE_API_KEY,
    GEMINI_MODEL
)


# =====================================================
# CONFIGURE GEMINI
# =====================================================

client = genai.Client(
    api_key=GOOGLE_API_KEY
)


# =====================================================
# COMMON TEXT RESPONSE
# =====================================================

async def generate_response(
    prompt: str,
    temperature: float = 0.3,
    max_output_tokens: int = 4096,
):

    try:

        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
            config={

                "temperature":
                    temperature,

                "max_output_tokens":
                    max_output_tokens
            }
        )

        return response.text

    except Exception as e:

        print(
            "[GEMINI ERROR]",
            str(e)
        )

        raise Exception(
            f"Gemini generation failed: {str(e)}"
        )


# =====================================================
# STRICT JSON RESPONSE
# =====================================================

async def generate_json_response(
    prompt: str,
    temperature: float = 0.1,
    max_output_tokens: int = 4096,
):

    try:

        enhanced_prompt = f"""
You are a JSON generation engine.

Return ONLY valid JSON.

STRICT RULES:
- No markdown
- No explanation
- No extra text
- No ```json
- No comments
- Only pure JSON object

USER TASK:
{prompt}
"""

        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=enhanced_prompt,

            config={

                "temperature":
                    temperature,

                "max_output_tokens":
                    max_output_tokens,

                "response_mime_type":
                    "application/json"
            }
        )

        text = response.text.strip()

        parsed = json.loads(text)

        return parsed

    except json.JSONDecodeError as e:

        print(
            "[JSON ERROR]",
            str(e)
        )

        raise Exception(
            "Invalid JSON returned by Gemini"
        )

    except Exception as e:

        print(
            "[GEMINI ERROR]",
            str(e)
        )

        raise Exception(
            f"Gemini JSON generation failed: {str(e)}"
        )


# =====================================================
# CHAT AGENT FUNCTION
# =====================================================

async def call_gemini(
    system_prompt: str,
    user_message: str
):

    try:

        final_prompt = f"""
SYSTEM:
{system_prompt}

USER:
{user_message}
"""

        response = client.models.generate_content(

            model=GEMINI_MODEL,
            contents=final_prompt,

            config={

                "temperature": 0.7,

                "max_output_tokens": 512
            }
        )

        return response.text

    except Exception as e:

        raise Exception(
            f"Gemini chat failed: {str(e)}"
        )