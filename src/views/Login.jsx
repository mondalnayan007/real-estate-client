import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle, Home, ShieldCheck } from 'lucide-react';
import { AuthContext } from '../context/AuthContext'; // 👈 আপনার Context-এর সঠিক পাথ দিন

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#007b57] transition-colors bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/80 shadow-sm"
      >
        <Home size={15} />
        <span>Back to Home</span>
      </Link>

      <div className="bg-white border border-slate-100 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-slate-200/60 space-y-6 z-10">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-emerald-50 text-[#007b57] rounded-2xl border border-emerald-100 flex items-center justify-center mx-auto shadow-sm">
            <ShieldCheck size={26} />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Portal Access</h2>
          <p className="text-xs font-medium text-slate-500 max-w-[280px] mx-auto leading-relaxed">
            Sign in with your Client or Admin credentials to access your dashboard.
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-2.5 text-rose-600 text-xs font-semibold">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span className="leading-snug">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 text-slate-400" size={18} />
              <input
                type="email"
                name="email"
                required
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#007b57]/20 focus:border-[#007b57] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 text-slate-400" size={18} />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#007b57]/20 focus:border-[#007b57] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#007b57] hover:bg-[#006245] active:scale-[0.99] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? "Authenticating..." : (
              <>
                <LogIn size={16} /> Sign In
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}