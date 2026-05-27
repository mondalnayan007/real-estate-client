import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, ArrowRight } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="py-12 bg-slate-950 text-white px-6 overflow-hidden relative">
      
      {/* Premium Ambient Background Glow Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Structural Framing Lines */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-slate-900 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-slate-900 to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        
        {/* Animated Badge Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[10px] font-bold tracking-[0.2em] uppercase rounded-md mb-6"
        >
          <Sparkles size={11} className="animate-pulse text-blue-400" /> Private Dispatch
        </motion.div>

        {/* Heading Sequence */}
        <motion.h2 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-light font-serif tracking-tight leading-none mb-6"
        >
          Stay Apprised of <span className="font-sans font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-blue-500 tracking-tighter">Prime Acquisitions.</span>
        </motion.h2>

        {/* Subtitle Paragraph Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-slate-400 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Subscribe to our private briefing ledger for off-market luxury summaries, institutional real estate insights, and portfolio asset notifications directly to your terminal.
        </motion.p>

        {/* Premium Form Element Block Wrapper */}
        <motion.form 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 50 }}
          className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto bg-slate-900/40 p-2 rounded-2xl border border-slate-900 backdrop-blur-xl shadow-2xl focus-within:border-blue-500/30 transition-all duration-500" 
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Input Box Framework Container */}
          <div className="relative flex-1 flex items-center">
            <Mail size={18} className="absolute left-4 text-slate-500 pointer-events-none group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full bg-transparent pl-12 pr-4 py-3 rounded-xl text-slate-100 text-sm placeholder-slate-500 outline-none border border-transparent focus:border-transparent focus:ring-0"
              required
            />
          </div>

          {/* Luxury Interactive Submission Trigger */}
          <motion.button 
            type="submit" 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-sans text-xs font-bold tracking-widest uppercase px-6 py-3.5 rounded-xl transition-all duration-300 whitespace-nowrap shadow-[0_4px_20px_rgba(37,99,235,0.2)] flex items-center justify-center gap-2"
          >
            <span>Subscribe Now</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </motion.form>

        {/* Subtle Low-Contrast Assurance Note */}
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="block text-[10px] font-mono text-slate-600 uppercase tracking-wider mt-4"
        >
          Zero Spurious Distractions • Revoke Transmission Instantly At Any Time
        </motion.span>
      </div>
    </section>
  );
}