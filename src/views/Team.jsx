import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Award, Briefcase, X, ArrowRight } from 'lucide-react';
import { LiaLinkedinIn, LiaFacebookF } from 'react-icons/lia';
import AgentContext from '../context/AgentContext';

// প্রিমিয়াম টিম মেম্বারদের ডাটাবেজ
const teamMembers = [
  {
    id: 1,
    name: 'Seraphina Vance',
    role: 'Chief Executive Officer',
    specialty: 'Bespoke Asset Management',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    bio: 'Over 15 years of transforming luxury real estate portfolios across New York and London. Specializing in high-yield investments for ultra-high-net-worth individuals and corporate funds.',
    linkedin: '#',
    facebook: '#',
    
  },
  {
    id: 2,
    name: 'Alexander Sterling',
    role: 'Managing Director',
    specialty: 'High-Net-Worth Acquisitions',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    bio: 'Specializes in off-market penthouses and coastal estates for private institutional clients. Recognized globally for landmark property developments and private equity structuring.',
    linkedin: '#',
    facebook: '#',
    
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Head of Architectural Design',
    specialty: 'Luxury Structural Curation',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    bio: 'Ensuring every structural asset listed meets our strict aesthetic and structural gold standards. She leads a dedicated team of master architects across European markets.',
    linkedin: '#',
    facebook: '#',
    
  },
  {
    id: 4,
    name: 'Marcus Thorne',
    role: 'Senior Wealth Advisor',
    specialty: 'Real Estate Investment Trust',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    bio: 'Maximizing ROI for private desk investors through calculated, data-driven estate acquisitions. Expert in tax-optimized real estate holdings and estate planning.',
    linkedin: '#',
    facebook: '#',
   
  }
];

export default function Team() {
  // ফুল ডেসক্রিপশন দেখার জন্য সিলেক্টেড মেম্বার স্টেট
  const [selectedMember, setSelectedMember] = useState(null);

const {user} = useContext(AgentContext)
  const [membersData,setMembersData] = useState('');

  useEffect(()=>{
    fetch(`http://localhost:4000/api/admin/team-members?${user?.agentId}`)
    .then(res=>res.json())
    .then(data => setMembersData(data))
  },[])

  console.log(membersData);
  return (
    <section className="py-24 bg-slate-50 text-slate-800 px-6 overflow-hidden relative">
      {/* ব্যাকগ্রাউন্ড গ্লো */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#185F35]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ========================================== */}
        {/* 🔝 Header Section */}
        {/* ========================================== */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ color: '#185F35' }}
            className="tracking-[0.3em] text-xs font-mono font-bold uppercase block mb-3"
          >
            MEET OUR TEAM
          </motion.span>
          
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

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-sm md:text-base font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Dedicated professionals committed to delivering excellence in every project we undertake.
          </motion.p>

          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-20 h-[3px] bg-gradient-to-r from-transparent via-[#185F35] to-transparent mx-auto mt-6 rounded-full"
          />
        </div>

        {/* ========================================== */}
        {/* 👥 Clean Team Cards Grid */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white border border-slate-200/90 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
            >
              {/* Profile Image */}
              <div className="relative h-72 overflow-hidden bg-slate-100 shrink-0">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Specialty Tag */}
                <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center gap-1.5 text-white/90 text-[11px] font-medium backdrop-blur-md bg-black/30 px-3 py-1 rounded-full w-max border border-white/20">
                  <Briefcase size={12} className="text-emerald-400" />
                  <span>{member.specialty}</span>
                </div>
              </div>

              {/* Member Details */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    {member.name}
                  </h3>

                  <p className="text-xs font-semibold uppercase tracking-wider mt-0.5 mb-3" style={{ color: '#185F35' }}>
                    {member.role}
                  </p>

                  {/* 2-line clean description */}
                  <p className="text-slate-600 text-xs font-light leading-relaxed line-clamp-2">
                    {member.bio}
                  </p>

                  {/* Read More Trigger Button */}
                  <button
                    onClick={() => setSelectedMember(member)}
                    className="mt-2 text-xs font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                    style={{ color: '#185F35' }}
                  >
                    Read Full Bio <ArrowRight size={12} />
                  </button>
                </div>

                {/* Social Icons */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    Connect
                  </span>

                  <div className="flex items-center gap-2">
                    
                    <a href={member.facebook} className="p-2 bg-slate-100 hover:bg-[#185F35] text-slate-600 hover:text-white rounded-xl transition-colors duration-200" title="Facebook">
                      <LiaFacebookF size={13} />
                    </a>
                    <a href={member.linkedin} className="p-2 bg-slate-100 hover:bg-[#185F35] text-slate-600 hover:text-white rounded-xl transition-colors duration-200" title="LinkedIn">
                      <LiaLinkedinIn size={13} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================== */}
        {/* 🪟 Full Bio Modal (On Read More Click) */}
        {/* ========================================== */}
        <AnimatePresence>
          {selectedMember && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative border border-slate-100"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full z-10 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>

                {/* Modal Header Image */}
                <div className="relative h-48 bg-slate-100">
                  <img src={selectedMember.img} alt={selectedMember.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6 text-white">
                    <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold block mb-1">
                      {selectedMember.role}
                    </span>
                    <h3 className="text-2xl font-bold">{selectedMember.name}</h3>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-4 bg-slate-100 w-max px-3 py-1 rounded-full border border-slate-200">
                    <Briefcase size={13} style={{ color: '#185F35' }} />
                    <span>Specialty: {selectedMember.specialty}</span>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-light">
                    {selectedMember.bio}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase">Contact Directly</span>
                    <div className="flex items-center gap-2">
                     
                      <a href={selectedMember.facebook} className="p-2.5 bg-slate-100 hover:bg-[#185F35] text-slate-600 hover:text-white rounded-xl transition-colors">
                        <LiaFacebookF size={15} />
                      </a>
                      <a href={selectedMember.linkedin} className="p-2.5 bg-slate-100 hover:bg-[#185F35] text-slate-600 hover:text-white rounded-xl transition-colors">
                        <LiaLinkedinIn size={15} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ========================================== */}
        {/* 📞 Bottom Call To Action */}
        {/* ========================================== */}
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
            className="whitespace-nowrap hover:opacity-90 text-white font-mono text-[11px] font-bold tracking-wider uppercase px-6 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-[#185F35]/25 cursor-pointer"
          >
            Schedule Call
          </button>
        </motion.div>

      </div>
    </section>
  );
}