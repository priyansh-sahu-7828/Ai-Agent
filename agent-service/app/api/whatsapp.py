from fastapi import APIRouter,Query, Response, HTTPException, Request
from pydantic import BaseModel

from app.services.agent.agent_pipeline import (
    run_agent_pipeline
)

from app.services.client.client_lookup import (
    ClientLookup
)

from app.services.agent.whatsapp_client import (
    send_whatsapp_message
)

router = APIRouter()


# =====================================================
# REQUEST MODEL
# =====================================================

class WhatsAppAgentRequest(BaseModel):

    phone_number_id: str

    customer_message: str

    customer_phone: str
    
    
# =====================================================
# 1. VERIFY WEBHOOK (META SENDS A GET REQUEST HERE)
# =====================================================
@router.get("/process-message")
async def verify_webhook(
    hub_mode: str = Query(None, alias="hub.mode"),
    hub_challenge: str = Query(None, alias="hub.challenge"),
    hub_verify_token: str = Query(None, alias="hub.verify_token"),
):
    # This MUST match exactly what you typed in the Meta dashboard
    VERIFY_TOKEN = "Whatsappworkingwell"

    if hub_mode == "subscribe" and hub_verify_token == VERIFY_TOKEN:
        print("Webhook verified successfully!")
        # Meta requires the challenge string to be returned as plain text
        return Response(content=hub_challenge, media_type="text/plain")
    
    # Reject if tokens do not match
    raise HTTPException(status_code=403, detail="Verification token mismatch")


# =====================================================
# PROCESS WHATSAPP MESSAGE
# =====================================================

@router.post("/process-message")
async def process_message(request: Request):
    # 1. Grab the raw JSON from Meta
    body = await request.json()
    
    try:
        # 2. Check if this is a WhatsApp status update or a real message
        if body.get("object") == "whatsapp_business_account":
            entry = body.get("entry", [{}])[0]
            changes = entry.get("changes", [{}])[0]
            value = changes.get("value", {})
            
            # 3. If "messages" exists, the customer actually texted you
            if "messages" in value:
                message = value["messages"][0]
                
                # 4. For now, only process standard text messages
                if message.get("type") == "text":
                    # Extract the exact data you need
                    phone_number_id = value["metadata"]["phone_number_id"]
                    customer_phone = message["from"]
                    customer_message = message["text"]["body"]
                    
                    print(f"Received message from {customer_phone}: {customer_message}")

                    # -------------------------------------------------
                    # FIND CLIENT USING PHONE NUMBER ID
                    # -------------------------------------------------
                    whatsapp_config = await ClientLookup.get_whatsapp_account(
                        phone_number_id=phone_number_id
                    )

                    if not whatsapp_config:
                        print("Error: No client found for this phone_number_id")
                        return {"status": "success"} # Always return 200 to Meta

                    client_id = whatsapp_config.get("client_id")
                    access_token = whatsapp_config.get("access_token")
                    

                    # -------------------------------------------------
                    # RUN AGENT PIPELINE
                    # -------------------------------------------------
                    result = await run_agent_pipeline(
                        client_id=client_id,
                        customer_message=customer_message,
                        customer_phone=customer_phone,
                        phone_number_id=phone_number_id,
                        whatsapp_access_token=access_token
                    )
                    
                    # We can print the result, but Meta just needs a 200 OK
                    print("Agent pipeline finished:", result)

    except Exception as e:
        print(f"Error processing webhook: {e}")

    # 5. CRITICAL: Always return a 200 OK success status. 
    # If you return an error or timeout, Meta will assume your server is down 
    # and will retry sending the same message repeatedly for 24 hours.
    return Response(content="OK", status_code=200)