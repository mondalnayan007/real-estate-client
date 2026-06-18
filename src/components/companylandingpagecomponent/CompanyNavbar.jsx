import React, { useState } from 'react';
import { Link } from 'react-router';
import { FaTerminal, FaBars, FaXmark, FaArrowRight } from 'react-icons/fa6';
import { FaSignInAlt } from 'react-icons/fa';

const CompanyNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/70 backdrop-blur-md border-b border-slate-900/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* 🚀 Brand Logo Section */}
          <div className="flex items-center gap-2.5 select-none group">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform duration-300">
              <FaTerminal size={14} />
            </div>
            <span className="text-xl font-black tracking-wider text-white">
              PRIME<span className="text-blue-500">ESTATES</span>
            </span>
            <span className="bg-blue-500/10 text-blue-400 text-[9px] font-bold uppercase px-2 py-0.5 rounded-md border border-blue-500/20 tracking-wider">
              SaaS Core
            </span>
          </div>
          
          {/* 📡 Desktop Link Matrix */}
          <div className="hidden md:flex items-center gap-8 font-medium text-xs uppercase tracking-wider text-slate-400">
            {menuLinks.map((link, idx) => (
              <a 
                key={idx} 
                href={link.href} 
                className="hover:text-white transition-colors relative py-2 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* 🔒 Gateway Action Buttons */}
          <div className="hidden md:flex items-center gap-6">
            <a 
              href="/login" 
              className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider transition-colors flex items-center gap-1.5 group"
            >
              <FaSignInAlt size={12} className="text-slate-500 group-hover:text-blue-400 transition-colors" /> Sign In
            </a>
            <Link 
              to={'/register'} 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all flex items-center gap-1.5 group"
            >
              Activate Workspace <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 📱 Mobile Menu Trigger */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-slate-400 hover:text-white p-2 focus:outline-none bg-slate-900 border border-slate-800 rounded-xl transition-all"
            >
              {isOpen ? <FaXmark size={16} /> : <FaBars size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* 📥 Mobile Expansion Drawer */}
      {isOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-lg border-b border-slate-900 px-4 pt-4 pb-8 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1">
            {menuLinks.map((link, idx) => (
              <a 
                key={idx} 
                href={link.href} 
                onClick={() => setIsOpen(false)} 
                className="block font-bold text-slate-400 hover:text-white py-3 border-b border-slate-900/60 text-xs uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <div className="pt-2 space-y-4">
            <a 
              href="/login" 
              className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider py-3 bg-slate-900 border border-slate-800 rounded-xl"
            >
              <FaSignInAlt size={12} /> Account Sign In
            </a>
            <Link 
              to={'/register'} 
              onClick={() => setIsOpen(false)} 
              className="block text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-blue-500/10"
            >
              Create Your Website
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default CompanyNavbar;