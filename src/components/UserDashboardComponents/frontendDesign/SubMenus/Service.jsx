import React from 'react';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function Service() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h2 className="text-xl font-black text-white uppercase">Commercial Operations & Services</h2>
        <p className="text-xs text-slate-400">Define operational vectors like asset brokerage, legal evaluation etc.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between h-28">
          <ShieldCheck className="text-rose-500" size={20} />
          <div className="flex justify-between items-end">
            <span className="text-xs font-bold text-white">Asset Legal Escrow</span>
            <ArrowUpRight size={14} className="text-slate-500" />
          </div>
        </div>
      </div>
    </div>
  );
}