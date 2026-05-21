from dotenv import load_dotenv
import os

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

GEMINI_MODEL = os.getenv(
    "GEMINI_MODEL",
    "gemini-2.5-flash"
)

NODE_BACKEND_URL = os.getenv(
    "NODE_BACKEND_URL",
    "http://localhost:3000"
)