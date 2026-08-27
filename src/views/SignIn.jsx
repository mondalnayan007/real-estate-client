import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';



const SignIn = () => {
  const { signInWithEmail, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ইনপুট চেঞ্জ হ্যান্ডেলার
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🚀 Email & Password Login Process
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Step ১: Firebase Auth এর মাধ্যমে লগইন
      const userCredential = await signInWithEmail(formData.email, formData.password);
      const user = userCredential.user;

      if (user) {
        // সফলভাবে লগইন হলে হোম পেজে রিডাইরেক্ট
        navigate('/');
      }
    } catch (err) {
      console.error('Login Error:', err);
      // Firebase এর সাধারণ এরর মেসেজ হ্যান্ডলিং
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password. Please try again.');
      } else {
        setError(err.message || 'Failed to login. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  // 🌐 Google Sign-In Process
  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await signInWithGoogle();
      const user = result.user;

      if (user) {
        // গুগল দিয়ে সফলভাবে লগইন হলে সরাসরি হোম পেজে রিডাইরেক্ট
        navigate('/');
      }
    } catch (err) {
      console.error('Google Login Error:', err);
      setError(err.message || 'Google sign-in failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 space-y-6">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-800">Welcome Back</h2>
          <p className="text-sm text-slate-500">Please enter your details to sign in</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
            <input 
              type="email" 
              name="email" 
              required 
              placeholder="name@example.com" 
              value={formData.email} 
              onChange={handleChange} 
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 transition-all" 
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-slate-700">Password</label>
              <a href="#" className="text-[11px] text-emerald-600 font-semibold hover:underline">Forgot password?</a>
            </div>
            <input 
              type="password" 
              name="password" 
              required 
              placeholder="••••••••" 
              value={formData.password} 
              onChange={handleChange} 
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 transition-all" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all text-sm disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-slate-200 w-full"></div>
          <span className="bg-white px-3 text-xs text-slate-400 font-semibold absolute">OR</span>
        </div>

        {/* Google Sign-In Button */}
        <button 
          type="button" 
          onClick={handleGoogleLogin} 
          disabled={loading} 
          className="w-full flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold py-3 rounded-xl text-sm transition-all"
        >
          <span>Sign in with Google</span>
        </button>

        {/* Navigation to Register */}
        <p className="text-center text-xs text-slate-500">
          Don't have an account? <Link to="/register" className="text-emerald-600 font-semibold hover:underline">Create Account</Link>
        </p>

      </div>
    </div>
  );
};

export default SignIn;