from fastapi import Request, HTTPException


def require_user(request: Request):
    user_id = request.session.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Not authenticated")

    return {
        "user_id": user_id,
        "email": request.session.get("email", ""),
    }