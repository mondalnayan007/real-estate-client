import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

const sliderAssets = [
  {
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
    title: 'The Obsidian Penthouse',
    tag: '#PRP-001',
    price: '$24.5M'
  },
  {
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80',
    title: 'Serene Woods Estate',
    tag: '#PRP-002',
    price: '$18.2M'
  },
  {
    img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80',
    title: 'Amethyst Linear Villa',
    tag: '#PRP-003',
    price: '$31.0M'
  },
  {
    img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80',
    title: 'The Azure Waterfront',
    tag: '#PRP-004',
    price: '$15.9M'
  },
  {
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
    title: 'Elysian Canopy Spire',
    tag: '#PRP-005',
    price: '$42.5M'
  },
  {
    img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80',
    title: 'The Horizon Pavilion',
    tag: '#PRP-006',
    price: '$22.0M'
  }
];

export default function DualSliders() {
  // Use React state to precisely handle play/pause triggers safely across all browsers
  const [isSliderOnePaused, setIsSliderOnePaused] = useState(false);
  const [isSliderTwoPaused, setIsSliderTwoPaused] = useState(false);

  // Helper component to render standard asset item panels
  const AssetCard = ({ asset, index, side }) => (
    <div 
      key={`${side}-${index}`} 
      className="w-80 h-56 shrink-0 rounded-2xl overflow-hidden border border-slate-900 bg-slate-900/60 shadow-2xl relative cursor-pointer hover:border-blue-500/80 transition-all duration-500 group"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10 group-hover:via-slate-950/10 transition-all duration-500" />
      <img 
        src={asset.img} 
        alt={asset.title} 
        className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out" 
      />
      
      <div className="absolute bottom-5 left-5 right-5 z-20 flex flex-col gap-1">
        <div className="flex justify-between items-center w-full">
          <span className="text-[9px] font-mono font-bold text-blue-400 tracking-wider uppercase bg-blue-950/60 border border-blue-900/40 px-2 py-0.5 rounded">
            {asset.tag}
          </span>
          <span className="text-xs font-semibold font-sans text-emerald-400">
            {asset.price}
          </span>
        </div>
        <h4 className="text-sm font-bold tracking-tight text-white mt-1 group-hover:text-blue-300 transition-colors duration-300 truncate">
          {asset.title}
        </h4>
      </div>
    </div>
  );

  return (
    <section className="py-8 bg-slate-950 overflow-hidden flex flex-col gap-12 relative select-none">
      
      {/* Dynamic Ambient Blur Background Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />
      
      {/* Intro Heading Typography Wrapper Block */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[10px] font-bold tracking-widest uppercase rounded-md">
            <Sparkles size={10} className="animate-pulse" /> Asset Compendium
          </div>
          <h2 className="text-3xl md:text-5xl font-light font-serif tracking-tight leading-none text-white">
            Curated Architectural <span className="font-sans font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-blue-500">Excellence.</span>
          </h2>
        </div>
        <p className="text-slate-400 text-xs md:text-sm font-light max-w-sm leading-relaxed border-l border-slate-800 pl-4">
          A real-time panoramic viewport sequence crossing luxury estates currently held under private portfolio custody.
        </p>
      </div>

      {/* Main Sliders Container with Lateral Feather Masks */}
      <div className="flex flex-col gap-6 relative w-full z-10">
        
        {/* Left and Right ambient edge blurring masks */}
        <div className="absolute top-0 bottom-0 left-0 w-24 md:w-64 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 md:w-64 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none" />

        {/* SLIDER ONE: Left Directional Marquee */}
        <div 
          className="flex w-full overflow-hidden"
          onMouseEnter={() => setIsSliderOnePaused(true)}
          onMouseLeave={() => setIsSliderOnePaused(false)}
        >
          <div 
            className="flex gap-6 whitespace-nowrap native-marquee-left"
            style={{ animationPlayState: isSliderOnePaused ? 'paused' : 'running' }}
          >
            {/* Double mapped array ensures visual looping coverage */}
            {[...sliderAssets, ...sliderAssets].map((asset, index) => (
              <AssetCard key={index} asset={asset} index={index} side="left" />
            ))}
          </div>
        </div>

        {/* SLIDER TWO: Right Directional Marquee */}
        <div 
          className="flex w-full overflow-hidden"
          onMouseEnter={() => setIsSliderTwoPaused(true)}
          onMouseLeave={() => setIsSliderTwoPaused(false)}
        >
          <div 
            className="flex gap-6 whitespace-nowrap native-marquee-right"
            style={{ animationPlayState: isSliderTwoPaused ? 'paused' : 'running' }}
          >
            {[...sliderAssets, ...sliderAssets].map((asset, index) => (
              <AssetCard key={index} asset={asset} index={index} side="right" />
            ))}
          </div>
        </div>

      </div>

      {/* CSS Keyframes for Infinite Hardware Accelerated Sliders */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes customMarqueeLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(calc(-344px * ${sliderAssets.length}), 0, 0); }
        }
        @keyframes customMarqueeRight {
          0% { transform: translate3d(calc(-344px * ${sliderAssets.length}), 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .native-marquee-left {
          animation: customMarqueeLeft 35s linear infinite;
        }
        .native-marquee-right {
          animation: customMarqueeRight 35s linear infinite;
        }
      `}} />
    </section>
  );
}