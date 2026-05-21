from app.core.api_client import (
    APIClient
)

api_client = APIClient()


class OnboardingDataCollector:


    # -------------------------------------------------
    # Collect ALL onboarding data
    # -------------------------------------------------

    async def collect(
        self,
        client_id: str
    ):

        # ---------------------------------------------
        # 1. Client Data
        # ---------------------------------------------

        client_response = await api_client.get(
            f"/onboarding/clients/{client_id}"
        )

        client_data = client_response.get(
            "data",
            {}
        )


        # ---------------------------------------------
        # 2. Raw Inputs
        # ---------------------------------------------

        raw_input_response = await api_client.get(
            f"/onboarding/raw-input/client/{client_id}"
        )

        raw_inputs = raw_input_response.get(
            "data",
            {}
        )


        # ---------------------------------------------
        # 3. Field Schemas
        # ---------------------------------------------

        field_schema_response = await api_client.get(
            "/field-schemas"
        )

        field_schemas = field_schema_response.get(
            "data",
            {}
        )


        # ---------------------------------------------
        # Final Aggregated Object
        # ---------------------------------------------

        return {
            "client": client_data,
            "raw_inputs": raw_inputs,
            "field_schemas": field_schemas
        }