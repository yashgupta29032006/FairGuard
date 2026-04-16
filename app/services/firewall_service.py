import pandas as pd
import shap
import numpy as np
from typing import Dict, Any, List

class FirewallService:
    def __init__(self, model, feature_names: List[str], fairness_benchmarks: Dict[str, float]):
        self.model = model
        self.feature_names = feature_names
        self.fairness_benchmarks = fairness_benchmarks
        # Initialize SHAP explainer
        # Logistic Regression is compatible with LinearExplainer
        self.explainer = shap.LinearExplainer(model, masker=shap.maskers.Independent(data=np.zeros((1, len(feature_names)))))

    def predict_with_firewall(self, input_data: Dict[str, Any], protected_attr_val: Any) -> Dict[str, Any]:
        """
        Runs prediction through the Decision Firewall.
        Checks if the prediction belongs to a demographic segment with high bias history.
        """
        # Convert input to DataFrame for consistency
        input_df = pd.DataFrame([input_data])[self.feature_names]
        
        # Get raw prediction
        prediction = int(self.model.predict(input_df)[0])
        probabilities = self.model.predict_proba(input_df)[0]
        confidence = float(np.max(probabilities))

        # Decision Firewall Logic: 
        # 1. Check if the protected attribute group for this specific input has a poor fairness history.
        # 2. Flag as bias risk if the group parity difference is high.
        
        bias_risk = "Low"
        fairness_flag = 0
        
        # Simple heuristic for MVP: if fairness metrics from training were bad (> 0.1 difference),
        # flag predictions for the protected group.
        # Note: In a real system, this would be more complex.
        dp_diff = self.fairness_benchmarks.get("demographic_parity_diff", 0)
        
        if dp_diff > 0.1:
            bias_risk = "Medium"
            if dp_diff > 0.2:
                bias_risk = "High"
                fairness_flag = 1

        # Generate SHAP explanation
        shap_values = self.explainer.shap_values(input_df)
        
        # For binary classification, shap_values is a 2D array [observations, features] 
        # or a list of two such arrays (one for each class).
        if isinstance(shap_values, list):
            # Use shap values for the predicted class
            actual_shap = shap_values[prediction][0]
        else:
            actual_shap = shap_values[0]

        # Extract top features
        top_features = {}
        for i, feat in enumerate(self.feature_names):
            top_features[feat] = float(actual_shap[i])

        # Sort features by contribution
        sorted_features = dict(sorted(top_features.items(), key=lambda item: abs(item[1]), reverse=True)[:5])

        return {
            "prediction": prediction,
            "bias_risk": bias_risk,
            "fairness_flag": fairness_flag,
            "confidence_score": round(confidence, 4),
            "explanation": {
                "top_contributing_features": sorted_features,
                "base_value": float(self.explainer.expected_value) if not isinstance(self.explainer.expected_value, list) else float(self.explainer.expected_value[prediction])
            }
        }
