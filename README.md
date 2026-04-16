# FairGuard Backend

FairGuard is an MVP backend system designed to detect, evaluate, and prevent biased AI decisions using a "Decision Firewall".

## System Architecture

- **Data Bias Analyzer**: Detects class imbalance and demographic disparity in CSV datasets.
- **Model Trainer**: Trains models and evaluates fairness using Demographic Parity and Equal Opportunity metrics.
- **Decision Firewall**: Intercepts prediction requests to flag potential bias risks.
- **Explainability**: Uses SHAP values to provide feature-level explanations for every prediction.

## Project Structure

```
FairGuard/
│── app/
│   │── main.py            # FastAPI entry point
│   │── routes/            # API endpoints
│   │── services/          # Business logic (Bias, Model, Firewall)
│   │── models/            # SQLAlchemy & Pydantic models
│   │── database/          # DB configuration
│── data/                  # Uploaded datasets
│── database/              # SQLite DB and saved models
│── requirements.txt       # Dependencies
│── README.md              # Setup instructions
```

## Setup Instructions

### 1. Prerequisites
- Python 3.10+
- `pip`

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Generate Sample Data
Running this script will create a biased dataset (`data/sample_data.csv`) for testing.
```bash
python data/generate_sample.py
```

### 4. Run the Server
```bash
uvicorn app.main:app --reload
```
The server will be available at `http://localhost:8000`. API documentation at `http://localhost:8000/docs`.

---

## API Testing Guide (Step-by-Step)

### Step 1: Upload Dataset
```bash
curl -X POST "http://localhost:8000/upload-dataset" \
     -H "accept: application/json" \
     -H "Content-Type: multipart/form-data" \
     -F "file=@data/sample_data.csv"
```
*Note the `id` returned (usually `1`).*

### Step 2: Analyze Bias
```bash
curl -X POST "http://localhost:8000/analyze-bias" \
     -H "Content-Type: application/json" \
     -d '{"dataset_id": 1, "protected_attribute": "sender_gender", "target_column": "loan_approved"}'
```

### Step 3: Train Model with Fairness Evaluation
```bash
curl -X POST "http://localhost:8000/train-model" \
     -H "Content-Type: application/json" \
     -d '{"dataset_id": 1, "target_column": "loan_approved", "protected_attribute": "sender_gender"}'
```

### Step 4: Run Prediction through the Decision Firewall
```bash
curl -X POST "http://localhost:8000/predict" \
     -H "Content-Type: application/json" \
     -d '{
       "input_data": {
         "age": 35,
         "income": 50000,
         "credit_score": 650,
         "sender_gender": 0
       }
     }'
```

### Step 5: Get Model Info
```bash
curl -X GET "http://localhost:8000/model-info"
```

---

## Testing Scenarios

1. **Bias Detection**: Notice the `disparate_impact` in Step 2. Values < 0.8 indicate significant bias.
2. **Firewall in Action**: In Step 4, if you predict for `sender_gender: 0` (Female in our synthetic data), the firewall may flag a "High" bias risk if the model's training metrics showed significant disparity.
3. **Explainability**: Each prediction response includes a `shap` explanation showing which features most influenced the decision.
