import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

import MarqueeComponent from 'react-fast-marquee';
const Marquee = MarqueeComponent.default || MarqueeComponent;
import DualSliderCard from './components/DualSliderCard';

export default function DualSliders() {
  const [sliderAssets, setSliderAssets] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setSliderAssets(data))
      .catch(err => console.error("Error loading slider assets:", err));
  }, []);

  const reversedAssets = [...sliderAssets].reverse();

  return (
    <section className="overflow-hidden flex flex-col gap-8 relative select-none">

      {/* Dynamic Ambient Blur Background Flare */}
      <div className="absolute w-[600px] h-[300px] blur-[160px] pointer-events-none" />

      {/* ================= SLIDER CONTAINERS ================= */}
      <div className="flex flex-col gap-6 w-full relative z-10">

        {/* FIRST SLIDER: LEFT TO RIGHT */}
        <Marquee 
          pauseOnHover={true}
          direction='right'
          speed={40}
          gradient={false} // গ্লানি বা গ্র্যাডিয়েন্ট শ্যাডো বন্ধ করার জন্য
        >
          {reversedAssets.map((assets, idx) => (
            // 🔥 'w-full' এবং বাইরের 'flex gap-4' সরিয়ে দিয়ে কার্ডের গায়ে সরাসরি 'mr-4' বা 'pr-4' ব্যবহার করা হয়েছে
            <div key={assets._id || assets.id || idx} className="mr-4">
              <DualSliderCard assets={assets} />
            </div>
          ))}
        </Marquee>

        {/* SECOND SLIDER: RIGHT TO LEFT (REVERSE) */}
        <Marquee 
          pauseOnHover={true}
          speed={40}
          gradient={false}
        >
          {reversedAssets.map((assets, idx) => (
            <div key={assets._id || assets.id || idx} className="mr-4">
              <DualSliderCard assets={assets} />
            </div>
          ))}
        </Marquee>

      </div>

    </section>
  );
}