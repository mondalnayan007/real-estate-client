import React from 'react';
import { LayoutDashboard, Users, CreditCard, Settings, LogOut, Terminal } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'overview', name: 'Overview', icon: LayoutDashboard },
    { id: 'agents', name: 'Manage Agents', icon: Users },
    { id: 'subscriptions', name: 'Subscriptions', icon: CreditCard },
    { id: 'settings', name: 'System Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between p-6 shrink-0 h-screen">
      <div className="space-y-8">
        {/* ব্র্যান্ড লোগো */}
        <div className="flex items-center gap-2 px-2">
          <div className="p-1.5 bg-blue-600 rounded-lg text-white">
            <Terminal size={18} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-sm font-black text-white uppercase tracking-wider">PrimeEstates</h1>
            <p className="text-[9px] font-bold text-blue-500 uppercase tracking-widest">HQ Core Engine</p>
          </div>
        </div>

        {/* ডাইনামিক মেনু লিস্ট */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isItemActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)} // 👈 ক্লিক করলে ট্যাব চেঞ্জ হবে
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                  isItemActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                <Icon size={14} />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* एडমিন প্রোফাইল */}
      <div className="pt-6 border-t border-slate-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center font-black text-[10px] text-white">
            SA
          </div>
          <div>
            <div className="text-xs font-bold text-white">Super Admin</div>
            <div className="text-[9px] text-slate-500">Root Access</div>
          </div>
        </div>
        <button className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-rose-400 hover:border-rose-500/20 transition-colors">
          <LogOut size={13} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;