import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Compass, RotateCcw, ArrowRight, Layers } from 'lucide-react';

const NotFound = () => {
  // মাউস ট্র্যাকিং এর মাধ্যমে ৩ডি প্যারালাক্স বা টিল্ট এফেক্ট তৈরি
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // মাউসের পজিশন অনুযায়ী কত ডিগ্রি ঘুরবে তার ম্যাপিং
  const rotateX = useTransform(y, [-300, 300], [15, -15]);
  const rotateY = useTransform(x, [-300, 300], [-15, 15]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div 
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen bg-[#070a13] text-white flex flex-col lg:flex-row items-center justify-center p-6 md:p-12 gap-12 overflow-hidden font-sans select-none relative"
    >
      {/* ব্যাকগ্রাউন্ড সাইবার গ্রিড লাইন এফেক্ট */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* বাম পাশ: থ্রিডি আর্কিটেকচারাল ব্লুপ্রিন্ট কার্ড (ইউনিক আর্ট) */}
      <div className="flex-1 max-w-md w-full flex justify-center perspective-1000">
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          className="relative w-80 h-96 md:w-96 md:h-[420px] bg-slate-900/40 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 shadow-[0_0_50px_rgba(30,58,138,0.2)] flex flex-col justify-between overflow-hidden group cursor-grab active:cursor-grabbing"
        >
          {/* গ্লোয়িং নিয়ন স্ক্যানার লাইন যা অনবরত উপর নিচে নামবে */}
          <motion.div 
            animate={{ translateY: [-20, 420] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)] z-20 pointer-events-none"
          />

          {/* টপ মেটাডাটা */}
          <div className="flex justify-between items-center border-b border-slate-800 pb-4 text-xs font-mono text-slate-500">
            <span className="flex items-center gap-1"><Layers size={12} className="text-cyan-400" /> SYSTEM_ERROR_LOG</span>
            <span>REV_04</span>
          </div>

          {/* মাঝখানের বড় ইন্টারঅ্যাক্টিভ এলিমেন্ট */}
          <div className="flex-1 flex flex-col items-center justify-center relative" style={{ transform: "translateZ(50px)" }}>
            {/* ব্যাকগ্রাউন্ডের বড় অস্পষ্ট ৪MD */}
            <h2 className="absolute text-[9rem] font-black font-mono tracking-widest text-blue-950/40 select-none">404</h2>
            
            {/* ব্লুপ্রিন্ট কম্পাস লোগো */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 border border-dashed border-cyan-500/30 rounded-full flex items-center justify-center relative p-2"
            >
              <div className="absolute inset-0 border border-blue-500/20 rounded-full animate-ping-[ping_3s_linear_infinite]" />
              <Compass size={40} className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
            </motion.div>

            <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400/70">Structure Collapse</span>
          </div>

          {/* বটম ইনফো */}
          <div className="border-t border-slate-800 pt-4 font-mono text-[11px] text-slate-400 flex justify-between">
            <span>COORD: 40.404.04</span>
            <span className="text-amber-500/80">PAGE_NOT_FOUND</span>
          </div>
        </motion.div>
      </div>

      {/* ডান পাশ: প্রিমিয়াম টাইপোগ্রাফি এবং অ্যাকশন বাটন */}
      <div className="flex-1 max-w-xl text-center lg:text-left z-10">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-mono mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>ERROR: PLOT NOT FOUND</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 leading-tight">
            This Location Hasn't Been Built Yet.
          </h1>

          <p className="text-slate-400 mt-4 text-base md:text-lg leading-relaxed max-w-md lg:mx-0 mx-auto">
            The blueprint for this URL doesn’t exist in our architecture database. Let's redirect you back to solid ground.
          </p>
        </motion.div>

        {/* ইন্টারঅ্যাক্টিভ প্রিমিয়াম বাটনসমূহ */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
        >
          {/* রিবিল্ড/হোম বাটন */}
          <button 
            onClick={() => window.location.href = '/'}
            className="group px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(34,211,238,0.2)] hover:shadow-[0_0_35px_rgba(34,211,238,0.4)] transition-all duration-300 transform active:scale-95"
          >
            <span>Return to Dashboard</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* রিলোড/গো ব্যাক বাটন */}
          <button 
            onClick={() => window.history.back()}
            className="group px-6 py-3 bg-slate-900/60 text-slate-300 hover:text-white font-medium rounded-xl border border-slate-800 hover:border-slate-700 flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-95 backdrop-blur-md"
          >
            <RotateCcw size={16} className="group-hover:rotate-45 transition-transform" />
            <span>Previous Step</span>
          </button>
        </motion.div>
      </div>

      {/* ডাইনামিক ওয়াটারমার্ক কোণায় */}
      <div className="absolute bottom-6 right-6 text-[10px] font-mono text-slate-700 tracking-widest hidden md:block">
        SYS.LOC // LAT_40.4 // LON_0.0
      </div>
    </div>
  );
};

export default NotFound;