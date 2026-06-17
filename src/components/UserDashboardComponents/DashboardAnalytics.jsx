import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


export default function DashboardAnalytics({ properties, tracking }) {
  // ১. Line Chart Data (Monthly Visitors)
  const visitorData = [
    { name: 'Jan', Visitors: 400 }, { name: 'Feb', Visitors: 700 }, { name: 'Mar', Visitors: 1200 },
    { name: 'Apr', Visitors: 900 }, { name: 'May', Visitors: 1500 }, { name: 'Jun', Visitors: 1420 }
  ];

  // ২. Pie Chart Data (Property Status Allocation)
  const statusData = [
    { name: 'Available', value: properties.filter(p => p.status === 'Available').length },
    { name: 'Booked', value: properties.filter(p => p.status === 'Booked/Pending').length },
    { name: 'Sold Out', value: properties.filter(p => p.status === 'Sold Out').length },
  ];
  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  // ৩. Bar Chart Data (Top Viewed Properties)
  const viewsData = properties.map(p => ({ name: p.title.substring(0, 12) + '...', Views: p.views }));

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h2 className="text-xl font-black text-white uppercase">Analytics & Success Metrics</h2>
        <p className="text-xs text-slate-400">Visual data streams representing live counters and traffic metrics.</p>
      </div>

      {/* Counters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Active Listings</p>
          <h3 className="text-3xl font-black text-white mt-1">{properties.length} Properties</h3>
        </div>
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Monthly Unique Visitors</p>
          <h3 className="text-3xl font-black text-emerald-400 mt-1">1,420 Users</h3>
        </div>
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Top Property Views</p>
          <h3 className="text-xl font-bold text-blue-400 truncate mt-2">{properties[0]?.title}</h3>
        </div>
      </div>

      {/* GRAPHS & CHARTS SYSTEM */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart: Visitors Trend */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <h4 className="text-xs font-bold text-slate-300 uppercase mb-4">📈 Monthly Visitors Traffic (Line Chart)</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" style={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" style={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Line type="monotone" dataKey="Visitors" stroke="#3b82f6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Property Views */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <h4 className="text-xs font-bold text-slate-300 uppercase mb-4">📊 Top Viewed Properties (Bar Chart)</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={viewsData}>
                <XAxis dataKey="name" stroke="#64748b" style={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" style={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Bar dataKey="Views" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Status Inventory Breakdown */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 lg:col-span-2">
          <h4 className="text-xs font-bold text-slate-300 uppercase mb-4">🍩 Property Inventory Allocation (Pie Chart)</h4>
          <div className="h-64 flex flex-col sm:flex-row items-center justify-around">
            <div className="w-full h-full max-w-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {statusData.map((d, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-semibold">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-slate-400">{d.name}:</span> <span className="text-white">{d.value} Items</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}