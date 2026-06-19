import React from 'react';
import { ShieldAlert, ShieldCheck, ExternalLink, Trash2 } from 'lucide-react';

const AgentRow = ({ agent, onToggleStatus, onDeleteAgent }) => {
  return (
    <tr className="border-b border-slate-800/60 hover:bg-slate-900/30 transition-colors text-xs">
      {/* এজেন্ট ও ইনফো */}
      <td className="px-6 py-4.5 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-black uppercase text-[11px]">
            {agent.name.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-white text-sm">{agent.name}</div>
            <div className="text-slate-500">{agent.email}</div>
          </div>
        </div>
      </td>

      {/* এজেন্সি ও সাবডোমেইন */}
      <td className="px-6 py-4.5 whitespace-nowrap">
        <div className="font-medium text-slate-300">{agent.agencyName}</div>
        <a 
          href={`https://${agent.subdomain}.primeestates.com`} 
          target="_blank" 
          rel="noreferrer"
          className="text-blue-400 hover:underline flex items-center gap-1 mt-0.5"
        >
          {agent.subdomain}.primeestates.com <ExternalLink size={10} />
        </a>
      </td>

      {/* প্ল্যান ও রেভেনিউ */}
      <td className="px-6 py-4.5 whitespace-nowrap">
        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
          agent.plan === 'Enterprise' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
          agent.plan === 'Professional' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
          'bg-slate-800 text-slate-400'
        }`}>
          {agent.plan}
        </span>
        <div className="text-slate-400 font-mono mt-1 font-bold">{agent.price}</div>
      </td>

      {/* মেয়াদ বা এক্সপায়ারি ডেট */}
      <td className="px-6 py-4.5 whitespace-nowrap font-mono text-slate-400">
        {agent.expiresAt}
      </td>

      {/* স্ট্যাটাস ব্যাজ */}
      <td className="px-6 py-4.5 whitespace-nowrap">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
          agent.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${agent.status === 'Active' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
          {agent.status}
        </span>
      </td>

      {/* অ্যাকশন বাটনসমূহ (সুপার এডমিন কন্ট্রোল) */}
      <td className="px-6 py-4.5 whitespace-nowrap text-right space-x-2">
        <button
          onClick={() => onToggleStatus(agent.id)}
          title={agent.status === 'Active' ? "Suspend Agent" : "Activate Agent"}
          className={`p-2 rounded-lg border transition-colors ${
            agent.status === 'Active' 
              ? 'bg-slate-950 border-slate-800 text-amber-500 hover:border-amber-500/40 hover:bg-amber-500/5' 
              : 'bg-slate-950 border-slate-800 text-emerald-500 hover:border-emerald-500/40 hover:bg-emerald-500/5'
          }`}
        >
          {agent.status === 'Active' ? <ShieldAlert size={14} /> : <ShieldCheck size={14} />}
        </button>
        <button
          onClick={() => onDeleteAgent(agent.id)}
          title="Delete Access"
          className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-rose-500 hover:border-rose-500/40 hover:bg-rose-500/5 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </td>
    </tr>
  );
};

export default AgentRow;