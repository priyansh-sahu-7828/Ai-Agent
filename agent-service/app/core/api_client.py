import httpx

from app.core.config import (
    NODE_BACKEND_URL
)


class APIClient:

    def __init__(self):

        self.base_url = NODE_BACKEND_URL

        self.timeout = 60.0


    # -------------------------------------------------
    # Generic GET
    # -------------------------------------------------

    async def get(
        self,
        endpoint: str
    ):

        url = f"{self.base_url}{endpoint}"

        try:

            async with httpx.AsyncClient(
                timeout=self.timeout
            ) as client:

                response = await client.get(url)

                response.raise_for_status()

                return response.json()

        except httpx.HTTPStatusError as e:

            raise Exception(
                f"HTTP Error: {e.response.status_code}"
            )

        except Exception as e:

            raise Exception(
                f"API GET failed: {str(e)}"
            )


    # -------------------------------------------------
    # Generic POST
    # -------------------------------------------------

    async def post(
        self,
        endpoint: str,
        payload: dict
    ):

        url = f"{self.base_url}{endpoint}"

        try:

            async with httpx.AsyncClient(
                timeout=self.timeout
            ) as client:

                response = await client.post(
                    url,
                    json=payload
                )

                response.raise_for_status()

                return response.json()

        except httpx.HTTPStatusError as e:

            raise Exception(
                f"HTTP Error: {e.response.status_code}"
            )

        except Exception as e:

            raise Exception(
                f"API POST failed: {str(e)}"
            )


    # -------------------------------------------------
    # Generic PATCH
    # -------------------------------------------------

    async def patch(
        self,
        endpoint: str,
        payload: dict
    ):

        url = f"{self.base_url}{endpoint}"

        try:

            async with httpx.AsyncClient(
                timeout=self.timeout
            ) as client:

                response = await client.patch(
                    url,
                    json=payload
                )

                response.raise_for_status()

                return response.json()

        except httpx.HTTPStatusError as e:

            raise Exception(
                f"HTTP Error: {e.response.status_code}"
            )

        except Exception as e:

            raise Exception(
                f"API PATCH failed: {str(e)}"
            )


    # -------------------------------------------------
    # Generic DELETE
    # -------------------------------------------------

    async def delete(
        self,
        endpoint: str
    ):

        url = f"{self.base_url}{endpoint}"

        try:

            async with httpx.AsyncClient(
                timeout=self.timeout
            ) as client:

                response = await client.delete(url)

                response.raise_for_status()

                return response.json()

        except httpx.HTTPStatusError as e:

            raise Exception(
                f"HTTP Error: {e.response.status_code}"
            )

        except Exception as e:

            raise Exception(
                f"API DELETE failed: {str(e)}"
            )