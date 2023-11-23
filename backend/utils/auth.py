# utils/auth.py
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status, Query
from datetime import datetime, timedelta
from typing import Optional
from models.user import User
from storage.user_storage import get_user
from fastapi.security import OAuth2PasswordBearer

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    print("lol")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        print(username)
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = get_user("adminuser")
    print(user)
    userr = {
        "username" : user.username,
        "password" : user.password,
        "role" : user.role
    }

    if user is None:
        raise credentials_exception
    print(type(userr))
    return userr

def is_admin(user: User = Depends(get_current_user)):
    return user.role == "admin"
