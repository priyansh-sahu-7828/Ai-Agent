from fastapi import APIRouter
from pydantic import BaseModel

from app.services.pipeline.extraction_pipeline import (
    run_extraction_pipeline
)

router = APIRouter()


# =====================================================
# REQUEST MODEL
# =====================================================

class OnboardingRequest(BaseModel):
    client_id: str


# =====================================================
# START EXTRACTION PIPELINE
# =====================================================

@router.post("/onboard-client")
async def process_onboarding(
    body: OnboardingRequest
):

    result = await run_extraction_pipeline(
        client_id=body.client_id
    )

    return result