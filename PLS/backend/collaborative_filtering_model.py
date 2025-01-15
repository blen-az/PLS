# collaborative_filtering_model.py

import pandas as pd
from sklearn.neighbors import NearestNeighbors

# Example user-item matrix (users as rows and courses as columns)
data = pd.DataFrame({
    'user1': [5, 4, 0, 0],
    'user2': [0, 0, 3, 4],
    'user3': [2, 5, 0, 3],
    'user4': [0, 2, 4, 5]
})

# Creating a Nearest Neighbors model
model = NearestNeighbors(n_neighbors=2, metric='cosine')
model.fit(data.T)  # Transpose to treat courses as items

# Get recommended courses for user1
user_index = data.columns.get_loc('user1')
distances, indices = model.kneighbors([data.iloc[:, user_index]], n_neighbors=3)

# List the recommended courses
recommended_courses = data.columns[indices.flatten()].tolist()
print("Recommended Courses for User1:", recommended_courses)
