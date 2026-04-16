from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
import pandas as pd
import os
import uuid
from ..database.db import get_db
from ..models import db_models, schemas
from ..services.bias_service import BiasAnalyzer

router = APIRouter()

UPLOAD_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../data"))
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload-dataset")
async def upload_dataset(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are allowed.")
    
    file_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}_{file.filename}")
    
    try:
        content = await file.read()
        with open(file_path, "wb") as f:
            f.write(content)
        
        df = pd.read_csv(file_path)
        columns = df.columns.tolist()
        
        db_dataset = db_models.DatasetMetadata(
            filename=file.filename,
            file_path=file_path,
            columns=columns
        )
        db.add(db_dataset)
        db.commit()
        db.refresh(db_dataset)
        
        return {"id": db_dataset.id, "filename": db_dataset.filename, "columns": columns}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading file: {str(e)}")

@router.post("/analyze-bias", response_model=schemas.AnalysisResponse)
async def analyze_bias(request: schemas.AnalysisRequest, db: Session = Depends(get_db)):
    db_dataset = db.query(db_models.DatasetMetadata).filter(db_models.DatasetMetadata.id == request.dataset_id).first()
    if not db_dataset:
        raise HTTPException(status_code=404, detail="Dataset not found.")
    
    try:
        df = pd.read_csv(db_dataset.file_path)
        result = BiasAnalyzer.analyze(df, request.protected_attribute, request.target_column)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
