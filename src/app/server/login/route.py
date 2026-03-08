import bcrypt
from fastapi import APIRouter
from database import getLoginCollection

router = APIRouter()

@router.get('/server/login')
def login(email: str, password: str):
    users = getLoginCollection()
    user = users.find_one({'email': email})


    if user and bcrypt.checkpw(password.encode(), user['password']):
        return {'valid': True}
    else:
        return {'valid': False}


