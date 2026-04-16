from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import pandas as pd
import os
from ..database.db import get_db
from ..models import db_models, schemas
from ..services.model_service import ModelTrainer
from ..services.bias_service import BiasAnalyzer

router = APIRouter()

MODELS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../database/models"))
trainer = ModelTrainer(MODELS_DIR)

@router.post("/train-model", response_model=schemas.ModelInfoResponse)
async def train_model(request: schemas.TrainingRequest, db: Session = Depends(get_db)):
    db_dataset = db.query(db_models.DatasetMetadata).filter(db_models.DatasetMetadata.id == request.dataset_id).first()
    if not db_dataset:
        raise HTTPException(status_code=404, detail="Dataset not found.")
    
    try:
        df = pd.read_csv(db_dataset.file_path)
        
        # Train and evaluate
        result = trainer.train_and_evaluate(
            df, 
            request.target_column, 
            request.protected_attribute,
            request.feature_columns
        )
        
        # Calculate disparate impact for the model metadata
        bias_info = BiasAnalyzer.analyze(df, request.protected_attribute, request.target_column)
        
        db_model = db_models.ModelMetadata(
            name=f"LogisticRegression_{db_dataset.filename}",
            model_path=result["model_path"],
            target_column=request.target_column,
            protected_attribute=request.protected_attribute,
            accuracy=result["accuracy"],
            demographic_parity_diff=result["demographic_parity_diff"],
            equal_opportunity_diff=result["equal_opportunity_diff"],
            disparate_impact=bias_info["disparate_impact"],
            features=result["features"]
        )
        db.add(db_model)
        db.commit()
        db.refresh(db_model)
        
        return db_model
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/model-info", response_model=schemas.ModelInfoResponse)
async def get_model_info(model_id: int = None, db: Session = Depends(get_db)):
    if model_id:
        db_model = db.query(db_models.ModelMetadata).filter(db_models.ModelMetadata.id == model_id).first()
    else:
        # Get latest model
        db_model = db.query(db_models.ModelMetadata).order_by(db_models.ModelMetadata.trained_at.desc()).first()
        
    if not db_model:
        raise HTTPException(status_code=404, detail="No model found.")
    return db_model
