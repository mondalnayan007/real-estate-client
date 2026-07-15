import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// npm install react-icons (ইন্সটল করা না থাকলে করে নেবেন)
import { FaEnvelope, FaLock, FaUser, FaBuilding, FaWhatsapp, FaGlobe, FaArrowRight, FaCamera } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // বাম পাশের ক্রেডেনশিয়াল স্টেট
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // ডান পাশের ব্র্যান্ড ও ডোমেন স্টেট
  const [agencyName, setAgencyName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [domainType, setDomainType] = useState('subdomain'); 
  const [customUsername, setCustomUsername] = useState(''); 
  const [customDomain, setCustomDomain] = useState('');     

  // গলোবাল স্টেট
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ইমেজ হ্যান্ডলার
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  // গুগল সাইন-আপ হ্যান্ডলার
  const handleGoogleSignUp = async () => {
    setError('');
    try {
      console.log("Initiating Google Sign-Up...");
      // const userCredential = await signUpWithGoogle();
    } catch (err) {
      setError("Google sign up failed. Please try again.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError("Passwords do not match!");
    }
    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    let calculatedDomain = "";
    let cleanSubdomain = "";
    let cleanCustomDomain = "";

    if (domainType === 'subdomain') {
      cleanSubdomain = customUsername.trim().toLowerCase().replace(/\s+/g, '');
      if (!cleanSubdomain) return setError("Please enter a valid subdomain.");
      
      const currentHostname = window.location.hostname; 
      const currentPort = window.location.port;
      if (currentHostname === "localhost" || currentHostname === "127.0.0.1") {
        calculatedDomain = `http://${cleanSubdomain}.localhost${currentPort ? `:${currentPort}` : ''}`;
      } else {
        calculatedDomain = `https://${cleanSubdomain}.${currentHostname}`;
      }
    } else {
      cleanCustomDomain = customDomain.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '');
      if (!cleanCustomDomain) return setError("Please enter a valid custom domain.");
      calculatedDomain = `https://${cleanCustomDomain}`;
    }

    setLoading(true);

    try {
      // ১. ফায়ারবেস অথেনটিকেশন (Firebase Signup)
      const firebaseUid = "MOCK_FIREBASE_UID_" + Math.random().toString(36).substr(2, 9);

      // ২. ব্যাকএন্ড ডাটাবেজে এজেন্টের ইনফরমেশন সেভ করার পেলোড
      const agentPayload = {
        agentId: firebaseUid,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        avatar: imagePreview || "",
        agencyName: agencyName.trim(),
        whatsappNumber: whatsappNumber.trim(),
        domainType: domainType,
        targetDomain: calculatedDomain,
        subdomain: domainType === 'subdomain' ? cleanSubdomain : null,
        customDomain: domainType === 'custom' ? cleanCustomDomain : null,
        paymentStatus: 'pending',
        createdAt: new Date().toISOString()
      };

      console.log("Database Payload Ready:", agentPayload);

      setTimeout(() => {
        setLoading(false);
        alert(`🔥 Register Success!\nRedirecting to Pricing...\nDomain: ${calculatedDomain}`);
        navigate('/', { state: { agentId: firebaseUid, targetDomain: calculatedDomain } });
      }, 1500);

    } catch (err) {
      setError(err.message || "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      
      {/* হেডার / লোগো */}
      <div className="sm:mx-auto w-full max-w-6xl mb-8">
        <div className="flex justify-between items-center border-b border-slate-900 pb-5">
          <Link to="/" className="text-2xl font-black tracking-wider text-blue-500">
            PRIME<span className="text-white">ESTATES</span>
          </Link>
          <p className="text-xs sm:text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-blue-400 hover:text-blue-300 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* মেইন ২-কলামের কন্টেইনার */}
      <div className="sm:mx-auto w-full max-w-6xl">
        
        {error && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-500/50 rounded-xl text-sm text-red-200 font-semibold flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ==========================================================
              LEFT SIDE: User Credentials & Auth (lg:col-span-7)
              ========================================================== */}
          <div className="lg:col-span-7 bg-slate-900/40 border border-slate-900/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                  Credentials & Authentication
                </h3>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2.5 py-1 rounded-full border border-slate-700 uppercase tracking-widest font-mono">Step 1</span>
              </div>

              {/* 📸 ১. সার্কুলার প্রোফাইল ইমেজ সিলেক্টর */}
              <div className="flex flex-col items-center justify-center mb-8">
                <div 
                  onClick={triggerFileSelect}
                  className="relative group h-28 w-28 rounded-full border-2 border-dashed border-slate-700 hover:border-blue-500 bg-slate-950 flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-300 shadow-xl hover:shadow-blue-500/5"
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile Preview" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-500 group-hover:text-blue-400 transition-colors">
                      <FaCamera className="text-2xl mb-1.5" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Add Photo</span>
                    </div>
                  )}
                  {/* হোভার ওভারলে ইফেক্ট */}
                  {imagePreview && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                      <FaCamera className="text-white text-xl" />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <p className="text-[10px] text-slate-500 mt-2">Recommended: Square PNG/JPG up to 5MB</p>
              </div>

              {/* নামসমূহ (First & Last Name) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">First Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500"><FaUser /></span>
                    <input
                      required
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-100"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Last Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500"><FaUser /></span>
                    <input
                      required
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-100"
                    />
                  </div>
                </div>
              </div>

              {/* ইমেল এড্রেস */}
              <div className="mb-4">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500"><FaEnvelope /></span>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-100"
                  />
                </div>
              </div>

              {/* পাসওয়ার্ড ও কনফার্ম পাসওয়ার্ড */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500"><FaLock /></span>
                    <input
                      required
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-100"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500"><FaLock /></span>
                    <input
                      required
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-100"
                    />
                  </div>
                </div>
              </div>

              <div className="relative flex py-2 items-center mb-6">
                <div className="flex-grow border-t border-slate-800/80"></div>
                <span className="flex-shrink mx-4 text-xs font-semibold text-slate-500 uppercase tracking-widest">Or Register Instantly</span>
                <div className="flex-grow border-t border-slate-800/80"></div>
              </div>

              {/* 🎯 গুগলের রিয়েল স্ট্যান্ডার্ড সাইনআপ বাটন */}
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-900 font-bold py-3.5 px-4 rounded-xl transition-all duration-200 text-sm active:scale-[0.99] border border-slate-200 shadow-xl"
              >
                {/* নিখুঁত অফিসিয়াল গুগল কালারড লোগো ভেক্টর */}
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.12-5.136 4.12A5.67 5.67 0 0 1 8.3 12.85a5.67 5.67 0 0 1 5.69-5.67c2.489 0 4.394 1.553 5.166 3.01l3.543-1.462C21.43 6.012 18.112 4 13.99 4c-5.52 0-10 4.48-10 10s4.48 10 10 10c5.3 0 9.63-3.87 9.97-9H12.24Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M23.96 14c.026-.33.04-.663.04-1 0-.337-.014-.67-.04-1H12.24v2H23.96Z"
                  />
                  <path
                    fill="#34A853"
                    d="M13.99 24c4.122 0 7.44-2.012 8.711-4.728l-3.543-1.462c-.772 1.457-2.677 3.01-5.168 3.01-2.617 0-4.488-1.71-5.136-4.12H3.143l-.64 2.647C5.352 22.373 9.3 24 13.99 24Z"
                  />
                  <path
                    fill="#4285F4"
                    d="M13.99 0C9.3 0 5.352 1.627 2.503 4.631l3.28 2.551c.648-2.41 2.519-4.12 5.136-4.12 2.617 0 4.488 1.71 5.136 4.12h5.711c-.34-5.13-4.67-9-9.97-9Z"
                  />
                </svg>
                <span className="font-sans font-medium text-[14px] tracking-wide text-slate-800">Continue with Google</span>
              </button>

            </div>
          </div>

          {/* ==========================================================
              RIGHT SIDE: Brand & Domain Configuration (lg:col-span-5)
              ========================================================== */}
          <div className="lg:col-span-5 bg-slate-900/40 border border-slate-900/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl backdrop-blur-md">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                  Agency Brand & Domain
                </h3>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2.5 py-1 rounded-full border border-slate-700 uppercase tracking-widest font-mono">Step 2</span>
              </div>

              {/* এজেন্সির নাম */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Agency Brand Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500"><FaBuilding /></span>
                  <input
                    required
                    type="text"
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    placeholder="e.g. Apex Realtors"
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-100"
                  />
                </div>
              </div>

              {/* হোয়াটঅ্যাপ নাম্বার */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">WhatsApp Contact</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500"><FaWhatsapp /></span>
                  <input
                    required
                    type="tel"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="e.g. +8801700000000"
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-100"
                  />
                </div>
              </div>

              {/* ডোমেন সেকশন এবং টগল ট্যাব */}
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">Domain Setup</span>
                <div className="grid grid-cols-2 gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => setDomainType('subdomain')}
                    className={`py-2 text-[11px] font-bold rounded-lg transition-all ${
                      domainType === 'subdomain'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Subdomain
                  </button>
                  <button
                    type="button"
                    onClick={() => setDomainType('custom')}
                    className={`py-2 text-[11px] font-bold rounded-lg transition-all ${
                      domainType === 'custom'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Custom Domain
                  </button>
                </div>
              </div>

              {/* কন্ডিশনাল ডোমেন ইনপুট */}
              {domainType === 'subdomain' ? (
                <div className="space-y-1.5 animate-fadeIn">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">Chosen Web URL Name</label>
                  <div className="relative flex items-center">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500"><FaGlobe /></span>
                    <input
                      required={domainType === 'subdomain'}
                      type="text"
                      value={customUsername}
                      onChange={(e) => setCustomUsername(e.target.value)}
                      placeholder="myagency"
                      className="w-full pl-10 pr-32 py-3 bg-slate-950 border border-slate-800 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-100"
                    />
                    <span className="absolute right-2 text-[9px] font-bold text-slate-400 bg-slate-800 px-2 py-1.5 rounded-lg border border-slate-700 pointer-events-none font-mono">
                      .primestate.com
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5 animate-fadeIn">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">Custom Live Domain</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500"><FaGlobe /></span>
                    <input
                      required={domainType === 'custom'}
                      type="text"
                      value={customDomain}
                      onChange={(e) => setCustomDomain(e.target.value)}
                      placeholder="www.myagency.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-100"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* সাবমিশন বাটন */}
            <div className="mt-8 lg:mt-0 pt-6">
              <button
                disabled={loading}
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-all shadow-xl shadow-blue-900/10 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Workspace...
                  </div>
                ) : (
                  <>
                    <span>Register & Choose Plan</span>
                    <FaArrowRight className="text-xs" />
                  </>
                )}
              </button>
              <p className="mt-4 text-[10px] text-center text-slate-500 leading-relaxed">
                Protected by Cloudflare SSL. Your custom brand and settings can be modified anytime in the workspace admin console.
              </p>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Register;