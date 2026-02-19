import os
import bcrypt
from fastapi import APIRouter
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

router = APIRouter()

client = MongoClient(os.getenv('MONGO_URI'))
db = client[os.getenv('DATABASE_NAME')]

@router.get('/api/register')
def register(fullName: str, email: str, password: str):
    existing = db.Login.find_one({'email': email})

    if existing:
        return {
            'valid': False,
            'message': 'User already exists'
        }

    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

    db.Login.insert_one({
        'fullName': fullName,
        'email': email,
        'password': hashed
    })

    return {
        'valid': True
    }