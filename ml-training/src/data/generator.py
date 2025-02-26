import numpy as np
import pandas as pd
import yaml

def generate_synthetic_data():
    """Generate realistic synthetic training data"""
    with open("config.yaml") as f:
        config = yaml.safe_load(f)
    
    np.random.seed(42)
    samples = config["features"]["synthetic_samples"]
    
    data = {
        "attempts": np.random.randint(1, 100, samples),
        "time_spent": np.random.uniform(10, 600, samples),
        "accuracy": np.random.beta(2, 5, samples),
    }
    
    # Create realistic difficulty relationship
    data["difficulty"] = np.clip(
        (data["attempts"] * 0.15 + 
         data["accuracy"] * 6 + 
         np.random.normal(scale=0.5, size=samples)
        ).astype(int), 1, 10
    )
    
    df = pd.DataFrame(data)
    df.to_csv("data/synthetic/synthetic_data.csv", index=False)
    return df