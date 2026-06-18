import React, { useState } from 'react';
import { BarChart3, Building2, Palette, Inbox, FileText, Save, Monitor, ChevronDown, ChevronUp } from 'lucide-react';

// গ্লোবাল কোর ট্যাব কম্পোনেন্টস
import DashboardAnalytics from '../components/UserDashboardComponents/DashboardAnalytics';
import PropertyManagement from '../components/UserDashboardComponents/PropertyManagement';
import BrandingTheme from '../components/UserDashboardComponents/BrandingTheme';
import LeadManagement from '../components/UserDashboardComponents/LeadManagement';
import CmsSeoControl from '../components/UserDashboardComponents/CmsSeoControl';

// 🌐 নতুন ১২টি ফ্রন্টএন্ড সাব-কম্পোনেন্টস ইম্পোর্ট

import Settings from '../components/UserDashboardComponents/frontendDesign/SubMenus/Settings';
import Menu from '../components/UserDashboardComponents/frontendDesign/SubMenus/Menu';
import PageSection from '../components/UserDashboardComponents/frontendDesign/SubMenus/PageSection';
import ManagePage from '../components/UserDashboardComponents/frontendDesign/SubMenus/ManagePage';
import Slider from '../components/UserDashboardComponents/frontendDesign/SubMenus/Slider';
import Features from '../components/UserDashboardComponents/frontendDesign/SubMenus/Features';
import Testimonial from '../components/UserDashboardComponents/frontendDesign/SubMenus/Testimonial';
import Service from '../components/UserDashboardComponents/frontendDesign/SubMenus/Service';


import Gallery from '../components/UserDashboardComponents/frontendDesign/SubMenus/Gallery';



