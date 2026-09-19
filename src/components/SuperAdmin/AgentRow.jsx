import React from 'react';
import { ShieldAlert, ShieldCheck, ExternalLink, Trash2 } from 'lucide-react';

const AgentRow = ({ agent, onToggleStatus, onDeleteAgent }) => {
  return (
    <tr className="border-b border-slate-200 hover:bg-slate-50/80 transition-colors text-xs bg-white">
      {/* এজেন্ট ও ইনফো */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold uppercase text-[11px]">
            {agent.name?.charAt(0) || 'A'}
          </div>
          <div>
            <div className="font-semibold text-slate-900 text-sm">{agent.name}</div>
            <div className="text-slate-500">{agent.email}</div>
          </div>
        </div>
      </td>

      {/* এজেন্সি ও সাবডোমেইন */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-slate-700">{agent.agencyName || 'N/A'}</div>
        {agent.subdomain ? (
          <a 
            href={`https://${agent.subdomain}.primeestates.com`} 
            target="_blank" 
            rel="noreferrer"
            className="text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 mt-0.5 font-medium"
          >
            {agent.subdomain}.primeestates.com <ExternalLink size={10} />
          </a>
        ) : (
          <span className="text-slate-400">No Subdomain</span>
        )}
      </td>

      {/* প্ল্যান ও রেভেনিউ */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
          agent.plan === 'Enterprise' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
          agent.plan === 'Professional' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
          'bg-slate-100 text-slate-600 border border-slate-200'
        }`}>
          {agent.plan || 'Free'}
        </span>
        <div className="text-slate-600 font-mono mt-1 font-bold">{agent.price || '$0'}</div>
      </td>

      {/* মেয়াদ বা এক্সপায়ারি ডেট */}
      <td className="px-6 py-4 whitespace-nowrap font-mono text-slate-600 font-medium">
        {agent.expiresAt || 'N/A'}
      </td>

      {/* স্ট্যাটাস ব্যাজ */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
          agent.status === 'Active' 
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
            : 'bg-rose-50 text-rose-700 border border-rose-200'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${agent.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
          {agent.status || 'Pending'}
        </span>
      </td>

      {/* অ্যাকশন বাটনসমূহ (সুপার এডমিন কন্ট্রোল) */}
      <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
        <button
          onClick={() => onToggleStatus(agent.id || agent._id)}
          title={agent.status === 'Active' ? "Suspend Agent" : "Activate Agent"}
          className={`p-2 rounded-lg border transition-all ${
            agent.status === 'Active' 
              ? 'bg-white border-slate-200 text-amber-600 hover:border-amber-300 hover:bg-amber-50' 
              : 'bg-white border-slate-200 text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50'
          }`}
        >
          {agent.status === 'Active' ? <ShieldAlert size={15} /> : <ShieldCheck size={15} />}
        </button>
        <button
          onClick={() => onDeleteAgent(agent.id || agent._id)}
          title="Delete Access"
          className="p-2 rounded-lg bg-white border border-slate-200 text-rose-600 hover:border-rose-300 hover:bg-rose-50 transition-all"
        >
          <Trash2 size={15} />
        </button>
      </td>
    </tr>
  );
};

export default AgentRow;