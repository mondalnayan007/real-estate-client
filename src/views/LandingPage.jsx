import React from 'react';
import { Link } from 'react-router-dom';

// 1. Importing components from the src/components/ folder
// (Go up one level to src, then down into components)
import Navbar from '../components/Navbar';
import HeroCarousel from '../components/HeroCarousel';
import OurVision from '../components/OurVision';

// 2. Importing components sitting directly in the src/ folder
// (Go up one level to src, then target the files directly)
import Projects from '../Projects';
import DualSliders from '../DualSliders';
import ClientReviews from '../ClientReviews';
import Newsletter from '../Newsletter';
import Footer from '../Footer';
import SpatialAudioTour from '../components/SpatialAudioTour';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500">
      <Navbar />
      <HeroCarousel />
      <OurVision />
      <DualSliders />
      <Projects />
      <SpatialAudioTour></SpatialAudioTour>
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
      
      <Footer />
    </div>
  );
}