import React from 'react';

const CompanyFooter = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="text-xl font-black tracking-wider text-white">PRIME<span className="text-blue-500">ESTATES</span></div>
          <p className="text-sm text-slate-400 leading-relaxed">Empowering modern real estate brokers with automated virtual infrastructure and dynamic scaling portals globally.</p>
        </div>

        {/* Product Links */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Platform</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#features" className="hover:text-white transition-colors">Core Features</a></li>
            <li><a href="#pricing" className="hover:text-white transition-colors">Subscription Pricing</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Custom Infrastructure</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Resources</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Developer API</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Knowledge Base</a></li>
            <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="space-y-4">
          <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-2">Stay Updated</h4>
          <p className="text-xs text-slate-400">Get the latest feature updates and pricing notices directly in your inbox.</p>
          <div className="flex bg-slate-800 rounded-xl p-1 border border-slate-700/60">
            <input type="email" placeholder="Enter email" className="bg-transparent text-sm w-full pl-3 text-white focus:outline-none placeholder:text-slate-500" />
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">Join</button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t border-slate-800/60">
        <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} PrimeEstates SaaS Infrastructure. All rights reserved.</p>
        <div className="flex gap-6 text-xs text-slate-500">
          <a href="#" className="hover:text-slate-300">Terms of Service</a>
          <a href="#" className="hover:text-slate-300">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default CompanyFooter;