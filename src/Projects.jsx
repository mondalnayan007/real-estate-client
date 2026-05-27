import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, BedDouble, Bath, Maximize2, ArrowUpRight } from 'lucide-react';

const categories = ['All Properties', 'Luxury Villas', 'Penthouses', 'Modern Mansions'];

const premiumProjects = [
  { id: 1, category: 'Penthouses', tag: 'Exclusive', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80', title: 'The Obsidian Penthouse', location: 'Fifth Ave, New York', price: '$4,850,000', beds: 3, baths: 3.5, sqft: '3,200 sqft' },
  { id: 2, category: 'Luxury Villas', tag: 'New Launch', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80', title: 'Serene Woods Estate', location: 'Austin, Texas', price: '$6,200,000', beds: 5, baths: 6, sqft: '6,800 sqft' },
  { id: 3, category: 'Penthouses', tag: 'Selling Fast', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80', title: 'Azure Coast Condos', location: 'Brickell, Miami', price: '$2,920,000', beds: 2, baths: 2, sqft: '1,950 sqft' },
  { id: 4, category: 'Modern Mansions', tag: 'Limited', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80', title: 'The Luminary Mansion', location: 'Beverly Hills, CA', price: '$12,500,000', beds: 6, baths: 8, sqft: '10,400 sqft' },
  { id: 5, category: 'Luxury Villas', tag: 'Exclusive', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80', title: 'Aura Vista Villa', location: 'Malibu, California', price: '$8,900,000', beds: 4, baths: 5, sqft: '5,200 sqft' },
  { id: 6, category: 'Modern Mansions', tag: 'New Build', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80', title: 'Minimalist Monolith', location: 'Aspen, Colorado', price: '$7,400,000', beds: 4, baths: 4.5, sqft: '4,600 sqft' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // Slightly adjusted for snappy, smooth scroll reveal
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.97 }, // Clean initial state for scrolling into view
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 55, damping: 14 } 
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

export default function Projects() {
  const [activeTab, setActiveTab] = useState('All Properties');

  const filteredProjects = activeTab === 'All Properties'
    ? premiumProjects
    : premiumProjects.filter(project => project.category === activeTab);

  return (
    <section className="py-24 bg-slate-950 text-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }} // Triggers scroll animation exactly on view entry
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
            Architectural <span className="font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-200">Masterpieces</span>
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
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 border ${
                activeTab === tab 
                  ? 'border-blue-500 text-white' 
                  : 'border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-blue-600 rounded-full -z-10 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Dynamic Animated Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }} // Perfectly captures item cascade on scroll entry
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((item) => (
              <motion.div
                key={item.id}
                layout
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className="group bg-slate-900 border border-slate-800/60 rounded-3xl overflow-hidden shadow-2xl relative"
              >
                {/* Image Container with Luxury Overlay */}
                <div className="relative overflow-hidden h-72">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 opacity-80" />
                  
                  {/* Status Badge */}
                  <span className="absolute top-4 left-4 z-20 bg-slate-950/80 backdrop-blur-md text-blue-400 border border-blue-500/30 text-xs font-semibold px-3 py-1.5 rounded-full tracking-wider uppercase">
                    {item.tag}
                  </span>

                  {/* High Quality Scale-up effect */}
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 cubic-bezier(0.25, 1, 0.5, 1) group-hover:scale-110"
                  />

                  {/* Dark Glass Accent Button Appearance on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="p-4 bg-white/10 rounded-full border border-white/20 shadow-xl backdrop-blur-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <ArrowUpRight className="text-white h-6 w-6" />
                    </div>
                  </div>
                </div>

                {/* Info Text Area */}
                <div className="p-8 relative">
                  <span className="text-xs text-blue-400 uppercase tracking-widest font-semibold block mb-2">{item.category}</span>
                  <h3 className="text-2xl font-semibold text-slate-100 tracking-tight mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 flex items-center gap-1.5 text-sm font-light mb-6">
                    <MapPin size={15} className="text-slate-500"/> {item.location}
                  </p>
                  
                  {/* Luxury Layout Separator */}
                  <div className="w-full h-[1px] bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 mb-5" />

                  {/* Specifications & Pricing */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 text-xs tracking-wide text-slate-400">
                      <span className="flex items-center gap-1.5"><BedDouble size={16} className="text-slate-500"/> {item.beds} B</span>
                      <span className="flex items-center gap-1.5"><Bath size={16} className="text-slate-500"/> {item.baths} B</span>
                      <span className="flex items-center gap-1.5"><Maximize2 size={14} className="text-slate-500"/> {item.sqft}</span>
                    </div>
                  </div>
                  
                  {/* Subtle Floating Price Tag */}
                  <div className="mt-5 pt-4 border-t border-slate-800/40 flex justify-between items-center">
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Investment Value</span>
                    <span className="text-xl font-bold text-white bg-clip-text tracking-tight">{item.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}