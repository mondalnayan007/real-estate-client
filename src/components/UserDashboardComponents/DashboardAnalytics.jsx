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
      {/* Header */}
      <div>
        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Analytics & Success Metrics</h2>
        <p className="text-xs text-slate-500 font-medium">Visual data streams representing live counters and traffic metrics.</p>
      </div>

      {/* Counters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Total Active Listings</p>
          <h3 className="text-3xl font-black text-slate-900 mt-1">{properties.length} <span className="text-sm font-semibold text-slate-500">Properties</span></h3>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Monthly Unique Visitors</p>
          <h3 className="text-3xl font-black text-emerald-600 mt-1">1,420 <span className="text-sm font-semibold text-slate-500">Users</span></h3>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Top Property Views</p>
          <h3 className="text-lg font-bold text-blue-600 truncate mt-2">{properties[0]?.title || 'N/A'}</h3>
        </div>
      </div>

      {/* GRAPHS & CHARTS SYSTEM */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart: Visitors Trend */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <h4 className="text-xs font-bold text-slate-700 uppercase mb-4 flex items-center gap-1.5">
            📈 Monthly Visitors Traffic
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" style={{ fontSize: 11, fontWeight: 600 }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: 11, fontWeight: 600 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', color: '#0f172a' }} 
                />
                <Line type="monotone" dataKey="Visitors" stroke="#2563eb" strokeWidth={3} dot={{ fill: '#2563eb', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Property Views */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <h4 className="text-xs font-bold text-slate-700 uppercase mb-4 flex items-center gap-1.5">
            📊 Top Viewed Properties
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" style={{ fontSize: 11, fontWeight: 600 }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: 11, fontWeight: 600 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', shadow: '0 4px 12px rgba(0,0,0,0.05)', color: '#0f172a' }} 
                />
                <Bar dataKey="Views" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Status Inventory Breakdown */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm lg:col-span-2">
          <h4 className="text-xs font-bold text-slate-700 uppercase mb-4 flex items-center gap-1.5">
            🍩 Property Inventory Allocation
          </h4>
          <div className="h-64 flex flex-col sm:flex-row items-center justify-around">
            <div className="w-full h-full max-w-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} innerRadius={60} outerRadius={80} paddingAngle={6} dataKey="value">
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a' }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100 min-w-[200px]">
              {statusData.map((d, i) => (
                <div key={i} className="flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-slate-600">{d.name}:</span>
                  </div>
                  <span className="text-slate-900 font-extrabold">{d.value} Items</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}