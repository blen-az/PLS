import firebase_admin
from firebase_admin import credentials, storage
import tensorflowjs as tfjs
import os
import shutil

def deploy_model(model, version="v1"):
    """Deploy model to Firebase Storage"""
    # Create temporary directory
    model_dir = f"models/{version}"
    os.makedirs(model_dir, exist_ok=True)
    
    # Save Keras model
    tfjs.converters.save_keras_model(model, f"{model_dir}/tfjs_model")
    
    # Initialize Firebase
    cred = credentials.Certificate("firebase-key.json")
    firebase_admin.initialize_app(cred, {
        'storageBucket': os.getenv("FIREBASE_STORAGE_BUCKET")
    })
    
    # Upload files
    bucket = storage.bucket()
    for root, _, files in os.walk(f"{model_dir}/tfjs_model"):
        for file in files:
            local_path = os.path.join(root, file)
            remote_path = os.path.relpath(local_path, model_dir)
            blob = bucket.blob(f"models/{version}/{remote_path}")
            blob.upload_from_filename(local_path)
    
    print(f"Model {version} deployed successfully!")
    shutil.rmtree(model_dir)  # Cleanup