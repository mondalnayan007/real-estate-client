import React, { use, useEffect, useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  RadialBarChart, RadialBar, ResponsiveContainer, XAxis, YAxis, Tooltip
} from 'recharts';
import { 
  Eye, Edit2, Trash2, MapPin, Calendar, ArrowUpRight, 
  ArrowDownRight, Users, Building, DollarSign, Filter, RefreshCw 
} from 'lucide-react';
import AgentContext from '../../context/AgentContext';

export default function DashboardAnalytics() {
  const [data, setData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('This Month');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const { user } = use(AgentContext);

  const baseURL = "http://localhost:4000";

  const fetchDashboardAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/api/dashboard?range=${dateRange}&region=${selectedRegion}`);
      if (!res.ok) throw new Error('API fetch failed');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.warn('API Fetch failed or offline. Using default fallback data:', err);
      setData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardAnalytics();
  }, [dateRange, selectedRegion]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user?.agentId) return;
      try {
        const res = await fetch(`${baseURL}/projects?agentId=${user.agentId}`);
        if (!res.ok) throw new Error('Projects fetch failed');
        const json = await res.json();
        setProjects(json);
      } catch (err) {
        console.warn('Projects API offline, falling back.', err);
      }
    };

    fetchProjects();
  }, [user?.agentId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <div className="w-8 h-8 border-4 border-[#007b57] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold text-gray-500">Updating analytics overview...</p>
      </div>
    );
  }

  const d = data || fallbackData;
  const activePropertyList = (projects && projects.length > 0) ? projects : (d?.activeProperties || fallbackData.activeProperties);

  return (
    <div className="bg-[#f8fafb] p-4 sm:p-6 space-y-6 text-gray-800 font-sans max-w-[1600px] mx-auto select-none">

      {/* 🔴 HEADER & FILTER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Analytics & Performance Overview</h1>
          <p className="text-xs text-gray-500">Monitor property performance, sales funnel, and team activity in real time.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* Date Filter */}
          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-600 font-medium">
            <Calendar size={14} className="text-gray-400" />
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
              <option value="This Quarter">This Quarter</option>
              <option value="This Year">This Year</option>
            </select>
          </div>

          {/* Region Filter */}
          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-600 font-medium">
            <Filter size={14} className="text-gray-400" />
            <select 
              value={selectedRegion} 
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="All">All Regions</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chittagong">Chittagong</option>
              <option value="Sylhet">Sylhet</option>
            </select>
          </div>

          <button 
            onClick={fetchDashboardAnalytics}
            className="p-2 text-gray-500 hover:text-emerald-700 bg-gray-50 hover:bg-emerald-50 rounded-lg border border-gray-200 transition-colors"
            title="Refresh Data"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* 🔴 SECTION 1: TOP KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(d?.kpiCards || fallbackData.kpiCards).map((kpi, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">{kpi.title}</p>
                <h3 className="text-xl font-black text-gray-900 mt-1">{kpi.value}</h3>
              </div>
              <div className={`p-2 rounded-lg text-xs ${kpi.iconBg}`}>
                {kpi.icon}
              </div>
            </div>
            
            <div className="mt-3">
              <div className="flex justify-between items-center text-[10px] font-bold mb-1">
                <span className="text-gray-400">Target: {kpi.progress}%</span>
                <span className={`flex items-center gap-0.5 ${kpi.isUp ? 'text-emerald-600' : 'text-red-500'}`}>
                  {kpi.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {kpi.change}
                </span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${kpi.barColor}`} style={{ width: `${kpi.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔴 SECTION 2: REVENUE TRENDS & REGIONAL INSIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-gray-900">Weekly Revenue & Activity Trend</h3>
              <p className="text-[11px] text-gray-400">Real-time performance analytics</p>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">Live Data</span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={d?.weeklyStatus || fallbackData.weeklyStatus}>
                <defs>
                  <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94a3b8" style={{ fontSize: 10 }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: 10 }} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fill="url(#waveGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
              <span className="text-[10px] font-semibold text-gray-400 block">Best Region</span>
              <h4 className="text-xs font-bold text-gray-900 mt-0.5">{d?.bestRegion || fallbackData.bestRegion}</h4>
              <span className="text-[9px] font-bold text-[#007b57] bg-emerald-50 px-1.5 py-0.5 rounded mt-2 inline-block">High Demand</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
              <span className="text-[10px] font-semibold text-gray-400 block">Lowest Region</span>
              <h4 className="text-xs font-bold text-gray-900 mt-0.5">{d?.lowestRegion || fallbackData.lowestRegion}</h4>
              <span className="text-[9px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded mt-2 inline-block">Needs Focus</span>
            </div>
          </div>

          <div className="bg-amber-100/60 border border-amber-200 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-gray-900">{d?.monthlyReport?.revenue || fallbackData.monthlyReport.revenue}</h3>
              <span className="text-[9px] font-bold text-gray-600 bg-white px-2 py-0.5 rounded border border-amber-200">Per Customer</span>
            </div>
            <p className="text-xs font-bold text-gray-800 mt-1">Monthly Active Revenue</p>
            <p className="text-[10px] text-gray-500">Compare against last month projections</p>
            <button className="mt-3 w-full bg-amber-400 text-amber-950 font-bold text-xs py-2 rounded-lg hover:bg-amber-500 transition-colors">
              Download Full Report
            </button>
          </div>
        </div>
      </div>

      {/* 3: PROPERTY PERFORMANCE LEADERBOARD & SALES OVERVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 bg-white p-4 rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-gray-800">Top Performance Properties</h3>
            <span className="text-[10px] text-gray-400 font-semibold">Ranked by Deals Closed</span>
          </div>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] text-gray-400 font-bold uppercase">
                <th className="py-2">Property</th>
                <th className="py-2">Price</th>
                <th className="py-2">Conversion</th>
                <th className="py-2">Leads</th>
                <th className="py-2">Deals</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-semibold text-gray-700">
              {(d?.topPerformance || fallbackData.topPerformance).map((p, i) => (
                <tr key={i}>
                  <td className="py-2.5 flex items-center gap-2">
                    <img src={p.img} alt={p.name} className="w-8 h-8 rounded-lg object-cover" />
                    <div>
                      <p className="font-bold text-gray-900 text-[11px]">{p.name}</p>
                      <p className="text-[9px] text-gray-400">{p.location || 'Dhaka'}</p>
                    </div>
                  </td>
                  <td className="py-2.5 font-bold text-gray-900">{p.price}</td>
                  <td className="py-2.5">
                    <span className="bg-emerald-50 text-[#007b57] px-1.5 py-0.5 rounded text-[10px] font-bold">{p.rate}</span>
                  </td>
                  <td className="py-2.5">{p.leads}</td>
                  <td className="py-2.5 font-bold text-gray-900">{p.deals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:col-span-5 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-gray-800">Purchase Overview</h3>
            <span className="text-[10px] text-gray-400">Monthly breakdown</span>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={d?.purchaseOverview || fallbackData.purchaseOverview}>
                <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: 10 }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="val" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 🔴 SECTION 4: CONVERSION FUNNEL & REVENUE SHARE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <h3 className="text-xs font-bold text-gray-800">Target Conversion Funnel</h3>
          <div className="space-y-1.5 my-3">
            {(d?.funnelData || [800, 650, 480, 320, 150]).map((val, idx) => {
              const labels = ['Impressions', 'Site Visits', 'Inquiries', 'Negotiations', 'Deals Closed'];
              return (
                <div key={idx} className="flex items-center gap-2 text-[10px]">
                  <span className="w-20 font-medium text-gray-500 truncate">{labels[idx]}</span>
                  <div className="flex-1 bg-gray-100 h-5 rounded overflow-hidden relative">
                    <div 
                      className="bg-[#10b981] h-full rounded transition-all duration-300 flex items-center justify-end pr-1.5 text-white font-bold"
                      style={{ width: `${(val / 800) * 100}%`, opacity: 1 - idx * 0.15 }}
                    >
                      {val}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-gray-400 text-center">Overall conversion rate: <strong className="text-gray-800">18.75%</strong></p>
        </div>

        <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <h3 className="text-xs font-bold text-gray-800">Revenue Distribution</h3>
          <div className="h-40 relative my-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={d?.revenueDonut || fallbackData.revenueDonut} innerRadius={45} outerRadius={62} dataKey="value" startAngle={90} endAngle={-270}>
                  {(d?.revenueDonut || fallbackData.revenueDonut).map((_, index) => (
                    <Cell key={index} fill={index === 0 ? '#10b981' : '#f59e0b'} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-[9px] text-gray-400 block font-bold">Closed</span>
              <span className="text-base font-black text-gray-900">{d?.revenuePercentage || '70%'}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-center text-xs">
            <div>
              <span className="font-bold text-gray-900 block">{d?.annualIncome || '$8,209'}</span>
              <span className="text-[9px] text-gray-400">Annual Revenue</span>
            </div>
            <div>
              <span className="font-bold text-gray-900 block">{d?.propertySales || '$540'}</span>
              <span className="text-[9px] text-gray-400">Commission</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-xs font-bold text-gray-800 mb-3">Country / City Sales Breakdown</h3>
          <div className="space-y-3 text-xs">
            {(d?.countrySales || fallbackData.countrySales).map((c, i) => (
              <div key={i}>
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className="text-gray-600">{c.country}</span>
                  <span className="text-gray-900">{c.pct}%</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#007b57] h-full rounded-full" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔴 SECTION 5: CRM USER ACTIVITY & TRANSACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-xs font-bold text-gray-800 mb-3">CRM Agent Status</h3>
          <div className="space-y-3">
            {(d?.crmUsers || fallbackData.crmUsers).map((u, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover" />
                  <div>
                    <span className="font-bold text-gray-800 text-[11px] block">{u.name}</span>
                    <span className="text-[9px] text-gray-400">{u.role || 'Sales Agent'}</span>
                  </div>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                  u.status === 'Active' ? 'bg-emerald-50 text-[#007b57]' : 'bg-red-50 text-red-500'
                }`}>
                  {u.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 bg-white p-4 rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
          <h3 className="text-xs font-bold text-gray-800 mb-3">Recent Transactions</h3>
          <table className="w-full text-left text-xs font-bold text-gray-700">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] text-gray-400 uppercase">
                <th className="py-2">ID</th>
                <th className="py-2">Property Title</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Status</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(d?.transactions || fallbackData.transactions).map((t, i) => (
                <tr key={i}>
                  <td className="py-2 text-gray-900">{t.id}</td>
                  <td className="py-2">{t.title}</td>
                  <td className="py-2">{t.price}</td>
                  <td className="py-2">
                    <span className="bg-emerald-50 text-[#007b57] px-2 py-0.5 rounded text-[9px]">{t.status}</span>
                  </td>
                  <td className="py-2 flex items-center gap-2 text-gray-400">
                    <Eye size={13} className="hover:text-emerald-600 cursor-pointer" />
                    <Edit2 size={13} className="hover:text-amber-600 cursor-pointer" />
                    <Trash2 size={13} className="hover:text-red-500 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

// 📦 STRUCTURALLY COMPLETE FALLBACK DATA
const fallbackData = {
  kpiCards: [
    { title: 'Total Leads', value: '12,505', progress: 75, change: '+12%', isUp: true, icon: <Users size={16} className="text-[#007b57]" />, iconBg: 'bg-emerald-50', barColor: 'bg-[#007b57]' },
    { title: 'Active Listings', value: '342', progress: 85, change: '+5%', isUp: true, icon: <Building size={16} className="text-amber-600" />, iconBg: 'bg-amber-50', barColor: 'bg-amber-500' },
    { title: 'Deals Closed', value: '1,205', progress: 65, change: '+18%', isUp: true, icon: <DollarSign size={16} className="text-[#007b57]" />, iconBg: 'bg-emerald-50', barColor: 'bg-[#007b57]' },
    { title: 'Conversion Rate', value: '18.75%', progress: 40, change: '-0.5%', isUp: false, icon: <RefreshCw size={16} className="text-red-500" />, iconBg: 'bg-red-50', barColor: 'bg-red-500' }
  ],
  weeklyStatus: [
    { name: 'Mon', value: 300 }, { name: 'Tue', value: 600 }, { name: 'Wed', value: 200 },
    { name: 'Thu', value: 800 }, { name: 'Fri', value: 400 }, { name: 'Sat', value: 900 }, { name: 'Sun', value: 700 }
  ],
  bestRegion: 'Dhaka North',
  lowestRegion: 'Khulna Zone',
  monthlyReport: { revenue: '$45.5k' },
  revenuePercentage: '70%',
  annualIncome: '$82,090',
  propertySales: '$5,400',
  purchaseOverview: [
    { month: 'Jan', val: 25 }, { month: 'Feb', val: 40 }, { month: 'Mar', val: 65 },
    { month: 'Apr', val: 45 }, { month: 'May', val: 80 }, { month: 'Jun', val: 55 }
  ],
  topPerformance: [
    { name: 'Skyline Heights', location: 'Gulshan, Dhaka', price: '$1.2M', rate: '98%', leads: '450', deals: '75', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100&auto=format&fit=crop&q=80' },
    { name: 'Greenwood Villa', location: 'Uttara, Dhaka', price: '$850K', rate: '92%', leads: '320', deals: '54', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100&auto=format&fit=crop&q=80' },
    { name: 'Purbachal Plot', location: 'Purbachal, Dhaka', price: '$450K', rate: '88%', leads: '210', deals: '38', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=100&auto=format&fit=crop&q=80' }
  ],
  funnelData: [800, 650, 480, 320, 150],
  revenueDonut: [{ name: 'Closed', value: 70 }, { name: 'Pending', value: 30 }],
  countrySales: [
    { country: 'Dhaka Division', pct: 75 },
    { country: 'Chittagong Division', pct: 62 },
    { country: 'Sylhet Division', pct: 48 },
    { country: 'Rajshahi Division', pct: 35 }
  ],
  crmUsers: [
    { name: 'Sarah Jenkins', role: 'Senior Agent', status: 'Active', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
    { name: 'David Smith', role: 'Property Lead', status: 'Active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' }
  ],
  transactions: [
    { id: 'TRX-101', title: 'Highland Villa (Gulshan)', price: '$650,000', status: 'Completed' },
    { id: 'TRX-102', title: 'Lakeview Apartment (Banani)', price: '$420,000', status: 'Completed' },
    { id: 'TRX-103', title: 'Commercial Space (Uttara)', price: '$890,000', status: 'Pending' }
  ]
};