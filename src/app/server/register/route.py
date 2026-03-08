import bcrypt
from fastapi import APIRouter
from database import getLoginCollection

router = APIRouter()

@router.get('/server/register')
def register(fullName: str, email: str, password: str):
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