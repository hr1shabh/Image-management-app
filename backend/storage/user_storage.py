# user_storage.py
from typing import Dict
from models.user import User

fake_users_db: Dict[str, User] = {
    "testuser": User(username="testuser", password="testpassword", role="normal"),
    "adminuser": User(username="adminuser", password="adminpassword", role="admin"),
}

def get_user(username: str):
    print(fake_users_db)
    print(type(fake_users_db))
    return fake_users_db.get(username)

def create_user(username: str, password: str, role: str):
    if get_user(username):
        # User with the same username already exists
        return None

    new_user = User(username=username, password=password, role=role)
    fake_users_db[username] = new_user
    return new_user
