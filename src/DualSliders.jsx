import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

import Marquee from 'react-fast-marquee';
import DualSliderCard from './components/DualSliderCard';

export default function DualSliders() {
  const [sliderAssets, setSliderAssets] = useState([]);

  useEffect(() => {
    fetch('/data.json') // রুট পাথ থেকে ডেটা ফেচিং সেফ রাখার জন্য '/' যোগ করা হয়েছে
      .then(res => res.json())
      .then(data => setSliderAssets(data))
      .catch(err => console.error("Error loading slider assets:", err));
  }, []);

  // অ্যানিমেশন লুপ অবিচ্ছিন্ন রাখার জন্য ডেটাকে ডুপ্লিকেট করা হয়েছে
  const doubledAssets = [...sliderAssets, ...sliderAssets];
  // দ্বিতীয় স্লাইডারটিকে একটু ভিন্ন লুক বা রিভার্স অর্ডারে দেখানোর জন্য
  const reversedAssets = [...sliderAssets].reverse();
  const doubledReversedAssets = [...reversedAssets, ...reversedAssets];


  return (
    <section className="py-20 bg-slate-950 overflow-hidden flex flex-col gap-16 relative select-none">

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

      {/* ================= SLIDER CONTAINERS ================= */}
      <div className="flex flex-col  w-full relative z-10">

        {/* FIRST SLIDER: LEFT TO RIGHT */}
        <div className="flex w-full  ">
          {
            reversedAssets.map(assets => <DualSliderCard assets={assets}></DualSliderCard>)
          }


        </div>

        {/* SECOND SLIDER: RIGHT TO LEFT (REVERSE) */}
     
         <div className="flex w-full ">
          {
            reversedAssets.map(assets => <DualSliderCard assets={assets}></DualSliderCard>)
          }
        </div>
      

      </div>

    </section>
  );
}