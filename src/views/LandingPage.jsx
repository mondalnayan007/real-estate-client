import React, { use } from 'react';
import { Link } from 'react-router-dom';

// 1. Importing components from the src/components/ folder
// (Go up one level to src, then down into components)

import HeroCarousel from '../components/HeroCarousel';
import OurVision from '../components/OurVision';

// 2. Importing components sitting directly in the src/ folder
// (Go up one level to src, then target the files directly)

import DualSliders from '../DualSliders';
import ClientReviews from '../ClientReviews';
import Newsletter from '../Newsletter';

import SpatialAudioTour from '../components/SpatialAudioTour';
import HomePageProjects from '../components/HomePageProjects';
import AgentContext from '../context/AgentContext';


export default function LandingPage() {
  const {user} = use(AgentContext);
  console.log(user.agentId);
  

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500">
      
      <HeroCarousel />
      <OurVision />
      <DualSliders />
      <HomePageProjects></HomePageProjects>
      <ClientReviews />
      <Newsletter />
      
      {/* System Gateway Navigation Link */}
      <div className="bg-slate-950 py-6 text-center border-t border-slate-900">
        <Link 
          to="/admin/login" 
          className="text-xs text-slate-700 hover:text-blue-500 font-mono transition duration-300"
        >
          [ Gateway System Node ]
        </Link>
      </div>
      
      
    </div>
  );
}