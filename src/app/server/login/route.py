import bcrypt
from fastapi import APIRouter, Request, Depends
from database import getLoginCollection
from auth.deps import require_user

router = APIRouter()

@router.post('/login')
async def login(request: Request):
    body = await request.json()
    email = body.get("email")
    password = body.get("password")
    
    users = getLoginCollection()
    user = users.find_one({'email': email})

    if not user or not bcrypt.checkpw(password.encode(), user['password']):
        return {'valid': False}

    request.session["user_id"] = str(user["_id"])
    request.session["email"] = user["email"]

    return {'valid': True}


@router.post('/logout')
async def logout(request: Request):
    request.session.clear()
    return {'valid': True}

@router.get("/session/me")
def me(session=Depends(require_user)):
    return {"valid": True, "email": session["email"]}