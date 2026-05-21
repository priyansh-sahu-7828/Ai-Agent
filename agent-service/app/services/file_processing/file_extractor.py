import io
import json
import pdfplumber

from docx import Document


class FileExtractor:

    @staticmethod
    def extract_pdf(file_bytes: bytes) -> str:

        try:

            full_text = []

            with pdfplumber.open(
                io.BytesIO(file_bytes)
            ) as pdf:

                for page in pdf.pages:

                    text = page.extract_text()

                    if text:
                        full_text.append(text)

            return "\n".join(full_text)

        except Exception as e:

            return f"PDF EXTRACTION ERROR: {str(e)}"

    @staticmethod
    def extract_docx(file_bytes: bytes) -> str:

        try:

            doc = Document(io.BytesIO(file_bytes))

            paragraphs = []

            for para in doc.paragraphs:
                if para.text.strip():
                    paragraphs.append(para.text)

            return "\n".join(paragraphs)

        except Exception as e:

            return f"DOCX EXTRACTION ERROR: {str(e)}"

    @staticmethod
    def extract_text(file_bytes: bytes) -> str:

        try:
            return file_bytes.decode("utf-8")

        except Exception as e:
            return f"TEXT EXTRACTION ERROR: {str(e)}"

    @staticmethod
    def extract_json(file_bytes: bytes) -> str:

        try:

            data = json.loads(
                file_bytes.decode("utf-8")
            )

            return json.dumps(
                data,
                indent=2
            )

        except Exception as e:

            return f"JSON EXTRACTION ERROR: {str(e)}"