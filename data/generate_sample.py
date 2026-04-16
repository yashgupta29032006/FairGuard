import pandas as pd
import numpy as np

def generate_sample_data(n=1000):
    np.random.seed(42)
    
    # Features
    age = np.random.randint(18, 70, n)
    income = np.random.randint(20000, 150000, n)
    credit_score = np.random.randint(300, 850, n)
    
    # Protected attribute: Gender (0 for Female, 1 for Male)
    gender = np.random.choice([0, 1], n)
    
    # Target: Loan Approved (0 for No, 1 for Yes)
    # Introducing intentional bias: 
    # Males have a higher base probability of approval in this synthetic dataset
    logit = 0.05 * age + 0.00001 * income + 0.01 * credit_score - 8
    # Bias term: if gender is male (1), increase logit
    logit += gender * 1.5 
    
    prob = 1 / (1 + np.exp(-logit))
    loan_approved = (np.random.random(n) < prob).astype(int)
    
    df = pd.DataFrame({
        "age": age,
        "income": income,
        "credit_score": credit_score,
        "sender_gender": gender, # renamed for clarity in "protected attribute" selection
        "loan_approved": loan_approved
    })
    
    df.to_csv("data/sample_data.csv", index=False)
    print("Sample data generated at data/sample_data.csv")

if __name__ == "__main__":
    import os
    os.makedirs("data", exist_ok=True)
    generate_sample_data()
