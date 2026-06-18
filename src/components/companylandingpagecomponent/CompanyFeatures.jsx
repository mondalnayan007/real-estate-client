import React from 'react';
import { 
  Zap, Globe, Palette, BarChart3, 
  Gauge, Shield, LayoutDashboard, Sliders, ArrowRight 
} from 'lucide-react';

const CompanyFeatures = () => {
  const features = [
    { 
      icon: <Zap className="text-amber-400" size={22} />, 
      title: 'Instant Site Deployment', 
      desc: 'Your customizable real estate portal goes live the exact second you subscribe. Zero setup overhead.' 
    },
    { 
      icon: <Globe className="text-blue-400" size={22} />, 
      title: 'Custom Domain Mapping', 
      desc: 'Connect your personal domain seamlessly with automated multi-tenant SSL routing and edge hosting.' 
    },
    { 
      icon: <Palette className="text-pink-400" size={22} />, 
      title: 'Visual Branding Engine', 
      desc: 'No code needed. Upload logos, configure typography, and apply corporate theme colors with 1-click.' 
    },
    { 
      icon: <BarChart3 className="text-emerald-400" size={22} />, 
      title: 'Lead Generation Dashboard', 
      desc: 'Track every user inquiry, WhatsApp redirections, phone calls, and capture valuable client logs instantly.' 
    },
    { 
      icon: <Gauge className="text-indigo-400" size={22} />, 
      title: 'Blazing Fast Performance', 
      desc: 'Optimized on Next-Gen Edge networks ensuring your automated portfolio loads under 400ms globally.' 
    },
    { 
      icon: <Shield className="text-rose-400" size={22} />, 
      title: 'Secure Virtual Architecture', 
      desc: 'Dedicated tenant isolation ensuring your dynamic agency inventory and client logs are 100% secure.' 
    }
  ];

  return (
    <section id="features" className="py-28 bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* 🌌 ব্যাকগ্রাউন্ড প্রিমিয়াম গ্লো এফেক্টস */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-rose-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 📢 সেকশন হেডার */}
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-[11px] font-bold text-blue-400 uppercase tracking-widest">
            💎 Enterprise Infrastructure
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none">
            Everything You Need to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-rose-400">Scale Your Agency</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            Supercharge your real estate business, manage agents, and track live conversions with enterprise-grade modular features.
          </p>
        </div>

        {/* 🎚️ ফিচার গ্রিড লেআউট */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* 🔥 ১ নম্বর স্পেশাল লার্জ কার্ড: এজেন্ট ড্যাশবোর্ড ও কমপ্লিট কাস্টমাইজেশন (মোদ্দা আকর্ষণ) */}
          <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/80 p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:border-blue-500/40 transition-all duration-500 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            {/* কার্ডের ভেতরের নিওন গ্লো */}
            <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-gradient-to-bl from-blue-600/10 to-transparent rounded-bl-full pointer-events-none transition-all duration-500 group-hover:scale-110" />
            
            <div className="space-y-4 max-w-2xl relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 mb-2">
                <LayoutDashboard size={26} />
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 uppercase tracking-wider">
                <Sliders size={12} /> Live Site Customizer
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                Complete Agency Control Dashboard
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                আপনার এজেন্টরা কোনো কোডিং জ্ঞান ছাড়াই তাদের ওয়েবসাইটের স্লাইডার, লোগো, ফুটার, মেনু স্ট্রাকচার, সোশ্যাল কন্টাক্ট, এমনকি এফএকিউ (FAQ) ক্যাটাগরি পর্যন্ত সম্পূর্ণ ড্যাশবোর্ড থেকে লাইভ কাস্টমাইজ করতে পারবে। ওয়ান-ক্লিক পাবলিশের মাধ্যমে পুরো ওয়েবসাইট মুহূর্তেই আপডেট হবে।
              </p>
            </div>

            {/* ডানপাশের প্রিমিয়াম ভিজ্যুয়াল বাটন */}
            <div className="shrink-0 relative z-10 w-full md:w-auto">
              <button className="w-full md:w-auto bg-slate-900 border border-slate-800 group-hover:border-blue-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-blue-600 group-hover:shadow-lg group-hover:shadow-blue-500/20">
                Explore Dashboard Demo <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* ⚡ বাকি ৬টি স্ট্যান্ডার্ড প্রিমিয়াম কার্ডের লুপ */}
          {features.map((item, idx) => (
            <div 
              key={idx} 
              className="p-8 rounded-2xl bg-slate-900/40 border border-slate-900 hover:bg-slate-900/90 hover:border-slate-800 hover:shadow-2xl hover:shadow-slate-950/50 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group"
            >
              {/* নিওন বর্ডার হাইলাইটার অন হোভার */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-slate-700 to-transparent group-hover:via-blue-500 transition-all duration-500" />
              
              {/* আইকন বক্স */}
              <div className="w-12 h-12 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-center shadow-inner mb-6 group-hover:border-slate-700 transition-colors">
                {item.icon}
              </div>

              {/* টাইটেল */}
              <h3 className="text-base font-bold text-white mb-2 tracking-tight uppercase group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>

              {/* ডেসক্রিপশন */}
              <p className="text-slate-400 text-xs font-medium leading-relaxed group-hover:text-slate-300 transition-colors">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default CompanyFeatures;