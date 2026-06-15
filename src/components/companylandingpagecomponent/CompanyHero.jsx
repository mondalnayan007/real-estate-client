import React from 'react';

const CompanyHero = () => {
  return (
    <header className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-blue-50/50 via-transparent to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-bold bg-blue-50 text-blue-700 mb-6 border border-blue-100">
          🚀 Next-Gen Multi-Agent Real Estate Infrastructure
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
          Launch Your Custom <span className="text-blue-600 underline decoration-wavy decoration-blue-200">Real Estate</span> Website in 60 Seconds
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Zero coding required. Choose a subscription plan, enter your agency name, and get an instant, ultra-fast demo website. Customize your layout, branding, logos, and properties instantly!
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="#pricing" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-xl shadow-blue-600/20 transition-all transform hover:-translate-y-1">
            Get Started Free
          </a>
          <a href="#features" className="bg-white hover:bg-slate-50 text-slate-800 font-bold px-8 py-4 rounded-xl shadow-md border border-slate-200 transition-all transform hover:-translate-y-1">
            Explore Features
          </a>
        </div>
      </div>
    </header>
  );
};

export default CompanyHero;