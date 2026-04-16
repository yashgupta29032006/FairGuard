import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from fairlearn.metrics import demographic_parity_difference, equal_opportunity_difference
import joblib
import os
from typing import Dict, Any, List, Tuple

class ModelTrainer:
    def __init__(self, models_dir: str):
        self.models_dir = models_dir
        os.makedirs(models_dir, exist_ok=True)

    def train_and_evaluate(
        self, 
        df: pd.DataFrame, 
        target_col: str, 
        protected_attr: str,
        feature_cols: List[str] = None
    ) -> Dict[str, Any]:
        """
        Trains a Logistic Regression model and computes fairness metrics.
        """
        if feature_cols is None:
            # Use all columns except target and protected attribute as features
            feature_cols = [col for col in df.columns if col not in [target_col, protected_attr]]

        X = df[feature_cols]
        y = df[target_col]
        S = df[protected_attr] # Sensitive attribute

        # Split data
        X_train, X_test, y_train, y_test, S_train, S_test = train_test_split(
            X, y, S, test_size=0.2, random_state=42
        )

        # Train model
        model = LogisticRegression(max_iter=1000)
        model.fit(X_train, y_train)

        # Predictions
        y_pred = model.predict(X_test)

        # Accuracy
        acc = accuracy_score(y_test, y_pred)

        # Fairness Metrics
        dp_diff = demographic_parity_difference(
            y_test, y_pred, sensitive_features=S_test
        )
        eo_diff = equal_opportunity_difference(
            y_test, y_pred, sensitive_features=S_test
        )

        # Save model
        model_filename = f"model_{int(pd.Timestamp.now().timestamp())}.joblib"
        model_path = os.path.join(self.models_dir, model_filename)
        joblib.dump(model, model_path)

        return {
            "model_path": model_path,
            "accuracy": round(acc, 4),
            "demographic_parity_diff": round(dp_diff, 4),
            "equal_opportunity_diff": round(eo_diff, 4),
            "features": feature_cols
        }

    def load_model(self, model_path: str):
        return joblib.load(model_path)
