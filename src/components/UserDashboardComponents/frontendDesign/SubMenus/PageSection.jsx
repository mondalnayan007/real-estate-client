import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function PageSection() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h2 className="text-xl font-black text-white uppercase">Homepage Section Visibility</h2>
        <p className="text-xs text-slate-400">Toggle or reorder layout modules globally across the frontend target viewport.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200">Hero Slider Section</span>
          <button className="bg-emerald-500/10 text-emerald-400 p-1.5 rounded-lg text-xs flex items-center gap-1"><Eye size={14} /> Active</button>
        </div>
      </div>
    </div>
  );
}