# api/images.py
import base64
from fastapi import APIRouter, HTTPException, File, UploadFile, Query, Depends
from typing import List
from models.image import Image
from storage.image_storage import ImageStorage
from utils.auth import get_current_user, is_admin
import os
from fastapi.responses import JSONResponse


router = APIRouter()
image_storage = ImageStorage()

@router.get("/images")
async def get_images():
    image_list = []
    for image_data in image_storage.get_images():
        filename = image_data.filename
        label = image_data.label

        # Read the image file as bytes
        with open(f"uploads/{filename}", "rb") as f:
            image_bytes = f.read()

        # Encode the image bytes as base64
        image_base64 = base64.b64encode(image_bytes).decode("utf-8")

        # Include the base64-encoded image data in the response
        image_list.append({
            "filename": filename,
            "label": label,
            "imageData": image_base64
        })

    return JSONResponse(content=image_list)


@router.post("/upload", response_model=Image)
async def upload_image(
    file: UploadFile = File(...)
):
    # Store the file
    contents = await file.read()
    
    # Specify the path where you want to save the uploaded file
    upload_folder = "uploads"
    os.makedirs(upload_folder, exist_ok=True)  # Create the upload folder if it doesn't exist

    # Save the file with its original filename
    file_path = os.path.join(upload_folder, file.filename)
    with open(file_path, "wb") as f:
        f.write(contents)

    # Save image details to storage
    new_image = image_storage.add_image(filename=file.filename, label='label')
    
    return new_image.dict()

@router.delete("/images/{filename}")
async def delete_image(filename: str):
    try:
        # Delete the image file
        os.remove(f"uploads/{filename}")

        # Delete the image from storage
        deleted_image = image_storage.delete_image(filename)

        if deleted_image is None:
            raise HTTPException(status_code=404, detail="Image not found")

        return {"message": f"Image '{filename}' deleted successfully"}
    except Exception as e:
        print(f"Error deleting image: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")