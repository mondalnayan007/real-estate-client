import React from 'react';
import { Users, Star, CheckCircle2, FolderKanban } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      id: 1,
      value: "1200",
      suffix: "+",
      label: "Happy Clients",
      icon: Users,
      bgColor: "bg-blue-50/60 hover:bg-[#E9F0FE]",
      iconBg: "bg-blue-600",
      textColor: "text-slate-800",
      plusColor: "text-emerald-500",
      shadowColor: "shadow-blue-100",
    },
    {
      id: 2,
      value: "4.9",
      suffix: "/5",
      label: "Average Rating",
      icon: Star,
      bgColor: "bg-amber-50/60 hover:bg-[#FBF4E3]",
      iconBg: "bg-amber-500",
      textColor: "text-slate-800",
      plusColor: "text-emerald-600",
      shadowColor: "shadow-amber-100",
    },
    {
      id: 3,
      value: "98",
      suffix: "%",
      label: "Satisfaction Rate",
      icon: CheckCircle2,
      bgColor: "bg-emerald-50/60 hover:bg-[#E5F5EC]",
      iconBg: "bg-emerald-600",
      textColor: "text-slate-800",
      plusColor: "text-emerald-600",
      shadowColor: "shadow-emerald-100",
    },
    {
      id: 4,
      value: "52",
      suffix: "+",
      label: "Ongoing Projects",
      icon: FolderKanban,
      bgColor: "bg-purple-50/60 hover:bg-[#F7E9FF]",
      iconBg: "bg-purple-600",
      textColor: "text-slate-800",
      plusColor: "text-emerald-500",
      shadowColor: "shadow-purple-100",
    },
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className={`group relative p-8 rounded-2xl  transition-all duration-300 ease-out 
                transform hover:scale-110 shadow-xl  hover:${item.shadowColor} ${item.bgColor} 
                flex flex-col items-center justify-center text-center cursor-pointer`}
            >
              {/* 🟢 Icon Square Container (Hover Effect: Rotates & Scales) */}
              <div
                className={`w-14 h-14 rounded-2xl ${item.iconBg} text-white flex items-center justify-center 
                  shadow-md transition-transform duration-300 ease-out group-hover:rotate-6 group-hover:scale-110 mb-5`}
              >
                <IconComponent className="w-7 h-7" />
              </div>

              {/* 📊 Counter Value */}
              <h3 className={`text-3xl font-extrabold ${item.textColor} tracking-tight mb-2 flex items-center justify-center gap-1`}>
                <span>{item.value}</span>
                <span className={item.plusColor}>{item.suffix}</span>
              </h3>

              {/* 🏷️ Label */}
              <p className="text-sm font-semibold text-slate-500 tracking-wide">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}