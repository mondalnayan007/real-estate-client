import React, { useEffect, useState, useRef } from 'react';
import { Eye, ShieldCheck, Compass, ArrowUpRight } from 'lucide-react';

export default function OurVision() {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.1 });
    
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const corePillars = [
    {
      num: "/01",
      icon: <Eye className="text-blue-500 h-5 w-5 group-hover:scale-110 transition-transform" />,
      title: "Architectural Foresight",
      desc: "Curating generational ultra-luxury penthouses and estates defined by timeless structural design."
    },
    {
      num: "/02",
      icon: <ShieldCheck className="text-blue-500 h-5 w-5 group-hover:scale-110 transition-transform" />,
      title: "Discreet Sovereignty",
      desc: "Uncompromising contractual confidentiality and institutional asset protection protocols."
    },
    {
      num: "/03",
      icon: <Compass className="text-blue-500 h-5 w-5 group-hover:rotate-45 transition-transform duration-500" />,
      title: "Global Coordinates",
      desc: "Strategic elite placements across high-barrier metropolitan districts and coastal strips."
    }
  ];

  return (
    <section 
      id="vision" 
      ref={domRef}
      className="w-full min-h-screen bg-slate-950 text-white py-20 md:py-36 px-4 sm:px-6 md:px-12 overflow-hidden relative select-none"
    >
      {/* Cinematic Ambient Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-12 md:space-y-24">
        
        {/* ================= 🌟 TOP MINIMAL HEADING DECK ================= */}
        <div className={`w-full max-w-4xl space-y-3 md:space-y-4 transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            <span className="text-blue-400 font-mono text-[10px] font-bold tracking-[0.3em] uppercase">
              Corporate Directives
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase leading-none">
            OUR VISION <span className="font-serif font-light text-slate-700 italic lowercase block sm:inline">manifesto</span>
          </h2>
        </div>

        {/* ================= 🔥 BRAND NEW STACKED SPLIT LAYOUT ================= */}
        {/* 🌟 FIX: gap-16 কে মোবাইলের জন্য কমিয়ে gap-8 এবং ডেক্সটপে gap-12/16 করা হয়েছে */}
        <div className="relative w-full flex flex-col md:flex-row gap-8 lg:gap-16 items-start">
          
          {/* LEFT AREA: Sticky Hero Asset Wrapper */}
          <div className={`w-full md:w-5/12 md:sticky md:top-36 space-y-6 md:space-y-8 transition-all duration-[1200ms] delay-300 transform ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className="relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-slate-900 aspect-[4/5] bg-slate-900 shadow-[0_30px_100px_rgba(0,0,0,0.8)] group">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" 
                alt="Luxury Estate Monolith" 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-[1500ms]"
              />
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-20">
                <span className="font-mono text-[9px] tracking-[0.25em] text-blue-400 uppercase font-black">Estates // 2026</span>
                <p className="text-lg md:text-xl font-bold tracking-tight text-white mt-1">Generational Masterpieces</p>
              </div>
            </div>

            <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-light pl-4 border-l border-blue-500/20">
              At PrimeEstates, our blueprint synthesizes ultra-premium spaces that function as private micro-kingdoms for the selective elite.
            </p>
          </div>

          {/* RIGHT AREA: Overlapping Timeline & Immersive Cards */}
          {/* 🌟 FIX: মোবাইলে ভার্টিকাল স্পেসিং কমানোর জন্য space-y-4 এবং ডেক্সটপে space-y-8 */}
          <div className="w-full md:w-7/12 space-y-4 md:space-y-8 relative">
            
            {/* Visual Timeline Connector Line */}
            <div className={`absolute left-8 top-4 bottom-4 w-[1px] bg-gradient-to-b from-blue-500/50 via-slate-900 to-transparent hidden md:block transition-all duration-[2000ms] delay-500 origin-top transform ${
              isVisible ? 'scale-y-100' : 'scale-y-0'
            }`} />

            {corePillars.map((pillar, idx) => (
              <div 
                key={idx} 
                style={{ transitionDelay: `${600 + (idx * 200)}ms` }}
                // 🌟 FIX: মোবাইলের জন্য p-5, md:p-8 এবং md:ml-16 দিয়ে মোবাইল ডিভাইসের গ্যাপ ফিক্স করা হয়েছে
                className={`group relative p-5 md:p-8 bg-slate-900/10 hover:bg-slate-900/40 backdrop-blur-xl border border-slate-950 hover:border-blue-500/20 rounded-2xl md:rounded-3xl transition-all duration-500 flex flex-col sm:flex-row gap-4 md:gap-6 items-start md:ml-16 transform ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
                }`}
              >
                {/* Glow Bullet Point on Timeline */}
                <div className="absolute -left-[53px] top-10 w-2.5 h-2.5 rounded-full bg-slate-950 border border-blue-500 z-20 group-hover:bg-blue-400 group-hover:scale-120 transition-all hidden md:block" />

                {/* Left Mini Column: Number & Icon */}
                {/* 🌟 FIX: মোবাইলে যাতে নিচের গ্যাপ বেশি না নেয়, তাই pb-2 sm:pb-0 এবং gap-3 করা হয়েছে */}
                <div className="flex sm:flex-col justify-between items-center gap-3 shrink-0 w-full sm:w-auto border-b sm:border-b-0 sm:border-r border-slate-900/60 pb-2 sm:pb-0 sm:pr-6">
                  <span className="font-mono text-xs font-black text-slate-600 group-hover:text-blue-500 transition-colors">
                    {pillar.num}
                  </span>
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg md:rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-center group-hover:bg-blue-600/10 group-hover:border-blue-500/20 transition-all">
                    {pillar.icon}
                  </div>
                </div>

                {/* Right Mini Column: Title & Description */}
                <div className="space-y-1 md:space-y-2 flex-1">
                  <h3 className="text-sm md:text-base font-bold text-slate-200 group-hover:text-blue-400 transition-colors tracking-wide">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* Bottom Call to Action Integrated into the Flow */}
            {/* 🌟 FIX: মোবাইলে মার্জিন লেফট রিমুভ করে ডেক্সটপে md:ml-16 ও ওপরে pt-3 দেওয়া হয়েছে */}
            <div style={{ transitionDelay: '1200ms' }} className={`pt-3 md:ml-16 transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <button className="group w-full sm:w-auto justify-center px-6 py-3.5 bg-slate-900 hover:bg-blue-600 border border-slate-800 hover:border-blue-500 text-white rounded-xl transition-all duration-300 text-xs font-bold uppercase tracking-widest flex items-center gap-4 active:scale-97 shadow-2xl">
                <span>Explore Corporate Directives</span>
                <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-300 text-blue-400 group-hover:text-white" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}