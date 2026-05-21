from fastapi import FastAPI
from app.api.onboarding import router as onboarding_router

app = FastAPI()

app.include_router(
    onboarding_router,
    prefix="/api/onboarding",
    tags=["Onboarding"]
)

@app.get("/")
async def root():
    return {
        "message": "AI Agent Service Running"
    }