from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import pandas as pd
import joblib
import yaml

def preprocess_data(input_path):
    """Clean and normalize training data"""
    with open("config.yaml") as f:
        config = yaml.safe_load(f)
    
    df = pd.read_csv(input_path)
    
    # Feature engineering
    df["efficiency"] = df["accuracy"] / (df["time_spent"] + 1e-6)
    
    # Select features
    features = config["features"]["input_columns"]
    target = config["features"]["target_column"]
    
    X = df[features]
    y = df[target]
    
    # Split data
    X_train, X_val, y_train, y_val = train_test_split(
        X, y, 
        test_size=config["training"]["validation_split"],
        random_state=42
    )
    
    # Normalization
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_val = scaler.transform(X_val)
    
    # Save artifacts
    joblib.dump(scaler, "models/scaler.pkl")
    pd.DataFrame(X_train).to_csv("data/processed/train_data.csv", index=False)
    
    return X_train, X_val, y_train, y_val