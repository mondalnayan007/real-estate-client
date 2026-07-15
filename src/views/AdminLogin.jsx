// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { Building2, Lock, Mail, ArrowRight } from 'lucide-react';

// export default function AdminLogin() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
  
//   // Changed loginAdmin to loginUser to match AuthContext properties
//   const { loginUser } = useAuth();
//   const navigate = useNavigate();

//   const handleAdminAuth = (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     setTimeout(() => {
//       // Called loginUser explicitly providing 'admin' as the system role tier
//       const res = loginUser(email, password, 'admin');
//       setIsLoading(false);
      
//       if (res.success) {
//         navigate('/admin/dashboard', { replace: true });
//       } else {
//         setError(res.error);
//       }
//     }, 1200);
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative">
//       <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative z-10">
//         <div className="relative hidden md:flex flex-col justify-between p-12 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80')` }}>
//           <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
//           <div className="relative z-10 flex items-center gap-2 font-bold text-white text-lg cursor-pointer" onClick={() => navigate('/')}>
//             <Building2 className="text-blue-500" size={20} /> PrimeEstates
//           </div>
//           <div className="relative z-10"><h3 className="text-2xl font-serif text-white mb-2">Core Kernel Gateway</h3><p className="text-slate-400 text-xs font-light">Secure master access pipeline for configuration nodes.</p></div>
//           <div className="relative z-10 text-[10px] text-slate-600 font-mono">SECURE ACCESS AREA • AUTH REQUIRED</div>
//         </div>
//         <div className="p-8 sm:p-12 flex flex-col justify-center">
//           <h2 className="text-xl font-bold text-white mb-1">Administrative Terminal</h2>
//           <p className="text-xs text-slate-400 mb-6">Enter platform operational control keys.</p>
//           {error && <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl mb-4">{error}</div>}
//           <form onSubmit={handleAdminAuth} className="space-y-4">
//             <div>
//               <label className="text-xs text-slate-400 font-medium block mb-1">Admin Email</label>
//               <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
//                 <input type="email" required placeholder="admin@primeestates.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-blue-500 outline-none" />
//               </div>
//             </div>
//             <div>
//               <label className="text-xs text-slate-400 font-medium block mb-1">Security Master Key</label>
//               <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
//                 <input type="password" required placeholder="••••••••••••" value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-blue-500 outline-none" />
//               </div>
//             </div>
//             <button type="submit" disabled={isLoading} className="w-full py-3 bg-blue-600 hover:bg-blue-700 font-semibold text-white text-sm rounded-xl transition flex items-center justify-center gap-2 mt-2 shadow-lg shadow-blue-600/15">
//               {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><span>Validate Handshake</span><ArrowRight size={16} /></>}
//             </button>
//           </form>
//           <div className="mt-6 pt-4 border-t border-slate-800/60 text-center text-[11px] text-slate-500">
//             <span className="font-semibold text-blue-400">Master Token:</span> admin@primeestates.com / luxury2026
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }