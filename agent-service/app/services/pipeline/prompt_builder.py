import json


def build_master_prompt(
    client_data: dict,
    raw_input: str,
    field_schemas: list,
    extracted_files: list
) -> str:

    # =========================================================
    # CONVERT EVERYTHING TO CLEAN STRING FORMAT
    # =========================================================

    client_data_text = json.dumps(
        client_data,
        indent=2,
        ensure_ascii=False
    )

    schema_text = json.dumps(
        field_schemas,
        indent=2,
        ensure_ascii=False
    )

    files_text = ""

    for file in extracted_files:

        files_text += f"""

==================================================
FILE NAME:
{file.get("file_name")}

FILE TYPE:
{file.get("mime_type")}

FILE CONTENT:
{file.get("raw_text") or "NO TEXT CONTENT"}

==================================================

"""

    # =========================================================
    # FINAL PROMPT
    # =========================================================

    prompt = f"""
You are an advanced enterprise onboarding AI extraction engine.

Your responsibility is to carefully analyze:

1. Client onboarding data
2. Raw onboarding text provided by client
3. Uploaded document contents
4. Required database schema

and generate ONE FINAL CLEAN STRUCTURED JSON RESPONSE.

==================================================
VERY IMPORTANT INSTRUCTIONS
==================================================

STRICTLY FOLLOW ALL RULES BELOW:

1. RETURN ONLY VALID JSON IN EXACT FORMAT OF REQUIRED DATABASE SCHEMA
2. DO NOT RETURN MARKDOWN
3. DO NOT WRAP RESPONSE IN ```json
4. DO NOT ADD EXPLANATION
5. DO NOT ADD NOTES OUTSIDE JSON
6. DO NOT ADD ANY EXTRA TEXT
7. RESPONSE MUST START WITH {{
8. RESPONSE MUST END WITH }}

Your response will be directly parsed using:

json.loads(response)

If you return invalid JSON the system will fail.

==================================================
DATA EXTRACTION RULES
==================================================

- Every schema field MUST exist in final output
- If value is missing use null
- Normalize values properly
- Arrays must always be arrays
- Objects must always be valid JSON objects
- Dates should be ISO format when possible
- Phone numbers should be normalized
- Emails should be lowercase
- Avoid duplicate values

==================================================
CONFLICT RESOLUTION RULES
==================================================

If multiple sources contain different values:

Trust priority order:

1. Official documents
2. Signed agreements/contracts
3. Uploaded spreadsheets
4. Raw text answers from user

Choose the most reliable value.

==================================================
CLIENT DATA
==================================================

{client_data_text}

==================================================
RAW INPUT TEXT
==================================================

{raw_input}

==================================================
REQUIRED FIELD SCHEMA
==================================================

{schema_text}

==================================================
EXTRACTED FILE CONTENT
==================================================

{files_text}

==================================================
FINAL REMINDER
==================================================

RETURN ONLY RAW JSON.

DO NOT RETURN:
- markdown
- explanations
- comments
- text before JSON
- text after JSON

ONLY VALID JSON.
"""

    return prompt