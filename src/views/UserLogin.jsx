import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Building2 } from 'lucide-react';

export default function UserLogin() {
  const [activeRole, setActiveRole] = useState('buyer'); // 'buyer' | 'seller' | 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Destructure exactly what we created in AuthContext
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmission = (e) => {
    e.preventDefault();
    setError('');

    // Calling the exact hook context method safely
    const res = loginUser(email, password, activeRole);
    
    if (res.success) {
      if (res.isAdmin) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/');
      }
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md bg-slate-900 border border-slate-800/80 p-8 rounded-3xl shadow-2xl relative z-10">
        <div className="flex items-center gap-2 text-xl justify-center text-white mb-6 cursor-pointer" onClick={() => navigate('/')}>
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center"><Building2 size={16} /></div>
          <span className="font-sans font-bold">Prime</span>Estates
        </div>

        <h2 className="text-2xl font-bold text-center text-white mb-2">Access Portal Gateway</h2>
        <p className="text-xs text-slate-400 text-center mb-6">Select your profile identity role tier.</p>

        {/* Tab Selection Switches */}
        <div className="grid grid-cols-3 p-1 bg-slate-950 border border-slate-800 rounded-xl mb-6">
          {['buyer', 'seller', 'admin'].map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => {
                setActiveRole(role);
                setError('');
                if (role === 'admin') {
                  setEmail('admin@primeestates.com');
                } else {
                  setEmail('');
                }
              }}
              className={`py-2 text-xs font-semibold rounded-lg capitalize transition-all duration-200 ${
                activeRole === role ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {error && <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl mb-4 leading-relaxed">{error}</div>}

        <form onSubmit={handleFormSubmission} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Registered Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="email" 
                required 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-blue-500 outline-none transition" 
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Security Key</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="password" 
                required 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-blue-500 outline-none transition" 
              />
            </div>
          </div>

          <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition mt-2 shadow-lg shadow-blue-600/10">
            Sign In As {activeRole}
          </button>
        </form>

        <p className="text-xs text-slate-400 text-center mt-6">
          New to the portfolio? <Link to="/signup" className="text-blue-400 hover:underline font-medium">Register profile</Link>
        </p>
      </div>
    </div>
  );
}