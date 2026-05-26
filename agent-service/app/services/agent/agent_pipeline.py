from app.core.api_client import (
    APIClient
)

from app.prompts.agent_prompt import (
    build_agent_system_prompt
)

from app.core.gemini_llm import (
    call_gemini
)

from app.services.agent.whatsapp_client import (
    send_whatsapp_message
)


async def run_agent_pipeline(

    client_id: str,

    customer_message: str,

    customer_phone: str,

    phone_number_id: str,
    
    whatsapp_access_token: str
):
   

    api_client = APIClient()
    

    # =================================================
    # FETCH CLIENT DATA
    # =================================================

    response = await api_client.get(
        f"/final-structured/{client_id}"
    )

    print("generating final structure response")
    
    
    structured_data = (
        response["data"]["structured_data"]
    )
    
    print("about to build final prompt")

    # =================================================
    # BUILD PROMPT
    # =================================================

    system_prompt = build_agent_system_prompt(
        structured_data
    )
    
    print("final prompt build and calling gemini to generate llm reply")

    # =================================================
    # GEMINI
    # =================================================

    llm_reply = await call_gemini(
        system_prompt=system_prompt,
        user_message=customer_message
    )
    
    print(f"gemini response generated sending whatsapp message { llm_reply }")

    # =================================================
    # SEND WHATSAPP MESSAGE
    # =================================================

    whatsapp_response = await send_whatsapp_message(

        phone_number_id=phone_number_id,

        to=customer_phone,

        message=llm_reply,
        
        WHATSAPP_ACCESS_TOKEN=whatsapp_access_token
    )

    return {

        "success": True,

        "reply": llm_reply,

        "whatsapp_response": whatsapp_response
    }