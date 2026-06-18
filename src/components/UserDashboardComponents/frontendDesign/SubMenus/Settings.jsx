import React from 'react';
import { Save } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h2 className="text-xl font-black text-white uppercase">General Frontend Settings</h2>
        <p className="text-xs text-slate-400">Configure global metadata, logo asset nodes, and copyright typography.</p>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 max-w-2xl">
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-slate-400">Site Title</label>
          <input type="text" placeholder="e.g. Premium Real Estate" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white" />
        </div>
        <button className="bg-rose-600 hover:bg-rose-500 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"><Save size={14} /> Save Config</button>
      </div>
    </div>
  );
}