from src.data.loader import load_user_progress
from src.models.recommender import build_recommendation_model

def train():
    # Load interaction data
    df = load_user_progress()  # From Firestore
    
    # Prepare data
    user_ids = df['userId'].astype('category').cat.codes.values
    course_ids = df['courseId'].astype('category').cat.codes.values
    labels = df['progress'].values  # Use progress as implicit feedback
    
    # Train model
    model = build_recommendation_model(
        num_users=len(df['userId'].unique()),
        num_courses=len(df['courseId'].unique())
    )
    model.compile(optimizer='adam', loss='mse')
    model.fit([user_ids, course_ids], labels, epochs=20)
    
    # Save embeddings for later use
    save_embeddings(model)
    deploy_model(model)  # Similar to difficulty model deployment