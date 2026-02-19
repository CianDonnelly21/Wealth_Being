from fastapi import APIRouter, Request
from pymongo import MongoClient

router = APIRouter()

MONGO_URI = "mongodb+srv://root:myPassword123@cluster0.jf7grv6.mongodb.net/?appName=Cluster0"

#adding a diary entry 
async def add_entry(request: Request):

    body = await request.json()
    data = body.get("data")
    timestamp = body.get("timestamp")

    if not data or not timestamp:
        print("No data or timestamp")
        return("Missing required fields")
    
    client = MongoClient(MONGO_URI)

    try:
        print("Connected to MongoDB")

        db = client["WealthBeing"]
        diary = db["diary_entry"]

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

    finally:
        client.close()

#get all entries
@router.get("/")

def get_entries():
    print("Getting all of diary entries")
    client = MongoClient(MONGO_URI)

    try:
        db = client["WealthBeing"]
        diary = db["diary_entry"]

        entries = list(diary.find().sort("timestamp", -1))

        for entry in entries:
            entry["_id"] = str(entry["_id"])

        return {"valid": True, "entries": entries}

    except Exception as error:
        print("Mongodb error", str(error))
        return {"valid": False, "error": str(error)}

    finally:
        client.close()
