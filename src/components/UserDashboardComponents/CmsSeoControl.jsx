import React from 'react';
import { Globe, FileText, Search } from 'lucide-react';

export default function CmsSeoControl({ cms, setCms }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-3xl">
      <div>
        <h2 className="text-xl font-black text-white uppercase">Content Management & SEO Center</h2>
        <p className="text-xs text-slate-400">Deploy layout taglines, editorial legal text copy and search engine injection nodes.</p>
      </div>

      {/* Hero Home Banner Settings */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase flex items-center gap-1.5"><Globe size={13} fill="#2563eb" /> Homepage Hero Banner Settings</h3>
        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Main Hero Title Catchphrase</label>
          <input type="text" value={cms.heroTitle} onChange={e => setCms({...cms, heroTitle: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none" />
        </div>
        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Sub-Slogan Tagline Statement</label>
          <textarea rows="2" value={cms.heroSlogan} onChange={e => setCms({...cms, heroSlogan: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none" />
        </div>
      </div>

      {/* Static Core Pages Text */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase flex items-center gap-1.5"><FileText size={13} fill="#f59e0b" /> Static Page Corporate Copy Editor</h3>
        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">'About Us' Page Content</label>
          <textarea rows="2" value={cms.aboutUs} onChange={e => setCms({...cms, aboutUs: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none" />
        </div>
        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">'Contact Us' Infrastructure Text</label>
          <textarea rows="2" value={cms.contactUs} onChange={e => setCms({...cms, contactUs: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none" />
        </div>
        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">'Terms & Conditions' Legal Copy</label>
          <textarea rows="2" value={cms.terms} onChange={e => setCms({...cms, terms: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none" />
        </div>
      </div>

      {/* Google Ranking Nodes */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase flex items-center gap-1.5"><Search size={13} fill="#10b981" /> Search Engine Optimization Metadata (SEO)</h3>
        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Global Meta Title (Tabs Layout)</label>
          <input type="text" value={cms.metaTitle} onChange={e => setCms({...cms, metaTitle: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none" />
        </div>
        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Meta Description Snippet</label>
          <textarea rows="2" value={cms.metaDesc} onChange={e => setCms({...cms, metaDesc: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none" />
        </div>
        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Index Targeting Keywords (Comma Separated)</label>
          <input type="text" value={cms.keywords} onChange={e => setCms({...cms, keywords: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none" />
        </div>
      </div>
    </div>
  );
}