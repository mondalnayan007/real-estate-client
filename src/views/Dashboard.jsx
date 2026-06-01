import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { 
  LayoutDashboard, Building2, Users, FileText, Bell, 
  Search, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight,
  Plus, Filter, MoreVertical, Layers, MessageSquare, ShieldAlert, LogOut,
  CheckCircle, Trash2, Send, Star, AlertCircle
} from 'lucide-react';

// Mock Data for Luxury Listings
const initialProperties = [
  { id: '#PRP-001', title: 'The Obsidian Penthouse', location: 'New York, NY', price: '$4,850,000', status: 'Active', category: 'Penthouse', views: '1,240' },
  { id: '#PRP-002', title: 'Serene Woods Estate', location: 'Austin, TX', price: '$6,200,000', status: 'Pending', category: 'Luxury Villa', views: '942' },
  { id: '#PRP-003', title: 'Azure Coast Condos', location: 'Miami, FL', price: '$2,920,000', status: 'Active', category: 'Penthouse', views: '1,811' },
  { id: '#PRP-004', title: 'The Luminary Mansion', location: 'Beverly Hills, CA', price: '$12,500,000', status: 'Sold', category: 'Modern Mansion', views: '3,410' },
];

// Mock Data for Recent Leads/Newsletter Signups
const initialLeads = [
  { id: 'L-101', name: 'Marcus Brody', email: 'm.brody@vanguard.com', property: 'The Obsidian Penthouse', date: 'Just now', type: 'Viewing Request', status: 'New' },
  { id: 'L-102', name: 'Sophia Loren', email: 'sophia@lorenphilo.org', property: 'General Registry', date: '25 mins ago', type: 'Newsletter', status: 'Processed' },
  { id: 'L-103', name: 'Julian Alvarez', email: 'j.alvarez@techcorp.io', property: 'The Luminary Mansion', date: '2 hours ago', type: 'Offer Submitted', status: 'New' },
];

