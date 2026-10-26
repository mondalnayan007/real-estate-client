import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Where is the project located and what about communication access?",
      answer: "Our project is situated in a prime and peaceful location of the city, offering seamless connectivity to main roads, educational institutions, hospitals, and commercial hubs."
    },
    {
      question: "What is the standard booking process and requirements?",
      answer: "The booking process is straightforward. You need to submit a completed booking application form along with the required booking security deposit and identification documents."
    },
    {
      question: "When can we expect the handover of the property?",
      answer: "We are strictly committed to completing construction and handing over properties within the stipulated schedule. Specific timelines are shared based on the project phase."
    },
    {
      question: "Are flexible installment or payment facilities available?",
      answer: "Yes, we offer easy and structured installment payment plans following an initial down payment, allowing you to manage your investment comfortably."
    },
    {
      question: "Are all legal documents and regulatory approvals verified?",
      answer: "Absolutely. All our real estate projects are 100% legally compliant, approved by relevant development authorities (such as RAJUK/local boards), and completely transparent."
    }
  ];

  return (
    <div className="  py-6 px-4 sm:px-6 bg-white text-slate-900">
      
      {/* Header (Slim Height) */}
      <div className="text-center space-y-1.5 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#007b57] text-[11px] font-black tracking-wider uppercase border border-emerald-100">
          <HelpCircle size={13} />
          <span>Got Questions?</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-xs font-semibold text-slate-500 max-w-md mx-auto">
          Clear answers to common inquiries regarding our properties and booking.
        </p>
      </div>

      {/* FAQ Accordion List (Compact Height & Smooth Transition) */}
      <div className="space-y-2.5">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;
          return (
            <div 
              key={index}
              className="bg-white border border-slate-200/90 rounded-xl overflow-hidden transition-all duration-300 hover:border-slate-300 shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-4 py-3 text-left font-extrabold text-xs sm:text-sm text-slate-900 focus:outline-none transition-colors"
              >
                <span className="flex items-center gap-2.5 pr-3">
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0 transition-all duration-300 ${isOpen ? 'bg-[#007b57] text-white' : 'bg-emerald-50 text-[#007b57] border border-emerald-100'}`}>
                    0{index + 1}
                  </span>
                  {faq.question}
                </span>
                <ChevronDown 
                  size={16} 
                  className={`text-slate-400 transition-transform duration-300 ease-in-out shrink-0 ${isOpen ? 'rotate-180 text-[#007b57]' : ''}`} 
                />
              </button>
              
              {/* Ultra Smooth Open/Close Animation */}
              <div 
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100 pb-3.5 px-4' : 'grid-rows-[0fr] opacity-0 pb-0 px-4'
                }`}
              >
                <div className="overflow-hidden text-xs font-semibold text-slate-600 leading-normal border-t border-slate-100 pt-2.5">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}