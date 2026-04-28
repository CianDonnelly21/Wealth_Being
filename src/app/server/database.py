import os
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv

load_dotenv('dbConnect.env')

MONGO_URI = os.getenv('MONGO_URI') # getting sensitive info from .env file for security
DATABASE_NAME = os.getenv('DATABASE_NAME')

# global db instances
client = None
database = None

# database connection functions
def connectToDB():
    global client, database
    try:
        client = MongoClient(MONGO_URI)
        database = client[DATABASE_NAME]
        print("Connected to MongoDB")
    except ConnectionFailure as e:
        print(f"Could not connect to MongoDB: {e}")
        raise e
    
def getDB():
    global database
    if database is None:
        connectToDB()
    return database

def closeDB():
    global client
    if client:
        client.close()
        print("MongoDB connection closed")

# collection access functions
def getCollection(collection_name): # helper function
    db = getDB()
    return db[collection_name]

def getDiaryCollection():
    return getCollection("diary_entry")

def getLoginCollection():
    return getCollection("Login")

def getMoodtrackerCollection():
    return getCollection("moodtracker_entry")