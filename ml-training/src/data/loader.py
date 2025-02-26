import firebase_admin
from firebase_admin import credentials, firestore
import pandas as pd

def load_firestore_data(collection_name="user_metrics"):
    """Load training data from Firestore"""
    cred = credentials.Certificate("firebase-key.json")
    firebase_admin.initialize_app(cred)
    
    db = firestore.client()
    docs = db.collection(collection_name).stream()
    
    return pd.DataFrame([doc.to_dict() for doc in docs])