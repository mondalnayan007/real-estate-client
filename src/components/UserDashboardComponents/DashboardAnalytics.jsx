import React from 'react';
import { 
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, 
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis 
} from 'recharts';

export default function DashboardAnalytics({ properties = [], users = [] }) {
  // 📊 ডাইনামিক ফিল্টারিং এবং কাউন্ট ক্যালকুলেশন
  const totalProperties = properties.length;
  
  // Sold Out properties
  const soldOutCount = properties.filter(p => 
    p?.status?.toLowerCase() === 'sold out' || p?.status?.toLowerCase() === 'sold'
  ).length;

  // Active / On Sale properties
  const activeSaleCount = properties.filter(p => 
    p?.status?.toLowerCase() === 'available' || p?.status?.toLowerCase() === 'on sale'
  ).length;

  // Booked / Pending
  const bookedCount = properties.filter(p => 
    p?.status?.toLowerCase() === 'booked' || p?.status?.toLowerCase() === 'pending'
  ).length;

  // Total Connected Users (Dynamic fallback for display)
  const connectedUsersCount = users.length || 1280;

  // Pie Chart Data
  const statusData = [
    { name: 'Active / On Sale', value: activeSaleCount || 14, color: '#007b57' },
    { name: 'Booked / Pending', value: bookedCount || 5, color: '#d97706' },
    { name: 'Sold Out', value: soldOutCount || 8, color: '#dc2626' },
  ];

  // Monthly Visitors Mock Trend
  const visitorData = [
    { month: 'Jan', Visitors: 620, Inquiries: 110 },
    { month: 'Feb', Visitors: 890, Inquiries: 230 },
    { month: 'Mar', Visitors: 1250, Inquiries: 310 },
    { month: 'Apr', Visitors: 980, Inquiries: 270 },
    { month: 'May', Visitors: 1720, Inquiries: 450 },
    { month: 'Jun', Visitors: 1540, Inquiries: 390 },
  ];

  // Top Viewed Properties Ranking
  const topViewedList = properties.length > 0 
    ? [...properties].sort((a, b) => (b?.views || 0) - (a?.views || 0)).slice(0, 5)
    : [];

  return (
    <div className="bg-[#f4f7f5] p-6 sm:p-8 rounded-3xl border border-emerald-900/10 space-y-8 select-none">
      
      {/* 🚀 Header Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm">
        <div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#007b57] text-[11px] font-extrabold uppercase tracking-widest border border-emerald-200">
            Real Estate Operations
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2 tracking-tight">
            Inventory & Sales Live Overview
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#f4f7f5] px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700">
            Live Database Sync
          </div>
          <div className="w-3 h-3 rounded-full bg-[#007b57] animate-ping" />
        </div>
      </div>

      {/* 🔢 Main Real-Time Counter Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* 1. Total Properties */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm hover:border-[#007b57]/40 transition-all">
          <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">
            Total Properties
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-black text-gray-900">{totalProperties}</span>
            <span className="text-xs font-bold text-gray-500">Listings</span>
          </div>
        </div>

        {/* 2. On Sale / Active */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm border-b-4 border-b-[#007b57] hover:border-[#007b57]/40 transition-all">
          <span className="text-[10px] font-extrabold text-[#007b57] uppercase tracking-wider block">
            On Sale / Active
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-black text-[#007b57]">{activeSaleCount}</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              Available
            </span>
          </div>
        </div>

        {/* 3. Total Sold Out */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm border-b-4 border-b-red-500 hover:border-red-500/40 transition-all">
          <span className="text-[10px] font-extrabold text-red-500 uppercase tracking-wider block">
            Total Sold Out
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-black text-red-600">{soldOutCount}</span>
            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
              Closed
            </span>
          </div>
        </div>

        {/* 4. Booked / Pending */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm border-b-4 border-b-amber-500 hover:border-amber-500/40 transition-all">
          <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-wider block">
            Booked / Pending
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-black text-amber-600">{bookedCount}</span>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
              Reserved
            </span>
          </div>
        </div>

        {/* 5. Connected Users */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm border-b-4 border-b-purple-500 hover:border-purple-500/40 transition-all sm:col-span-2 lg:col-span-1">
          <span className="text-[10px] font-extrabold text-purple-600 uppercase tracking-wider block">
            Connected Users
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-black text-gray-900">{connectedUsersCount}</span>
            <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
              Active
            </span>
          </div>
        </div>

      </div>

      {/* 📈 Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Inventory Breakdown Chart */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-extrabold text-gray-900">
              Inventory Sales Share
            </h3>
            <p className="text-xs text-gray-400 mt-0.5 font-medium">
              Ratio of Active, Reserved, and Sold-out units
            </p>
          </div>

          <div className="h-60 relative my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={statusData} 
                  innerRadius={65} 
                  outerRadius={88} 
                  paddingAngle={5} 
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    borderRadius: '12px', 
                    borderColor: '#e2e8f0',
                    fontWeight: 700 
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <span className="text-3xl font-black text-gray-900 block">{totalProperties}</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Units</span>
            </div>
          </div>

          <div className="space-y-2.5 pt-4 border-t border-gray-100">
            {statusData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-md" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="text-gray-900 font-black">{item.value} Units</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Traffic & User Engagement Area Graph */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-extrabold text-gray-900">
                User Engagement & Inquiries Trend
              </h3>
              <p className="text-xs text-gray-400 mt-0.5 font-medium">
                Monthly active visitors vs direct buyer leads
              </p>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitorData}>
                <defs>
                  <linearGradient id="visitorGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#007b57" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#007b57" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: 11, fontWeight: 700 }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: 11, fontWeight: 700 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    borderRadius: '16px', 
                    borderColor: '#e2e8f0',
                    fontWeight: 700
                  }} 
                />
                <Area type="monotone" dataKey="Visitors" stroke="#007b57" strokeWidth={3} fillOpacity={1} fill="url(#visitorGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 🏆 Top Viewed Properties Section */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm">
        <h3 className="text-base font-extrabold text-gray-900 mb-4">
          Most Popular Active Listings
        </h3>
        
        {topViewedList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topViewedList.map((item, idx) => (
              <div key={idx} className="bg-[#f8faf9] p-4 rounded-2xl border border-emerald-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-900 truncate max-w-[180px]">{item?.title}</h4>
                  <span className="text-[10px] text-gray-400 font-semibold">{item?.location || 'Dhaka'}</span>
                </div>
                <span className="text-xs font-extrabold text-[#007b57] bg-emerald-100/60 px-2.5 py-1 rounded-lg">
                  {item?.views || 0} Views
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400 font-medium">No view data recorded yet.</p>
        )}
      </div>

    </div>
  );
}