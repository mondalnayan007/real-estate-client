import React from 'react';
import { Palette, Globe, Shield } from 'lucide-react';

export default function BrandingTheme({ branding, setBranding }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-3xl">
      <div>
        <h2 className="text-xl font-black text-white uppercase">Branding & Layout Configuration</h2>
        <p className="text-xs text-slate-400">Map your business typography parameters, custom logos and navigation colors.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Uploads & Identity */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5"><Shield size={13} fill="#3b82f6" /> Identity Profile Settings</h3>
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Company Logo Image Link</label>
            <input type="text" value={branding.logo} onChange={e => setBranding({...branding, logo: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none" />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Site Favicon Link</label>
            <input type="text" value={branding.favicon} onChange={e => setBranding({...branding, favicon: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Primary Color</label>
              <input type="color" value={branding.primaryColor} onChange={e => setBranding({...branding, primaryColor: e.target.value})} className="w-full h-10 p-0.5 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer" />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Secondary Color</label>
              <input type="color" value={branding.secondaryColor} onChange={e => setBranding({...branding, secondaryColor: e.target.value})} className="w-full h-10 p-0.5 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Footers Nodes */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5"><Globe size={13} fill="#10b981" /> Footer Coordinates & Contact</h3>
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Office Corporate Address</label>
            <input type="text" value={branding.address} onChange={e => setBranding({...branding, address: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Official Support Phone</label>
            <input type="text" value={branding.phone} onChange={e => setBranding({...branding, phone: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Support Email Address</label>
            <input type="email" value={branding.email} onChange={e => setBranding({...branding, email: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Facebook Network Link</label>
              <input type="text" value={branding.facebook} onChange={e => setBranding({...branding, facebook: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">LinkedIn Network Link</label>
              <input type="text" value={branding.linkedin} onChange={e => setBranding({...branding, linkedin: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}