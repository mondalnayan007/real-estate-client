import React, { useState, useEffect } from 'react';

const SelectPlanPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  
  // ফর্ম স্টেট (এজেন্টের ইনফরমেশন ও কাস্টম ইউআরএল এর জন্য ইউজারনেম)
  const [formData, setFormData] = useState({
    fullName: '',
    agencyName: '',
    whatsappNumber: '',
    customUsername: '' // এটিই হবে তার সাব-ডোমেইন (যেমন: marcus)
  });

  const pricingPlans = [
    { 
      id: 'starter', 
      name: 'Starter Plan', 
      price: '$19', 
      features: ['Instant Domain Setup', 'Up to 10 Property Listings', 'Default Modern Theme', 'Basic Analytics Dashboard'] 
    },
    { 
      id: 'professional', 
      name: 'Professional Plan', 
      price: '$49', 
      features: ['Custom Domain Binding', 'Up to 100 Property Listings', 'Premium Themes & Branding', 'Advanced Lead CRM', '24/7 Priority Support'],
      isPopular: true 
    },
    { 
      id: 'enterprise', 
      name: 'Enterprise Plan', 
      price: '$99', 
      features: ['Fully White-Labeled Site', 'Unlimited Property Listings', 'Multi-Agent Team Accounts', 'Dedicated API Support & Webhooks'] 
    }
  ];

  const handleOpenPopup = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
    e.preventDefault();
    
    // ১. ইউজারনেম থেকে স্পেস বা ক্যাপিটাল লেটার থাকলে তা ক্লিন করা (URL Friendly)
    const cleanUsername = formData.customUsername.trim().toLowerCase().replace(/\s+/g, '');

    if (!cleanUsername) {
      alert("Please enter a valid username.");
      return;
    }

    // ২. কারেন্ট হোস্টনেম এবং পোর্ট বের করা (যেমন: localhost:5173 বা primeestates.com)
    const currentHostname = window.location.hostname; // e.g., "localhost" or "primeestates.com"
    const currentPort = window.location.port;         // e.g., "5173" (লোকালহোস্টের জন্য)

    let redirectUrl = "";

    // ৩. লোকালহোস্ট এবং লাইভ ডোমেইনের জন্য ডাইনামিক রিডাইরেকশন ইউআরএল তৈরি
    if (currentHostname === "localhost" || currentHostname === "127.0.0.1") {
      // লোকালহোস্টের জন্য ইউআরএল হবে: http://marcus.localhost:5173
      redirectUrl = `http://${cleanUsername}.localhost${currentPort ? `:${currentPort}` : ''}`;
    } else {
      // লাইভ সাইটের জন্য ইউআরএল হবে: https://marcus.primeestates.com
      // আপনার মেইন ডোমেইনটি যদি অন্য কিছু হয়, তবে 'primeestates.com' এর জায়গায় আপনার ডোমেইন বসবে
      redirectUrl = `https://${cleanUsername}.${currentHostname}`;
    }

    console.log("Saving Agent Setup Data & Redirecting to:", redirectUrl);

    // ৪. মোডাল ক্লোজ করা
    setIsModalOpen(false);

    // ৫. এজেন্টের নতুন সাব-ডোমেইনে রিডাইরেক্ট করে দেওয়া
    window.location.href = redirectUrl;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* টপ হেডিং */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-blue-100">
            Welcome! Next Step
          </span>
          <h1 className="text-4xl font-black text-slate-900 mt-4 tracking-tight sm:text-5xl">
            Choose Your Subscription Plan
          </h1>
          <p className="mt-4 text-slate-600 text-lg">
            Select a pricing tier to activate your real estate infrastructure and claim your workspace URL.
          </p>
        </div>

        {/* প্রাইসিং গ্রিড সেকশন */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.id} 
              className={`relative flex flex-col p-8 bg-white rounded-3xl transition-all duration-300 ${
                plan.isPopular 
                  ? 'ring-4 ring-blue-600 shadow-2xl scale-105 z-10 md:-translate-y-2' 
                  : 'border border-slate-200 shadow-md hover:shadow-xl'
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                  Most Popular
                </span>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline text-slate-900">
                  <span className="text-5xl font-black tracking-tight">{plan.price}</span>
                  <span className="ml-1 text-xl font-semibold text-slate-500">/mo</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm text-slate-600">
                    <svg className="h-5 w-5 text-emerald-500 shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleOpenPopup(plan)}
                className={`w-full py-4 px-6 rounded-xl text-center font-bold text-sm transition-all ${
                  plan.isPopular 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                Activate {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ==========================================
          🎁 🔲 DYNAMIC AGENT INFOMATION POPUP (MODAL)
         ========================================== */}
      {isModalOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
            
            <h3 className="text-2xl font-black text-slate-900 mb-1">Complete Workspace Setup</h3>
            <p className="text-sm text-slate-500 mb-6">
              You are subscribing to the <span className="text-blue-600 font-bold">{selectedPlan.name}</span>
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* ১. ফুল নেম */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Full Name</label>
                <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="e.g. Marcus Aurelius" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" />
              </div>

              {/* ২. এজেন্সির নাম */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Agency / Business Name</label>
                <input required type="text" name="agencyName" value={formData.agencyName} onChange={handleInputChange} placeholder="e.g. Marcus Luxury Real Estate" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" />
              </div>

              {/* ৩. হোয়াটসঅ্যাপ নাম্বার */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">WhatsApp Number (For Client Leads)</label>
                <input required type="tel" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleInputChange} placeholder="e.g. +1234567890" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" />
              </div>

              {/* ৪. কাস্টম ইউআরএল ইউজারনেম ফিল্ড (সাব-ডোমেইন) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Choose Your Custom URL Username</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all overflow-hidden">
                  <input 
                    required 
                    type="text" 
                    name="customUsername" 
                    value={formData.customUsername} 
                    onChange={handleInputChange} 
                    placeholder="marcus" 
                    className="w-full bg-transparent px-4 py-3 font-semibold focus:outline-none text-sm text-right pr-1 placeholder:font-normal text-blue-600" 
                  />
                  <span className="bg-slate-200/60 text-slate-500 text-sm px-4 py-3 font-semibold border-l border-slate-200 select-none">
                    .primeestates.com
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5">This will be your unique live web address for your customers.</p>
              </div>

              {/* অ্যাকশন বাটনসমূহ */}
              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-xl text-sm transition-colors"
                >
                  Go Back
                </button>
                <button 
                  type="submit" 
                  className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-sm transition-colors shadow-lg shadow-blue-600/10"
                >
                  Confirm & Launch My Site
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectPlanPage;