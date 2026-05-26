import httpx

from app.core.config import (
    WHATSAPP_API_VERSION
)


async def send_whatsapp_message(
    phone_number_id: str,
    to: str,
    message: str,
    WHATSAPP_ACCESS_TOKEN
):

    url = (
        f"https://graph.facebook.com/"
        f"{WHATSAPP_API_VERSION}/"
        f"{phone_number_id}/messages"
    )

    headers = {

        "Authorization":
            f"Bearer {WHATSAPP_ACCESS_TOKEN}",

        "Content-Type":
            "application/json"
    }

    payload = {

        "messaging_product": "whatsapp",

        "to": to,

        "type": "text",

        "text": {
            "body": message
        }
    }

    async with httpx.AsyncClient() as client:

        response = await client.post(
            url,
            headers=headers,
            json=payload
        )

        response.raise_for_status()

        return response.json()