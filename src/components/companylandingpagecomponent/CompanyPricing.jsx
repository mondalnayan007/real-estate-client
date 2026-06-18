import React, { useState } from 'react';
import { Check, X, ShieldCheck, ArrowRight, Sparkles, Building, Globe, Mail, User, Phone } from 'lucide-react';

const CompanyPricing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  
  // ৪টি প্রয়োজনীয় ডেটা ফিল্ড স্টেট
  const [formData, setFormData] = useState({
    fullName: '',
    agencyName: '',
    whatsappNumber: '',
    customUsername: '' // সাব-ডোমেইনের জন্য ইউনিক ইউজারনেম
  });

  const pricingPlans = [
    { 
      id: 'starter',
      name: 'Starter Plan', 
      price: '$19', 
      desc: 'Perfect for independent real estate agents looking to build an initial web presence.',
      features: ['Instant Subdomain Lookup', 'Up to 10 Property Listings', 'Default Luxury Template Theme', 'Basic CRM Dashboard Tracking'],
      color: 'from-slate-800 to-slate-900',
      badgeColor: 'text-slate-400 bg-slate-800/60'
    },
    { 
      id: 'professional',
      name: 'Professional Plan', 
      price: '$49', 
      desc: 'Best for scaling brokerages needing full branding freedom and advanced tracking analytics.',
      features: ['Custom Domain Integration', 'Up to 100 Property Listings', 'Full Logo & Theme Customization', 'Advanced Performance Analytics', '24/7 Priority Support'], 
      isPopular: true,
      color: 'from-blue-950/40 via-slate-900 to-slate-900',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
    },
    { 
      id: 'enterprise',
      name: 'Enterprise Plan', 
      price: '$99', 
      desc: 'Engineered for real estate empires looking for white-labeled solutions and API hooks.',
      features: ['White-Labeled Custom Domain', 'Unlimited Property Listings', 'Multi-Agent Team Accounts', 'Dedicated Account Executive', 'API Access Webhooks'],
      color: 'from-purple-950/30 via-slate-900 to-slate-900',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
    }
  ];

  const handleOpenModal = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // ১. ইউজারনেম থেকে স্পেস বা ক্যাপিটাল লেটার ক্লিন করা (URL Friendly)
    const cleanUsername = formData.customUsername.trim().toLowerCase().replace(/\s+/g, '');

    if (!cleanUsername) {
      alert("Please enter a valid username.");
      return;
    }

    // ২. কারেন্ট হোস্টনেম এবং পোর্ট বের করা
    const currentHostname = window.location.hostname; 
    const currentPort = window.location.port;         

    let redirectUrl = "";

    // ৩. লোকালহোস্ট এবং লাইভ ডোমেইনের জন্য ডাইনামিক রিডাইরেকশন ইউআরএল মেকিং
    if (currentHostname === "localhost" || currentHostname === "127.0.0.1") {
      redirectUrl = `http://${cleanUsername}.localhost${currentPort ? `:${currentPort}` : ''}`;
    } else {
      redirectUrl = `https://${cleanUsername}.${currentHostname}`;
    }

    console.log("Saving Agent Setup Data & Redirecting to:", redirectUrl);
    alert(`🚀 Workspace Provisioned Successfully!\nPlan: ${selectedPlan.name}\nRedirecting to: ${redirectUrl}`);

    // ৪. মোডাল ক্লোজ ও ফর্ম রিসেট
    setIsModalOpen(false);
    setFormData({ fullName: '', agencyName: '', whatsappNumber: '', customUsername: '' });

    // ৫. এজেন্টের নতুন সাব-ডোমেইনে লাইভ রিডাইরেক্ট করা
    window.location.href = redirectUrl;
  };

  return (
    <section id="pricing" className="py-28 bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* 🌌 Background Elements */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 📢 Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full text-[11px] font-bold text-rose-400 uppercase tracking-widest">
            Welcome! Next Step
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Choose Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Subscription Plan</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Select a pricing tier to activate your real estate infrastructure and claim your workspace URL.
          </p>
        </div>

        {/* 🎚️ Pricing Cards Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.id} 
              className={`relative flex flex-col p-8 rounded-3xl bg-gradient-to-br ${plan.color} border transition-all duration-300 group ${
                plan.isPopular 
                  ? 'border-blue-500/60 shadow-2xl shadow-blue-500/5 scale-105 z-10 md:-translate-y-2' 
                  : 'border-slate-800/80 hover:border-slate-700 hover:shadow-xl'
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Sparkles size={10} /> Most Popular
                </span>
              )}

              <div className="mb-6 space-y-2">
                <span className={`inline-block px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${plan.badgeColor}`}>
                  {plan.name.split(' ')[0]}
                </span>
                <h3 className="text-xl font-black text-white uppercase">{plan.name}</h3>
                <p className="text-slate-400 text-xs leading-relaxed min-h-[48px]">{plan.desc}</p>
                <div className="pt-4 flex items-baseline text-white">
                  <span className="text-5xl font-mono font-black tracking-tight">{plan.price}</span>
                  <span className="ml-1 text-sm font-semibold text-slate-500">/mo</span>
                </div>
              </div>

              <div className="w-full h-[1px] bg-slate-800/60 my-2" />

              <ul className="space-y-3.5 mb-8 flex-1 pt-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-xs text-slate-300 font-medium">
                    <div className="p-0.5 rounded-full bg-emerald-500/10 text-emerald-400 shrink-0 mr-3 mt-0.5">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleOpenModal(plan)}
                className={`w-full py-3.5 px-6 rounded-xl text-center font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                  plan.isPopular 
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20' 
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                Activate {plan.name.split(' ')[0]} <ArrowRight size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* =======================================================
          🎁 🔲 INTEGRATED AGENT INFOMATION DYNAMIC GLASS MODAL
         ======================================================= */}
      {isModalOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          {/* Backdrop Glass Blur */}
          <div onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />

          {/* Form Modal Container (SaaS Platinum UI) */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 md:p-8 space-y-6 relative z-10 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                  <ShieldCheck size={12} /> Cloud Provisioning Engine
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight">Complete Workspace Setup</h3>
                <p className="text-xs text-slate-400">You are subscribing to the <span className="text-blue-500 font-bold">{selectedPlan.name}</span></p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {/* Form Infrastructure */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* ১. ফুল নেম ফিল্ড */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                  <User size={11} /> Full Name
                </label>
                <input 
                  type="text" 
                  name="fullName"
                  required
                  placeholder="e.g. Marcus Aurelius"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800/80 focus:border-blue-500/80 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 outline-none transition-all font-medium"
                />
              </div>

              {/* ২. এজেন্সির নাম ফিল্ড */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                  <Building size={11} /> Agency / Business Name
                </label>
                <input 
                  type="text" 
                  name="agencyName"
                  required
                  placeholder="e.g. Marcus Luxury Real Estate"
                  value={formData.agencyName}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800/80 focus:border-blue-500/80 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 outline-none transition-all font-medium"
                />
              </div>

              {/* ৩. হোয়াটসঅ্যান্ড নাম্বার ফিল্ড */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                  <Phone size={11} /> WhatsApp Number (For Client Leads)
                </label>
                <input 
                  type="tel" 
                  name="whatsappNumber"
                  required
                  placeholder="e.g. +1234567890"
                  value={formData.whatsappNumber}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800/80 focus:border-blue-500/80 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 outline-none transition-all font-medium"
                />
              </div>

              {/* ৪. কাস্টম ইউআরএল ইউজারনেম ফিল্ড (সাব-ডোমেইন রাউটার) */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                  <Globe size={11} /> Choose Your Custom URL Username
                </label>
                <div className="relative flex items-center bg-slate-950 border border-slate-800/80 rounded-xl focus-within:border-blue-500/80 transition-all overflow-hidden">
                  <input 
                    type="text" 
                    name="customUsername"
                    required
                    placeholder="marcus"
                    value={formData.customUsername}
                    onChange={handleInputChange}
                    className="w-full bg-transparent px-4 py-3 text-xs text-blue-400 placeholder-slate-700 outline-none font-bold"
                  />
                  <span className="absolute right-3 text-[10px] font-mono font-bold bg-slate-900 border border-slate-800/60 text-slate-400 px-3 py-1 rounded-md pointer-events-none select-none">
                    .primeestates.com
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium">This will be your unique live web address for your customers.</p>
              </div>

              {/* অ্যাকশন বাটন প্যানেল */}
              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="w-1/3 bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors"
                >
                  Go Back
                </button>
                <button 
                  type="submit"
                  className="w-2/3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  Confirm & Launch My Site <ArrowRight size={13} />
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default CompanyPricing;