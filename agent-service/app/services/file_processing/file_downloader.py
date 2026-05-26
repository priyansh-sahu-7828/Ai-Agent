import aiohttp
from typing import Optional


class FileDownloader:
    
    @staticmethod
    async def download_file(url: str) -> Optional[bytes]:
        """
        Download file bytes from URL
        """

        try:
            async with aiohttp.ClientSession() as session:

                async with session.get(url) as response:

                    if response.status != 200:
                        print(f"[DOWNLOAD ERROR] {url} -> {response.status}")
                        return None

                    return await response.read()

        except Exception as e:
            print(f"[DOWNLOAD EXCEPTION] {url} -> {str(e)}")
            return None