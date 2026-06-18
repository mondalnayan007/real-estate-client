import React from 'react';
import { FilePlus, Edit } from 'lucide-react';

export default function ManagePage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white uppercase">Independent Core Pages</h2>
          <p className="text-xs text-slate-400">Create, deploy or inject rich content templates into customized static pages.</p>
        </div>
        <button className="bg-rose-600 hover:bg-rose-500 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"><FilePlus size={14} /> Create Page</button>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between text-xs text-slate-300">
        <span>About Us Page — <strong className="text-slate-500">/about-us</strong></span>
        <button className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white"><Edit size={14} /></button>
      </div>
    </div>
  );
}