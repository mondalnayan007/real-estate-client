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
  // 🟣 SaaS SuperAdmin / Site Owner (Firebase Auth)
  const [adminUser, setAdminUser] = useState(null);
  
  // 🟢 End Customer / Booker (MongoDB Auth)
  const [clientUser, setClientUser] = useState(null);
  
  const [loading, setLoading] = useState(true);
  
  const googleProvider = new GoogleAuthProvider();

  // -------------------------------------------------------------
  // 🔑 ১. Firebase Admin Auth (Site Owner / Super Admin)
  // -------------------------------------------------------------
  const signUpWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signUpWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const loginAdminWithFirebase = async (email, password) => {
    try {
      const adminCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = adminCredential.user;
      
      const adminData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName || 'Site Admin'
      };

      localStorage.setItem('admin_token', await user.getIdToken());
      localStorage.setItem('admin_user', JSON.stringify(adminData));
      
      setAdminUser(adminData);
      return { success: true, role: 'admin' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logOutAdmin = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Admin logout error:", err);
    } finally {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      setAdminUser(null);
    }
  };

  // -------------------------------------------------------------
  // 🟢 ২. MongoDB Client Auth (End Customer / Booking User)
  // -------------------------------------------------------------
  const loginClientWithMongoDB = async (email, password) => {
    try {
      const response = await fetch('http://localhost:4000/api/login', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('client_token', data.token);
        localStorage.setItem('client_user', JSON.stringify(data.user));

        setClientUser(data.user);
        return { success: true, role: 'client' };
      } else {
        return { success: false, message: data.message || 'Invalid email or password' };
      }
    } catch (err) {
      console.error("MongoDB connection error:", err);
      return { 
        success: false, 
        message: `Backend server unreachable (${err.message})` 
      };
    }
  };

  const logOutClient = () => {
    localStorage.removeItem('client_token');
    localStorage.removeItem('client_user');
    setClientUser(null);
  };

  // -------------------------------------------------------------
  // 🚀 ৩. স্মার্ট কম্বাইন্ড লগইন (যা আপনার Login.jsx খুঁজছে!)
  // -------------------------------------------------------------
  const loginWithEmailAndPassword = async (email, password) => {
    // ১. প্রথমে Firebase Admin হিসেবে চেষ্টা করব
    const adminRes = await loginAdminWithFirebase(email, password);
    if (adminRes.success) {
      return { success: true, role: 'admin' };
    }

    // ২. অ্যাডমিন হিসেবে না মিললে MongoDB Client হিসেবে চেষ্টা করব
    const clientRes = await loginClientWithMongoDB(email, password);
    if (clientRes.success) {
      return { success: true, role: 'client' };
    }

    // ৩. কোনোটাতেই না মিললে এরর মেসেজ দেবো
    return { 
      success: false, 
      message: clientRes.message || 'Invalid email or password' 
    };
  };

  // -------------------------------------------------------------
  // 🔄 ৪. সেশন ডিটেকশন ও রিলোড ম্যানেজমেন্ট
  // -------------------------------------------------------------
  useEffect(() => {
    // A. LocalStorage থেকে মঙ্গোডিবি ক্লায়েন্ট লোড
    const savedClient = localStorage.getItem('client_user');
    if (savedClient) {
      try {
        setClientUser(JSON.parse(savedClient));
      } catch (e) {
        localStorage.removeItem('client_user');
      }
    }

    // B. Firebase অন-অথ স্টেট চেঞ্জার (শুধুমাত্র অ্যাডমিনের জন্য)
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const adminData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || 'Site Admin'
        };
        setAdminUser(adminData);
      } else {
        setAdminUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    adminUser,
    clientUser,
    loading,
    signUpWithEmail,
    signUpWithGoogle,
    loginAdminWithFirebase,
    loginClientWithMongoDB,
    loginWithEmailAndPassword, // 👈 এটি এক্সপোর্ট করা হলো
    logOutAdmin,
    logOutClient
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};