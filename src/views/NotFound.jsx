import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ShieldAlert } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* প্রফেশনাল অ্যাম্বিয়েন্ট লাইট/গ্লো (Subtle Radial Background Glow) */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[160px] pointer-events-none" />

      {/* মেইন কন্টেন্ট এরিয়া */}
      <div className="max-w-xl w-full text-center z-10">
        
        {/* ৪MD স্ট্যাটাস ব্যাজ */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 border border-slate-800 rounded-full text-xs font-medium tracking-wider text-slate-400 uppercase mb-8 shadow-inner"
        >
          <ShieldAlert size={14} className="text-indigo-400" />
          <span>Error Code: 404 / Route Unresolved</span>
        </motion.div>

        {/* মিনিমালিস্টিক ৪MD বিগ টাইপোগ্রাফি */}
        <div className="relative mb-6">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[9rem] md:text-[12rem] font-bold tracking-tighter leading-none bg-gradient-to-b from-white via-slate-200 to-slate-800/20 bg-clip-text text-transparent select-none font-mono"
          >
            404
          </motion.h1>
        </div>

        {/* হেডিং ও সাবটাইটেল */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-3"
        >
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-100">
            Requested property or page missing.
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            The link you followed may be broken, or the page has been permanently relocated within our architecture database.
          </p>
        </motion.div>

        {/* প্রফেশনাল অ্যাকশন বাটনসমূহ */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          {/* মেইন ড্যাশবোর্ড বাটন */}
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full sm:w-auto px-6 py-3 bg-white text-slate-950 font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-all duration-200 shadow-lg shadow-white/5 active:scale-[0.98]"
          >
            <span>Return to Dashboard</span>
            <ArrowUpRight size={16} />
          </button>

          {/* গো ব্যাক বাটন */}
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-slate-300 font-medium rounded-xl border border-slate-800/80 hover:border-slate-700 hover:text-white flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]"
          >
            <ArrowLeft size={16} />
            <span>Go Back</span>
          </button>
        </motion.div>
      </div>

      {/* বটম গ্রিড লাইন টেক্সচার (ফুটার পার্ট) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row justify-between items-center gap-2 border-t border-slate-900 pt-4 text-[10px] font-mono tracking-widest text-slate-600 uppercase"
      >
        <span>Secure Infrastructure Layer</span>
        <span>© 2026 PrimeState Engine</span>
      </motion.div>
      
    </div>
  );
};

export default NotFound;