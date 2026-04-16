from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from datetime import datetime

class AnalysisRequest(BaseModel):
    dataset_id: int
    protected_attribute: str
    target_column: str

class AnalysisResponse(BaseModel):
    class_imbalance: Dict[str, float]
    group_disparity: Dict[str, Dict[str, float]]
    disparate_impact: float
    stats: Dict[str, Any]

class TrainingRequest(BaseModel):
    dataset_id: int
    target_column: str
    protected_attribute: str
    feature_columns: Optional[List[str]] = None

class ModelInfoResponse(BaseModel):
    id: int
    name: str
    trained_at: datetime
    target_column: str
    protected_attribute: str
    accuracy: float
    demographic_parity_diff: float
    equal_opportunity_diff: float
    disparate_impact: float
    features: List[str]

class PredictionRequest(BaseModel):
    input_data: Dict[str, Any]

class PredictionResponse(BaseModel):
    prediction: int
    bias_risk: str
    fairness_flag: int
    confidence_score: float
    explanation: Dict[str, Any]
