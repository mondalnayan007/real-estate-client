import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

const NotFound = () => {
  // মাউসের পজিশন ট্র্যাক করার জন্য মোশন ভ্যারিয়েবল
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // মাউস মুভমেন্ট হ্যান্ডলার
  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="group min-h-screen bg-[#030712] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans select-none"
    >
      {/* ১. ইন্টারঅ্যাক্টিভ নিওন লাইটিং মাস্ক (মাউস যেখানে যাবে, সেখানে প্রফেশনাল গ্লো তৈরি হবে) */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none transition duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.07),
              transparent 80%
            )
          `,
        }}
      />

      {/* ২. প্রিমিয়াম আর্কিটেকচারাল ডট-গ্রিড ব্যাকগ্রাউন্ড */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] pointer-events-none" />

      {/* মেইন কন্টেন্ট এরিয়া */}
      <div className="max-w-2xl text-center z-10 space-y-8">
        
        {/* ৪MD বিগ রিফ্লেক্টিভ ডিসপ্লে */}
        <div className="relative inline-block">
          {/* টেক্সটের পেছনের সূক্ষ্ম গ্লো */}
          <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full scale-75 pointer-events-none" />
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10rem] md:text-[15rem] font-extrabold tracking-tighter leading-none bg-gradient-to-b from-slate-50 via-slate-200 to-slate-950 bg-clip-text text-transparent font-mono"
          >
            404
          </motion.h1>
        </div>

        {/* টেক্সট মেসেজ গ্রুপ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-3"
        >
          <div className="flex justify-center items-center gap-2 text-xs font-mono tracking-[0.2em] text-indigo-400 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Status: Page Not Found
          </div>
          
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-100">
            Lost in the Architecture.
          </h2>
          
          <p className="text-slate-400 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            The coordinate you requested does not exist within our secure database layer. It may have been relocated or archived.
          </p>
        </motion.div>

        {/* ৩. প্রিমিয়াম বর্ডার-লাইট ইন্টারঅ্যাক্টিভ বাটন */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* গ্লোয়িং বর্ডার ড্যাশবোর্ড বাটন */}
          <button 
            onClick={() => window.location.href = '/'}
            className="relative group/btn overflow-hidden rounded-xl p-[1px] focus:outline-none w-full sm:w-auto shadow-[0_4px_20px_rgba(99,102,241,0.15)]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-300 group-hover/btn:opacity-100" />
            <div className="relative px-6 py-3 bg-slate-950 rounded-[11px] transition-all duration-200 group-hover/btn:bg-transparent text-white group-hover/btn:text-slate-950 font-medium text-sm flex items-center justify-center gap-2">
              <span>Return to Dashboard</span>
            </div>
          </button>

          {/* মিনিমালিস্টিক বর্ডার বাটন */}
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-3 bg-slate-900/40 hover:bg-slate-900/80 text-slate-300 hover:text-white font-medium text-sm rounded-xl border border-slate-800 transition-all duration-200"
          >
            Go Back
          </button>
        </motion.div>
      </div>

      {/* সাইড ডেটা ডেকোরেশন (Tech Aesthetics) */}
      <div className="absolute bottom-6 left-6 font-mono text-[10px] text-slate-600 tracking-wider hidden md:block">
        SYS.ERR // 0x404_NULL
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[10px] text-slate-600 tracking-wider hidden md:block">
        © 2026 PRIMESTATE ENGINE
      </div>
      
    </div>
  );
};

export default NotFound;