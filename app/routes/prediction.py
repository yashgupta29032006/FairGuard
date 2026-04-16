from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import joblib
from ..database.db import get_db
from ..models import db_models, schemas
from ..services.firewall_service import FirewallService

router = APIRouter()

@router.post("/predict", response_model=schemas.PredictionResponse)
async def predict(request: schemas.PredictionRequest, model_id: int = None, db: Session = Depends(get_db)):
    # 1. Get model metadata
    if model_id:
        db_model = db.query(db_models.ModelMetadata).filter(db_models.ModelMetadata.id == model_id).first()
    else:
        db_model = db.query(db_models.ModelMetadata).order_by(db_models.ModelMetadata.trained_at.desc()).first()
        
    if not db_model:
        raise HTTPException(status_code=404, detail="No model trained yet or invalid model_id.")
    
    # 2. Load the model
    try:
        model = joblib.load(db_model.model_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load model: {str(e)}")
    
    # 3. Initialize Firewall
    fairness_benchmarks = {
        "demographic_parity_diff": db_model.demographic_parity_diff,
        "equal_opportunity_diff": db_model.equal_opportunity_diff
    }
    firewall = FirewallService(model, db_model.features, fairness_benchmarks)
    
    # 4. Run Firewall Prediction
    protected_attr_val = request.input_data.get(db_model.protected_attribute)
    if protected_attr_val is None:
         raise HTTPException(status_code=400, detail=f"Input data missing protected attribute: {db_model.protected_attribute}")

    try:
        result = firewall.predict_with_firewall(request.input_data, protected_attr_val)
        
        # 5. Log the prediction
        log = db_models.FirewallLog(
            prediction=result["prediction"],
            bias_risk=result["bias_risk"],
            fairness_flag=result["fairness_flag"],
            confidence_score=result["confidence_score"],
            input_data=request.input_data,
            explanation=result["explanation"]
        )
        db.add(log)
        db.commit()
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
