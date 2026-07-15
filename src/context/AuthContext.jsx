import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { app } from '../firebase/firebase.config'; // আপনার ফায়ারবেস কনফিগারেশন ফাইল পাথ

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  // ১. ইমেইল-পাসওয়ার্ড দিয়ে ফায়ারবেস অ্যাকাউন্ট ক্রিয়েশন
  const signUpWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ২. গুগল পপআপ সাইন-আপ/সাইন-ইন
  const signUpWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // ৩. সাইন আউট
  const logOut = () => {
    return signOut(auth);
  };

  // কারেন্ট ইউজার স্টেট মনিটর করা
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const value = {
    currentUser,
    loading,
    signUpWithEmail,
    signUpWithGoogle,
    logOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};