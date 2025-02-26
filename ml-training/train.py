from src.data.generator import generate_synthetic_data
from src.features.preprocessor import preprocess_data
from src.models.trainer import train_model, evaluate_model
from src.deploy.pusher import deploy_model
import joblib
import yaml

def main():
    # Generate synthetic data
    print("🚀 Generating synthetic data...")
    generate_synthetic_data()
    
    # Preprocess data
    print("🧹 Preprocessing data...")
    X_train, X_val, y_train, y_val = preprocess_data("data/synthetic/synthetic_data.csv")
    
    # Train model
    print("🤖 Training model...")
    model, history = train_model(X_train, y_train, X_val, y_val)
    
    # Evaluate
    metrics = evaluate_model(model, X_val, y_val)
    print(f"\n📊 Validation MAE: {metrics['mae']:.2f}")
    print(f"📈 R² Score: {metrics['r2']:.2f}")
    print(f"📉 Baseline MAE: {metrics['baseline_mae']:.2f}")
    
    # Deploy
    print("\n🚚 Deploying model...")
    deploy_model(model)
    
    print("\n✅ Training pipeline completed successfully!")

if __name__ == "__main__":try:
    # Generate synthetic data
    print("🚀 Generating synthetic data...")
    generate_synthetic_data()
    
    # Preprocess data
    print("🧹 Preprocessing data...")
    X_train, X_val, y_train, y_val = preprocess_data("data/synthetic/synthetic_data.csv")
    
    # Train model
    print("🤖 Training model...")
    model, history = train_model(X_train, y_train, X_val, y_val)
    
    # Evaluate
    metrics = evaluate_model(model, X_val, y_val)
    print(f"\n📊 Validation MAE: {metrics['mae']:.2f}")
    print(f"📈 R² Score: {metrics['r2']:.2f}")
    print(f"📉 Baseline MAE: {metrics['baseline_mae']:.2f}")
    
    # Deploy
    print("\n🚚 Deploying model...")
    deploy_model(model)
    
    print("\n✅ Training pipeline completed successfully!")
except Exception as e:
    print(f"\n❌ Training pipeline failed with error: {str(e)}")
    main()