import React, { useState } from 'react';
import { 
  Check, X, ShieldCheck, ArrowRight, Sparkles, Building, 
  Globe, Phone, User, Link2, CreditCard, Zap, CheckCircle2 
} from 'lucide-react';

// 🌐 আপনার ব্যাকএন্ড এপিআই ইউআরএল এখানে বসান (e.g., 'https://api.yourdomain.com/v1')
const BACKEND_API_URL = 'http://localhost:4000';

const CompanyPricing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [domainType, setDomainType] = useState('subdomain');
  
  // 💳 পেমেন্ট ও ব্যাকএন্ড রিকোয়েস্ট লোডিং স্টেট
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 📝 ফর্ম ডাটা স্টেট
  const [formData, setFormData] = useState({
    fullName: '',
    agencyName: '',
    whatsappNumber: '',
    customUsername: '', 
    customDomain: '',
        
  });

  // 📦 ৪টি বিস্তারিত প্ল্যান ডিফাইন করা হয়েছে
  const pricingPlans = [
    { 
      id: 'plan_starter',
      name: 'Starter Plan', 
      price: '$19',
      numericPrice: 19,
      duration: 'monthly',
      desc: 'Ideal for independent real estate agents building an initial web presence.',
      limits: {
        listings: 10,
        agents: 1,
        storageGB: 2,
        customDomainAllowed: false
      },
      features: [
        'Instant Subdomain Lookup',
        'Up to 10 Property Listings',
        'Standard Luxury Template Theme',
        'Basic CRM Dashboard Tracking',
        'Community Support'
      ],
      color: 'from-slate-900 via-slate-900 to-slate-950',
      badgeColor: 'text-slate-400 bg-slate-800/80 border-slate-700/50',
      isPopular: false
    },
    { 
      id: 'plan_growth',
      name: 'Growth Plan', 
      price: '$39',
      numericPrice: 39,
      duration: 'monthly',
      desc: 'Designed for small teams and growing agencies scaling local operations.',
      limits: {
        listings: 40,
        agents: 3,
        storageGB: 10,
        customDomainAllowed: true
      },
      features: [
        'Custom Domain Integration',
        'Up to 40 Property Listings',
        '3 Agent Team Accounts',
        'Custom Branding & Color Schemes',
        'Standard Analytics & Lead Form'
      ],
      color: 'from-teal-950/30 via-slate-900 to-slate-950',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      isPopular: false
    },
    { 
      id: 'plan_professional',
      name: 'Professional Plan', 
      price: '$79',
      numericPrice: 79,
      duration: 'monthly',
      desc: 'Best for established brokerages needing full branding freedom and advanced features.',
      limits: {
        listings: 150,
        agents: 10,
        storageGB: 50,
        customDomainAllowed: true
      },
      features: [
        'Custom Domain Integration',
        'Up to 150 Property Listings',
        '10 Agent Team Accounts',
        'Advanced Analytics & Tracking',
        'Automated WhatsApp Lead Routing',
        '24/7 Priority Support'
      ],
      color: 'from-blue-950/40 via-slate-900 to-slate-950',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      isPopular: true
    },
    { 
      id: 'plan_enterprise',
      name: 'Enterprise Plan', 
      price: '$149',
      numericPrice: 149,
      duration: 'monthly',
      desc: 'Engineered for real estate empires requiring white-label solutions and API power.',
      limits: {
        listings: 'Unlimited',
        agents: 'Unlimited',
        storageGB: 200,
        customDomainAllowed: true
      },
      features: [
        'White-Labeled Custom Domain',
        'Unlimited Property Listings',
        'Unlimited Agent Accounts',
        'Dedicated Account Executive',
        'REST API & Webhook Access',
        'Custom Database Backups'
      ],
      color: 'from-purple-950/30 via-slate-900 to-slate-950',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      isPopular: false
    }
  ];

  const handleOpenModal = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
    setDomainType('subdomain'); 
    setIsProcessingPayment(false);
    setErrorMessage('');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🚀 ব্যাকএন্ড পেমেন্ট এপিআই হিট হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsProcessingPayment(true);

    // ১. ডোমেইন টার্গেট প্রস্তুতকরণ
    let finalTargetAddress = '';
    if (domainType === 'subdomain') {
      const cleanUsername = formData.customUsername.trim().toLowerCase().replace(/\s+/g, '');
      if (!cleanUsername) {
        setErrorMessage('Please enter a valid subdomain username.');
        setIsProcessingPayment(false);
        return;
      }
      finalTargetAddress = `${cleanUsername}.primeestates.com`;
    } else {
      const cleanCustomDomain = formData.customDomain.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '');
      if (!cleanCustomDomain) {
        setErrorMessage('Please enter a valid custom domain.');
        setIsProcessingPayment(false);
        return;
      }
      finalTargetAddress = cleanCustomDomain;
    }

    // 📦 ২. পেমেন্ট ও প্ল্যান ডিটেইলস সহ সম্পূর্ণ পেলোড
    const paymentInfo = {
      // 👤 ইউজার ইনফরমেশন
      customer: {
        fullName: formData.fullName.trim(),
        agencyName: formData.agencyName.trim(),
        whatsappNumber: formData.whatsappNumber.trim(),
        senderEmail:'n007kingkong@gmail.com'
      },
      // 🌐 ওয়েব এড্রেস সেটআপ
      domainConfig: {
        domainType: domainType,
        targetAddress: finalTargetAddress,
        customUsername: domainType === 'subdomain' ? formData.customUsername.trim().toLowerCase() : null,
        customDomain: domainType === 'custom' ? formData.customDomain.trim().toLowerCase() : null
      },
      // 💳 প্ল্যানের সম্পূর্ণ ডিটেইলস
      planDetails: {
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        price: selectedPlan.numericPrice,
        currency: 'USD',
        duration: selectedPlan.duration,
        limits: selectedPlan.limits,
        features: selectedPlan.features
      },
      // ⏱️ টাইমস্ট্যাম্প
      createdAt: new Date().toISOString()
    };

    console.log("🚀 Payload ready to hit Backend Payment Gateway:", paymentInfo);

    // 📡 ৩. ব্যাকএন্ড এপিআই রিভোল এবং পেমেন্ট গেটওয়ে রিডাইরেক্ট
    if (BACKEND_API_URL) {
      try {
        const response = await fetch(`${BACKEND_API_URL}/create-checkout-session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
           
            // 'Authorization': `Bearer ${userToken}`
          },
          body: JSON.stringify(paymentInfo)
        });

        const data = await response.json();
        console.log(data);

        if (response.ok && data.url) {
          // ব্যাকএন্ড থেকে পেমেন্ট লিংক আসলে রিডাইরেক্ট হবে (e.g., Stripe / SSLCommerz Link)
          window.location.href = data.url;
        } else {
          throw new Error(data.message || 'Payment session initialization failed.');
        }
      } catch (error) {
        console.error("Payment API Error:", error);
        setErrorMessage(error.message || 'Failed to connect with payment gateway.');
        setIsProcessingPayment(false);
      }
    } else {
      // 🧪 টেস্ট সিমুলেশন (যদি ব্যাকএন্ড এপিআই ইউআরএল খালি থাকে)
      setTimeout(() => {
        alert(
          `💳 Simulation Payment Triggered!\n\n` +
          `Plan: ${paymentInfo.planDetails.planName} (${paymentInfo.planDetails.price} USD)\n` +
          `Customer: ${paymentInfo.customer.fullName}\n` +
          `Target Domain: ${paymentInfo.domainConfig.targetAddress}\n\n` +
          `Check developer console to see full JSON payload!`
        );
        setIsProcessingPayment(false);
        setIsModalOpen(false);
        setFormData({ fullName: '', agencyName: '', whatsappNumber: '', customUsername: '', customDomain: '' });
      }, 2500);
    }
  };

  return (
    <section id="pricing" className="py-24 bg-slate-950 text-slate-100 relative overflow-hidden font-sans">
      
      {/* 🌌 ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 📢 সেকশন হেডার */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-blue-400 uppercase tracking-widest">
            <Zap size={12} /> Flexible Real Estate SaaS Pricing
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Select Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Growth Tier</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            Activate your instant digital agency footprint. Upgrade, downgrade, or cancel your subscription at any time.
          </p>
        </div>

        {/* 🎚️ ৪ টি কার্ডের রেসপনসিভ গ্রিড (4 Pricing Cards Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.id} 
              className={`relative flex flex-col p-6 rounded-3xl bg-gradient-to-b ${plan.color} border transition-all duration-300 group ${
                plan.isPopular 
                  ? 'border-blue-500/80 shadow-2xl shadow-blue-500/10 lg:-translate-y-3 z-10' 
                  : 'border-slate-800/80 hover:border-slate-700 hover:shadow-xl'
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                  <Sparkles size={11} /> Most Popular
                </span>
              )}

              {/* প্ল্যান টাইটেল ও প্রাইস */}
              <div className="mb-6 space-y-2.5">
                <span className={`inline-block px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${plan.badgeColor}`}>
                  {plan.name.split(' ')[0]}
                </span>
                <h3 className="text-lg font-black text-white uppercase">{plan.name}</h3>
                <p className="text-slate-400 text-xs leading-relaxed min-h-[40px]">{plan.desc}</p>
                
                <div className="pt-2 flex items-baseline text-white">
                  <span className="text-4xl font-mono font-black tracking-tight">{plan.price}</span>
                  <span className="ml-1 text-xs font-semibold text-slate-500">/{plan.duration === 'monthly' ? 'mo' : 'yr'}</span>
                </div>
              </div>

              <div className="w-full h-[1px] bg-slate-800/60 my-2" />

              {/* ফিচার লিস্ট */}
              <ul className="space-y-3 mb-8 flex-1 pt-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-xs text-slate-300 font-medium">
                    <div className="p-0.5 rounded-full bg-emerald-500/10 text-emerald-400 shrink-0 mr-2.5 mt-0.5">
                      <Check size={11} strokeWidth={3} />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* সিলেক্ট বাটন */}
              <button 
                onClick={() => handleOpenModal(plan)}
                className={`w-full py-3.5 px-4 rounded-xl text-center font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                  plan.isPopular 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/20' 
                    : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/80 hover:border-slate-700'
                }`}
              >
                Choose {plan.name.split(' ')[0]} <ArrowRight size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* =======================================================
          🎁 🔲 INTEGRATED CHECKOUT SETUP MODAL
         ======================================================= */}
      {isModalOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          
          {/* ব্যাকড্রপ গ্লাস ব্লার */}
          <div 
            onClick={() => !isProcessingPayment && setIsModalOpen(false)} 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" 
          />

          {/* মোডাল কন্টেইনার */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 md:p-8 space-y-6 relative z-10 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            
            {/* মোডাল হেডার */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                  <ShieldCheck size={13} /> Secure Provisioning Engine
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight">Complete Setup</h3>
                <p className="text-xs text-slate-400">
                  Subscribing to: <span className="text-blue-400 font-bold">{selectedPlan.name}</span> ({selectedPlan.price}/mo)
                </p>
              </div>
              <button 
                disabled={isProcessingPayment}
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <X size={16} />
              </button>
            </div>

            {/* এরর মেসেজ ডিসপ্লে */}
            {errorMessage && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-400 font-medium">
                ⚠️ {errorMessage}
              </div>
            )}

            {/* 💳 পেমেন্ট গেটওয়ে প্রসেসিং লোডার */}
            {isProcessingPayment ? (
              <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center animate-in zoom-in-95 duration-200">
                <div className="relative flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-4 border-blue-500/10 border-t-blue-500 animate-spin" />
                  <CreditCard size={22} className="absolute text-blue-400 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Initiating Payment Gateway</h4>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Please do not close this tab. Transferring you to secure checkout for {selectedPlan.price}...
                  </p>
                </div>
              </div>
            ) : (
              /* 📋 ইউজার ডাটা এবং ডোমেইন ফর্ম */
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* ১. ফুল নেম */}
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
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500/80 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 outline-none transition-all font-medium"
                  />
                </div>

                {/* ২. এজেন্সির নাম */}
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
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500/80 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 outline-none transition-all font-medium"
                  />
                </div>

                {/* ৩. হোয়াটসঅ্যাপ নম্বর */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                    <Phone size={11} /> WhatsApp Number (For Lead Alerts)
                  </label>
                  <input 
                    type="tel" 
                    name="whatsappNumber"
                    required
                    placeholder="e.g. +1234567890"
                    value={formData.whatsappNumber}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500/80 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 outline-none transition-all font-medium"
                  />
                </div>

                {/* 🛠️ ডোমেইন ক্যাটাগরি সিলেক্টর */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                    <Globe size={11} /> Web Address Configuration
                  </label>
                  <div className="grid grid-cols-2 p-1 bg-slate-950 border border-slate-800 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setDomainType('subdomain')}
                      className={`py-2 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                        domainType === 'subdomain' 
                          ? 'bg-blue-600 text-white shadow-md' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Use Subdomain
                    </button>
                    <button
                      type="button"
                      onClick={() => setDomainType('custom')}
                      className={`py-2 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                        domainType === 'custom' 
                          ? 'bg-blue-600 text-white shadow-md' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Custom Domain
                    </button>
                  </div>
                </div>

                {/* ৪. ডাইনামিক ডোমেইন ইনপুট */}
                {domainType === 'subdomain' ? (
                  <div className="space-y-1.5 animate-in fade-in duration-150">
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                      <Globe size={11} /> Subdomain Username
                    </label>
                    <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-xl focus-within:border-blue-500/80 transition-all overflow-hidden">
                      <input 
                        type="text" 
                        name="customUsername"
                        required={domainType === 'subdomain'}
                        placeholder="marcus"
                        value={formData.customUsername}
                        onChange={handleInputChange}
                        className="w-full bg-transparent px-4 py-3 text-xs text-blue-400 placeholder-slate-700 outline-none font-bold"
                      />
                      <span className="absolute right-3 text-[10px] font-mono font-bold bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1 rounded-md pointer-events-none select-none">
                        .primeestates.com
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5 animate-in fade-in duration-150">
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                      <Link2 size={11} /> Existing Domain Name
                    </label>
                    <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-xl focus-within:border-blue-500/80 transition-all overflow-hidden">
                      <input 
                        type="text" 
                        name="customDomain"
                        required={domainType === 'custom'}
                        placeholder="e.g. www.youragency.com"
                        value={formData.customDomain}
                        onChange={handleInputChange}
                        className="w-full bg-transparent px-4 py-3 text-xs text-indigo-400 placeholder-slate-700 outline-none font-bold"
                      />
                    </div>
                  </div>
                )}

                {/* অ্যাকশন বাটন */}
                <div className="flex gap-3 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)} 
                    className="w-1/3 bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="w-2/3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    Proceed to Payment <ArrowRight size={13} />
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default CompanyPricing;