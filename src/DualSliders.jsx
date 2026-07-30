import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

import MarqueeComponent from 'react-fast-marquee';
const Marquee = MarqueeComponent.default || MarqueeComponent;
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
  // const doubledAssets = [...sliderAssets, ...sliderAssets];
  // দ্বিতীয় স্লাইডারটিকে একটু ভিন্ন লুক বা রিভার্স অর্ডারে দেখানোর জন্য
  const reversedAssets = [...sliderAssets].reverse();
  // const doubledReversedAssets = [...reversedAssets, ...reversedAssets];


  return (
    <section className=" overflow-hidden flex flex-col gap-16 relative select-none">

      {/* Dynamic Ambient Blur Background Flare */}
      <div className="absolute  w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

   
      {/* ================= SLIDER CONTAINERS ================= */}
      <div className="flex flex-col  w-full relative z-10">

        {/* FIRST SLIDER: LEFT TO RIGHT */}

        <Marquee  pauseOnHover='true'
         
          direction='right'>
            <div className="flex w-full gap-4 ">
              {
                reversedAssets.map(assets => <DualSliderCard assets={assets}></DualSliderCard>)
              }

            </div>
        </Marquee>

        {/* SECOND SLIDER: RIGHT TO LEFT (REVERSE) */}
        <Marquee pauseOnHover='true'
          >
          <div className="flex w-full gap-4">


            {
              reversedAssets.map(assets => <DualSliderCard assets={assets}></DualSliderCard>)
            }


          </div>
        </Marquee>

      </div>

    </section>
  );
}