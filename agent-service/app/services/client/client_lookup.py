from app.core.api_client import APIClient

api_client = APIClient()


class ClientLookup:

    @staticmethod
    async def get_whatsapp_account(
        phone_number_id: str
    ):

        response = await api_client.get(
            f"/onboarding/whatsapp/phone/{phone_number_id}"
        )

        return response.get("data")