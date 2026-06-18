import React from 'react';
import { FaPaperPlane, FaTwitter, FaLinkedinIn, FaGithub, FaShieldHalved, FaGlobe, FaTerminal } from 'react-icons/fa6';

const CompanyFooter = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-20 border-t border-slate-900 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-gradient-to-t from-blue-500/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
          
          <div className="md:col-span-4 space-y-5">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white shadow-lg shadow-blue-500/20">
                <FaTerminal size={14} />
              </div>
              <div className="text-xl font-black tracking-wider text-white">
                PRIME<span className="text-blue-500">ESTATES</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium max-w-sm">
              Empowering modern real estate brokers with automated virtual infrastructure, instant subdomains, and dynamic scaling portals globally.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2.5 bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:text-white rounded-xl transition-all duration-300">
                <FaTwitter size={13} />
              </a>
              <a href="#" className="p-2.5 bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:text-white rounded-xl transition-all duration-300">
                <FaLinkedinIn size={13} />
              </a>
              <a href="#" className="p-2.5 bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:text-white rounded-xl transition-all duration-300">
                <FaGithub size={13} />
              </a>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Platform
            </h4>
            <ul className="space-y-3 text-xs font-medium">
              <li><a href="#features" className="hover:text-blue-400 transition-colors">Core Features</a></li>
              <li><a href="#pricing" className="hover:text-blue-400 transition-colors">Subscription Pricing</a></li>
              <li><a href="#faq" className="hover:text-blue-400 transition-colors">FAQ Framework</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition-colors">Custom Deployment</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Resources
            </h4>
            <ul className="space-y-3 text-xs font-medium">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Developer API</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Knowledge Base</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors flex items-center gap-2">System Status <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /></a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Cloud Nodes</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="text-white text-[10px] font-bold uppercase tracking-widest">Stay Updated</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Get the latest core feature log, runtime patches, and infrastructure notices directly in your inbox.
            </p>
            <div className="flex bg-slate-900 border border-slate-800 focus-within:border-blue-500/50 rounded-xl p-1.5 transition-all">
              <input type="email" placeholder="Enter administrator email" className="bg-transparent text-xs w-full pl-2 text-white focus:outline-none placeholder:text-slate-600 font-medium" />
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold p-2.5 rounded-lg transition-all shadow-md shadow-blue-600/10 flex items-center justify-center">
                <FaPaperPlane size={11} />
              </button>
            </div>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t border-slate-900/60 text-[11px] font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <FaShieldHalved size={12} className="text-blue-500/60" />
            <p>&copy; {new Date().getFullYear()} PrimeEstates SaaS Core. Systems Operational.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <span className="flex items-center gap-1.5 text-slate-600">
              <FaGlobe size={11} /> US-EAST-1
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CompanyFooter;