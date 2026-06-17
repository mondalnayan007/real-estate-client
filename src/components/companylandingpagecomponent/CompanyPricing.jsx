import React, { useState } from 'react';

const CompanyPricing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [formData, setFormData] = useState({ agencyName: '', subdomain: '', email: '' });

  const pricingPlans = [
    { name: 'Starter Plan', price: '$19', features: ['Instant Subdomain Lookup', 'Up to 10 Property Listings', 'Default Luxury Template Theme', 'Basic CRM Dashboard Tracking'] },
    { name: 'Professional Plan', price: '$49', features: ['Custom Domain Integration', 'Up to 100 Property Listings', 'Full Logo & Theme Customization', 'Advanced Performance Analytics', '24/7 Priority Support'], isPopular: true },
    { name: 'Enterprise Plan', price: '$99', features: ['White-Labeled Custom Domain', 'Unlimited Property Listings', 'Multi-Agent Team Accounts', 'Dedicated Account Executive', 'API Access Webhooks'] }
  ];

  const handleOpenModal = (planName) => {
    setSelectedPlan(planName);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Success! Plan: ${selectedPlan}\nAgency: ${formData.agencyName}\nSubdomain: ${formData.subdomain}.primeestates.com`);
    setIsModalOpen(false);
    setFormData({ agencyName: '', subdomain: '', email: '' });
  };

  return (
    <section id="pricing" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight">Simple, Transparent Pricing Models</h2>
          <p className="mt-4 text-slate-600">Choose the perfect tier to grow your property ecosystem. No hidden deployment fees.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan, index) => (
            <div key={index} className={`relative flex flex-col p-8 bg-white rounded-3xl transition-all ${plan.isPopular ? 'ring-4 ring-blue-600 shadow-2xl scale-105 z-10 md:-translate-y-2' : 'border border-slate-200 shadow-md hover:shadow-xl'}`}>
              {plan.isPopular && (
                <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">Most Popular</span>
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
                    <svg className="h-5 w-5 text-emerald-500 shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleOpenModal(plan.name)}
                className={`w-full py-4 px-6 rounded-xl text-center font-bold text-sm transition-all ${plan.isPopular ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'}`}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ==========================================
          🎁 🔲 DYNAMIC ONBOARDING MODAL
         ========================================== */}
      
    </section>
  );
};

export default CompanyPricing;