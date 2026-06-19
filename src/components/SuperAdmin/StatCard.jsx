import React from 'react';

const StatCard = ({ title, value, change, icon: Icon, color }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-all">
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-10 pointer-events-none ${color}`} />
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-mono font-black text-white">{value}</h3>
          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
            {change}
          </span>
        </div>
        <div className={`p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 group-hover:text-white transition-colors`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;