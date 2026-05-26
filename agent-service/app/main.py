from fastapi import FastAPI
from app.api.onboarding import router as onboarding_router
from app.api.whatsapp import router as whatsapp_router

app = FastAPI()

app.include_router(
    onboarding_router,
    prefix="/api/onboarding",
    tags=["Onboarding"]
)

app.include_router(
    whatsapp_router,
    prefix="/api/whatsapp",
    tags=["WhatsApp"]
)

@app.get("/")
async def root():
    return {
        "message": "AI Agent Service Running"
    }