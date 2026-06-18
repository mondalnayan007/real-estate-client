import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function Features() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h2 className="text-xl font-black text-white uppercase">Value Proposition Features</h2>
        <p className="text-xs text-slate-400">List marketing icons highlighting unique architecture features or service values.</p>
      </div>
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-3 max-w-sm">
        <div className="p-2 bg-rose-500/10 text-rose-500 rounded-lg"><Sparkles size={16} /></div>
        <div>
          <h4 className="text-xs font-bold text-white">24/7 Smart Security Vectors</h4>
          <p className="text-[10px] text-slate-500">Biometric perimeter systems asset integration.</p>
        </div>
      </div>
    </div>
  );
}