import os
import bcrypt
from fastapi import APIRouter
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

router = APIRouter()
client = MongoClient(os.getenv('MONGO_URI'))
db = client[os.getenv('DATABASE_NAME')]

@router.get('/server/login')
def login(email: str, password: str):
    user = db.Login.find_one({'email': email})


    if user and bcrypt.checkpw(password.encode(), user['password']):
        return {'valid': True}
    else:
        return {'valid': False}


