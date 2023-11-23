# api/labels.py
from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List
from models.label import Label
from storage.label_storage import LabelStorage
from utils.auth import get_current_user, is_admin

router = APIRouter()
label_storage = LabelStorage()

@router.get("/labels", response_model=List[Label])
async def get_labels():
    return label_storage.get_labels()

@router.post("/labels")
async def create_label(
    data : Label
):  

    new_label = label_storage.add_label(name=data.name)
    return new_label

# ... (your imports)

@router.delete("/labels/{label_name}")
async def delete_label(label_name: str):
    # Delete the label by name
    deleted_label = label_storage.delete_label_by_name(label_name)

    if deleted_label is None:
        raise HTTPException(status_code=404, detail="Label not found")

    return {"message": f"Label '{label_name}' deleted successfully"}
