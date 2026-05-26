from dotenv import load_dotenv
import os
import json

load_dotenv()


# =====================================================
# GEMINI
# =====================================================

GOOGLE_API_KEY = os.getenv(
    "GOOGLE_API_KEY"
)

GEMINI_MODEL = os.getenv(
    "GEMINI_MODEL",
    "gemini-2.5-flash"
)


# =====================================================
# NODE BACKEND
# =====================================================

NODE_BACKEND_URL = os.getenv(
    "NODE_BACKEND_URL",
    "http://localhost:3000"
)


# =====================================================
# WHATSAPP
# =====================================================

WHATSAPP_API_VERSION = os.getenv(
    "WHATSAPP_API_VERSION",
    "v19.0"
)
