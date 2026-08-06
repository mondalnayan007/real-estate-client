import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Building2, Award, Users, ShieldCheck,
  CheckCircle2, ArrowRight, Sparkles, HeartHandshake, Home,
  Star, Landmark
} from 'lucide-react';
import MarqueeComponent from 'react-fast-marquee';
const Marquee = MarqueeComponent.default || MarqueeComponent;
import AgentContext from '../context/AgentContext';




const partners = [
  {
    id: 1,
    name: "Partner 1",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBnX9MgMI2cJuvGXc5M7-fDkRjDPH9dpjr3RS9C15QTNmZAkpJzc_8RyI&s",
  },
  {
    id: 2,
    name: "Partner 2",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt9qZHu5i-6MiwPtZtxKXWsaFAlvotGhJOKND6BV5vxTj2yEJezgJalyU&s=10",
  },
  {
    id: 3,
    name: "Bashundhara Cement",
    logo: "https://images.seeklogo.com/logo-png/51/2/bashundhara-cement-ltd-logo-png_seeklogo-515521.png",
  },
  {
    id: 4,
    name: "Partner 4",
    logo: "https://media.licdn.com/dms/image/v2/D5622AQHZ2Ul987rTbw/feedshare-shrink_800/feedshare-shrink_800/0/1698045754109?e=2147483647&v=beta&t=EjGB6QCcQ8F0rUumlrf73xxiNMXVg6RLtoTDFLPqmJ4",
  },
  {
    id: 5,
    name: "Crown Cement",
    logo: "https://images.seeklogo.com/logo-png/28/1/crown-cement-logo-png_seeklogo-282523.png",
  },
];

const timelineData = [
  {
    year: "2023",
    title: "Foundation",
    description: "Started with a vision to transform urban living",
    badgeColor: "bg-amber-400 text-gray-900",
  },
  {
    year: "2024",
    title: "Smart City Initiative",
    description: "Introduced The Premium Smart City IN Ashulia Model Town",
    badgeColor: "bg-emerald-500 text-white",
  },
  {
    year: "2025",
    title: "40+ Ongoing Projects",
    description: "Reached milestone of 40+ ongoing projects",
    badgeColor: "bg-blue-500 text-white",
  },
  {
    year: "2026",
    title: "52+ Ongoing Projects",
    description: "Reached milestone of 52+ ongoing projects",
    badgeColor: "bg-purple-600 text-white",
  },
];

const values = [
  {
    number: "01",
    title: "Uncompromised Quality",
    desc: "We construct and deal in properties that meet international architectural and safety standards.",
    icon: Sparkles
  },
  {
    number: "02",
    title: "Complete Transparency",
    desc: "No hidden legal hassle or charges. Every paper is legal and verified by real estate legal experts.",
    icon: ShieldCheck
  },
  {
    number: "03",
    title: "Client-Centric Approach",
    desc: "Your dream home is our priority. We tailor solutions that match your budget and lifestyle.",
    icon: HeartHandshake
  },
  {
    number: "04",
    title: "Prime Locations",
    desc: "All our residential and commercial projects are located in top prime hubs across Dhaka.",
    icon: Home
  }
];

