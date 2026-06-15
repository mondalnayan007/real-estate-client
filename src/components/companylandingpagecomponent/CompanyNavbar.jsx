import React, { useState } from 'react';

const CompanyNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 select-none">
            <span className="text-2xl font-black tracking-wider text-blue-600">
              PRIME<span className="text-slate-900">ESTATES</span>
            </span>
            <span className="bg-blue-50 text-blue-700 text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border border-blue-100">
              SaaS
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 font-semibold text-sm text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-blue-600 transition-colors">Success Stories</a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-5">
            <a href="/login" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors">
              Sign In
            </a>
            <a href="#pricing" className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold px-5 py-3 rounded-xl shadow-lg shadow-slate-900/10 transition-all transform hover:-translate-y-0.5">
              Create Your Website
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-slate-700 p-2 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Open */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <a href="#features" onClick={() => setIsOpen(false)} className="block font-semibold text-slate-600 py-2">Features</a>
          <a href="#pricing" onClick={() => setIsOpen(false)} className="block font-semibold text-slate-600 py-2">Pricing</a>
          <a href="/login" className="block font-semibold text-slate-600 py-2">Sign In</a>
          <a href="#pricing" onClick={() => setIsOpen(false)} className="block text-center bg-blue-600 text-white font-bold py-3 rounded-xl">Create Your Website</a>
        </div>
      )}
    </nav>
  );
};

export default CompanyNavbar;