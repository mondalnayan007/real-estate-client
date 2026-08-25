import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';



const Register = () => {
  const { signUpWithEmail, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 📸 ছবি সিলেক্ট ও প্রিভিউ
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

// 🚀 Email & Password Sign-Up (Firebase + Backend Integration)
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (formData.password !== formData.confirmPassword) {
    return setError('Passwords do not match!');
  }
  if (formData.password.length < 6) {
    return setError('Password must be at least 6 characters.');
  }

  setLoading(true);

  try {
    // Step ১: Firebase-এ ইউজার অ্যাকাউন্ট তৈরি
    const userCredential = await signUpWithEmail(formData.email, formData.password);
    const firebaseUser = userCredential.user;
    console.log(firebaseUser);

    // 🟢 সমাধান ১: Firebase Auth State সেটেল হওয়ার জন্য ১ সেকেন্ড ওয়েট করা
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 🟢 সমাধান ২: forceRefresh = true সহ Fresh Token নেওয়া
    const token = await firebaseUser.getIdToken(true);

    // Step ২: Form Data এবং Firebase Token ব্যাকএন্ডে পাঠানোর প্রস্তুতি
    const data = new FormData();
    data.append('firstName', formData.firstName);
    data.append('lastName', formData.lastName);
    data.append('email', formData.email);
    data.append('uid', firebaseUser.uid);
    if (formData.image) {
      data.append('image', formData.image);
    }

    // Step ৩: ব্যাকএন্ড API-তে সেভ করার রিকোয়েস্ট
    const response = await fetch('http://localhost:4000/api/agents/register', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: data,
    });

    const resData = await response.json();

    if (response.ok && resData.success) {
      navigate('/');
    } else {
      // ব্যাকএন্ডে ফেইল করলে Firebase অ্যাকাউন্ট রোলব্যাক
      await firebaseUser.delete();
      setError(resData.message || 'Database registration failed.');
    }

  } catch (err) {
    console.error('Registration Error:', err);
    setError(err.message || 'Registration failed. Try again.');
  } finally {
    setLoading(false);
  }
};

// 🌐 Google Sign-Up (একই Register API ব্যবহার করে)
const handleGoogleRegister = async () => {
  setError('');
  setLoading(true);

  try {
    const result = await signInWithGoogle();
    const user = result.user;
    console.log(user.uid);

    // Firebase state sync এর জন্য ১ সেকেন্ড ওয়েট
    await new Promise((resolve) => setTimeout(resolve, 1000));

   

    // Google Sign-In এর নাম Split করে First & Last Name বের করা
    const nameParts = (user.displayName || '').split(' ');
    const firstName = nameParts[0] || 'Agent';
    const lastName = nameParts.slice(1).join(' ') || '';

    // একই /api/agents/register API-তে রিকোয়েস্ট পাঠানো
    const response = await fetch('http://localhost:4000/api/agents/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Google-এর জন্য JSON পাঠাচ্ছি
        
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email: user.email,
        uid: user.uid,
        avatar: user.photoURL, // Google এর প্রোফাইল ছবি
        authProvider: 'google'
      })
    });

    const resData = await response.json();

    if (response.ok && resData.success) {
      navigate('/');
    } else {
      setError(resData.message || 'Google sign-in registration failed.');
    }
  } catch (err) {
    console.error('Google Register Error:', err);
    setError(err.message || 'Google registration failed!');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 space-y-6">
        
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-800">Create Account</h2>
          <p className="text-sm text-slate-500">Sign up with your details</p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Photo Upload */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-20 h-20 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 overflow-hidden group hover:border-emerald-500 transition-all">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[10px] text-slate-400 font-medium text-center">Upload Photo</span>
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">First Name</label>
            <input type="text" name="firstName" required placeholder="John Doe" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 transition-all" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name</label>
            <input type="text" name="lastName" required placeholder="John Doe" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 transition-all" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
            <input type="email" name="email" required placeholder="name@example.com" value={formData.email} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 transition-all" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <input type="password" name="password" required placeholder="••••••••" value={formData.password} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password</label>
              <input type="password" name="confirmPassword" required placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 transition-all" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all text-sm disabled:opacity-50">
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-slate-200 w-full"></div>
          <span className="bg-white px-3 text-xs text-slate-400 font-semibold absolute">OR</span>
        </div>

        <button type="button" onClick={handleGoogleRegister} disabled={loading} className="w-full flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold py-3 rounded-xl text-sm transition-all">
          <span>Sign up with Google</span>
        </button>

        <p className="text-center text-xs text-slate-500">
          Already have an account? <Link to="/login" className="text-emerald-600 font-semibold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;