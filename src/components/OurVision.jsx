import React, { useContext } from 'react';

import DualSliders from '../DualSliders';
import AgentContext from '../context/AgentContext';

export default function OurVision() {

  const {user} = useContext(AgentContext)
 

  return (
    <section className="w-full text-[#185F35] bg-white py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* ================= 🌟 HEADER SECTION ================= */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          
          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-wider uppercase leading-tight ">
            YOUR DREAM HOME AWAITS
          </h1>

          {/* Subtitle / Description */}
          <p className="text-sm sm:text-base text-[#2c8f55] font-normal leading-relaxed max-w-3xl mx-auto">
           The {user? `${user.agencyName}` : 'PrimeEstate'} is a visionary real estate company dedicated to creating modern, 
            community-focused living spaces. With a commitment to affordability, transparency, and smart 
            innovation, we design homes where families feel secure, connected, and proud to belong.
          </p>
        </div>

        {/* ================= 📦 EMPTY DIV CONTAINER ================= */}
        {/* নিচের কার্ডগুলোর জায়গায় এই খালি Div বসা দেওয়া হলো */}
        <div className="w-full min-h-[400px] ">
            <DualSliders></DualSliders>
        </div>

      </div>
    </section>
  );
}