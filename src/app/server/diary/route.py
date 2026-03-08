from fastapi import APIRouter, Request
from database import getDiaryCollection

router = APIRouter()

#adding a diary entry 
@router.post('/diary/add')
async def add_entry(request: Request):

    body = await request.json()
    data = body.get("data")
    timestamp = body.get("timestamp")

    if not data or not timestamp:
        print("No data or timestamp")
        return({"valid": False, "message": "Missing required fields"})
    
    try:
        print("Connected to MongoDB")

        diary = getDiaryCollection()

        result = diary.insert_one({
            "data": data,
            "timestamp": timestamp
        })
        
        return{
            "valid": True,
            "insertedId": str(result.inserted_id)
        }

    except Exception as error:
        print("Mongodb error", str(error))
        return{
            "valid": False,
            "error": str(error)
        }

# get all entries for diary entry history
@router.get("/diary/entries")
def get_entries():
    print("Getting all of diary entries")

    try:
        diary = getDiaryCollection()

        entries = list(diary.find().sort("timestamp", -1))

        for entry in entries:
            entry["_id"] = str(entry["_id"])

        return {"valid": True, "entries": entries}

    except Exception as error:
        print("Mongodb error", str(error))
        return {"valid": False, "error": str(error)}
