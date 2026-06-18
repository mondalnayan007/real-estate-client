import React from 'react';
import { Plus, Image } from 'lucide-react';

export default function Slider() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white uppercase">Hero Banner Sliders</h2>
          <p className="text-xs text-slate-400">Upload graphical widescreen slider assets with multi-CTA tracking buttons.</p>
        </div>
        <button className="bg-rose-600 hover:bg-rose-500 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"><Plus size={14} /> Add Slide</button>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-500 text-xs flex flex-col items-center justify-center gap-2">
        <Image size={24} className="text-slate-700" /> No slider graphics detected. Create one to populate index.
      </div>
    </div>
  );
}