// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { User, Mail, Lock, Building2, Shield, DollarSign, Award, ArrowRight } from 'lucide-react';

// export default function UserSignup() {
//   const [activeRole, setActiveRole] = useState('buyer'); // 'buyer' | 'seller' | 'admin'
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
  
//   // Custom Dynamic Input States
//   const [budget, setBudget] = useState('');
//   const [propertyType, setPropertyType] = useState('Penthouse');
//   const [company, setCompany] = useState('');
//   const [licenseNumber, setLicenseNumber] = useState('');
  
//   const [error, setError] = useState('');
//   const { registerUser } = useAuth();
//   const navigate = useNavigate();

//   const handleSignup = (e) => {
//     e.preventDefault();
//     setError('');

//     if (activeRole === 'admin') {
//       setError('Administrative master profiles cannot be generated client-side. Use the preset secure keys.');
//       return;
//     }

//     const baseData = { name, email, password, role: activeRole };
//     const extendedData = activeRole === 'buyer' 
//       ? { ...baseData, budget, preferredType: propertyType }
//       : { ...baseData, company, license: licenseNumber };

//     const res = registerUser(extendedData);
//     if (res.success) {
//       navigate('/');
//     } else {
//       setError(res.error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative">
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      
//       <div className="w-full max-w-lg bg-slate-900 border border-slate-800/80 p-8 rounded-3xl shadow-2xl relative z-10">
//         <div className="flex items-center gap-2 text-xl justify-center text-white mb-6 cursor-pointer" onClick={() => navigate('/')}>
//           <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center"><Building2 size={16} /></div>
//           <span className="font-sans font-bold">Prime</span>Estates
//         </div>

//         <h2 className="text-2xl font-bold text-center text-white mb-2">Create Registry Account</h2>
//         <p className="text-xs text-slate-400 text-center mb-6">Select your portfolio identity path below.</p>

//         {/* Dynamic Identity Role Tabs Selection */}
//         <div className="grid grid-cols-3 p-1 bg-slate-950 border border-slate-800 rounded-xl mb-6">
//           {['buyer', 'seller', 'admin'].map((role) => (
//             <button
//               key={role}
//               type="button"
//               onClick={() => setActiveRole(role)}
//               className={`py-2 text-xs font-semibold rounded-lg capitalize transition-all duration-200 ${
//                 activeRole === role ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
//               }`}
//             >
//               {role}
//             </button>
//           ))}
//         </div>

//         {error && <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl mb-4 leading-relaxed">{error}</div>}

//         {activeRole === 'admin' ? (
//           <div className="py-8 text-center bg-slate-950/40 border border-slate-800/50 rounded-2xl p-6">
//             <Shield className="text-blue-500 mx-auto mb-3 animate-pulse" size={32} />
//             <h4 className="text-sm font-semibold text-slate-200 mb-1">Administrative Gateway Restriction</h4>
//             <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed mb-4">
//               Master administrative nodes cannot be created publicly. Proceed directly to the authentication portal.
//             </p>
//             <Link to="/admin/login" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-blue-400 text-xs font-mono font-bold rounded-xl transition">
//               <span>Go to Admin Portal</span><ArrowRight size={12} />
//             </Link>
//           </div>
//         ) : (
//           <form onSubmit={handleSignup} className="space-y-4">
//             <div>
//               <label className="text-xs text-slate-400 font-medium block mb-1">Full Name</label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
//                 <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-blue-500 outline-none transition" />
//               </div>
//             </div>

//             <div>
//               <label className="text-xs text-slate-400 font-medium block mb-1">Email Address</label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
//                 <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-blue-500 outline-none transition" />
//               </div>
//             </div>

//             {/* DYNAMIC ROLE FIELDS COMPONENT PORTALS */}
//             {activeRole === 'buyer' && (
//               <div className="grid grid-cols-2 gap-4 animate-fadeIn">
//                 <div>
//                   <label className="text-xs text-slate-400 font-medium block mb-1">Investment Budget</label>
//                   <div className="relative">
//                     <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
//                     <input type="text" placeholder="e.g. $5M+" value={budget} onChange={e => setBudget(e.target.value)} required className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-blue-500 outline-none transition" />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="text-xs text-slate-400 font-medium block mb-1">Preferred Architecture</label>
//                   <select value={propertyType} onChange={e => setPropertyType(e.target.value)} className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-blue-500 outline-none transition appearance-none">
//                     <option value="Penthouse">Penthouse</option>
//                     <option value="Luxury Villa">Luxury Villa</option>
//                     <option value="Modern Mansion">Modern Mansion</option>
//                   </select>
//                 </div>
//               </div>
//             )}

//             {activeRole === 'seller' && (
//               <div className="grid grid-cols-2 gap-4 animate-fadeIn">
//                 <div>
//                   <label className="text-xs text-slate-400 font-medium block mb-1">Agency / Company Name</label>
//                   <div className="relative">
//                     <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
//                     <input type="text" placeholder="e.g. Prestige Corp" value={company} onChange={e => setCompany(e.target.value)} required className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-blue-500 outline-none transition" />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="text-xs text-slate-400 font-medium block mb-1">Broker License Code</label>
//                   <div className="relative">
//                     <Award className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
//                     <input type="text" placeholder="e.g. RE-9824X" value={licenseNumber} onChange={e => setLicenseNumber(e.target.value)} required className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-blue-500 outline-none transition" />
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div>
//               <label className="text-xs text-slate-400 font-medium block mb-1">Security Password</label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
//                 <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-blue-500 outline-none transition" />
//               </div>
//             </div>

//             <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition mt-2 shadow-lg shadow-blue-600/10">
//               Create Account Portfolio
//             </button>
//           </form>
//         )}

//         <p className="text-xs text-slate-400 text-center mt-6">
//           Already verified? <Link to="/login" className="text-blue-400 hover:underline font-medium">Sign In</Link>
//         </p>
//       </div>
//     </div>
//   );
// }