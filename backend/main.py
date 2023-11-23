# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import auth, images, labels

app = FastAPI()

# CORS (Cross-Origin Resource Sharing) middleware for handling cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In a production application, you would restrict this to specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers from API modules
app.include_router(auth.router)
app.include_router(images.router, prefix="/api/v1")
app.include_router(labels.router, prefix="/api/v1")



