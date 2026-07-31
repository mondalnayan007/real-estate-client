import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ShieldCheck, Award, Briefcase } from 'lucide-react';
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

// ফ্রেমার মোশন অ্যানিমেশন ভেরিয়েন্টস
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
    <section className="py-24 bg-slate-50 text-slate-800 px-6 overflow-hidden relative">
      {/* ব্যাকগ্রাউন্ড গ্লো (ব্র্যান্ড কালার প্রাইমারি টোন) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#185F35]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ========================================== */}
        {/* 🔝 Updated Header Section (Matching Image) */}
        {/* ========================================== */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          {/* Subheading */}
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ color: '#185F35' }}
            className="tracking-[0.3em] text-xs font-mono font-bold uppercase block mb-3"
          >
            MEET OUR TEAM
          </motion.span>
          
          {/* Main Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4"
            style={{ color: '#185F35' }}
          >
            Board of <span className="text-emerald-500 font-extrabold">Leadership</span>
          </motion.h2>

          {/* Description Paragraph */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-sm md:text-base font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Dedicated professionals committed to delivering excellence in every project we undertake.
          </motion.p>

          {/* Bottom Gradient Accent Line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-20 h-[3px] bg-gradient-to-r from-transparent via-[#185F35] to-transparent mx-auto mt-6 rounded-full"
          />
        </div>

        {/* ========================================== */}
        {/* 👥 Team Cards Grid */}
        {/* ========================================== */}
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
              className="group bg-white border border-slate-200/80 hover:border-[#185F35]/40 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#185F35]/10 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Box */}
              <div className="relative h-80 overflow-hidden bg-slate-100">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10 opacity-70 group-hover:opacity-50 transition-opacity duration-300" />
                
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-all duration-[1s] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105"
                />

                <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md border border-slate-200/80 p-2 rounded-xl shadow-sm" style={{ color: '#185F35' }}>
                  <ShieldCheck size={16} />
                </div>
              </div>

              {/* Member Details */}
              <div className="p-6 pt-4 relative flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold block mb-1" style={{ color: '#185F35' }}>
                    {member.role}
                  </span>
                  
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-[#185F35] transition-colors duration-300">
                    {member.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-slate-600 text-[11px] font-mono mt-2 mb-4 bg-slate-100/80 w-max px-2.5 py-1 rounded-md border border-slate-200/60">
                    <Briefcase size={12} style={{ color: '#185F35' }} />
                    <span>{member.specialty}</span>
                  </div>

                  <p className="text-slate-600 text-xs font-light leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>

                {/* Social & Contact Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex gap-2">
                    <a 
                      href={`mailto:${member.email}`} 
                      className="p-2.5 bg-slate-100 hover:bg-[#185F35] text-slate-600 hover:text-white rounded-xl transition-all duration-300 shadow-sm"
                    >
                      <Mail size={14} />
                    </a>
                    <a 
                      href={member.linkedin} 
                      className="p-2.5 bg-slate-100 hover:bg-[#185F35] text-slate-600 hover:text-white rounded-xl transition-all duration-300 shadow-sm"
                    >
                      <LiaLinkedinIn size={14} />
                    </a>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider group-hover:text-slate-600 transition-colors duration-300">
                    Verified Desk
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 border border-slate-200 bg-white/80 backdrop-blur-md rounded-3xl p-6 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-4 justify-between shadow-xl shadow-slate-200/50"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 rounded-2xl border shrink-0" style={{ backgroundColor: '#185F35' + '15', color: '#185F35', borderColor: '#185F35' + '30' }}>
              <Award size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold font-sans tracking-wide text-slate-900">Looking for a bespoke advisory session?</h4>
              <p className="text-xs text-slate-500 font-light mt-0.5">Our private brokers are available 24/7 for tailored consulting.</p>
            </div>
          </div>
          <button 
            style={{ backgroundColor: '#185F35' }}
            className="whitespace-nowrap hover:opacity-90 text-white font-mono text-[11px] font-bold tracking-wider uppercase px-6 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-[#185F35]/25"
          >
            Schedule Call
          </button>
        </motion.div>

      </div>
    </section>
  );
}