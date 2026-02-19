from fastapi.middleware.cors import CORSMiddleware
from src.app.api.diary import diary

app = fastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)  

#include routes
app.include_router(diary.router, prefix="/diary")