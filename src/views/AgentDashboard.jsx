import React, { useState } from 'react';
import { BarChart3, Building2, Palette, Inbox, FileText, Save } from 'lucide-react';
import DashboardAnalytics from '../components/UserDashboardComponents/DashboardAnalytics';
import PropertyManagement from '../components/UserDashboardComponents/PropertyManagement';
import BrandingTheme from '../components/UserDashboardComponents/BrandingTheme';
import LeadManagement from '../components/UserDashboardComponents/LeadManagement';
import CmsSeoControl from '../components/UserDashboardComponents/CmsSeoControl';


export default function AgentDashboard() {
  const [activeTab, setActiveTab] = useState('analytics');

  // গ্লোবাল স্টেটসমূহ যা ডাটাবেস বা API এর সাথে কানেক্ট হবে
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
    alert("🚀 All requirements synchronized & deployed successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col xl:flex-row">
      {/* SIDEBAR */}
      <div className="w-full xl:w-72 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-slate-800">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-black text-white text-lg">P</div>
            <div>
              <h1 className="font-black text-sm tracking-tight">Console Panel</h1>
              <p className="text-[9px] font-mono font-bold tracking-wider text-blue-500">REAL ESTATE CONSOLE</p>
            </div>
          </div>
          <nav className="space-y-1">
            <button onClick={() => setActiveTab('analytics')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'analytics' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}><BarChart3 size={15} /> 📊 Analytics & Metrics</button>
            <button onClick={() => setActiveTab('properties')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'properties' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}><Building2 size={15} /> 🏢 Property Inventory</button>
            <button onClick={() => setActiveTab('branding')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'branding' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}><Palette size={15} /> 🎨 Branding & Theme</button>
            <button onClick={() => setActiveTab('leads')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'leads' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}><Inbox size={15} /> 📥 Lead Inbox</button>
            <button onClick={() => setActiveTab('cms')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'cms' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}><FileText size={15} /> 📝 CMS & SEO Control</button>
          </nav>
        </div>
        <button onClick={handleGlobalPublish} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold uppercase py-3.5 rounded-xl flex items-center justify-center gap-2 mt-6"><Save size={14} /> Save & Deploy Live</button>
      </div>

      {/* RENDER COMPONENTS BASED ON ACTIVE TAB */}
      <div className="flex-1 p-6 lg:p-10 overflow-y-auto max-h-screen">
        {activeTab === 'analytics' && <DashboardAnalytics properties={properties} tracking={clickTracking} />}
        {activeTab === 'properties' && <PropertyManagement properties={properties} setProperties={setProperties} />}
        {activeTab === 'branding' && <BrandingTheme branding={branding} setBranding={setBranding} />}
        {activeTab === 'leads' && <LeadManagement leads={leads} tracking={clickTracking} />}
        {activeTab === 'cms' && <CmsSeoControl cms={cms} setCms={setCms} />}
      </div>
    </div>
  );
}