import React, { useEffect, useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  RadialBarChart, RadialBar, ResponsiveContainer, XAxis, YAxis, Tooltip
} from 'recharts';
import { Eye, Edit2, Trash2, MapPin } from 'lucide-react';

export default function DashboardAnalytics() {
  const [data, setData] = useState(null);
  const  [projects,setProjects]= useState([]);
  console.log(projects);
  const [loading, setLoading] = useState(true);

  const baseURL = "http://localhost:4000";

  // 🌐 Dynamic API Fetching with Full Fallback Mechanism
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`${baseURL}/api/dashboard`);
        if (!res.ok) throw new Error('API fetch failed');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.warn('API Offline/Error, using pixel-perfect local payload');
        setData(fallbackData);
      }  finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  useEffect(()=>{
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${baseURL}/projects`);
        if (!res.ok) throw new Error('API fetch failed');
        const json = await res.json();
        setProjects(json);
      } catch (err) {
        console.warn('API Offline/Error, using pixel-perfect local payload');
        setData(fallbackData.activeProperties);
      }  finally {
        setLoading(false);
      }
    };

    fetchProjects();
  },[])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-[#007b57] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const d = data || fallbackData;

  return (
    <div className="bg-[#f8fafb] p-4 sm:p-6 space-y-5 text-gray-800 font-sans max-w-[1600px] mx-auto select-none">
      
      {/* 🔴 SECTION 1: Top Main Wave Chart + Best/Lowest Cards + Yellow Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-800">Weekly Status</h3>
            <select className="text-[10px] bg-gray-50 border border-gray-200 rounded px-2 py-0.5 text-gray-500 font-semibold focus:outline-none">
              <option>Weekly</option>
            </select>
          </div>
          <div className="h-32 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={d.weeklyStatus}>
                <defs>
                  <linearGradient id="topWaveGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="natural" dataKey="value" stroke="#10b981" strokeWidth={2} fill="url(#topWaveGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
              <span className="text-[10px] font-semibold text-gray-400 block">Best Region</span>
              <h4 className="text-xs font-bold text-gray-900 mt-0.5">{d.bestRegion}</h4>
              <span className="text-[9px] font-bold text-[#007b57] bg-emerald-50 px-1.5 py-0.5 rounded mt-1.5 inline-block">Active</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
              <span className="text-[10px] font-semibold text-gray-400 block">Lowest Region</span>
              <h4 className="text-xs font-bold text-gray-900 mt-0.5">{d.lowestRegion}</h4>
              <span className="text-[9px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded mt-1.5 inline-block">Alert</span>
            </div>
          </div>

          <div className="bg-amber-100/60 border border-amber-200/80 p-3.5 rounded-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-gray-900">{d.monthlyReport.revenue}</h3>
              <span className="text-[9px] font-bold text-gray-500 bg-white px-2 py-0.5 rounded border border-amber-200">Per Customer Revenue</span>
            </div>
            <p className="text-xs font-extrabold text-gray-800 mt-0.5">Monthly Active Report</p>
            <p className="text-[10px] text-gray-500">From Last Month</p>
            <button className="mt-2.5 w-full bg-amber-400 text-amber-950 font-bold text-[11px] py-1.5 rounded-lg hover:bg-amber-500 transition-colors">
              Subscribe to Pro Metrics
            </button>
          </div>
        </div>
      </div>

      {/* 🔴 SECTION 2: 4 Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {d.kpiCards.map((kpi, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{kpi.title}</p>
                <h3 className="text-lg font-black text-gray-900 mt-0.5">{kpi.value}</h3>
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${kpi.iconBg}`}>
                {kpi.icon}
              </div>
            </div>
            <div className="w-full bg-gray-100 h-1 rounded-full mt-2.5 overflow-hidden">
              <div className={`h-full rounded-full ${kpi.barColor}`} style={{ width: `${kpi.progress}%` }} />
            </div>
            <div className="flex justify-between items-center text-[9px] font-bold text-gray-400 mt-1.5">
              <span>Target {kpi.progress}%</span>
              <span>Last Month {kpi.lastMonth}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* 🔴 SECTION 3: Purchase Overview Bar + Total Active Properties List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-gray-800">Purchase Overview</h3>
            <select className="text-[10px] bg-gray-50 border border-gray-200 rounded px-2 py-0.5 text-gray-500">
              <option>Current</option>
            </select>
          </div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={d.purchaseOverview}>
                <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: 10 }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: 10 }} />
                <Bar dataKey="val" fill="#f59e0b" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-xs font-bold text-gray-800 mb-3">Total Active Properties</h3>
          <div className="space-y-2.5">
            {d.activeProperties.map((p, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <img src={p.img} alt={p.name} className="w-8 h-8 rounded-lg object-cover" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-[11px]">{p.name}</h4>
                    <p className="text-[9px] text-gray-400 font-semibold">{p.location}</p>
                  </div>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                  p.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-[#007b57]'
                }`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔴 SECTION 4: Revenue Ring + Recovery Overview Dual Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-800">Revenue</h3>
          </div>
          <div className="h-36 relative my-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={d.revenueDonut} innerRadius={42} outerRadius={58} dataKey="value" startAngle={90} endAngle={-270}>
                  {d.revenueDonut.map((_, index) => (
                    <Cell key={index} fill={index === 0 ? '#10b981' : '#f59e0b'} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-[9px] text-gray-400 block font-bold">Revenue</span>
              <span className="text-sm font-black text-gray-900">70%</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-center">
            <div>
              <span className="text-xs font-bold text-gray-900 block">$8,209</span>
              <span className="text-[9px] text-gray-400">Annual Income</span>
            </div>
            <div>
              <span className="text-xs font-bold text-gray-900 block">$540</span>
              <span className="text-[9px] text-gray-400">Property Sales</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-gray-800">Recovery Overview</h3>
            <div className="flex items-center gap-3 text-[10px] font-bold">
              <span className="text-[#007b57]">● Site Visit Process Data</span>
              <span className="text-emerald-500">● Total Property Sales</span>
            </div>
          </div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={d.recoveryOverview}>
                <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: 10 }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: 10 }} />
                <Bar dataKey="v1" fill="#10b981" radius={[2, 2, 0, 0]} />
                <Bar dataKey="v2" fill="#6ee7b7" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 🔴 SECTION 5: Country By Sales + World Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-xs font-bold text-gray-800 mb-3">Country By Sales</h3>
          <div className="space-y-2 text-xs font-bold">
            {d.countrySales.map((c, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-gray-600 font-semibold">{c.country}</span>
                <span className="text-gray-900">{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-center min-h-[160px]">
          <div className="text-center">
            <MapPin size={24} className="text-[#007b57] mx-auto mb-1" />
            <p className="text-[11px] font-bold text-gray-400">Global Regional Sales Map</p>
          </div>
        </div>
      </div>

      {/* 🔴 SECTION 6: Cases Subscribed Dual Bar Chart */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-gray-800">Cases Subscribed</h3>
          <div className="flex items-center gap-3 text-[10px] font-bold">
            <span className="text-[#007b57]">● United States</span>
            <span className="text-red-400">● Western Region</span>
          </div>
        </div>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={d.casesSubscribed}>
              <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: 10 }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: 10 }} />
              <Bar dataKey="us" fill="#10b981" radius={[2, 2, 0, 0]} />
              <Bar dataKey="west" fill="#ef4444" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔴 SECTION 7: CRM Users + Average Sales Action */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-xs font-bold text-gray-800 mb-3">CRM Users</h3>
          <div className="space-y-2.5">
            {d.crmUsers.map((u, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full object-cover" />
                  <span className="font-extrabold text-gray-800 text-[11px]">{u.name}</span>
                </div>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                  u.status === 'Active' ? 'bg-emerald-50 text-[#007b57]' : 'bg-red-50 text-red-500'
                }`}>
                  {u.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-xs font-bold text-gray-800 mb-2">Average Sales Action</h3>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={d.avgSalesAction}>
                <XAxis dataKey="day" stroke="#94a3b8" style={{ fontSize: 10 }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: 10 }} />
                <Bar dataKey="a" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                <Bar dataKey="b" fill="#f59e0b" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 🔴 SECTION 8: Top Performance Properties Table */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <h3 className="text-xs font-bold text-gray-800 mb-3">Top Performance Properties</h3>
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-[10px] text-gray-400 font-bold uppercase">
              <th className="py-2">Image</th>
              <th className="py-2">Name</th>
              <th className="py-2">Price</th>
              <th className="py-2">Rate</th>
              <th className="py-2">Leads</th>
              <th className="py-2">Deals</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 font-bold text-gray-700">
            {d.topPerformance.map((p, i) => (
              <tr key={i}>
                <td className="py-2">
                  <img src={p.img} alt={p.name} className="w-7 h-7 rounded object-cover" />
                </td>
                <td className="py-2 text-gray-900">{p.name}</td>
                <td className="py-2">{p.price}</td>
                <td className="py-2">
                  <span className="bg-emerald-50 text-[#007b57] px-1.5 py-0.5 rounded text-[9px]">{p.rate}</span>
                </td>
                <td className="py-2">{p.leads}</td>
                <td className="py-2">{p.deals}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔴 SECTION 9: Pending Payments + Activity Leads Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-xs font-bold text-gray-800 mb-3">Pending Payments</h3>
          <div className="space-y-2">
            {d.pendingPayments.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg border border-gray-50 text-xs">
                <div className="flex items-center gap-2">
                  <img src={p.avatar} alt={p.name} className="w-7 h-7 rounded-full object-cover" />
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-[11px]">{p.name}</h4>
                    <p className="text-[9px] text-gray-400">{p.sub}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-black text-gray-900 block text-[11px]">{p.amount}</span>
                  <span className="text-[9px] text-amber-600 font-bold">{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <h3 className="text-xs font-bold text-gray-800">Activity Leads</h3>
          <div className="h-32 relative my-1">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="100%" barSize={8} data={d.activityLeads}>
                <RadialBar minAngle={15} background clockWise dataKey="value" />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1 text-[10px] font-bold text-gray-500 pt-1 border-t border-gray-100">
            <div className="flex justify-between"><span>Website</span><span>60%</span></div>
            <div className="flex justify-between"><span>Social Media</span><span>78%</span></div>
          </div>
        </div>
      </div>

      {/* 🔴 SECTION 10: Top Transactions Table */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <h3 className="text-xs font-bold text-gray-800 mb-3">Top Transactions</h3>
        <table className="w-full text-left text-xs font-bold text-gray-700">
          <thead>
            <tr className="border-b border-gray-100 text-[10px] text-gray-400 uppercase">
              <th className="py-1.5">ID</th>
              <th className="py-1.5">Title</th>
              <th className="py-1.5">Price</th>
              <th className="py-1.5">Status</th>
              <th className="py-1.5">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {d.transactions.map((t, i) => (
              <tr key={i}>
                <td className="py-2 text-gray-900">{t.id}</td>
                <td className="py-2">{t.title}</td>
                <td className="py-2">{t.price}</td>
                <td className="py-2">
                  <span className="bg-emerald-50 text-[#007b57] px-1.5 py-0.5 rounded text-[9px]">{t.status}</span>
                </td>
                <td className="py-2 flex items-center gap-1.5 text-gray-400">
                  <Eye size={12} className="hover:text-emerald-600 cursor-pointer" />
                  <Edit2 size={12} className="hover:text-amber-600 cursor-pointer" />
                  <Trash2 size={12} className="hover:text-red-500 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔴 SECTION 11: Recent Buyers + Generation Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 bg-white p-4 rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
          <h3 className="text-xs font-bold text-gray-800 mb-3">Recent Buyers</h3>
          <table className="w-full text-left text-xs font-bold text-gray-700">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] text-gray-400 uppercase">
                <th className="py-1.5">ID</th>
                <th className="py-1.5">Buyer</th>
                <th className="py-1.5">Property</th>
                <th className="py-1.5">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {d.recentBuyers.map((b, i) => (
                <tr key={i}>
                  <td className="py-2">{b.id}</td>
                  <td className="py-2 text-gray-900">{b.name}</td>
                  <td className="py-2">{b.property}</td>
                  <td className="py-2 text-[#007b57] font-black">{b.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <h3 className="text-xs font-bold text-gray-800">Generation Funnel</h3>
          <div className="space-y-1 my-2">
            {[800, 650, 480, 320, 150].map((val, idx) => (
              <div 
                key={idx} 
                className="bg-[#10b981] text-white text-[9px] font-black py-1 rounded text-center mx-auto"
                style={{ width: `${100 - idx * 16}%`, opacity: 1 - idx * 0.15 }}
              >
                {val}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

// 📦 Structurally Complete Fallback Data
const fallbackData = {
  weeklyStatus: [
    { name: 'M', value: 300 }, { name: 'T', value: 600 }, { name: 'W', value: 200 },
    { name: 'T', value: 800 }, { name: 'F', value: 400 }, { name: 'S', value: 900 }, { name: 'S', value: 700 }
  ],
  bestRegion: 'Dhaka North',
  lowestRegion: 'Khulna Zone',
  monthlyReport: { revenue: '$45.5k' },
  kpiCards: [
    { title: 'Website Driver Users', value: '12,505', progress: 75, lastMonth: 55, icon: '👤', iconBg: 'bg-emerald-50 text-[#007b57]', barColor: 'bg-[#007b57]' },
    { title: 'Conversions Rate', value: '2,205', progress: 65, lastMonth: 45, icon: '🏷️', iconBg: 'bg-amber-50 text-amber-600', barColor: 'bg-amber-500' },
    { title: 'Bounce Rate ↑ 0.15%', value: '49%', progress: 40, lastMonth: 42, icon: '⚡', iconBg: 'bg-red-50 text-red-500', barColor: 'bg-red-500' },
    { title: 'Avg. Session Time ↑ 0.15%', value: '7m 12s', progress: 80, lastMonth: 70, icon: '⏱️', iconBg: 'bg-emerald-50 text-[#007b57]', barColor: 'bg-[#007b57]' }
  ],
  purchaseOverview: [
    { month: 'Jan', val: 25 }, { month: 'Feb', val: 40 }, { month: 'Mar', val: 65 },
    { month: 'Apr', val: 45 }, { month: 'May', val: 80 }, { month: 'Jun', val: 55 }
  ],
  activeProperties: [
    { name: 'Skyline Heights', location: 'Gulshan, Dhaka', status: 'Pending', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100&auto=format&fit=crop&q=80' },
    { name: 'Greenwood Villa', location: 'Uttara, Dhaka', status: 'On Sale', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100&auto=format&fit=crop&q=80' },
    { name: 'Purbachal Plot', location: 'Purbachal, Dhaka', status: 'On Sale', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=100&auto=format&fit=crop&q=80' }
  ],
  revenueDonut: [{ name: 'A', value: 70 }, { name: 'B', value: 30 }],
  recoveryOverview: [
    { month: 'M1', v1: 40, v2: 20 }, { month: 'M2', v1: 60, v2: 35 },
    { month: 'M3', v1: 45, v2: 25 }, { month: 'M4', v1: 75, v2: 50 }
  ],
  countrySales: [
    { country: 'Australia', pct: 75 },
    { country: 'Canada', pct: 62 },
    { country: 'United Kingdom', pct: 48 },
    { country: 'United States', pct: 35 }
  ],
  casesSubscribed: [
    { month: 'Jan', us: 30, west: 15 },
    { month: 'Feb', us: 50, west: 25 },
    { month: 'Mar', us: 65, west: 40 }
  ],
  crmUsers: [
    { name: 'Sarah Jenkins', status: 'Active', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
    { name: 'David Smith', status: 'Active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' }
  ],
  avgSalesAction: [
    { day: 'Mon', a: 30, b: 20 }, { day: 'Tue', a: 50, b: 30 }, { day: 'Wed', a: 40, b: 25 }
  ],
  topPerformance: [
    { name: 'Skyline Heights', price: '$1.2M', rate: '98%', leads: '450', deals: '75', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100&auto=format&fit=crop&q=80' }
  ],
  pendingPayments: [
    { name: 'Liam Anderson', sub: 'Greenwood Villa', amount: '$45,000', status: 'Due Today', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' }
  ],
  activityLeads: [
    { name: 'Web', value: 60, fill: '#10b981' },
    { name: 'Social', value: 78, fill: '#f59e0b' }
  ],
  transactions: [
    { id: 'PR-101', title: 'Highland Villa', price: '$650,000', status: 'Active' }
  ],
  recentBuyers: [
    { id: 'X-01', name: 'Liam Anderson', property: 'North Heights', amount: '$450,000' }
  ]
};