export default function AgentDashboard() {
  // একটিমাত্র অ্যাক্টিভ স্টেট যা গ্লোবাল এবং সাব-মেনু উভয় ট্র্যাকিং করবে
  const [activeTab, setActiveTab] = useState('analytics');
  const [isFrontendOpen, setIsFrontendOpen] = useState(true); // ড্রপডাউন ওপেন/ক্লোজ স্টেট

  // ১২টি ফ্রন্টএন্ড সাব-মেনু আইটেম লিস্ট
  const frontendSubMenus = [
    { id: 'fe-setting', label: 'Setting' },
    { id: 'fe-menu', label: 'Menu' },
    { id: 'fe-pageSection', label: 'Page Section' },
    { id: 'fe-managePage', label: 'Manage Page' },
    { id: 'fe-slider', label: 'Slider' },
    { id: 'fe-features', label: 'Features' },
    { id: 'fe-testimonial', label: 'Testimonial' },
    { id: 'fe-service', label: 'Service' },
    
    { id: 'fe-gallery', label: 'Gallery ' },
    
    
  ];

  // গ্লোবাল স্টেটসমূহ (ডাটাবেস ও এপিআই সিঙ্ক)
  const [properties, setProperties] = useState([
    { id: 1, title: 'Luxury Apartment in Gulshan', description: '3 BHK premium flat with spacious balcony.', price: '$450,000', location: 'Gulshan 2, Dhaka', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811', floorPlan: 'https://images.unsplash.com/photo-1545464693-f1798a373343', videoLink: 'https://youtube.com/watch?v=123', status: 'Available', amenities: ['Lift', 'Generator', 'Parking', '24/7 Security'], views: 1240 },
    { id: 2, title: 'Premium Penthouse', description: 'Duplex penthouse near Dhanmondi Lake.', price: '$320,000', location: 'Dhanmondi, Dhaka', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750', floorPlan: '', videoLink: '', status: 'Booked/Pending', amenities: ['Lift', 'Generator', 'Intercom'], views: 940 }
  ]);

  const [branding, setBranding] = useState({
    logo: 'https://via.placeholder.com/150', favicon: '', primaryColor: '#2563eb', secondaryColor: '#0f172a',
    address: '123 Luxury Tower, Gulshan, Dhaka', phone: '+8801700000000', email: 'info@primeestates.com', facebook: 'https://facebook.com', linkedin: 'https://linkedin.com'
  });

  const [leads, setLeads] = useState([
    { id: 1, name: 'Rahat Khan', phone: '01823XXXXXX', email: 'rahat@gmail.com', message: 'Interested in Gulshan Villa.', property: 'Luxury Apartment in Gulshan', date: '2026-06-17' }
  ]);

  const [clickTracking] = useState({ whatsappClicks: 142, phoneCalls: 89 });

  const [cms, setCms] = useState({
    heroTitle: 'Find Your Dream Luxury Home Instantly', heroSlogan: 'The premier real estate platform.',
    aboutUs: 'We are Dhaka’s leading real estate agency...', contactUs: 'Contact our 24/7 help desk...', terms: 'All properties are verified...',
    metaTitle: 'PrimeEstates | Premium Flats for Sale in Dhaka', metaDesc: 'Browse verified luxury apartments.', keywords: 'property, flats, buy plot'
  });

  const handleGlobalPublish = () => {
    console.log("Publishing live data to Server:", { properties, branding, leads, cms });
    alert("🚀 All frontend sections and settings synchronized successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col xl:flex-row">
      
      {/* 📁 SIDEBAR STRUCTURE */}
      <div className="w-full xl:w-72 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-800">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-black text-white text-lg">P</div>
            <div>
              <h1 className="font-black text-sm tracking-tight">Console Panel</h1>
              <p className="text-[9px] font-mono font-bold tracking-wider text-blue-500">REAL ESTATE CONSOLE</p>
            </div>
          </div>

          <nav className="space-y-1 max-h-[70vh] overflow-y-auto pr-1 custom-scrollbar">
            {/* Core Global Nav Tabs */}
            <button onClick={() => setActiveTab('analytics')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'analytics' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}><BarChart3 size={15} /> 📊 Analytics & Metrics</button>
            <button onClick={() => setActiveTab('properties')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'properties' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}><Building2 size={15} /> 🏢 Property Inventory</button>
            <button onClick={() => setActiveTab('branding')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'branding' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}><Palette size={15} /> 🎨 Branding & Theme</button>
            <button onClick={() => setActiveTab('leads')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'leads' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}><Inbox size={15} /> 📥 Lead Inbox</button>
            <button onClick={() => setActiveTab('cms')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'cms' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}><FileText size={15} /> 📝 CMS & SEO Control</button>

            {/* 🌐 FRONTEND DROPDOWN ACCORDION MODULE */}
            <div className="pt-2">
              <button 
                onClick={() => setIsFrontendOpen(!isFrontendOpen)} 
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${frontendSubMenus.some(m => m.id === activeTab) ? 'bg-slate-850 border border-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
              >
                <div className="flex items-center gap-3">
                  <Monitor size={15} className="text-rose-500" /> Frontend
                </div>
                {isFrontendOpen ? <ChevronUp size={14} className="text-slate-500" /> : <ChevronDown size={14} className="text-slate-500" />}
              </button>

              {/* Sub Menus Stream */}
              {isFrontendOpen && (
                <div className="mt-1 ml-4 pl-2 border-l border-slate-800 space-y-0.5 animate-in slide-in-from-top-2 duration-150">
                  {frontendSubMenus.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setActiveTab(sub.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-[11px] font-bold transition-all flex items-center gap-2 ${activeTab === sub.id ? 'text-rose-500 bg-rose-500/5 font-extrabold' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                      <span className={`${activeTab === sub.id ? 'text-rose-500' : 'text-slate-600'} text-[9px]`}>▶</span> {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
        
        <button onClick={handleGlobalPublish} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold uppercase py-3.5 rounded-xl flex items-center justify-center gap-2 mt-6 shrink-0"><Save size={14} /> Save & Deploy Live</button>
      </div>

      {/* 🖥️ DYNAMIC CONTENT PANEL (RIGHT SIDE VIEW) */}
      <div className="flex-1 p-6 lg:p-10 overflow-y-auto max-h-screen bg-slate-950">
        {/* Core Global Views */}
        {activeTab === 'analytics' && <DashboardAnalytics properties={properties} tracking={clickTracking} />}
        {activeTab === 'properties' && <PropertyManagement properties={properties} setProperties={setProperties} />}
        {activeTab === 'branding' && <BrandingTheme branding={branding} setBranding={setBranding} />}
        {activeTab === 'leads' && <LeadManagement leads={leads} tracking={clickTracking} />}
        {activeTab === 'cms' && <CmsSeoControl cms={cms} setCms={setCms} />}

        {/* Frontend Dynamic Views Mapping */}
        {activeTab === 'fe-setting' && <Settings />}
        {activeTab === 'fe-menu' && <Menu />}
        {activeTab === 'fe-pageSection' && <PageSection />}
        {activeTab === 'fe-managePage' && <ManagePage />}
        {activeTab === 'fe-slider' && <Slider />}
        {activeTab === 'fe-features' && <Features />}
        {activeTab === 'fe-testimonial' && <Testimonial />}
        {activeTab === 'fe-service' && <Service />}
        
        {activeTab === 'fe-gallery' && <Gallery />}
      
      </div>

    </div>
  );
}