export default function About() {
  // Safe Access to Context User / Agent Data
const {user} = useContext(AgentContext);
console.log(user);


  // 📊 Your Custom Stats Data Structure
  const stats = [
    {
      id: 1,
      value: "1200",
      suffix: "+",
      label: "Happy Clients",
      icon: Users,
      bgColor: "bg-white hover:bg-[#E9F0FE]",
      iconBg: "bg-blue-600",
      textColor: "text-slate-800",
      plusColor: "text-emerald-500",
      shadowColor: "shadow-blue-100",
    },
    {
      id: 2,
      value: "4.9",
      suffix: "/5",
      label: "Average Rating",
      icon: Star,
      bgColor: "bg-white hover:bg-[#FBF4E3]",
      iconBg: "bg-amber-500",
      textColor: "text-slate-800",
      plusColor: "text-emerald-600",
      shadowColor: "shadow-amber-100",
    },
    {
      id: 3,
      value: "98",
      suffix: "%",
      label: "Satisfaction Rate",
      icon: CheckCircle2,
      bgColor: "bg-white hover:bg-[#E5F5EC]",
      iconBg: "bg-emerald-600",
      textColor: "text-slate-800",
      plusColor: "text-emerald-600",
      shadowColor: "shadow-emerald-100",
    },
    {
      id: 4,
      value: "52",
      suffix: "+",
      label: "Ongoing Projects",
      icon: Landmark,
      bgColor: "bg-white hover:bg-[#F7E9FF]",
      iconBg: "bg-purple-600",
      textColor: "text-slate-800",
      plusColor: "text-emerald-500",
      shadowColor: "shadow-purple-100",
    },
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
            {user
              ? `Welcome to ${user.agencyName}'s official portal. Dedicated to providing premium real estate solutions and luxury properties.`
              : 'The PrimeEstate is a premier property solution provider in Bangladesh, dedicated to constructing sustainable, secure, and modern spaces for your family.'}
          </motion.p>
        </div>
      </section>

      {/* 📊 2. Your Custom Stats Section */}
      <section className="py-12 px-4 sm:px-6 -mt-28 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className={`group relative p-8 rounded-2xl transition-all duration-300 ease-out 
                  transform hover:scale-105 shadow-xl hover:${item.shadowColor} ${item.bgColor} 
                  flex flex-col items-center justify-center text-center cursor-pointer border border-white/80`}
              >
                {/* 🟢 Icon Square Container (Hover Effect: Rotates & Scales) */}
                <div
                  className={`w-14 h-14 rounded-2xl ${item.iconBg} text-white flex items-center justify-center 
                    shadow-md transition-transform duration-300 ease-out group-hover:rotate-6 group-hover:scale-110 mb-5`}
                >
                  <IconComponent className="w-7 h-7" />
                </div>

                {/* 📊 Counter Value */}
                <h3 className={`text-3xl font-extrabold ${item.textColor} tracking-tight mb-2 flex items-center justify-center gap-1`}>
                  <span>{item.value}</span>
                  <span className={item.plusColor}>{item.suffix}</span>
                </h3>

                {/* 🏷️ Label */}
                <p className="text-sm font-semibold text-slate-500 tracking-wide">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>


      {/* // 🎨 ওয়ার্ম লাইট ও এমারেল্ড গ্রীন থিমের Core Values Section: */}
      <section className="bg-[#f8faf9] py-20 relative overflow-hidden select-none border-y border-emerald-900/10">

        {/* ব্যাকগ্রাউন্ড সফ্ট গ্রাডিয়েন্ট মেকআপ */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

          {/* 🏷️ Header Section */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 text-[#007b57] text-xs font-extrabold uppercase tracking-widest border border-emerald-200/60 shadow-sm">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mt-4 tracking-tight">
              Our Core Guiding Principles
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-3 font-normal leading-relaxed">
              We operate on trust, safety, and providing high investment returns for our valued buyers.
            </p>
          </div>

          {/* 💡 Core Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group relative bg-white p-8 rounded-3xl border border-emerald-100/80 
              shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,123,87,0.12)] 
              hover:border-[#007b57]/40 transition-all duration-300 transform hover:-translate-y-2 
              flex flex-col justify-between overflow-hidden cursor-pointer"
                >
                  {/* ব্যাকগ্রাউন্ডে ফিকে ওয়াটারমার্ক নাম্বার (01, 02...) */}
                  <span className="absolute -top-3 -right-1 text-6xl font-black text-emerald-900/5 group-hover:text-emerald-900/10 transition-colors pointer-events-none">
                    {item.number || `0${idx + 1}`}
                  </span>

                  <div className="relative z-10">
                    {/* 🟢 Icon Box */}
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#007b57] flex items-center justify-center mb-6 
                border border-emerald-100 group-hover:bg-[#007b57] group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm">
                      <Icon size={26} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-extrabold text-gray-900 mb-3 group-hover:text-[#007b57] transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>

                  {/* হোভার করলে নিচের গ্রীন একসেন্ট লাইন বড় হবে */}
                  <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                      Value {item.number}
                    </span>
                    <div className="h-1.5 w-6 bg-emerald-200 rounded-full group-hover:w-16 group-hover:bg-[#007b57] transition-all duration-300" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 🏙️ 3. Mission & Vision Section */}
      <section className="py-20 bg-[#072418] text-white relative overflow-hidden select-none">

        {/* ব্যাকগ্রাউন্ড ব্লোর ইফেক্ট */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#007b57]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* 👈 বাম পাশ: সেকশন টাইটেল ও টেক্সট */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-bold uppercase tracking-widest border border-emerald-700/50">
                Our Evolution
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                Our Journey Through Time
              </h2>

              <p className="text-emerald-100/70 text-sm sm:text-base leading-relaxed font-normal">
                From a visionary beginning to delivering premium township solutions, explore how we continuously break boundaries and expand our legacy across Bangladesh.
              </p>

              {/* কাস্টম হাইলাইট বক্স */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <h4 className="text-amber-400 font-bold text-lg">52+ Active Projects</h4>
                <p className="text-xs text-gray-300 mt-1">Driving innovation in smart city urban developments with complete legal authenticity.</p>
              </div>
            </div>

            {/* 👉 ডান পাশ: রোডম্যাপ ব্যাকগ্রাউন্ড ব্যাকড্রপ ও ভেসে থাকা (Floating) কার্ডসমূহ */}
            <div className="lg:col-span-7 relative">

              {/* রোডম্যাপ / সিটি ব্যাকগ্রাউন্ড কার্ড */}
              <div className="relative rounded-3xl overflow-hidden border border-emerald-800/40 shadow-2xl bg-gradient-to-br from-emerald-950 to-[#041a11] p-6 sm:p-8 min-h-[520px] flex flex-col justify-between">

                {/* কানেক্টিং রোডম্যাপ ডটেড বা সলিড লাইন */}
                <div className="absolute left-8 sm:left-10 top-10 bottom-10 w-1 bg-gradient-to-b from-amber-400 via-emerald-400 to-purple-500 rounded-full opacity-40 z-0" />

                {/* বছর এবং ইভেন্টগুলোর Floating Cards */}
                <div className="space-y-6 relative z-10">
                  {timelineData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 sm:gap-6 group"
                    >
                      {/* ভাসমান ইয়ার ব্যাজ (Year Badge) */}
                      <div className={`shrink-0 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl font-extrabold text-xs sm:text-sm shadow-lg transform group-hover:scale-110 transition-transform ${item.badgeColor}`}>
                        {item.year}
                      </div>

                      {/* ভেসে থাকা গ্লাস কার্ড (Floating Info Box) */}
                      <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/10 p-4 sm:p-5 rounded-2xl shadow-lg hover:bg-white/15 hover:border-emerald-400/40 transition-all duration-300 transform group-hover:-translate-y-1">
                        <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-amber-300 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 font-normal leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      



      <section className="py-16 bg-[#f4f7f6] relative overflow-hidden select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Header Section */}
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#007b57] uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
              Trusted Alliances
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3 tracking-tight">
              Our Partners
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-2">
              We collaborate with industry leaders to deliver construction excellence.
            </p>
          </div>

          {/* Marquee with Side Blurs & Card Layout */}
          <div className="relative w-full overflow-hidden">
            {/* Left Blur Overlay */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#f4f7f6] to-transparent z-10 pointer-events-none" />

            {/* Right Blur Overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#f4f7f6] to-transparent z-10 pointer-events-none" />

            <Marquee pauseOnHover={true} speed={40} gradient={false}>
              <div className="flex items-center gap-6 py-4 pr-6">
                {partners.map((partner) => (
                  <div
                    key={partner.id}
                    className="w-44 h-24 sm:w-52 sm:h-28 bg-white rounded-2xl p-4 flex items-center justify-center 
                shadow-sm hover:shadow-md border border-gray-200/60 hover:border-[#007b57]/40 
                transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
                  >
                    <img
                      className="max-h-16 w-auto max-w-[85%] object-contain filter  opacity-80 group-hover:opacity-100 transition-all duration-300"
                      src={partner.logo}
                      alt={partner.name}
                    />
                  </div>
                ))}
              </div>
            </Marquee>
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