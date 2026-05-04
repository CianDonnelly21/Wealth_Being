from fastapi import FastAPI
from login.route import router as login_router
from register.route import router as register_router
from diary.route import router as diary_router
from moodtracker.route import router as moodtracker_router
from wibble.route import router as wibble_router
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
import os

app = FastAPI()

app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SESSION_SECRET", "session123"),
    same_site="lax",
    https_only=False,
    max_age=60 * 60 * 24 * 7,
)

origins = [
    "http://localhost:3000",
    "https://wealthbeing.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(login_router)
app.include_router(register_router)
app.include_router(diary_router)
app.include_router(moodtracker_router)
app.include_router(wibble_router)
