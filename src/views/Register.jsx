import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    // ১. পাসওয়ার্ড ম্যাচিং চেক
    if (password !== confirmPassword) {
      return setError("Passwords do not match!");
    }

    // ২. পাসওয়ার্ড লেন্থ চেক
    if (password.length < 6) {
      return setError("Password should be at least 6 characters long.");
    }

    // ৩. ফায়ারবেসের বদলে ফেক/মক লজিক দিয়ে চেক করা
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      
      // টেস্ট করার জন্য একটি ডেমো অ্যালার্ট (চাইলে কমেন্ট করে রাখতে পারেন)
      console.log("Mock Registration Successful for:", email);
      
      // সফল রেজিস্ট্রেশন শেষে সরাসরি আপনার সেই কাঙ্ক্ষিত প্ল্যান সিলেক্ট করার পেজে নিয়ে যাবে
      navigate('/select-plan');
    }, 2000); // ২ সেকেন্ডের একটি ফেক লোডিং ইফেক্ট দেওয়া হয়েছে
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto w-full max-w-md">
        <div className="text-center">
          <Link to="/" className="text-3xl font-black tracking-wider text-blue-600">
            PRIME<span className="text-slate-900">ESTATES</span>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-black tracking-tight text-slate-900">
            Create your agent account <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md ml-1 font-mono">Dev/Mock Mode</span>
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Or{' '}
            <Link to="/login" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
              sign in to your existing account
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto w-full max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 border border-slate-100 sm:rounded-2xl sm:px-10">
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl text-sm text-red-700 font-semibold">
              ⚠️ {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleRegister}>
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Email address
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@agency.com"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Password
              </label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Confirm Password
              </label>
              <input
                required
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                disabled={loading}
                type="submit"
                className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-blue-600/10 transition-all transform active:scale-[0.98] ${
                  loading ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Testing Flow (Loading)...
                  </div>
                ) : (
                  'Register & Continue'
                )}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400 leading-relaxed">
            By registering, you agree to our{' '}
            <a href="#" className="underline hover:text-slate-600">Terms of Service</a> and{' '}
            <a href="#" className="underline hover:text-slate-600">Privacy Policy</a>.
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;