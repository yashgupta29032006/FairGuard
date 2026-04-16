from sqlalchemy import Column, Integer, String, Float, DateTime, JSON
from datetime import datetime
from ..database.db import Base

class DatasetMetadata(Base):
    __tablename__ = "datasets"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, index=True)
    file_path = Column(String)
    columns = Column(JSON)
    uploaded_at = Column(DateTime, default=datetime.utcnow)

class ModelMetadata(Base):
    __tablename__ = "models"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    model_path = Column(String)
    trained_at = Column(DateTime, default=datetime.utcnow)
    target_column = Column(String)
    protected_attribute = Column(String)
    accuracy = Column(Float)
    demographic_parity_diff = Column(Float)
    equal_opportunity_diff = Column(Float)
    disparate_impact = Column(Float)
    features = Column(JSON) # List of feature names

class FirewallLog(Base):
    __tablename__ = "firewall_logs"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    prediction = Column(Integer)
    bias_risk = Column(String) # "Low", "Medium", "High"
    fairness_flag = Column(Integer) # 0 for normal, 1 for flagged
    confidence_score = Column(Float)
    input_data = Column(JSON)
    explanation = Column(JSON)
