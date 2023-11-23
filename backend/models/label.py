# models/label.py
from pydantic import BaseModel

class Label(BaseModel):
    name: str
