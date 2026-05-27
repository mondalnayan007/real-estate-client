import React, { useEffect, useState, useRef } from 'react';
import { Eye, ShieldCheck, Compass, Sparkles, ArrowUpRight } from 'lucide-react';

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
    }, { threshold: 0.15 });
    
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const corePillars = [
    {
      icon: <Eye className="text-blue-500 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />,
      title: "Architectural Foresight",
      desc: "Curating generational ultra-luxury penthouses and estates defined by timeless structural design."
    },
    {
      icon: <ShieldCheck className="text-blue-500 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />,
      title: "Discreet Sovereignty",
      desc: "Uncompromising contractual confidentiality and institutional asset protection protocols."
    },
    {
      icon: <Compass className="text-blue-500 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />,
      title: "Global Coordinates",
      desc: "Strategic elite placements across high-barrier metropolitan districts and coastal strips."
    }
  ];

  return (
    <section 
      id="vision" 
      ref={domRef}
      className="w-full min-h-screen bg-slate-950 text-white py-32 px-6 md:px-12 overflow-hidden relative flex items-center select-none"
    >
      {/* Immersive Deep-Atmosphere Flares (Preserving your exact Blue Theme) */}
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative">
        
        {/* Background Floating Typography Watermark for High-End Aesthetic */}
        <div className="absolute -top-16 right-0 text-[12vw] font-black font-sans text-slate-900/30 tracking-tighter select-none pointer-events-none hidden lg:block">
          VISION
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* LEFT CONTENT: Premium Overlapping Editorial Text Block */}
          <div className={`lg:col-span-5 space-y-8 z-20 transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) transform ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'
          }`}>
            
            {/* Elegant Sharp Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[10px] font-bold tracking-[0.2em] uppercase rounded-md">
              <Sparkles size={11} className="animate-pulse" /> Corporate Creed
            </div>
            
            {/* Bold High-Contrast Typographic Hierarchy */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light font-serif tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-100 to-slate-400">
              Redefining the <br />
              <span className="font-sans font-black text-white tracking-tighter drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                Topography of Luxury.
              </span>
            </h2>
            
            <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light max-w-lg">
              At PrimeEstates, our blueprint extends beyond mere framework engineering. We synthesize ultra-premium spaces that function as private generational micro-kingdoms for the selective elite.
            </p>

            {/* Clean, Non-bulky Premium Interactive Button */}
            <div className="pt-4">
              <button className="group relative px-6 py-3.5 bg-slate-900 hover:bg-blue-600 border border-slate-800 hover:border-blue-500 text-white rounded-xl transition-all duration-300 text-xs font-bold uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-black/40">
                <span>Explore Corporate Directives</span>
                <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-300 text-blue-400 group-hover:text-white" />
              </button>
            </div>
          </div>

          {/* RIGHT CONTENT: Overlapping Multi-Layered Structural Canvas */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-8 relative items-center">
            
            {/* 1. LAYER ONE: Asymmetric Hero Architecture Panel */}
            <div className={`sm:col-span-6 relative group rounded-2xl overflow-hidden aspect-[3/4] border border-slate-800 bg-slate-900 shadow-2xl z-10 transition-all duration-[1200ms] delay-200 transform ${
              isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'
            }`}>
              {/* Premium Dark Image Gradient Veil */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10 opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
              
              {/* Image Interaction */}
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80" 
                alt="Luxury Architecture Showcase" 
                className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[1000ms] ease-out"
              />
              
              {/* Floating Bottom Label */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <span className="text-[9px] font-mono font-bold text-blue-400 tracking-widest uppercase">Estates 2026</span>
                <h4 className="text-lg font-bold text-white tracking-tight mt-0.5">Monolithic Layouts</h4>
              </div>
            </div>

            {/* 2. LAYER TWO: Frosted Glassmorphic Interaction Cards */}
            <div className={`sm:col-span-6 flex flex-col gap-4 z-10 lg:-ml-8 transition-all duration-[1200ms] delay-400 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}>
              {corePillars.map((pillar, idx) => (
                <div 
                  key={idx} 
                  className="group p-5 bg-slate-900/40 backdrop-blur-md border border-slate-900 hover:border-blue-500/30 rounded-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)] flex gap-4 relative overflow-hidden"
                >
                  {/* Subtle inner hover glow background anchor */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-blue-600/0 group-hover:from-blue-600/[0.02] group-hover:to-transparent transition-all duration-500" />
                  
                  {/* Icon Frame */}
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:bg-blue-600/10 group-hover:border-blue-500/20 transition-all duration-300">
                    {pillar.icon}
                  </div>
                  
                  {/* Card Content Text */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-200 group-hover:text-blue-400 transition-colors duration-300">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}