import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, BedDouble, Bath, Maximize2, ArrowUpRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = ['All Properties', 'Luxury Villas', 'Penthouses', 'Modern Mansions'];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 70, damping: 16 } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 20,
    transition: { duration: 0.25, ease: 'easeInOut' } 
  }
};

export default function HomePageProjects() {
  const [premiumProjects, setPremiumProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('All Properties');

  useEffect(() => {
    fetch('/public/data.json')
      .then(res => res.json())
      .then(data => setPremiumProjects(data))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  // ১. প্রথমে ক্যাটাগরি অনুযায়ী ডাটা ফিল্টার করা হচ্ছে
  const filteredProjects = activeTab === 'All Properties'
    ? premiumProjects
    : premiumProjects.filter(project => project.category === activeTab);

  // ২. ফিল্টার করা ডাটা থেকে শুধুমাত্র প্রথম ৬টি কার্ড কেটে নেওয়া হচ্ছে (Home Page Limit)
  const displayedProjects = filteredProjects.slice(0, 6);

  return (
    <section className="py-24 bg-slate-950 text-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-blue-400 tracking-[0.2em] text-xs font-bold uppercase block mb-3"
          >
            Our Portfolio
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-light font-serif tracking-tight mb-4"
          >
            Architectural <span className="font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-blue-500 tracking-tighter">Masterpieces</span>
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-12 h-[1px] bg-blue-500/50 mx-auto"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 border overflow-hidden z-10 ${
                activeTab === tab 
                  ? 'border-transparent text-white' 
                  : 'border-slate-900 bg-slate-900/40 text-slate-400 hover:text-white hover:border-slate-800'
              }`}
            >
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full -z-10 shadow-[0_4px_20px_rgba(37,99,235,0.35)]"
                  transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                />
              )}
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Animated Grid */}
        <motion.div 
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {/* এখানে আমরা filteredProjects এর বদলে স্লাইস করা displayedProjects ম্যাপ করছি */}
            {displayedProjects.map((item) => (
              <motion.div
                key={item.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 100, damping: 18 }}
                className="group bg-slate-900/60 border border-slate-900 hover:border-slate-800/80 rounded-[2rem] overflow-hidden shadow-2xl relative backdrop-blur-3xl"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-72">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 opacity-90" />
                  
                  <span className="absolute top-4 left-4 z-20 bg-slate-950/80 backdrop-blur-md text-blue-400 border border-slate-900 text-[10px] font-mono tracking-widest px-3 py-1.5 rounded-xl uppercase">
                    {item.tag}
                  </span>

                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-[1.2s] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105"
                  />

                  {/* Dark Glass Accent Button */}
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="p-4 bg-slate-900/90 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                      <ArrowUpRight className="text-blue-400 h-5 w-5" />
                    </div>
                  </div>
                </div>

                {/* Info Text Area */}
                <div className="p-7 relative">
                  <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest font-bold block mb-2">{item.category}</span>
                  <h3 className="text-xl font-bold text-slate-100 tracking-tight mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 flex items-center gap-1.5 text-xs font-light mb-5">
                    <MapPin size={13} className="text-slate-500"/> {item.location}
                  </p>
                  
                  <div className="w-full h-[1px] bg-slate-950 mb-5" />

                  {/* Specifications */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 text-[11px] font-mono text-slate-400">
                      <span className="flex items-center gap-1.5"><BedDouble size={14} className="text-slate-600"/> {item.beds} Bed</span>
                      <span className="flex items-center gap-1.5"><Bath size={14} className="text-slate-600"/> {item.baths} Bath</span>
                      <span className="flex items-center gap-1.5"><Maximize2 size={12} className="text-slate-600"/> {item.sqft}</span>
                    </div>
                  </div>
                  
                  {/* Pricing Tag */}
                  <div className="mt-5 pt-4 border-t border-slate-950 flex justify-between items-center">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Investment Value</span>
                    <span className="text-lg font-black text-white tracking-tight">{item.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Explore More Properties CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mt-20"
        >
          <Link 
            to={'/projects'}
            className="group relative inline-flex items-center gap-3 bg-slate-900 hover:bg-blue-600 text-white font-mono text-xs font-bold tracking-[0.15em] uppercase px-10 py-5 rounded-2xl border border-slate-800 hover:border-blue-500 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_35px_rgba(37,99,235,0.25)] hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Explore More Properties</span>
            <Plus size={14} className="text-slate-400 group-hover:text-white group-hover:rotate-90 transition-transform duration-300" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}