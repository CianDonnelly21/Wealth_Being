from database import getMoodtrackerCollection
from fastapi import APIRouter, Request, Depends
from auth.deps import require_user

router = APIRouter()

@router.post('/moodtracker/add')
async def add_mood_entry(request: Request, session=Depends(require_user)):

    body = await request.json()
    Question1 = body.get('Question1')
    Question2 = body.get('Question2')
    Question3 = body.get('Question3') 
    date = body.get('date') 

    # validate required fields
    if not Question1 or not Question2 or not Question3 or not date:
        print("Missing required fields")
        return {"valid": False, "message": "You must answer all questions!"}
    
    try:
        print("Connected to database")
        moodtracker = getMoodtrackerCollection()
        result = moodtracker.insert_one({
            "userId": session["user_id"],
            "Question1": Question1,
            "Question2": Question2,
            "Question3": Question3,
            "date": date
        })

        return {"valid": True, "message": "Mood tracking entry has been added"}
    
    except Exception as error:
        print(f"error: {str(error)}")

        return {"valid": False, 
                "error": str(error)
        }
