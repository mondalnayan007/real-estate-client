import React from 'react';
import { TrendingUp } from 'lucide-react';

const SubscriptionChart = () => {
  // টেলউইন্ড ডাইনামিক ক্লাসের বদলে ডিরেক্ট পারসেন্টেজ ভ্যালু ব্যবহার করছি
  const chartData = [
    { month: 'Jan', revenue: 40, percentage: '40%' },
    { month: 'Feb', revenue: 55, percentage: '55%' },
    { month: 'Mar', revenue: 48, percentage: '48%' },
    { month: 'Apr', revenue: 70, percentage: '70%' },
    { month: 'May', revenue: 85, percentage: '85%' },
    { month: 'Jun', revenue: 110, percentage: '95%' }, // কারেন্ট মাস (সবচেয়ে বেশি)
  ];

  return (
    <div className="bg-slate-900/60 border border-slate-900 p-6 rounded-2xl backdrop-blur-sm flex flex-col justify-between h-[320px]">
      {/* চার্ট হেডার */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h4 className="text-xs font-black text-white uppercase tracking-wider">Revenue Analytics</h4>
          <p className="text-[11px] text-slate-500 font-medium">Platform growth scaled across Q1-Q2 (2026).</p>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
          <TrendingUp size={12} /> +24.5%
        </div>
      </div>

      {/* 📊 মেইন গ্রাফ বার (Bars) */}
      <div className="flex items-end justify-between h-[180px] pt-4 px-2 border-b border-slate-800/50 relative">
        {chartData.map((data, index) => (
          <div key={index} className="flex flex-col items-center flex-1 group cursor-pointer relative h-full justify-end">
            
            {/* টুলটিপ (হোভার করলে রেভেনিউ দেখাবে) */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 text-[10px] font-mono font-bold text-white px-1.5 py-0.5 rounded mb-2 shadow-lg shadow-blue-600/20 absolute bottom-full left-1/2 -translate-x-1/2 z-10 pointer-events-none whitespace-nowrap">
              ${data.revenue}
            </div>

            {/* গ্রাফের পিলার বা বার - inline style দিয়ে height ফিক্স করা হয়েছে */}
            <div 
              style={{ height: data.percentage }} 
              className="w-7 sm:w-9 bg-gradient-to-t from-blue-600/40 to-blue-500 rounded-t-lg group-hover:to-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </div>
          </div>
        ))}
      </div>

      {/* এক্সিস লেবেল (মাসের নামগুলো) */}
      <div className="flex justify-between px-2 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
        {chartData.map((data, index) => (
          <span key={index} className="w-7 sm:w-9 text-center group-hover:text-slate-300">
            {data.month}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionChart;