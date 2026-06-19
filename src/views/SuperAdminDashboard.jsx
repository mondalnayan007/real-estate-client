import React, { useState } from 'react';
import { Users, DollarSign, Layers, Activity, Search, RefreshCw, ArrowUpRight, ShieldCheck, CreditCard, Settings as SettingsIcon } from 'lucide-react';
import Sidebar from '../components/SuperAdmin/Sidebar';
import StatCard from '../components/SuperAdmin/StatCard';
import AgentRow from '../components/SuperAdmin/AgentRow';
import SubscriptionChart from '../components/SuperAdmin/SubscriptionChart';

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview'); // 👈 কারেন্ট একটিভ ট্যাব ট্র্যাকিং স্টেট
  const [searchTerm, setSearchTerm] = useState('');
  
  const [agents, setAgents] = useState([
    { id: 1, name: 'Marcus Aurelius', email: 'marcus@luxury.com', agencyName: 'Marcus Luxury Estates', subdomain: 'marcus', plan: 'Enterprise', price: '$99/mo', expiresAt: '2026-12-31', status: 'Active' },
    { id: 2, name: 'Babul Akter', email: 'babul@prime.com', agencyName: 'BD Rent Masters', subdomain: 'babul', plan: 'Professional', price: '$49/mo', expiresAt: '2026-08-15', status: 'Active' },
    { id: 3, name: 'John Doe', email: 'john@investments.com', agencyName: 'Apex Real Estate', subdomain: 'apex', plan: 'Starter', price: '$19/mo', expiresAt: '2026-07-01', status: 'Suspended' },
  ]);

  const handleToggleStatus = (id) => {
    setAgents(agents.map(agent => agent.id === id ? { ...agent, status: agent.status === 'Active' ? 'Suspended' : 'Active' } : agent));
  };

  const handleDeleteAgent = (id) => {
    if (window.confirm("Are you sure you want to terminate this subscription?")) {
      setAgents(agents.filter(agent => agent.id !== id));
    }
  };

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    agent.subdomain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* ১. সাইডবারে প্রপস পাস করা হলো */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 overflow-y-auto p-8 relative">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none" />

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-900">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              SaaS Command Center <span className="text-xs text-blue-500 font-mono font-bold bg-blue-500/10 px-2 py-1 rounded-md ml-2">{activeTab}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Global oversight framework and real-time infrastructure tracking.</p>
          </div>
          <button className="self-start sm:self-center flex items-center gap-2 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:border-slate-700 transition-all">
            <RefreshCw size={12} /> Sync Database
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 🏠 ট্যাব ১: OVERVIEW (এখানে চার্ট, স্ট্যাটস এবং টেবিল সব একসাথে থাকবে) */}
        {/* ========================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Stats Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard title="Registered Agents" value={agents.length} change="+12% this month" icon={Users} color="bg-blue-500" />
              <StatCard title="Monthly Revenue" value="$167" change="+8.4% ARR" icon={DollarSign} color="bg-emerald-500" />
              <StatCard title="Active Subdomains" value={agents.filter(a => a.status === 'Active').length} change="92.4% Ratio" icon={Layers} color="bg-purple-500" />
              <StatCard title="HQ Server Status" value="99.9%" change="0ms latency" icon={Activity} color="bg-rose-500" />
            </div>

            {/* Chart Box */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2"><SubscriptionChart /></div>
              <div className="bg-slate-900/60 border border-slate-900 p-6 rounded-2xl flex flex-col justify-between h-[300px]">
                <h4 className="text-xs font-black text-white uppercase tracking-wider">System Log Node</h4>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/60 font-mono text-[10px] text-blue-400 space-y-1">
                  <div>&gt; SSL_CERTIFICATE: VALID</div>
                  <div>&gt; ACTIVE_TOKENS: {agents.length * 4}</div>
                  <div className="text-emerald-400">&gt; DB_CLUSTER_STATUS: OPTIMAL</div>
                </div>
                <button className="w-full py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">
                  View Security Protocols <ArrowUpRight size={12} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 👥 ট্যাব ২: MANAGE AGENTS (এখানে শুধু এজেন্টদের টেবিল ফিল্টারিং সহ দেখাবে) */}
        {/* ========================================================================= */}
        {(activeTab === 'agents' || activeTab === 'overview') && (
          <div className={`${activeTab === 'agents' ? 'animate-fadeIn' : 'mt-10'}`}>
            <div className="bg-slate-900/60 border border-slate-900 rounded-2xl overflow-hidden backdrop-blur-sm">
              <div className="p-6 border-b border-slate-900/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">Tenant Subscription Profiles</h3>
                <div className="relative max-w-xs w-full">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={13} />
                  <input 
                    type="text"
                    placeholder="Search agent name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b border-slate-900">
                      <th className="px-6 py-4">Agent Identity</th>
                      <th className="px-6 py-4">Subdomain Instance</th>
                      <th className="px-6 py-4">Tier Model</th>
                      <th className="px-6 py-4">Expiration Core</th>
                      <th className="px-6 py-4">System State</th>
                      <th className="px-6 py-4 text-right">Operational Logic</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900">
                    {filteredAgents.map(agent => (
                      <AgentRow key={agent.id} agent={agent} onToggleStatus={handleToggleStatus} onDeleteAgent={handleDeleteAgent} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 💳 ️ট্যাব ৩: SUBSCRIPTIONS (প্ল্যান ও বিলিং সামারি সেকশন) */}
        {/* ========================================================================= */}
        {activeTab === 'subscriptions' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            {['Starter', 'Professional', 'Enterprise'].map((tier, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">{tier} Plan</h4>
                  <CreditCard size={16} className="text-blue-500" />
                </div>
                <p className="text-3xl font-mono font-black text-white mb-2">{i===0 ? '$19' : i===1 ? '$49' : '$99'}<span className="text-xs text-slate-500 font-sans font-normal">/month</span></p>
                <div className="text-xs text-slate-400 mt-4 pt-4 border-t border-slate-800 space-y-2">
                  <div className="flex justify-between"><span>Active Subscribers:</span> <span className="font-bold text-white font-mono">{i===0 ? '1' : i===1 ? '1' : '1'}</span></div>
                  <div className="flex justify-between"><span>Gateway:</span> <span className="text-emerald-400 font-bold">Stripe Live</span></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* ⚙️ ট্যাব ৪: SYSTEM SETTINGS (গ্লোবাল প্ল্যাটফর্ম কনফিগারেশন) */}
        {/* ========================================================================= */}
        {activeTab === 'settings' && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-2xl animate-fadeIn space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
              <SettingsIcon size={16} className="text-blue-500" />
              <h4 className="text-xs font-black text-white uppercase tracking-wider">SaaS Global Variables</h4>
            </div>
            <div className="space-y-4 text-xs">
              <div className="flex flex-col gap-2">
                <label className="font-bold text-slate-400 uppercase tracking-wider">Root Platform Domain</label>
                <input type="text" defaultValue="primeestates.com" className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-white outline-none focus:border-blue-500" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-slate-400 uppercase tracking-wider">Maintenance Mode</label>
                <div className="flex items-center gap-3 mt-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                  <span className="text-slate-400 font-medium">Inactive (Platform is Live)</span>
                </div>
              </div>
              <button className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl uppercase tracking-wider transition-colors mt-4">
                Save Core Settings
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default SuperAdminDashboard;