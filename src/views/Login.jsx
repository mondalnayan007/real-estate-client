import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle, Home, Eye, EyeOff, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext'; // 👈 আপনার Context-এর সঠিক পাথ নিশ্চিত করুন
import AgentContext from '../context/AgentContext';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {user} = useContext(AgentContext);
  console.log(user);
  
  const { loginWithEmailAndPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await loginWithEmailAndPassword(formData.email, formData.password);

    if (result.success) {
      if (result.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(result.message || 'Login failed!');
    }
    setLoading(false);
  };

  return (
    // Google Font 'Inter' প্রয়োগ করা হয়েছে পুরো কন্টেইনারে
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-slate-50 font-['Inter',sans-serif] selection:bg-emerald-500 selection:text-white relative overflow-hidden">
      
      {/* Home Navigation Button */}
      <Link 
        to="/" 
        className="absolute top-6 right-6 z-30 flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#007b57] transition-all duration-300 bg-white/80 hover:bg-white backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
      >
        <Home size={15} />
        <span>Back to Home</span>
      </Link>

      {/* LEFT SIDE: Premium Green Branding Section */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-[#005f43] via-[#007b57] to-[#004d37] text-white p-8 lg:p-16 flex flex-col justify-center items-center text-center relative overflow-hidden min-h-[360px] md:min-h-screen">
        
        {/* Glow Effects & Background Decoration */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-md space-y-8 z-10 animate-fade-in">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-semibold tracking-wide uppercase shadow-inner">
            <Sparkles size={14} className="text-emerald-300" />
            <span>Exclusive Access</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-sm">
              Welcome to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-white">
                {user.agencyName}
              </span>
            </h1>
            <p className="text-sm lg:text-base text-emerald-100/90 font-normal leading-relaxed max-w-sm mx-auto">
              Access your personalized dashboard to effortlessly manage your properties and investments.
            </p>
          </div>

          {/* Feature List Cards (Glassmorphism) */}
          <div className="pt-2 space-y-3.5 text-left max-w-sm mx-auto">
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 transition-all duration-300 hover:bg-white/15 hover:translate-x-1">
              <div className="p-2 rounded-xl bg-white/10 text-emerald-300 shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="font-bold text-xs text-white uppercase tracking-wider">Secure Authentication</h4>
                <p className="text-[11px] text-emerald-100/80 mt-0.5">Protected with enterprise-grade encryption</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 transition-all duration-300 hover:bg-white/15 hover:translate-x-1">
              <div className="p-2 rounded-xl bg-white/10 text-emerald-300 shrink-0">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <h4 className="font-bold text-xs text-white uppercase tracking-wider">Seamless Access</h4>
                <p className="text-[11px] text-emerald-100/80 mt-0.5">One-click access to all your property tools</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE: Premium Login Form */}
      <div className="w-full md:w-1/2 p-6 sm:p-12 lg:p-20 flex items-center justify-center bg-white relative">
        
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-50 text-[#007b57] rounded-2xl border border-emerald-100/80 flex items-center justify-center mx-auto shadow-sm mb-3">
              <LogIn size={22} />
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              {user.agencyName} Ltd.
            </h2>
            <p className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
              Login to your account
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="p-4 bg-rose-50/80 border border-rose-100 rounded-2xl flex items-start gap-3 text-rose-600 text-xs font-semibold shadow-sm animate-shake">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-[#007b57] transition-colors" size={18} />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="user@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-50/60 border border-slate-200/90 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-800 font-medium transition-all duration-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#007b57]/10 focus:border-[#007b57] shadow-sm hover:border-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-[#007b57] transition-colors" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-slate-50/60 border border-slate-200/90 rounded-2xl pl-11 pr-11 py-3 text-xs text-slate-800 font-medium transition-all duration-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#007b57]/10 focus:border-[#007b57] shadow-sm hover:border-slate-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer text-slate-600 font-medium select-none">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded-md border-slate-300 text-[#007b57] focus:ring-[#007b57] cursor-pointer transition-all" 
                />
                Remember me
              </label>
              <a href="#" className="font-bold text-[#007b57] hover:text-[#005f43] transition-colors hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-[#007b57] to-[#006245] hover:from-[#006245] hover:to-[#004d37] text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-lg shadow-[#007b57]/20 hover:shadow-xl hover:shadow-[#007b57]/30 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                  Authenticating...
                </span>
              ) : (
                <>
                  <span>Login</span>
                  <LogIn size={16} />
                </>
              )}
            </button>
          </form>

        </div>
      </div>

    </div>
  );
}