// Mock Data for Reviews
const initialReviews = [
  { id: 'R-01', user: 'Elena Rostova', rating: 5, comment: 'Absolute masterpiece of architecture. The Obsidian Penthouse view is unreal.', property: 'The Obsidian Penthouse', status: 'Approved' },
  { id: 'R-02', user: 'David Vance', rating: 4, comment: 'Beautiful estate, support staff was highly professional during site visit.', property: 'Serene Woods Estate', status: 'Pending' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [properties, setProperties] = useState(initialProperties);
  const [leads, setLeads] = useState(initialLeads);
  const [reviews, setReviews] = useState(initialReviews);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { logout } = useAuth(); 
  const navigate = useNavigate(); 

  const handleLogout = () => {
    logout(); 
    navigate('/', { replace: true }); 
  };

  // Add Listing Module Handler
  const handleAddProperty = () => {
    const randomId = `#PRP-0${properties.length + 1}`;
    const newProperty = {
      id: randomId,
      title: 'Emerald Horizon Villa',
      location: 'Malibu, CA',
      price: '$8,900,000',
      status: 'Active',
      category: 'Luxury Villa',
      views: '0'
    };
    setProperties([newProperty, ...properties]);
  };

  // Cycle Property Status
  const togglePropertyStatus = (id) => {
    setProperties(properties.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'Active' ? 'Pending' : p.status === 'Pending' ? 'Sold' : 'Active';
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  // Lead Actions
  const handleProcessLead = (id) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status: 'Processed' } : l));
  };

  // Review Actions
  const handleApproveReview = (id) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
  };

  const handleRejectReview = (id) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  // Filter Target Source
  const filteredProperties = properties.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans antialiased">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 border-r border-slate-900 bg-slate-900/40 backdrop-blur-xl hidden lg:flex flex-col p-6 sticky top-0 h-screen">
        <div 
          className="flex items-center gap-3 font-serif text-xl tracking-tight text-white mb-10 px-2 cursor-pointer select-none"
          onClick={() => navigate('/')}
        >
          <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <Building2 size={18} className="text-white" />
          </div>
          <span className="font-sans font-bold">Prime</span>Estates
        </div>

        <nav className="flex-1 space-y-1.5">
          {[
            { name: 'Overview', icon: LayoutDashboard },
            { name: 'Listings Management', icon: Building2 },
            { name: 'Leads & Enquiries', icon: Users },
            { name: 'Newsletter System', icon: FileText },
            { name: 'Reviews Moderation', icon: MessageSquare },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === item.name 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/15' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon size={18} />
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* --- SIDEBAR FOOTER --- */}
        <div className="pt-4 border-t border-slate-900 mt-auto space-y-3">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut size={16} /> 
            <span>Close Secure Session</span>
          </button>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-blue-400 border border-slate-700 select-none">
              AD
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Admin Desk</h4>
              <p className="text-xs text-slate-500">Super Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* --- HEADER --- */}
        <header className="h-20 border-b border-slate-900 bg-slate-950/40 backdrop-blur-md px-6 md:px-10 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Search metrics or record entries..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800/80 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/60 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-900 hidden sm:block"></div>
            <span className="text-sm font-medium text-slate-300 hidden sm:block">{activeTab} Panel</span>
          </div>
        </header>

        {/* --- CONTENT CONTAINER --- */}
        <div className="p-6 md:p-10 flex-1 overflow-y-auto space-y-10">
          
          {/* ================= VIEW: OVERVIEW ================= */}
          {activeTab === 'Overview' && (
            <>
              {/* METRICS ROW */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Total Portfolio Value', value: '$26.4M', change: '+12.4%', up: true, icon: DollarSign, color: 'text-emerald-400' },
                  { title: 'Active Showings', value: `${properties.filter(p=>p.status==='Active').length} listings`, change: '+4.2%', up: true, icon: Building2, color: 'text-blue-400' },
                  { title: 'Conversion Leads', value: `${leads.length} total`, change: '-1.8%', up: false, icon: Users, color: 'text-indigo-400' },
                  { title: 'Newsletter Reach', value: '12.5k Subs', change: '+24.1%', up: true, icon: FileText, color: 'text-purple-400' },
                ].map((card, i) => {
                  const CardIcon = card.icon;
                  return (
                    <div key={i} className="bg-slate-900 border border-slate-800/80 p-6 rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden group">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{card.title}</p>
                          <h3 className="text-3xl font-bold tracking-tight text-white">{card.value}</h3>
                        </div>
                        <div className={`p-3 rounded-xl bg-slate-950 border border-slate-800 ${card.color}`}>
                          <CardIcon size={20} />
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 mt-4 text-xs">
                        <span className={`flex items-center font-semibold ${card.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {card.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {card.change}
                        </span>
                        <span className="text-slate-500">vs last cycle</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ANALYTICS VISUALIZATION MATRIX */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800/80 rounded-2xl p-6 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="font-semibold text-lg text-white">Portfolio Visibility Analytics</h3>
                      <p className="text-xs text-slate-500">Aggregated views tracking metrics across all digital properties</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-400">
                      <TrendingUp size={14} className="text-blue-400" />
                      <span>Live stream active</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex items-end justify-between h-48 pt-4 px-2 gap-3 border-b border-slate-800">
                    {[65, 40, 85, 70, 55, 90, 75, 60, 45, 80, 95, 100].map((height, i) => (
                      <div key={i} className="w-full flex flex-col items-center group">
                        <div className="w-full relative bg-slate-950 rounded-t-md h-40 flex items-end">
                          <div 
                            style={{ height: `${height}%` }} 
                            className="w-full bg-gradient-to-t from-blue-600 to-indigo-400 rounded-t-md relative group-hover:from-blue-500 group-hover:to-cyan-400 transition-all duration-500"
                          >
                            <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 shadow-xl">
                              {height * 12}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-600 uppercase mt-2 font-mono">M{i+1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-white mb-1">Asset Allocation</h3>
                    <p className="text-xs text-slate-500 mb-6">Distribution spectrum by architectural tier</p>
                    
                    <div className="space-y-4">
                      {[
                        { name: 'Luxury Villas', percentage: 45, count: '18 Units', color: 'bg-blue-500' },
                        { name: 'Penthouses', percentage: 35, count: '14 Units', color: 'bg-indigo-500' },
                        { name: 'Modern Mansions', percentage: 20, count: '8 Units', color: 'bg-purple-500' }
                      ].map((item, i) => (
                        <div key={i} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-medium">
                            <span className="text-slate-300">{item.name}</span>
                            <span className="text-slate-400">{item.count} ({item.percentage}%)</span>
                          </div>
                          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/50">
                            <div style={{ width: `${item.percentage}%` }} className={`h-full ${item.color} rounded-full`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950/80 border border-slate-800/60 rounded-xl flex items-center gap-3 mt-6">
                    <ShieldAlert size={20} className="text-amber-500 shrink-0" />
                    <p className="text-xs text-slate-400 leading-relaxed">
                      All system modules are functional. Compliance verification syncs every 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ================= VIEW: LISTINGS MANAGEMENT ================= */}
          {activeTab === 'Listings Management' && (
            <div className="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-slate-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-semibold text-lg text-white">Live System Portfolio Control</h3>
                  <p className="text-xs text-slate-500">Click Status label to dynamically cycle states</p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button onClick={handleAddProperty} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-xs font-semibold text-white transition shadow-lg shadow-blue-600/10 whitespace-nowrap">
                    <Plus size={14} /> New Architectural Module
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-500 text-xs font-semibold uppercase tracking-wider bg-slate-950/40">
                      <th className="py-4 px-6">ID</th>
                      <th className="py-4 px-6">Property</th>
                      <th className="py-4 px-6">Category</th>
                      <th className="py-4 px-6">Valuation</th>
                      <th className="py-4 px-6">Status (Interactive)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-sm">
                    {filteredProperties.map((prop) => (
                      <tr key={prop.id} className="hover:bg-slate-950/30 transition-colors group">
                        <td className="py-4 px-6 font-mono text-xs text-slate-500 font-bold">{prop.id}</td>
                        <td className="py-4 px-6">
                          <div className="font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">{prop.title}</div>
                          <div className="text-xs text-slate-500 font-light">{prop.location}</div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-400">{prop.category}</span>
                        </td>
                        <td className="py-4 px-6 font-medium text-slate-300">{prop.price}</td>
                        <td className="py-4 px-6">
                          <button 
                            onClick={() => togglePropertyStatus(prop.id)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition active:scale-95 ${
                              prop.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20' :
                              prop.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20' :
                              'bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${prop.status === 'Active' ? 'bg-emerald-400' : prop.status === 'Pending' ? 'bg-amber-400' : 'bg-rose-400'}`} />
                            {prop.status}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= VIEW: LEADS & ENQUIRIES ================= */}
          {activeTab === 'Leads & Enquiries' && (
            <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-white">Conversion Pipeline Registry</h3>
                <p className="text-xs text-slate-500">Review incoming interaction intents from secure terminals</p>
              </div>
              <div className="space-y-4">
                {leads.map((lead) => (
                  <div key={lead.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-950/60 border border-slate-800/50 rounded-xl gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-indigo-600/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 font-bold text-sm">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-200">{lead.name}</h4>
                        <p className="text-xs text-slate-500 font-light">{lead.email}</p>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400">
                      <div>Target Asset: <span className="text-slate-200 font-medium">{lead.property}</span></div>
                      <div className="text-[11px] text-slate-500">{lead.type} • {lead.date}</div>
                    </div>
                    <div>
                      {lead.status === 'New' ? (
                        <button onClick={() => handleProcessLead(lead.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition">
                          <CheckCircle size={12} /> Mark Processed
                        </button>
                      ) : (
                        <span className="text-xs px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400 font-medium">✓ Verified Pipeline</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= VIEW: NEWSLETTER SYSTEM ================= */}
          {activeTab === 'Newsletter System' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800/80 rounded-2xl p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg text-white">Broadcast Campaign Dispatcher</h3>
                  <p className="text-xs text-slate-500">Issue synchronized dispatches to segmented investor registries</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">Campaign Topic Template</label>
                    <input type="text" defaultValue="Q2 Premium Asset Portfolio Release - Obsidian Series" className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-blue-500/50 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">Payload Markup</label>
                    <textarea rows={4} defaultValue="We are proud to unlock off-market asset classes across major metropolitan registries..." className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-blue-500/50 outline-none resize-none" />
                  </div>
                  <button onClick={() => alert('Global pipeline campaign synchronized.')} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-blue-600/10">
                    <Send size={14} /> Broadcast to 12.5k Subs
                  </button>
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <h4 className="font-semibold text-sm text-white">System Delivery Configuration</h4>
                  <div className="p-3.5 bg-slate-950 border border-slate-800/60 rounded-xl space-y-1">
                    <div className="text-xs font-medium text-slate-400">SMTP Relay Status</div>
                    <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Operational</div>
                  </div>
                  <div className="p-3.5 bg-slate-950 border border-slate-800/60 rounded-xl space-y-1">
                    <div className="text-xs font-medium text-slate-400">Bounce Safeguard Threshold</div>
                    <div className="text-sm font-bold text-slate-200">0.02% (Excellent)</div>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center gap-2"><AlertCircle size={12} /> Sync engines strictly trace local antispam compliances.</div>
              </div>
            </div>
          )}

          {/* ================= VIEW: REVIEWS MODERATION ================= */}
          {activeTab === 'Reviews Moderation' && (
            <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-white">Public Testimony Moderation Matrix</h3>
                <p className="text-xs text-slate-500">Authorize or purge real estate card reviews</p>
              </div>
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-slate-950/60 border border-slate-800/50 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{rev.user}</span>
                        <div className="flex text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                        </div>
                        <span className="text-[10px] bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-400 font-mono">{rev.property}</span>
                      </div>
                      <p className="text-xs text-slate-400 italic leading-relaxed">"{rev.comment}"</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {rev.status === 'Pending' ? (
                        <>
                          <button onClick={() => handleApproveReview(rev.id)} className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl transition text-xs font-semibold flex items-center gap-1">
                            <CheckCircle size={14} /> Approve
                          </button>
                          <button onClick={() => handleRejectReview(rev.id)} className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl transition text-xs font-semibold flex items-center gap-1">
                            <Trash2 size={14} /> Purge
                          </button>
                        </>
                      ) : (
                        <span className="text-xs px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg font-medium">Live on Client View</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}