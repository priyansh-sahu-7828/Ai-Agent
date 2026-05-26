import httpx

from app.core.config import (
    NODE_BACKEND_URL
)


class APIClient:

    def __init__(self):

        self.base_url = NODE_BACKEND_URL

        self.timeout = 60.0

    # =================================================
    # GENERIC GET
    # =================================================

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
                f"GET HTTP Error: "
                f"{e.response.status_code}"
            )

        except Exception as e:

            raise Exception(
                f"GET API failed: {str(e)}"
            )

    # =================================================
    # GENERIC POST
    # =================================================

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
                f"POST HTTP Error: "
                f"{e.response.status_code}"
            )

        except Exception as e:

            raise Exception(
                f"POST API failed: {str(e)}"
            )

    # =================================================
    # GENERIC PATCH
    # =================================================

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
                f"PATCH HTTP Error: "
                f"{e.response.status_code}"
            )

        except Exception as e:

            raise Exception(
                f"PATCH API failed: {str(e)}"
            )

    # =================================================
    # GENERIC DELETE
    # =================================================

    async def delete(
        self,
        endpoint: str
    ):

        url = f"{self.base_url}{endpoint}"

        try:

            async with httpx.AsyncClient(
                timeout=self.timeout
            ) as client:

                response = await client.delete(
                    url
                )

                response.raise_for_status()

                return response.json()

        except httpx.HTTPStatusError as e:

            raise Exception(
                f"DELETE HTTP Error: "
                f"{e.response.status_code}"
            )

        except Exception as e:

            raise Exception(
                f"DELETE API failed: {str(e)}"
            )