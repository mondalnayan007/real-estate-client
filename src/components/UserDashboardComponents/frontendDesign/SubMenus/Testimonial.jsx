import React from 'react';
import { Quote, Star } from 'lucide-react';

export default function Testimonial() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h2 className="text-xl font-black text-white uppercase">Client Endorsement Stream</h2>
        <p className="text-xs text-slate-400">Manage social proof reviews and developer credentials sent by buyers.</p>
      </div>
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 max-w-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white">Zayan Al Mansoor</span>
          <div className="flex text-amber-500"><Star size={10} fill="currentColor" /></div>
        </div>
        <p className="text-xs text-slate-400 italic">"Phenomenal transaction flow handled by the dynamic deployment network."</p>
      </div>
    </div>
  );
}