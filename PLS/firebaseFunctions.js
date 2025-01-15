// firebaseFunctions.js
import { db } from './firebase';  // Import Firestore
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Save user data such as preferences, progress, etc.
const saveUserData = async (userId, progress, interests) => {
  await setDoc(doc(db, "users", userId), {
    learningProgress: progress,  // User progress (percentage)
    interests: interests,  // User interests in specific topics (e.g., courses they like)
    coursesEnrolled: ["Data Structures", "Algorithms"]  // Example of courses
  });
};

// Fetch user data from Firestore (for personalized recommendations)
const fetchUserData = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

export { saveUserData, fetchUserData };
