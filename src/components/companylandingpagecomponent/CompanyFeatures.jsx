import React from 'react';

const CompanyFeatures = () => {
  const features = [
    { icon: '✨', title: 'Instant Site Deployment', desc: 'Your customizable real estate portal goes live the exact second you subscribe.' },
    { icon: '🌐', title: 'Custom Domain Mapping', desc: 'Connect your personal domain (e.g., youragency.com) seamlessly with automated SSL routing.' },
    { icon: '🎨', title: 'Visual Branding Engine', desc: 'No code needed. Upload logos, configure typography, and apply corporate theme colors with 1-click.' },
    { icon: '📊', title: 'Lead Generation Dashboard', desc: 'Track every user inquiry, properties viewed, and capture valuable client contact data instantly.' },
    { icon: '⚡', title: 'Blazing Fast Performance', desc: 'Optimized on Edge networks ensuring your automated portfolio loads under 400ms for clients.' },
    { icon: '🛡️', title: 'Secure Virtual Architecture', desc: 'Dedicated tenant isolation ensuring your dynamic agency inventory and client logs are 100% secure.' }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight">Everything You Need to Scale Your Real Estate Agency</h2>
          <p className="mt-4 text-slate-600 text-base">Supercharge your listings and agent conversions with enterprise-grade modular features.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-xl hover:border-transparent transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-xl shadow-sm border border-slate-100 mb-6">{item.icon}</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyFeatures;