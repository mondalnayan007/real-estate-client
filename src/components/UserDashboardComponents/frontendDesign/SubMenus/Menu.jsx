import React from 'react';
import { Plus, ListOrdered } from 'lucide-react';

export default function Menu() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white uppercase">Navigation Menu Structure</h2>
          <p className="text-xs text-slate-400">Arrange main navbar routing hierarchies and link labels.</p>
        </div>
        <button className="bg-rose-600 hover:bg-rose-500 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"><Plus size={14} /> Add Nav Link</button>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-3"><ListOrdered size={14} className="text-slate-500" /> <span>Home — ( / )</span></div>
        <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Core Route</span>
      </div>
    </div>
  );
}