import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Home, Smile } from 'lucide-react';

const NotFound = () => {
  const [clickCount, setClickCount] = useState(0);

  // ইট বা অবজেক্টের ওপর মাউস নিলে যে ফানি কাঁপুনির অ্যানিমেশন হবে
  const wobbleAnimation = {
    hover: {
      rotate: [0, -10, 10, -10, 10, 0],
      scale: 1.1,
      transition: { duration: 0.5 }
    },
    tap: { scale: 0.9 }
  };

  const handleFunnyClick = () => {
    setClickCount(prev => prev + 1);
  };

  // ক্লিক কাউন্টের ওপর ভিত্তি করে ফানি মেসেজ চেঞ্জ করা
  const getFunnyMessage = () => {
    if (clickCount === 0) return "Hey! Don't just stare, click the broken block!";
    if (clickCount < 3) return "Ouch! Stop hitting the architecture!";
    if (clickCount < 6) return "Fine! Keep breaking my website! 😤";
    return "Okay, you won. Go home now, please! 🏳️";
  };

  return (
    <div className="min-h-screen bg-[#feebd0] text-[#1f1a12] flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden select-none">
      
      {/* ব্যাকগ্রাউন্ডে মজার কিছু কার্টুনিশ ফ্লোটিং সার্কেল */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#fcd5a5] rounded-full opacity-50 blur-xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-44 h-44 bg-[#fcd5a5] rounded-full opacity-60 blur-xl pointer-events-none" />

      {/* মেইন ফানি ইলাস্ট্রেশন এরিয়া */}
      <div className="text-center max-w-xl z-10 flex flex-col items-center">
        
        {/* ৪MD / broken block অ্যানিমেশন এরিয়া */}
        <div className="flex items-center justify-center gap-2 md:gap-4 relative mb-6">
          
          {/* প্রথম সংখ্যা 4 */}
          <h1 className="text-[7rem] md:text-[10rem] font-black text-[#e76f51] leading-none">4</h1>
          
          {/* মাঝখানের জিরোটা হচ্ছে একটি ভাঙা ইটের ব্লক যা নড়াচড়া করবে */}
          <motion.div
            variants={wobbleAnimation}
            whileHover="hover"
            whileTap="tap"
            onClick={handleFunnyClick}
            className="w-24 h-24 md:w-32 md:h-32 bg-[#f4a261] rounded-2xl border-4 border-[#1f1a12] shadow-[8px_8px_0px_#1f1a12] flex items-center justify-center cursor-pointer relative"
          >
            {/* ইটের ভেতরের চোখ দুটো (চোখ পিটপিট করবে) */}
            <div className="flex gap-4">
              <motion.div 
                animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-3 h-4 bg-[#1f1a12] rounded-full origin-center"
              />
              <motion.div 
                animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-3 h-4 bg-[#1f1a12] rounded-full origin-center"
              />
            </div>
            
            {/* ভাঙা ইটের ফাটল (কার্টুন স্টাইল) */}
            <div className="absolute top-0 right-4 w-1 h-6 bg-[#1f1a12] rotate-12" />
            <div className="absolute -bottom-2 right-8 bg-[#feebd0] border-t-4 border-l-4 border-r-4 border-[#1f1a12] px-2 text-[10px] font-bold rounded-t-md">
              BRICK
            </div>
          </motion.div>
          
          {/* শেষ সংখ্যা 4 */}
          <h1 className="text-[7rem] md:text-[10rem] font-black text-[#e76f51] leading-none">4</h1>
        </div>

        {/* ইন্টারঅ্যাক্টিভ স্পিচ বাবল (Speech Bubble) */}
        <motion.div 
          key={clickCount}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white border-4 border-[#1f1a12] px-6 py-3 rounded-2xl shadow-[5px_5px_0px_#1f1a12] text-sm md:text-base font-bold text-[#264653] relative mb-8 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[10px] after:border-transparent after:border-t-white before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-[14px] before:border-transparent before:border-t-[#1f1a12] before:-z-10"
        >
          {getFunnyMessage()}
        </motion.div>

        {/* টেক্সট মেসেজ */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#264653]">
          Someone stole this plot! 🛠️
        </h2>
        <p className="text-[#5c5549] mt-3 text-sm md:text-base font-medium max-w-sm leading-relaxed">
          Our agents are looking for this property, but honestly? It looks like the builder forgot to lay this foundation.
        </p>

        {/* বাটন সেকশন (Bold Cartoon / Neo-brutalism Style) */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center">
          {/* ব্যাক টু হোম */}
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-[#2a9d8f] hover:bg-[#218377] text-white font-bold rounded-xl border-4 border-[#1f1a12] shadow-[4px_4px_0px_#1f1a12] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex items-center justify-center gap-2"
          >
            <Home size={18} />
            <span>Take Me Home</span>
          </button>

          {/* ট্রাই এগেইন বাটন */}
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#e76f51] hover:bg-[#d95d3f] text-white font-bold rounded-xl border-4 border-[#1f1a12] shadow-[4px_4px_0px_#1f1a12] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} className="animate-spin-[spin_4s_linear_infinite]" />
            <span>Try Fixing It</span>
          </button>
        </div>

      </div>

      {/* বটম ফানি নোটিফিকেশন */}
      <div className="absolute bottom-4 text-xs font-mono font-bold text-[#8c8273]">
        NO AGENTS WERE HARMED IN THE MAKING OF THIS ERROR.
      </div>

    </div>
  );
};

export default NotFound;