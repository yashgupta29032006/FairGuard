import pandas as pd
import numpy as np
from typing import Dict, Any

class BiasAnalyzer:
    @staticmethod
    def analyze(df: pd.DataFrame, protected_attr: str, target_col: str) -> Dict[str, Any]:
        """
        Analyzes the dataset for bias regarding a protected attribute and a target column.
        """
        if protected_attr not in df.columns or target_col not in df.columns:
            raise ValueError(f"Columns '{protected_attr}' or '{target_col}' not found in dataset.")

        # 1. Class Imbalance (Target distribution)
        class_counts = df[target_col].value_counts(normalize=True).to_dict()
        class_imbalance = {str(k): float(v) for k, v in class_counts.items()}

        # 2. Group Disparity (Protected attribute distribution)
        group_counts = df[protected_attr].value_counts(normalize=True).to_dict()
        group_disparity = {str(k): float(v) for k, v in group_counts.items()}

        # 3. Disparate Impact
        # DI = P(Y=1 | Group=unprivileged) / P(Y=1 | Group=privileged)
        # For simplicity, we assume the smaller group is unprivileged if binary, 
        # or we compare each group to the overall mean.
        
        # Calculate positive outcome rate per group
        groups = df[protected_attr].unique()
        positive_rates = {}
        for group in groups:
            group_df = df[df[protected_attr] == group]
            pos_rate = group_df[target_col].mean() if len(group_df) > 0 else 0
            positive_rates[str(group)] = float(pos_rate)

        # Disparate Impact calculation (min rate / max rate)
        if len(positive_rates) >= 2:
            min_rate = min(positive_rates.values())
            max_rate = max(positive_rates.values())
            disparate_impact = min_rate / max_rate if max_rate > 0 else 1.0
        else:
            disparate_impact = 1.0

        # Basic Stats
        stats = {
            "total_records": len(df),
            "missing_values": df[[protected_attr, target_col]].isnull().sum().to_dict(),
            "positive_rates": positive_rates
        }

        return {
            "class_imbalance": class_imbalance,
            "group_disparity": group_disparity,
            "disparate_impact": round(disparate_impact, 4),
            "stats": stats
        }
