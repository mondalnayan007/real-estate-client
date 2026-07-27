import React, { createContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null); // 'admin' | 'client' | null
  const [loading, setLoading] = useState(true);
  
  const googleProvider = new GoogleAuthProvider();

  // ১. ইমেইল-পাসওয়ার্ড দিয়ে ফায়ারবেস অ্যাকাউন্ট ক্রিয়েশন
  const signUpWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ২. গুগল পপআপ সাইন-আপ/সাইন-ইন
  const signUpWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

// 🚀 ৩. হাইব্রিড লগইন (Firebase Admin -> MongoDB Client Check)
const loginWithEmailAndPassword = async (email, password) => {
  // Step A: Firebase Admin Check
  try {
    const adminCredential = await signInWithEmailAndPassword(auth, email, password);
    const adminUser = adminCredential.user;
    
    const adminData = {
      uid: adminUser.uid,
      email: adminUser.email,
      name: adminUser.displayName || 'Admin'
    };

    localStorage.setItem('role', 'admin');
    localStorage.setItem('adminUser', JSON.stringify(adminData));
    
    setRole('admin');
    setCurrentUser(adminData);
    return { success: true, role: 'admin' };
  } catch (firebaseError) {
    // ফায়ারবেসে অ্যাডমিন না পেলে এটি নিচুতে যাবে
    console.log("Not a Firebase admin, checking MongoDB Client DB...");
  }

  // Step B: MongoDB Client Check
  try {
    // ⚠️ আপনার Node.js সার্ভার যদি port 5000-এ চলে, তবে নিচের URL-এ 5000 দিন
    const response = await fetch('http://localhost:4000/api/login', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      localStorage.setItem('role', 'client');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setRole('client');
      setCurrentUser(data.user);
      return { success: true, role: 'client' };
    } else {
      return { success: false, message: data.message || 'Invalid email or password' };
    }
  } catch (err) {
    console.error("MongoDB backend connection error:", err);
    // 💡 এখানে আসল এররটি রিটার্ন করা হচ্ছে
    return { 
      success: false, 
      message: `Backend connection failed! Make sure Express server is running on port 4000. (${err.message})` 
    };
  }
};

  // 🚪 ৪. অল-ইন-ওয়ান সাইন আউট (Firebase + LocalStorage)
  const logOut = async () => {
    try {
      if (role === 'admin') {
        await signOut(auth);
      }
    } catch (error) {
      console.error("Firebase logout error:", error);
    } finally {
      localStorage.removeItem('role');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('adminUser');
      
      setCurrentUser(null);
      setRole(null);
    }
  };

  // 🔄 ৫. অ্যাপ লোড হওয়ার সময় ইউজার ও রোল ডিটেক্ট করা
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      const savedRole = localStorage.getItem('role');

      if (savedRole === 'admin' && firebaseUser) {
        setRole('admin');
        setCurrentUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || 'Admin'
        });
      } else if (savedRole === 'client') {
        const clientData = JSON.parse(localStorage.getItem('user') || 'null');
        setRole('client');
        setCurrentUser(clientData);
      } else {
        setRole(null);
        setCurrentUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    role,
    loading,
    signUpWithEmail,
    signUpWithGoogle,
    loginWithEmailAndPassword,
    logOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};