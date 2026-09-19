import React from 'react';

const StatCard = ({ title, value, change, icon: Icon, color }) => {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-2xl relative overflow-hidden group hover:border-slate-300 hover:shadow-md transition-all">
      {/* সফট ব্যাকগ্রাউন্ড গ্লো (Light Theme Glow) */}
      <div className={`absolute -top-4 -right-4 w-24 h-24 rounded-full blur-[40px] opacity-15 pointer-events-none ${color}`} />
      
      <div className="flex items-center justify-between relative z-10">
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-mono font-black text-slate-900">{value}</h3>
          <span className="inline-block text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">
            {change}
          </span>
        </div>
        
        {/* আইকন বক্স */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 group-hover:bg-slate-100 group-hover:text-slate-900 transition-colors">
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;