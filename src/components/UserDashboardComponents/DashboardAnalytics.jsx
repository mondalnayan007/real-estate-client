import React, { use, useEffect, useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip
} from 'recharts';
import { 
  Eye, Edit2, Trash2, Calendar, ArrowUpRight, 
  ArrowDownRight, Users, Building, DollarSign, Filter, RefreshCw, FileText 
} from 'lucide-react';
import AgentContext from '../../context/AgentContext';

export default function DashboardAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('This Month');
  const [selectedRegion, setSelectedRegion] = useState('All');
  
  const { user } = use(AgentContext);
  const baseURL = "http://localhost:4000";

  const fetchDashboardAnalytics = async () => {
    if (!user?.agentId) return;
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/api/dashboard-master?agentId=${user.agentId}&range=${dateRange}&region=${selectedRegion}`);
      if (!res.ok) throw new Error('API fetch failed');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Projects API error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardAnalytics();
  }, [user?.agentId, dateRange, selectedRegion]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <div className="w-8 h-8 border-4 border-[#007b57] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold text-gray-500">Updating analytics overview...</p>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 🔄 Dynamic Data Processing (Processing Raw API Payload)
  // -------------------------------------------------------------
  const summaryStats = data?.summaryStats || {};
  const apiData = data?.data || {};
  
  const projects = apiData.projects || [];
  const bookings = apiData.bookings || [];
  const users = apiData.users || [];
  const transactions = apiData.transactions || [];
  const teamMembers = apiData.teamMembers || [];
  const blogs = apiData.blogs || [];

  // 1. Dynamic KPI Cards
  const kpiCards = [
    {
      title: 'Total Projects',
      value: summaryStats.totalProjects ?? projects.length ?? 0,
      icon: <Building size={16} className="text-[#007b57]" />,
      iconBg: 'bg-emerald-50',
      progress: projects.length ? 100 : 0,
      change: '+Live',
      isUp: true,
      barColor: 'bg-[#007b57]'
    },
    {
      title: 'Total Bookings',
      value: summaryStats.totalBookings ?? bookings.length ?? 0,
      icon: <DollarSign size={16} className="text-amber-600" />,
      iconBg: 'bg-amber-50',
      progress: bookings.length ? 100 : 0,
      change: '0%',
      isUp: true,
      barColor: 'bg-amber-500'
    },
    {
      title: 'Registered Clients',
      value: summaryStats.totalUsers ?? users.length ?? 0,
      icon: <Users size={16} className="text-blue-600" />,
      iconBg: 'bg-blue-50',
      progress: users.length ? 100 : 0,
      change: '+New',
      isUp: true,
      barColor: 'bg-blue-500'
    },
    {
      title: 'Active Blogs',
      value: blogs.length ?? 0,
      icon: <FileText size={16} className="text-purple-600" />,
      iconBg: 'bg-purple-50',
      progress: blogs.length ? 100 : 0,
      change: '+Active',
      isUp: true,
      barColor: 'bg-purple-500'
    }
  ];

  // 2. Project Status Distribution Chart
  const statusCounts = projects.reduce((acc, p) => {
    const statusKey = p.status ? p.status.toUpperCase() : 'OTHER';
    acc[statusKey] = (acc[statusKey] || 0) + 1;
    return acc;
  }, {});

  const weeklyStatusChart = Object.keys(statusCounts).map(status => ({
    name: status,
    value: statusCounts[status]
  }));

  // 3. Category Sales Distribution Chart
  const categoryCounts = projects.reduce((acc, p) => {
    const categoryKey = p.category || 'Uncategorized';
    acc[categoryKey] = (acc[categoryKey] || 0) + 1;
    return acc;
  }, {});

  const categoryChartData = Object.keys(categoryCounts).map(cat => ({
    month: cat,
    val: categoryCounts[cat]
  }));

  // 4. Country/Location Share Breakdown
  const totalProjectsCount = projects.length || 1;
  const locationCounts = projects.reduce((acc, p) => {
    const loc = p.location ? p.location.trim() : 'Unknown';
    acc[loc] = (acc[loc] || 0) + 1;
    return acc;
  }, {});

  const countrySalesBreakdown = Object.keys(locationCounts).map(loc => ({
    country: loc,
    pct: Math.round((locationCounts[loc] / totalProjectsCount) * 100)
  }));

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
        {kpiCards.map((kpi, idx) => (
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
              <h3 className="text-sm font-bold text-gray-900">Project Status Distribution</h3>
              <p className="text-[11px] text-gray-400">Real-time status analysis of uploaded projects</p>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">Live Data</span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyStatusChart}>
                <defs>
                  <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94a3b8" style={{ fontSize: 10 }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: 10 }} allowDecimals={false} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fill="url(#waveGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
              <span className="text-[10px] font-semibold text-gray-400 block">Top Location</span>
              <h4 className="text-xs font-bold text-gray-900 mt-0.5 truncate">{countrySalesBreakdown[0]?.country || 'N/A'}</h4>
              <span className="text-[9px] font-bold text-[#007b57] bg-emerald-50 px-1.5 py-0.5 rounded mt-2 inline-block">High Demand</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
              <span className="text-[10px] font-semibold text-gray-400 block">Lowest Location</span>
              <h4 className="text-xs font-bold text-gray-900 mt-0.5 truncate">{countrySalesBreakdown[countrySalesBreakdown.length - 1]?.country || 'N/A'}</h4>
              <span className="text-[9px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded mt-2 inline-block">Needs Focus</span>
            </div>
          </div>

          <div className="bg-amber-100/60 border border-amber-200 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-gray-900">৳{summaryStats.totalRevenue || 0}</h3>
              <span className="text-[9px] font-bold text-gray-600 bg-white px-2 py-0.5 rounded border border-amber-200">Total</span>
            </div>
            <p className="text-xs font-bold text-gray-800 mt-1">Total Generated Revenue</p>
            <p className="text-[10px] text-gray-500">Based on confirmed transaction entries</p>
            <button className="mt-3 w-full bg-amber-400 text-amber-950 font-bold text-xs py-2 rounded-lg hover:bg-amber-500 transition-colors">
              Download Full Report
            </button>
          </div>
        </div>
      </div>

      {/* 🔴 SECTION 3: PROPERTY PERFORMANCE LEADERBOARD & SALES OVERVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 bg-white p-4 rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-gray-800">Top Performance Properties</h3>
            <span className="text-[10px] text-gray-400 font-semibold">Live Project Inventory</span>
          </div>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] text-gray-400 font-bold uppercase">
                <th className="py-2">Property</th>
                <th className="py-2">Category</th>
                <th className="py-2">Price</th>
                <th className="py-2">Status</th>
                <th className="py-2">Units</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-semibold text-gray-700">
              {projects.length > 0 ? (
                projects.map((p) => (
                  <tr key={p._id}>
                    <td className="py-2.5 flex items-center gap-2">
                      {p.img && <img src={p.img} alt={p.title} className="w-8 h-8 rounded-lg object-cover" />}
                      <div>
                        <p className="font-bold text-gray-900 text-[11px]">{p.title}</p>
                        <p className="text-[9px] text-gray-400">{p.location}</p>
                      </div>
                    </td>
                    <td className="py-2.5">{p.category || 'N/A'}</td>
                    <td className="py-2.5 font-bold text-gray-900">{p.price}</td>
                    <td className="py-2.5">
                      <span className="bg-emerald-50 text-[#007b57] px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">
                        {p.status || 'Active'}
                      </span>
                    </td>
                    <td className="py-2.5 font-bold text-gray-900">{p.availableUnits?.length || 1}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-400 font-normal">No projects available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="lg:col-span-5 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-gray-800">Category Breakdown</h3>
            <span className="text-[10px] text-gray-400">Total count by category</span>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData}>
                <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: 10 }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: 10 }} allowDecimals={false} />
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
            {[projects.length, users.length, bookings.length, transactions.length].map((val, idx) => {
              const labels = ['Projects', 'Users', 'Bookings', 'Completed Deals'];
              const maxVal = projects.length || 1;
              return (
                <div key={idx} className="flex items-center gap-2 text-[10px]">
                  <span className="w-24 font-medium text-gray-500 truncate">{labels[idx]}</span>
                  <div className="flex-1 bg-gray-100 h-5 rounded overflow-hidden relative">
                    <div 
                      className="bg-[#10b981] h-full rounded transition-all duration-300 flex items-center justify-end pr-1.5 text-white font-bold"
                      style={{ width: `${Math.min(100, (val / maxVal) * 100)}%`, opacity: 1 - idx * 0.15 }}
                    >
                      {val}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-gray-400 text-center">
            Overall conversion: <strong className="text-gray-800">{bookings.length ? ((bookings.length / (users.length || 1)) * 100).toFixed(1) : '0'}%</strong>
          </p>
        </div>

        <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <h3 className="text-xs font-bold text-gray-800">Project vs User Share</h3>
          <div className="h-40 relative my-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={[
                    { name: 'Projects', value: projects.length || 1 },
                    { name: 'Users', value: users.length || 0 }
                  ]} 
                  innerRadius={45} 
                  outerRadius={62} 
                  dataKey="value" 
                  startAngle={90} 
                  endAngle={-270}
                >
                  <Cell fill="#10b981" />
                  <Cell fill="#f59e0b" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-[9px] text-gray-400 block font-bold">Total</span>
              <span className="text-base font-black text-gray-900">{projects.length + users.length}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-center text-xs">
            <div>
              <span className="font-bold text-gray-900 block">{projects.length}</span>
              <span className="text-[9px] text-gray-400">Total Projects</span>
            </div>
            <div>
              <span className="font-bold text-gray-900 block">{users.length}</span>
              <span className="text-[9px] text-gray-400">Registered Users</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-xs font-bold text-gray-800 mb-3">Location Breakdown</h3>
          <div className="space-y-3 text-xs">
            {countrySalesBreakdown.length > 0 ? (
              countrySalesBreakdown.map((c, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between font-bold mb-1">
                    <span className="text-gray-600 truncate max-w-[150px]">{c.country}</span>
                    <span className="text-gray-900">{c.pct}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#007b57] h-full rounded-full" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 text-center py-4">No location data found</p>
            )}
          </div>
        </div>
      </div>

      {/* 🔴 SECTION 5: CRM USER ACTIVITY & TRANSACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-xs font-bold text-gray-800 mb-3">Team Members</h3>
          <div className="space-y-3">
            {teamMembers.length > 0 ? (
              teamMembers.map((u) => (
                <div key={u._id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    {u.imageUrl ? (
                      <img src={u.imageUrl} alt={u.name} className="w-7 h-7 rounded-full object-cover" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-[#007b57] flex items-center justify-center font-bold text-xs">
                        {u.name?.charAt(0)}
                      </div>
                    )}
                    <div>
                      <span className="font-bold text-gray-800 text-[11px] block">{u.name}</span>
                      <span className="text-[9px] text-gray-400">{u.designation}</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-[#007b57]">
                    Active
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 text-center py-2">No team members added</p>
            )}
          </div>
        </div>

        <div className="lg:col-span-8 bg-white p-4 rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
          <h3 className="text-xs font-bold text-gray-800 mb-3">Registered Users / Clients</h3>
          <table className="w-full text-left text-xs font-bold text-gray-700">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] text-gray-400 uppercase">
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Phone</th>
                <th className="py-2">Role</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.length > 0 ? (
                users.map((t) => (
                  <tr key={t._id}>
                    <td className="py-2 text-gray-900 capitalize">{t.name}</td>
                    <td className="py-2 font-normal text-gray-600">{t.email}</td>
                    <td className="py-2 font-normal text-gray-600">{t.phone}</td>
                    <td className="py-2">
                      <span className="bg-emerald-50 text-[#007b57] px-2 py-0.5 rounded text-[9px] uppercase">{t.role}</span>
                    </td>
                    <td className="py-2 flex items-center gap-2 text-gray-400">
                      <Eye size={13} className="hover:text-emerald-600 cursor-pointer" />
                      <Edit2 size={13} className="hover:text-amber-600 cursor-pointer" />
                      <Trash2 size={13} className="hover:text-red-500 cursor-pointer" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-400 font-normal">No registered users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}