import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone,  ShieldCheck, Award, Briefcase } from 'lucide-react';
import { LiaLinkedinIn } from 'react-icons/lia';

// প্রিমিয়াম টিম মেম্বারদের ডাটাবেজ
const teamMembers = [
  {
    id: 1,
    name: 'Seraphina Vance',
    role: 'Chief Executive Officer',
    specialty: 'Bespoke Asset Management',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    bio: 'Over 15 years of transforming luxury real estate portfolios across New York and London.',
    linkedin: '#',
    email: 'seraphina@primeestates.com'
  },
  {
    id: 2,
    name: 'Alexander Sterling',
    role: 'Managing Director',
    specialty: 'High-Net-Worth Acquisitions',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    bio: 'Specializes in off-market penthouses and coastal estates for private institutional clients.',
    linkedin: '#',
    email: 'alexander@primeestates.com'
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Head of Architectural Design',
    specialty: 'Luxury Structural Curation',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    bio: 'Ensuring every structural asset listed meets our strict aesthetic and structural gold standards.',
    linkedin: '#',
    email: 'elena@primeestates.com'
  },
  {
    id: 4,
    name: 'Marcus Thorne',
    role: 'Senior Wealth Advisor',
    specialty: 'Real Estate Investment Trust',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    bio: 'Maximizing ROI for private desk investors through calculated, data-driven estate acquisitions.',
    linkedin: '#',
    email: 'marcus@primeestates.com'
  }
];

// ফ্রেমার মোশন অ্যানিমেশন ভেরিয়েন্টস
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 60, damping: 15 } 
  }
};

export default function Team() {
  return (
    <section className="py-28 bg-slate-950 text-white px-6 overflow-hidden relative">
      {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্টস (সিনেমাটিক ফিল) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header সেকশন */}
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue-400 tracking-[0.25em] text-xs font-mono font-bold uppercase block mb-4"
          >
            The Minds Behind The Luxury
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light font-serif tracking-tight mb-6"
          >
            Our Private Desk <span className="font-sans font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-blue-500 tracking-tighter">Experts</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-xl mx-auto text-sm font-light leading-relaxed"
          >
            A curated elite group of real estate visionaries dedicated to bringing you institutional-grade estates and custom portfolios worldwide.
          </motion.p>

          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-16 h-[1px] bg-blue-500/30 mx-auto mt-8"
          />
        </div>

        {/* টিম কার্ডস গ্রিড */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              className="group bg-slate-900/40 border border-slate-900/80 hover:border-slate-800/60 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-3xl flex flex-col justify-between"
            >
              {/* ইমেজ কন্টেইনার উইথ প্রিমিয়াম মাস্ক */}
              <div className="relative h-80 overflow-hidden">
                {/* ইমেজ মাস্কিং এবং ওভারলে */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10 opacity-90 transition-opacity duration-300 group-hover:opacity-85" />
                
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-[1s] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105"
                />

                {/* এক্সক্লুসিভ ব্যাজ */}
                <div className="absolute top-4 right-4 z-20 bg-slate-950/80 backdrop-blur-md border border-slate-800/80 p-2 rounded-xl text-blue-400">
                  <ShieldCheck size={16} />
                </div>
              </div>

              {/* টিম মেম্বার ইনফরমেশন */}
              <div className="p-6 pt-2 relative flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest font-bold block mb-1">
                    {member.role}
                  </span>
                  
                  <h3 className="text-xl font-bold text-slate-100 tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                    {member.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono mt-2 mb-4 bg-slate-950/50 w-max px-2.5 py-1 rounded-md border border-slate-900">
                    <Briefcase size={12} className="text-blue-500/70" />
                    <span>{member.specialty}</span>
                  </div>

                  <p className="text-slate-400 text-xs font-light leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>

                {/* সোশ্যাল ও কন্টাক্ট অ্যাকশনস */}
                <div className="pt-4 border-t border-slate-950 flex items-center justify-between">
                  <div className="flex gap-3">
                    <a 
                      href={`mailto:${member.email}`} 
                      className="p-2.5 bg-slate-950 hover:bg-blue-600/20 border border-slate-900 hover:border-blue-500/40 text-slate-400 hover:text-blue-400 rounded-xl transition-all duration-300"
                    >
                      <Mail size={14} />
                    </a>
                    <a 
                      href={member.linkedin} 
                      className="p-2.5 bg-slate-950 hover:bg-blue-600/20 border border-slate-900 hover:border-blue-500/40 text-slate-400 hover:text-blue-400 rounded-xl transition-all duration-300"
                    >
                      <LiaLinkedinIn size={14} />
                    </a>
                  </div>

                  <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider group-hover:text-slate-400 transition-colors duration-300">
                    Verified Desk
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* নিচের ট্রাস্ট সীল / বাটন */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 border border-slate-900 bg-slate-900/20 backdrop-blur-md rounded-3xl p-6 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-4 justify-between"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400 border border-blue-500/20 shrink-0">
              <Award size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold font-sans tracking-wide">Looking for a bespoke advisory session?</h4>
              <p className="text-xs text-slate-400 font-light mt-0.5">Our private brokers are available 24/7 for tailored consulting.</p>
            </div>
          </div>
          <button className="whitespace-nowrap bg-blue-600 hover:bg-blue-500 text-white font-mono text-[11px] font-bold tracking-wider uppercase px-6 py-3.5 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(37,99,235,0.2)]">
            Schedule Call
          </button>
        </motion.div>

      </div>
    </section>
  );
}