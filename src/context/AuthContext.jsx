import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('pe_user');
    const storedAdminToken = localStorage.getItem('pe_admin_auth');

    if (storedAdminToken === 'true') {
      setIsAdmin(true);
      setCurrentUser({ email: 'admin@primeestates.com', role: 'admin', name: 'Admin Desk', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' });
    } else if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const loginUser = (email, password, role) => {
    // Special master control override check
    if (role === 'admin') {
      if (email === 'admin@primeestates.com' && password === 'luxury2026') {
        setIsAdmin(true);
        const adminData = { email, role: 'admin', name: 'Admin Desk', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' };
        setCurrentUser(adminData);
        localStorage.setItem('pe_admin_auth', 'true');
        return { success: true, isAdmin: true };
      }
      return { success: false, error: 'Access denied. Security token mismatch.' };
    }

    const database = JSON.parse(localStorage.getItem('pe_users_db') || '[]');
    const match = database.find(u => u.email === email && u.password === password && u.role === role);
    
    if (match) {
      const userData = { 
        name: match.name, 
        email: match.email, 
        role: match.role,
        avatar: match.role === 'seller' 
          ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
      };
      setCurrentUser(userData);
      localStorage.setItem('pe_user', JSON.stringify(userData));
      return { success: true, isAdmin: false };
    }
    return { success: false, error: `Invalid credentials for the selected ${role} registry panel.` };
  };

  const registerUser = (userData) => {
    const database = JSON.parse(localStorage.getItem('pe_users_db') || '[]');
    if (database.some(user => user.email === userData.email) || userData.email === 'admin@primeestates.com') {
      return { success: false, error: 'This email is already registered.' };
    }
    
    database.push(userData);
    localStorage.setItem('pe_users_db', JSON.stringify(database));
    
    const sessionData = {
      name: userData.name,
      email: userData.email,
      role: userData.role,
      avatar: userData.role === 'seller' 
        ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
    };
    
    setCurrentUser(sessionData);
    localStorage.setItem('pe_user', JSON.stringify(sessionData));
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    localStorage.removeItem('pe_user');
    localStorage.removeItem('pe_admin_auth');
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAdmin, loading, loginUser, registerUser, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);