import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Compass, Eye, ArrowUpRight, Award, Building2, Users2 } from 'lucide-react';

const stats = [
  { id: 1, value: '$4.2B+', label: 'Asset Portfolio', icon: Award },
  { id: 2, value: '120+', label: 'Luxury Estates', icon: Building2 },
  { id: 3, value: '98%', label: 'Retention Rate', icon: Users2 },
];

const values = [
  {
    icon: Compass,
    title: 'Curated Heritage',
    description: 'We do not just list properties; we source architectural legacies that offer both historical substance and long-term financial security.'
  },
  {
    icon: ShieldCheck,
    title: 'The Sovereign Desk',
    description: 'An elite, high-touch private advisory service meticulously tailored for high-net-worth individuals and family offices worldwide.'
  },
  {
    icon: Eye,
    title: 'Visionary Aesthetics',
    description: 'Every penthouse, villa, and mansion undergoes a rigorous, multi-tiered structural and aesthetic gold-standard inspection.'
  }
];

export default function About() {
  return (
    <section className="py-28 bg-slate-950 text-white px-6 overflow-hidden relative">
      {/* ব্যাকগ্রাউন্ড রিচ গ্লো ইফেক্টস */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ================= HERO SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-32">
          
          {/* বাম পাশের টেক্সট কন্টেন্ট */}
          <div className="lg:col-span-7">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-blue-400 tracking-[0.3em] text-xs font-mono font-bold uppercase block mb-4"
            >
              The Prime Estates Legacy
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light font-serif tracking-tight mb-6 leading-tight"
            >
              Redefining Institutional <br />
              <span className="font-sans font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-blue-500 tracking-tighter">
                Grade Real Estate
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-sm md:text-base font-light leading-relaxed mb-8 max-w-2xl"
            >
              Founded in 2026, Prime Estates operates at the intersection of elite architectural design and calculated wealth preservation. We cater exclusively to individuals who view real estate not just as physical space, but as a monumental asset class.
            </motion.p>

            {/* সিগনেচার বা কোট */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="border-l-2 border-blue-500 pl-4 py-1 italic text-slate-300 text-sm font-mono tracking-wide"
            >
              "Architecture is the ultimate repository of wealth and human legacy."
            </motion.div>
          </div>

          {/* ডান পাশের প্রিমিয়াম ইমেজ মাস্ক */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            className="lg:col-span-5 relative h-[450px] group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[3rem] blur-xl opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
            <div className="w-full h-full rounded-[3.5rem] overflow-hidden border border-slate-900 shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 opacity-70" />
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" 
                alt="Luxury Estate Architecture" 
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
              />
            </div>
          </motion.div>

        </div>

        {/* ================= STATS SECTION ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {stats.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 60, damping: 15, delay: i * 0.1 }}
                className="bg-slate-900/30 border border-slate-900 p-8 rounded-3xl backdrop-blur-xl flex items-center justify-between group hover:border-slate-800/80 transition-colors duration-300"
              >
                <div>
                  <h4 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                    {stat.value}
                  </h4>
                  <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mt-2">
                    {stat.label}
                  </p>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-900 rounded-2xl text-blue-500/70 group-hover:text-blue-400 transition-colors duration-300">
                  <IconComponent size={24} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ================= CORE VALUES SECTION ================= */}
        <div>
          <div className="text-center mb-20">
            <span className="text-blue-400 tracking-[0.25em] text-xs font-mono font-bold uppercase block mb-3">
              Operational Standards
            </span>
            <h3 className="text-3xl md:text-4xl font-light font-serif tracking-tight">
              Our Sovereign <span className="font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-blue-500">Principles</span>
            </h3>
            <div className="w-12 h-[1px] bg-blue-500/30 mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, i) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -6 }}
                  className="bg-slate-900/20 border border-slate-900/60 hover:border-slate-800/60 p-8 rounded-[2.5rem] flex flex-col justify-between backdrop-blur-3xl transition-all duration-300"
                >
                  <div>
                    <div className="p-3.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-2xl w-max mb-6">
                      <IconComponent size={20} />
                    </div>
                    <h4 className="text-xl font-bold tracking-tight text-slate-200 mb-3">
                      {value.title}
                    </h4>
                    <p className="text-slate-400 text-xs font-light leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                  
                  <div className="mt-8 pt-4 border-t border-slate-950/50 flex items-center gap-2 text-[11px] font-mono text-slate-600 hover:text-blue-400 transition-colors duration-300 cursor-pointer group/link">
                    <span>Read Charter</span>
                    <ArrowUpRight size={12} className="transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}