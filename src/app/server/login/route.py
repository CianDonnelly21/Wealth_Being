import bcrypt
from fastapi import APIRouter, Request
from database import getLoginCollection

router = APIRouter()

@router.post('/login')
async def login(request: Request):
    body = await request.json()
    email = body.get("email")
    password = body.get("password")
    
    users = getLoginCollection()
    user = users.find_one({'email': email})


    if user and bcrypt.checkpw(password.encode(), user['password']):
        return {'valid': True}
    else:
        return {'valid': False}


