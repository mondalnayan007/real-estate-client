import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { FaEnvelope, FaLock, FaUser, FaArrowRight, FaCamera, FaSpinner } from 'react-icons/fa';

const Register = () => {
  // const { signUpWithEmail, signUpWithGoogle } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // ক্রেডেনশিয়াল স্টেট
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ইমেজ সিলেক্ট হ্যান্ডলার
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ক্লাউডিনারিতে ইমেজ আপলোড করার হেল্পার ফাংশন
  const uploadToCloudinary = async (file) => {
    const cloudName = "your_cloudinary_cloud_name"; // আপনার Cloudinary Cloud Name বসান
    const uploadPreset = "your_unsigned_upload_preset"; // আপনার Unsigned Preset Name বসান
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    });

    if (!res.ok) throw new Error("Cloudinary image upload failed.");
    const data = await res.json();
    return data.secure_url; // ক্লাউডিনারি থেকে প্রাপ্ত ইমেজের ডিরেক্ট লিঙ্ক
  };

  // গুগল সাইন-আপ হ্যান্ডলার
  // const handleGoogleSignUp = async () => {
  //   setError('');
  //   setLoading(true);
  //   try {
  //     const userCredential = await signUpWithGoogle();
  //     const googleUser = userCredential.user;

  //     const nameParts = googleUser.displayName ? googleUser.displayName.split(' ') : ['Google', 'User'];

  //     // গুগল অলরেডি প্রোফাইল পিকচার দেয় (photoURL)। তাই ক্লাউডিনারি আপলোডের প্রয়োজন নেই।
  //     navigate('/setup-workspace', {
  //       state: {
  //         agentId: googleUser.uid,
  //         firstName: nameParts[0],
  //         lastName: nameParts.slice(1).join(' ') || '',
  //         email: googleUser.email,
  //         avatar: googleUser.photoURL || '',
  //         authProvider: 'google'
  //       }
  //     });
  //   } catch (err) {
  //     setError(err.message || "Google Authentication failed.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // ইমেইল-পাসওয়ার্ড সাবমিশন
  // const handleRegisterNext = async (e) => {
  //   e.preventDefault();
  //   setError('');

  //   if (password !== confirmPassword) {
  //     return setError("Passwords do not match!");
  //   }
  //   if (password.length < 6) {
  //     return setError("Password must be at least 6 characters.");
  //   }

  //   setLoading(true);

  //   try {
  //     // ১. ক্লাউডিনারিতে প্রোফাইল ইমেজ আপলোড (যদি ইউজার ইমেজ সিলেক্ট করে থাকে)
  //     let uploadedImageUrl = '';
  //     if (profileImage) {
  //       uploadedImageUrl = await uploadToCloudinary(profileImage);
  //     }

  //     // ২. ফায়ারবেসে অ্যাকাউন্ট ক্রিয়েট
  //     const userCredential = await signUpWithEmail(email, password);
  //     const firebaseUid = userCredential.user.uid;

  //     // ৩. সফলভাবে ডাটা ক্লাউডিনারি ও ফায়ারবেসে যাওয়ার পর স্টেপ ২-তে ট্রান্সফার
  //     navigate('/setup-workspace', {
  //       state: {
  //         agentId: firebaseUid,
  //         firstName: firstName.trim(),
  //         lastName: lastName.trim(),
  //         email: email.trim().toLowerCase(),
  //         avatar: uploadedImageUrl, // ক্লাউডিনারি লাইভ ইমেজ লিঙ্ক ডাটাবেজে স্টোর করার জন্য
  //         authProvider: 'email'
  //       }
  //     });

  //   } catch (err) {
  //     setError(err.message || "Registration failed. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="sm:mx-auto w-full max-w-md mb-8">
        <div className="flex justify-between items-center border-b border-slate-900 pb-5">
          <Link to="/" className="text-2xl font-black tracking-wider text-blue-500">
            PRIME<span className="text-white">ESTATES</span>
          </Link>
          <p className="text-xs text-slate-400">
            Already registered?{' '}
            <Link to="/login" className="font-bold text-blue-400 hover:text-blue-300 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      <div className="sm:mx-auto w-full max-w-md">
        <div className="bg-slate-900/40 border border-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-extrabold text-white">Create Account</h2>
              <p className="text-xs text-slate-500 mt-1">Step 1: Credentials and Avatar</p>
            </div>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2.5 py-1 rounded-full border border-slate-700 uppercase tracking-widest font-mono">Step 1/2</span>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-950/40 border border-red-500/50 rounded-xl text-xs text-red-200 font-semibold">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={''} className="space-y-4">
            
            {/* সার্কুলার ইমেজ সিলেক্টর */}
            <div className="flex flex-col items-center justify-center mb-4">
              <div 
                onClick={() => !loading && fileInputRef.current.click()}
                className="relative group h-24 w-24 rounded-full border-2 border-dashed border-slate-700 hover:border-blue-500 bg-slate-950 flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-300 shadow-lg hover:shadow-blue-500/5"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile Preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-500 group-hover:text-blue-400 transition-colors">
                    <FaCamera className="text-xl mb-1" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Photo</span>
                  </div>
                )}
                {imagePreview && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                    <FaCamera className="text-white text-lg" />
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={loading}
              />
            </div>

            {/* ফার্স্ট ও লাস্ট নেম */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">First Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 text-xs"><FaUser /></span>
                  <input
                    required
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    disabled={loading}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Last Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 text-xs"><FaUser /></span>
                  <input
                    required
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    disabled={loading}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* ইমেল */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 text-xs"><FaEnvelope /></span>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  disabled={loading}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 text-xs"><FaLock /></span>
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={loading}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Confirm Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 text-xs"><FaLock /></span>
                  <input
                    required
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={loading}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin text-sm" />
                  <span>Processing Setup...</span>
                </>
              ) : (
                <>
                  <span>Next Step: Setup Brand</span>
                  <FaArrowRight className="text-xs" />
                </>
              )}
            </button>
          </form>

          <div className="relative flex py-3 items-center">
            <div className="flex-grow border-t border-slate-850"></div>
            <span className="flex-shrink mx-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Or Sign Up with</span>
            <div className="flex-grow border-t border-slate-850"></div>
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={''}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-900 font-bold py-3 px-4 rounded-xl transition-all duration-200 text-sm active:scale-[0.99] border border-slate-200 shadow-sm disabled:opacity-50"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.12-5.136 4.12A5.67 5.67 0 0 1 8.3 12.85a5.67 5.67 0 0 1 5.69-5.67c2.489 0 4.394 1.553 5.166 3.01l3.543-1.462C21.43 6.012 18.112 4 13.99 4c-5.52 0-10 4.48-10 10s4.48 10 10 10c5.3 0 9.63-3.87 9.97-9H12.24Z" />
              <path fill="#FBBC05" d="M23.96 14c.026-.33.04-.663.04-1 0-.337-.014-.67-.04-1H12.24v2H23.96Z" />
              <path fill="#34A853" d="M13.99 24c4.122 0 7.44-2.012 8.711-4.728l-3.543-1.462c-.772 1.457-2.677 3.01-5.168 3.01-2.617 0-4.488-1.71-5.136-4.12H3.143l-.64 2.647C5.352 22.373 9.3 24 13.99 24Z" />
              <path fill="#4285F4" d="M13.99 0C9.3 0 5.352 1.627 2.503 4.631l3.28 2.551c.648-2.41 2.519-4.12 5.136-4.12 2.617 0 4.488 1.71 5.136 4.12h5.711c-.34-5.13-4.67-9-9.97-9Z" />
            </svg>
            <span className="font-sans font-medium text-[14px] text-slate-800">Continue with Google</span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default Register;