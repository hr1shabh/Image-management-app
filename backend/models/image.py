# models/image.py
from pydantic import BaseModel

class Image(BaseModel):
    filename: str
    label: str
