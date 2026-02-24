"""
Firebase helper - demo/stub implementation for hackathon MVP.
Stores data locally when Firebase is not configured.
"""
import os
from typing import Optional

# In-memory storage for demo (no auth)
_demo_storage: dict = {}
_demo_reports: list = []


def uploadFileToFireBase(file_content: bytes, file_type: str, cloud_path: str) -> str:
    """Store file locally for demo. Returns local path."""
    os.makedirs("media/uploads", exist_ok=True)
    local_path = f"media/uploads/{cloud_path.replace('/', '_')}"
    with open(local_path, "wb") as f:
        f.write(file_content)
    return local_path


def pushDataToRealtimeFBDB(data: dict) -> None:
    """Store report data in memory for demo."""
    _demo_reports.append(data)
    _demo_storage[data.get("user-id", "demo")] = _demo_reports.copy()


def getUrlsOfUser(user_id: str) -> list:
    """Return user's reports. Demo returns stored data."""
    return _demo_storage.get(user_id, [])


def retrieve_data_by_keyword(keyword: str) -> list:
    """Retrieve medical report details by keyword. Demo returns empty list."""
    return []
