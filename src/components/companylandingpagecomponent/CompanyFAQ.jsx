import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';

const CompanyFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Will my custom URL or subdomain go live instantly?",
      answer: "Yes, absolutely! The exact second you complete the subscription form, our automated cloud provisioning engine deploys your dedicated portal. Your unique workspace (e.g., username.primeestates.com) will be 100% live and ready for production with zero manual approval delays."
    },
    {
      question: "Can I connect my own custom domain later?",
      answer: "Definitely. Custom domain mapping is fully supported on our Professional and Enterprise tiers. You can map your root domain or custom subdomain (e.g., properties.youragency.com) by pointing a CNAME or A Record to our edge networks. We also handle automated, free SSL routing renewal for you."
    },
    {
      question: "Where and how do I receive client leads and messages?",
      answer: "Every single property listing page features dynamic call-to-actions, including an automated WhatsApp trigger and a smart contact form. When a client inquires, it routes directly to your configured WhatsApp number with the exact property link attached. Simultaneously, all lead data logs securely inside your centralized CRM dashboard."
    },
    {
      question: "Can I upgrade, downgrade, or cancel my plan at any time?",
      answer: "Yes, we believe in complete operational flexibility. There are no long-term locking contracts, setup overheads, or hidden termination fees. You can seamlessly switch between tiers, modify your billing cycle, or terminate your subscription directly through your superadmin billing node."
    },
    {
      question: "What exactly does the 'White-Labeled' infrastructure mean?",
      answer: "Exclusive to our Enterprise plan, white-labeling completely scrubs all 'PrimeEstates' branding, logos, and signatures from your web portals, emails, and client-facing dashboards. Your platform functions as an elite, standalone software built entirely under your own corporate identity."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-28 bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* 🌌 Background Dynamic Mesh Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className=" px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 📢 Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full text-[11px] font-bold text-indigo-400 uppercase tracking-widest">
            <HelpCircle size={12} /> FAQ Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Frequently Asked <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Questions</span>
          </h2>
          <p className="text-slate-400 text-sm font-medium">
            Everything you need to know about your deployment nodes, billing models, and workspace environments.
          </p>
        </div>

        {/* 🗂️ Accordion Matrix */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen 
                    ? 'bg-slate-900/80 border-indigo-500/40 shadow-xl shadow-indigo-500/5' 
                    : 'bg-slate-900/30 border-slate-900 hover:border-slate-800'
                }`}
              >
                {/* Interactive Question Header */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left outline-none group"
                >
                  <span className={`text-sm sm:text-base font-bold uppercase tracking-tight transition-colors ${
                    isOpen ? 'text-indigo-400' : 'text-white group-hover:text-indigo-300'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-indigo-400 border-indigo-500/30' : ''
                  }`}>
                    <ChevronDown size={16} />
                  </div>
                </button>

                {/* Smooth Expansion Answer Block */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[300px] border-t border-slate-800/60' : 'max-h-0'
                  }`}
                >
                  <p className="p-6 text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      

      </div>
    </section>
  );
};

export default CompanyFAQ;