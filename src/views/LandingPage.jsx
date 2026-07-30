import React, { use } from 'react';
import HeroCarousel from '../components/HeroCarousel';
import OurVision from '../components/OurVision';
import ClientReviews from '../ClientReviews';
import Newsletter from '../Newsletter';


import HomePageProjects from '../components/HomePageProjects';
import AgentContext from '../context/AgentContext';


export default function LandingPage() {
  const {user} = use(AgentContext);
  console.log(user.agentId);
  

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500">
      
      <HeroCarousel />
      <OurVision />
      
      <HomePageProjects></HomePageProjects>
      <ClientReviews />
      <Newsletter />
      
    
      
      
    </div>
  );
}