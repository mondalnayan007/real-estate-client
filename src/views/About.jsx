import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, Award, Users, ShieldCheck, 
  CheckCircle2, ArrowRight, Sparkles, HeartHandshake, Home
} from 'lucide-react';
import AgentContext from '../context/AgentContext';

export default function About() {
  // Safe Access to Context User / Agent Data
  const contextValue = useContext(AgentContext);
  const user = contextValue?.user;

  // Key Statistics
  const stats = [
    { id: 1, label: 'Completed Projects', value: '120+', icon: Building2 },
    { id: 2, label: 'Happy Families', value: '1,500+', icon: Users },
    { id: 3, label: 'Years Experience', value: '12+', icon: Award },
    { id: 4, label: 'Verified Properties', value: '100%', icon: ShieldCheck },
  ];

  // Core Values Data
  const values = [
    {
      title: 'Uncompromised Quality',
      desc: 'We construct and deal in properties that meet international architectural and safety standards.',
      icon: Sparkles
    },
    {
      title: 'Complete Transparency',
      desc: 'No hidden legal hassle or charges. Every paper is legal and verified by real estate legal experts.',
      icon: ShieldCheck
    },
    {
      title: 'Client-Centric Approach',
      desc: 'Your dream home is our priority. We tailor solutions that match your budget and lifestyle.',
      icon: HeartHandshake
    },
    {
      title: 'Prime Locations',
      desc: 'All our residential and commercial projects are located in top prime hubs across Dhaka.',
      icon: Home
    }
  ];

  return (
    <div className="min-h-screen bg-[#f4f7f6] text-gray-900 select-none">
      
      {/* 🚀 1. Hero Section */}
      <section className="relative bg-[#007b57] text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-emerald-800/60 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-600/30"
          >
            <Sparkles size={14} /> Who We Are
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white max-w-3xl mx-auto leading-tight"
          >
            Building Trust & Creating Modern Living Spaces in Dhaka
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-emerald-100/90 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-normal"
          >
            {user?.agentName 
              ? `Welcome to ${user.agentName}'s official portal. Dedicated to providing premium real estate solutions and luxury properties.` 
              : 'The Premium Homes Ltd. is a premier property solution provider in Bangladesh, dedicated to constructing sustainable, secure, and modern spaces for your family.'}
          </motion.p>
        </div>
      </section>

      {/* 📊 2. Stats Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-200/60 flex flex-col items-center text-center group hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#007b57] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Icon size={22} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{stat.value}</h3>
                <p className="text-xs font-semibold text-gray-500 mt-1">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 🏙️ 3. Mission & Vision Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Image Collage */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-gray-200 h-80 sm:h-96">
              <img 
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80" 
                alt="Modern Real Estate Architecture" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-[#007b57] text-white p-5 rounded-2xl shadow-xl flex items-center gap-4 max-w-xs border-2 border-white">
              <span className="text-3xl font-black text-amber-300">12+</span>
              <p className="text-xs font-medium leading-snug">Years of Excellence in Real Estate & Development</p>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-5"
          >
            <span className="text-xs font-bold text-[#007b57] uppercase tracking-wider bg-emerald-50 px-3 py-1.5 rounded-lg">
              Our Legacy
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
              We Craft Spaces Where Innovation Meets Comfortable Living
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-normal">
              Over the last decade, living standards in Dhaka have evolved rapidly. We are proud to be at the forefront of this transformation, providing safe, eco-friendly, and architectural masterclass properties in prime locations like Gulshan, Banani, and Uttara.
            </p>

            <ul className="space-y-3 pt-2">
              {[
                'Legal authenticity and 100% verified documentation',
                'Modern rooftop gardens & eco-friendly architecture',
                'Prime connectivity near top hospitals, schools & hubs'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-gray-800">
                  <CheckCircle2 size={18} className="text-[#007b57] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#007b57] hover:bg-[#004d34] text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                Contact Our Advisors <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 💡 4. Core Values Grid */}
      <section className="bg-white py-16 border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#007b57] uppercase tracking-wider bg-emerald-50 px-3 py-1.5 rounded-lg">
              Why Choose Us
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
              Our Core Guiding Principles
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-2">
              We operate on trust, safety, and providing high investment returns for our buyers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="bg-[#f4f7f6] p-6 rounded-2xl border border-gray-200/50 hover:border-[#007b57]/40 transition-all hover:bg-white hover:shadow-md group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white text-[#007b57] flex items-center justify-center mb-4 shadow-sm group-hover:bg-[#007b57] group-hover:text-white transition-colors">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed font-normal">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 🎁 5. CTA Consultation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-gradient-to-r from-[#004d34] to-[#007b57] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg relative overflow-hidden">
          <div className="space-y-3 text-center md:text-left z-10 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold">Ready to Find Your Next Luxury Home?</h3>
            <p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed">
              Book a free real estate consultation with our expert team today and explore verified listings in Dhaka.
            </p>
          </div>
          
          <div className="z-10 shrink-0">
            <Link 
              to="/contact" 
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-gray-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              Get Free Consultation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}