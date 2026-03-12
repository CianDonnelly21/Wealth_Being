import bcrypt
from fastapi import APIRouter, Request
from database import getLoginCollection

router = APIRouter()

@router.post('/register')
async def register(request: Request):
    body = await request.json()
    fullName = body.get("fullName")
    email = body.get("email")
    password = body.get("password")

    users = getLoginCollection()
    existing = users.find_one({'email': email})

    if existing:
        return {
            'valid': False,
            'message': 'User already exists'
        }

    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

    users.insert_one({
        'fullName': fullName,
        'email': email,
        'password': hashed
    })

    return {
        'valid': True
    }