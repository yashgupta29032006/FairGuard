from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from .database.db import engine, Base
from .routes import analysis, training, prediction
import os

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="FairGuard AI Backend",
    description="A system for detecting and preventing bias in AI decisions.",
    version="1.0.0"
)

# Exception handler for global errors
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"message": f"An unexpected error occurred: {str(exc)}"},
    )

# Include routers
app.include_router(analysis.router, tags=["Data Analysis"])
app.include_router(training.router, tags=["Model Training"])
app.include_router(prediction.router, tags=["Prediction & Firewall"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to FairGuard Backend",
        "endpoints": {
            "upload": "/upload-dataset",
            "analyze": "/analyze-bias",
            "train": "/train-model",
            "predict": "/predict",
            "docs": "/docs"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
