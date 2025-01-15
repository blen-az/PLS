# backend/server.py
from flask import Flask, request, jsonify
from collaborative_filtering_model import recommend_courses  # Assuming this is your collaborative filtering model

app = Flask(__name__)

@app.route('/recommend_courses', methods=['POST'])
def recommend_courses_for_user():
    # Get the user data (for example: user ID or preferences)
    data = request.json  # Assume data contains user preferences
    user_id = data.get("user_id")  # Get the user ID from the request
    
    # Call your collaborative filtering model to get recommendations
    recommendations = recommend_courses(user_id)
    
    return jsonify({"recommended_courses": recommendations})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
