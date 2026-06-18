import React from 'react';
import { FolderHeart } from 'lucide-react';

export default function Gallery() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h2 className="text-xl font-black text-white uppercase">Visual Resource Categories</h2>
        <p className="text-xs text-slate-400">Classify spatial structures into folders like Interiours, Exteriors or Blueprints.</p>
      </div>
      <div className="bg-slate-900 border border-slate-800 px-4 py-3 rounded-xl inline-flex items-center gap-2 text-xs font-bold text-slate-300">
        <FolderHeart size={14} className="text-indigo-400" /> Luxury Penthouse Nodes
      </div>
    </div>
  );
}