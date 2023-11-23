from fastapi import APIRouter, Depends, HTTPException, status
from jose import jwt
from datetime import datetime, timedelta
from typing import Optional
from models.user import User
from storage.user_storage import get_user, create_user

router = APIRouter()

# Secret key to sign the tokens (replace with a strong secret in production)
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(username: str, role: str = "normal", expires_delta: Optional[timedelta] = None):
    to_encode = {"sub": username, "role": role}
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.post("/token")
async def login(data: User):
    user = get_user(data.username)
    if user is None or user.username != data.password:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(username=data.username, role=user.role)  # Include user role

    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/register")
async def register(data: User):
    existing_user = get_user(data.username)
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already registered")

    new_user = create_user(data.username, data.password, data.role)
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(username=data.username, role=data.role)  # Include user role

    return {"access_token": access_token, "token_type": "bearer"}
