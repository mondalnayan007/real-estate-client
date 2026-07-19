import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, HelpCircle } from 'lucide-react';

const NotFound = () => {
  // ভাসমান ছোট ছোট কণার (Particles) জন্য অ্যানিমেশন কনফিগারেশন
  const floatingAnimation = (delay) => ({
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }
  });

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden px-4 select-none">
      
      {/* ব্যাকগ্রাউন্ড প্রিমিয়াম গ্লো/লাইট এফেক্ট */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ব্যাকগ্রাউন্ডের ভাসমান কণা (Floating Particles) */}
      <motion.div animate={floatingAnimation(0)} className="absolute top-20 left-10% bg-gradient-to-r from-blue-500 to-indigo-500 w-3 h-3 rounded-full opacity-30 blur-[1px]" />
      <motion.div animate={floatingAnimation(1.5)} className="absolute bottom-32 left-1/4 bg-indigo-400 w-4 h-4 rounded-full opacity-20 blur-[1px]" />
      <motion.div animate={floatingAnimation(0.7)} className="absolute top-1/3 right-1/4 bg-cyan-400 w-2 h-2 rounded-full opacity-40" />

      {/* মেইন কন্টেইনার বোতাম এবং টেক্সট */}
      <div className="text-center z-10 max-w-2xl">
        
        {/* ৪MD/404 নাম্বার অ্যানিমেশন */}
        <div className="relative inline-block">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[12rem] md:text-[16rem] font-extrabold font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-500/30 leading-none select-none"
          >
            404
          </motion.h1>

          {/* 404 এর ওপর ভাসমান চমৎকার একটি গ্লাস-মরফিক পপআপ */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-8 bg-slate-900/80 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-full shadow-2xl flex items-center gap-2 text-xs text-indigo-400 font-medium"
          >
            <HelpCircle size={14} className="animate-spin-[spin_3s_linear_infinite]" />
            <span>Lost in Space?</span>
          </motion.div>
        </div>

        {/* টেক্সট মেসেজ সেকশন */}
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-2xl md:text-3xl font-semibold text-slate-200 mt-4 tracking-wide"
        >
          Oops! Page Not Found
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-slate-400 mt-3 text-sm md:text-base max-w-md mx-auto leading-relaxed"
        >
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </motion.p>

        {/* অ্যাকশন বাটনসমূহ (Premium Hover Interactions) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* মেইন হোম বাটন (গ্লোয়িং এফেক্ট) */}
          <button 
            onClick={() => window.location.href = '/'}
            className="group relative px-6 py-3 w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] transition-all duration-300 transform active:scale-95 overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Home size={18} className="group-hover:-translate-y-0.5 transition-transform" />
            <span>Back to Home</span>
          </button>

          {/* গো ব্যাক বাটন (বর্ডার লাইটিং এফেক্ট) */}
          <button 
            onClick={() => window.history.back()}
            className="group px-6 py-3 w-full sm:w-auto bg-slate-900 text-slate-300 font-medium rounded-xl border border-slate-800 hover:border-slate-700 hover:text-white flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-95 backdrop-blur-sm"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Go Back</span>
          </button>
        </motion.div>

      </div>

      {/* নিচের দিকে প্রিমিয়াম ফুটার ব্র্যান্ডিং */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-6 text-xs text-slate-600 font-mono tracking-widest"
      >
        POWERED BY PRIMESTATE ENGINE
      </motion.div>
      
    </div>
  );
};

export default NotFound;