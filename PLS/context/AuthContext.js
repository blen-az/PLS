import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  reload,
} from 'firebase/auth';
import { auth, db } from '../firebase';  // Ensure Firebase is correctly initialized
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Create Auth Context
export const AuthContext = createContext();

// AuthContextProvider to wrap the app with context
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [loading, setLoading] = useState(false);  // Loading state for async actions
  const [loadingUserData, setLoadingUserData] = useState(false);  // Loading state for user data

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('onAuthStateChanged:', firebaseUser); // Debug log
      if (firebaseUser) {
        console.log('Firebase User:', firebaseUser); // Debug log
        setLoading(true);  // Set loading state to true
        await reload(firebaseUser);
        setIsAuthenticated(true);
        const userData = await fetchUserData(firebaseUser.uid);
        if (!userData) {
          await logout();
          alert('Account data not found. Please sign up again.');
        }
        setLoading(false);  // Set loading state to false once data is fetched
      } else {
        console.log('No user found'); // Debug log
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);  // Ensure loading is false when no user is found
      }
    });

    return unsubscribe;
  }, []);

  const fetchUserData = async (userId) => {
    setLoadingUserData(true);  // Set loading state for user data
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.hasSeenGuide === undefined) {
        await setDoc(docRef, { hasSeenGuide: false }, { merge: true });
        data.hasSeenGuide = false;
      }
      setUser({ uid: userId, ...data });
      setLoadingUserData(false);  // Set loading state to false after fetching user data
      return { uid: userId, ...data };
    }
    setLoadingUserData(false);  // Set loading state to false if user data is not found
    return null;
  };

  const register = async (email, password, username) => {
    setLoading(true);  // Set loading state while registering
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      // Add user details to Firestore
      await setDoc(doc(db, 'users', response.user.uid), { username, email, isAdmin: false, hasSeenGuide: false });
      setLoading(false);  // Set loading state to false after registration
      return { success: true, msg: 'Registration successful.' };
    } catch (error) {
      setLoading(false);  // Set loading state to false in case of error
      let msg = 'An error occurred. Please try again.';
      if (error.code === 'auth/invalid-email') msg = 'Invalid email format.';
      if (error.code === 'auth/email-already-in-use') msg = 'Email is already registered.';
      if (error.code === 'auth/weak-password') msg = 'Password should be at least 6 characters.';
      return { success: false, msg };
    }
  };

  const login = async (email, password) => {
    setLoading(true);  // Set loading state while logging in
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await reload(result.user);
      const userData = await fetchUserData(result.user.uid);
      setUser(userData); // Store user data in state
      setLoading(false);  // Set loading state to false after login
      return { success: true };
    } catch (error) {
      setLoading(false);  // Set loading state to false in case of error
      let msg = 'An error occurred. Please try again.';
      if (error.code === 'auth/invalid-email') msg = 'Invalid email format.';
      if (error.code === 'auth/wrong-password') msg = 'Incorrect password.';
      if (error.code === 'auth/user-not-found') msg = 'User not found.';
      return { success: false, msg };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (error) {
      return { success: false, msg: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, loading, loadingUserData, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access Auth Context data
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
