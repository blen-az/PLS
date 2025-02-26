from src.data.loader import load_user_progress
from src.models.recommender import build_recommendation_model
from sklearn.preprocessing import LabelEncoder
import pickle
import tensorflow as tf

def save_embeddings(model, user_encoder, course_encoder):
    user_emb = model.get_layer('embedding_1').get_weights()[0]
    course_emb = model.get_layer('embedding_2').get_weights()[0]

    with open('embeddings.pkl', 'wb') as f:
        pickle.dump({'users': user_emb, 'courses': course_emb, 
                     'user_encoder': user_encoder, 'course_encoder': course_encoder}, f)

def train():
    # Load data
    df = load_user_progress()  
    
    # Encode user & course IDs
    user_encoder = LabelEncoder()
    course_encoder = LabelEncoder()

    df['userId'] = user_encoder.fit_transform(df['userId'])
    df['courseId'] = course_encoder.fit_transform(df['courseId'])

    user_ids = df['userId'].values
    course_ids = df['courseId'].values
    labels = df['progress'].values  # Use progress as implicit feedback

    # Train model
    model = build_recommendation_model(
        num_users=len(user_encoder.classes_),
        num_courses=len(course_encoder.classes_)
    )
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    
    model.fit([user_ids, course_ids], labels, epochs=20, batch_size=512)

    # Save embeddings
    save_embeddings(model, user_encoder, course_encoder)
    
    # Deploy model
    model.save('recommendation_model.h5')
    print("Model trained and saved successfully!")
