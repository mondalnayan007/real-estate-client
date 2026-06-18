import React, { useState } from 'react';
import { Monitor, ChevronDown, ChevronUp,  LayoutGrid } from 'lucide-react';

// সাব-কম্পোনেন্টসমূহ ইম্পোর্ট (নিচে এগুলো বিস্তারিত লেখা আছে)
 import Settings from '../SubMenus/Settings';
import Menu from '../SubMenus/Menu';
import PageSection from '../SubMenus/PageSection';
import ManagePage from '../SubMenus/ManagePage';
import Slider from '../SubMenus/Slider';
import Features from '../SubMenus/Features';
import Testimonial from '../SubMenus/Testimonial';
import Service from '../SubMenus/Service';
import Gallery from '../SubMenus/Gallery';

export default function UserDashboard() {
  const [isFrontendOpen, setIsFrontendOpen] = useState(true);
  const [activeSubMenu, setActiveSubMenu] = useState('Setting');

  // ১২টি সাব-মেনুর লিস্ট
  const menuItems = [
    'Setting', 'Menu', 'Page Section', 'Manage Page', 'Slider', 
    'Features', 'Testimonial', 'Service', 'Faq', 'Gallery Category', 'Gallery', 'News'
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* 📁 সাইডবার নেভিগেশন (যেমনটা Screenshot 2026-06-18 211351.png এ আছে) */}
      <div className="w-full md:w-72 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
        

        <nav className="p-4 space-y-1">
          <div>
            {/* Frontend মেইন ড্রপডাউন বাটন */}
            <button 
              onClick={() => setIsFrontendOpen(!isFrontendOpen)} 
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${isFrontendOpen ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <div className="flex items-center gap-3">
                <Monitor size={16} className="text-rose-500" /> Frontend
              </div>
              {isFrontendOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {/* সাব-মেনু লুপ */}
            {isFrontendOpen && (
              <div className="mt-1 ml-4 pl-2 border-l-2 border-rose-500/30 space-y-0.5">
                {menuItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => setActiveSubMenu(item)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeSubMenu === item ? 'text-rose-500 bg-rose-500/5' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    <span className="text-rose-500 text-[10px]">▶</span> {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* 🖥️ ডাইনামিক ওয়ার্কস্পেস এরিয়া */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen bg-slate-950">
        {activeSubMenu === 'Setting' && <Settings />}
        {activeSubMenu === 'Menu' && <Menu />}
        {activeSubMenu === 'Page Section' && <PageSection />}
        {activeSubMenu === 'Manage Page' && <ManagePage />}
        {activeSubMenu === 'Slider' && <Slider />}
        {activeSubMenu === 'Features' && <Features />}
        {activeSubMenu === 'Testimonial' && <Testimonial />}
        {activeSubMenu === 'Service' && <Service />}
       
        {activeSubMenu === 'Gallery Category' && <Gallery />}
        
        
      </div>

    </div>
  );
}