import React from 'react';
import { MessageSquare, Phone, User, Calendar } from 'lucide-react';

export default function LeadManagement({ leads, tracking }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h2 className="text-xl font-black text-white uppercase">Centralized Message Box</h2>
        <p className="text-xs text-slate-400">Incoming enquiries from property pages and user CTA interface analytics.</p>
      </div>

      {/* Button Action Reporting */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg"><MessageSquare size={16} /></div>
            <span className="text-xs font-semibold text-slate-300">WhatsApp Redirection Clicks</span>
          </div>
          <span className="text-lg font-mono font-black text-white">{tracking.whatsappClicks} Hits</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><Phone size={16} /></div>
            <span className="text-xs font-semibold text-slate-300">"Call Now" Mobile Conversions</span>
          </div>
          <span className="text-lg font-mono font-black text-white">{tracking.phoneCalls} Hits</span>
        </div>
      </div>

      {/* Inbox List Stream */}
      <div className="space-y-3">
        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Buyer Communication Stream</p>
        {leads.map(lead => (
          <div key={lead.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/50 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center text-slate-400"><User size={12} /></div>
                <span className="text-xs font-bold text-white">{lead.name}</span>
                <span className="text-[9px] font-mono bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded font-bold">{lead.property}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1"><Calendar size={11} /> {lead.date}</span>
            </div>
            <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800/40 font-medium">"{lead.message}"</p>
            <div className="flex flex-wrap gap-4 text-[10px] font-mono text-slate-400">
              <span>Mobile Phone: <strong className="text-white">{lead.phone}</strong></span>
              <span>Email Node: <strong className="text-white">{lead.email}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}