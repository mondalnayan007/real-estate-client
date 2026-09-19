import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  CreditCard, 
  TrendingUp, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Ban, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Globe, 
  ArrowUpRight, 
  LayoutDashboard, 
  ShieldAlert, 
  Settings, 
  LogOut,
  Bell,
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Plus,
  RefreshCw,
  Sliders,
  Check
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar
} from 'recharts';

// 📊 Analytics Data
const revenueData = [
  { month: 'Jan', revenue: 1200, subscriptions: 30 },
  { month: 'Feb', revenue: 1900, subscriptions: 45 },
  { month: 'Mar', revenue: 2400, subscriptions: 58 },
  { month: 'Apr', revenue: 3100, subscriptions: 72 },
  { month: 'May', revenue: 4200, subscriptions: 95 },
  { month: 'Jun', revenue: 5600, subscriptions: 120 },
];

const planDistribution = [
  { name: 'Starter Plan', value: 35, color: '#6366F1' },
  { name: 'Growth Plan', value: 50, color: '#10B981' },
  { name: 'Enterprise', value: 15, color: '#F59E0B' },
];

// 📋 Dummy Subscriptions Database
const initialSubscriptions = [
  {
    _id: "6aa968e138b471eb7782976b",
    tran_id: "TRAN_1789487329970_699",
    agentEmail: "kong@king.com",
    amount: 39,
    paymentStatus: "paid",
    planDetails: { planName: "Growth Plan", price: 39, duration: "monthly" },
    customerDetails: { fullName: "kongking", agencyName: "kongkingProperties", whatsappNumber: "01700000000" },
    domainConfig: { domainType: "subdomain", targetAddress: "http://kongking.localhost:5173", customUsername: "kongking" },
    metadata: { startDate: "2026-09-15", endDate: "2026-10-15", propertyLimit: 15, listedProperty: 5 },
    status: "Active"
  },
  {
    _id: "7bb968e138b471eb7782977c",
    tran_id: "TRAN_9823472394823_102",
    agentEmail: "rahim@realestate.bd",
    amount: 19,
    paymentStatus: "paid",
    planDetails: { planName: "Starter Plan", price: 19, duration: "monthly" },
    customerDetails: { fullName: "Rahim Uddin", agencyName: "Rahim Properties", whatsappNumber: "01800000000" },
    domainConfig: { domainType: "subdomain", targetAddress: "http://rahim.localhost:5173", customUsername: "rahimprop" },
    metadata: { startDate: "2026-08-01", endDate: "2026-09-01", propertyLimit: 5, listedProperty: 4 },
    status: "Expired"
  },
  {
    _id: "8cc968e138b471eb7782978d",
    tran_id: "TRAN_5512398239482_883",
    agentEmail: "admin@dhakahomes.com",
    amount: 99,
    paymentStatus: "paid",
    planDetails: { planName: "Enterprise", price: 99, duration: "monthly" },
    customerDetails: { fullName: "Tanvir Ahmed", agencyName: "Dhaka Homes Ltd", whatsappNumber: "01900000000" },
    domainConfig: { domainType: "custom", targetAddress: "https://dhakahomes.com", customUsername: "dhakahomes" },
    metadata: { startDate: "2026-09-10", endDate: "2026-10-10", propertyLimit: 100, listedProperty: 42 },
    status: "Active"
  },
  {
    _id: "9dd968e138b471eb7782979e",
    tran_id: "TRAN_1102938492039_441",
    agentEmail: "info@apexrealty.com",
    amount: 39,
    paymentStatus: "unpaid",
    planDetails: { planName: "Growth Plan", price: 39, duration: "monthly" },
    customerDetails: { fullName: "Sabbir Hossain", agencyName: "Apex Realty", whatsappNumber: "01600000000" },
    domainConfig: { domainType: "subdomain", targetAddress: "http://apex.localhost:5173", customUsername: "apexrealty" },
    metadata: { startDate: "2026-09-18", endDate: "2026-10-18", propertyLimit: 15, listedProperty: 0 },
    status: "Pending"
  }
];

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Filter Logic
  const filteredSubscriptions = subscriptions.filter(item => {
    const matchesSearch = 
      item.customerDetails.agencyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.agentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tran_id.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesFilter = statusFilter === 'All' ? true : item.status === statusFilter;

    return matchesSearch && matchesFilter;
  });

  // Pagination Calculations
  const totalPages = Math.ceil(filteredSubscriptions.length / itemsPerPage);
  const paginatedSubscriptions = filteredSubscriptions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
      
      {/* ⚪ 1. SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 hidden md:flex">
        <div>
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-slate-100 gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-900 tracking-wide">RealEstate SaaS</h2>
              <p className="text-[10px] text-indigo-600 font-semibold uppercase tracking-wider">Super Admin Panel</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" /> Overview Dashboard
            </button>

            <button 
              onClick={() => setActiveTab('subscriptions')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === 'subscriptions' ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <CreditCard className="w-4 h-4" /> All Subscriptions
            </button>

            <button 
              onClick={() => setActiveTab('agencies')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === 'agencies' ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Users className="w-4 h-4" /> Agencies / Agents
            </button>

            <button 
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === 'analytics' ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <BarChart3 className="w-4 h-4" /> Revenue & Analytics
            </button>

            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === 'settings' ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Settings className="w-4 h-4" /> System Settings
            </button>
          </nav>
        </div>

        {/* Admin Profile */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
              SA
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">System Admin</p>
              <p className="text-[11px] text-slate-400">superadmin@saas.com</p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-rose-600 transition">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* ⚪ 2. MAIN WORKSPACE */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <h1 className="text-lg font-bold text-slate-900 capitalize">
            {activeTab === 'dashboard' && 'Overview Dashboard'}
            {activeTab === 'subscriptions' && 'All Subscriptions Management'}
            {activeTab === 'agencies' && 'Registered Agencies & Real Estate Agents'}
            {activeTab === 'analytics' && 'Financial Performance & Platform Analytics'}
            {activeTab === 'settings' && 'System Configurations & Gateway Settings'}
          </h1>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search Agency, Email, Tran ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-100 border border-slate-200 text-xs text-slate-800 rounded-lg pl-9 pr-4 py-2 w-64 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
            <button className="relative p-2 bg-slate-100 rounded-lg text-slate-600 hover:bg-slate-200 transition">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1.5 right-1.5"></span>
            </button>
          </div>
        </header>

        {/* Dynamic Section Content */}
        <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">

          {/* ----------------- SECTION 1: OVERVIEW DASHBOARD ----------------- */}
          {activeTab === 'dashboard' && (
            <>
              {/* KPI Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">Total Revenue</span>
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><CreditCard className="w-4 h-4" /></div>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">$18,420</h3>
                  <p className="text-xs text-emerald-600 flex items-center gap-1 mt-2 font-medium">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% from last month
                  </p>
                </div>

                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">Active Subscriptions</span>
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Users className="w-4 h-4" /></div>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">142 Agencies</h3>
                  <p className="text-xs text-indigo-600 flex items-center gap-1 mt-2 font-medium">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +12 new this week
                  </p>
                </div>

                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">Properties Listed</span>
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Building2 className="w-4 h-4" /></div>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">1,280</h3>
                  <p className="text-xs text-slate-500 mt-2">Across all agency subdomains</p>
                </div>

                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">Expiring Soon</span>
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Clock className="w-4 h-4" /></div>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">8 Agencies</h3>
                  <p className="text-xs text-amber-600 font-medium mt-2">Renewals due within 7 days</p>
                </div>
              </div>

              {/* Overview Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 mb-1">Monthly Revenue Growth</h3>
                  <p className="text-xs text-slate-500 mb-4">Subscription earnings over the last 6 months</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData}>
                        <defs>
                          <linearGradient id="colorRevLight" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                        <YAxis stroke="#64748B" fontSize={12} />
                        <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Area type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevLight)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">Plan Distribution</h3>
                    <p className="text-xs text-slate-500 mb-4">Breakdown of active tier subscriptions</p>
                    <div className="h-44 flex justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={planDistribution} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                            {planDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    {planDistribution.map((plan, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2 text-slate-600">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: plan.color }}></span>
                          {plan.name}
                        </span>
                        <span className="font-bold text-slate-800">{plan.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ----------------- SECTION 2 & GENERAL: SUBSCRIPTIONS TABLE ----------------- */}
          {(activeTab === 'dashboard' || activeTab === 'subscriptions') && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Agency Subscription Records</h3>
                  <p className="text-xs text-slate-500">Manage payment status, plans, and agency details</p>
                </div>

                {/* Filter Dropdown Toggle */}
                <div className="relative">
                  <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 font-semibold rounded-lg transition"
                  >
                    <Filter className="w-3.5 h-3.5" /> Filter Status: <span className="text-indigo-600">{statusFilter}</span>
                  </button>

                  {isFilterOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-xl z-20 p-1.5 space-y-1">
                      {['All', 'Active', 'Expired', 'Pending'].map((status) => (
                        <button
                          key={status}
                          onClick={() => { setStatusFilter(status); setIsFilterOpen(false); setCurrentPage(1); }}
                          className={`w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center justify-between transition ${
                            statusFilter === status ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {status} {statusFilter === status && <Check className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-[11px] font-semibold uppercase tracking-wider border-b border-slate-100">
                      <th className="py-3.5 px-5">Agency & Owner</th>
                      <th className="py-3.5 px-5">Plan</th>
                      <th className="py-3.5 px-5">Subdomain / Domain</th>
                      <th className="py-3.5 px-5">Prop Limit</th>
                      <th className="py-3.5 px-5">Status</th>
                      <th className="py-3.5 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                    {paginatedSubscriptions.length > 0 ? (
                      paginatedSubscriptions.map((sub) => (
                        <tr key={sub._id} className="hover:bg-slate-50/80 transition">
                          <td className="py-4 px-5">
                            <div className="font-bold text-slate-900 text-sm">{sub.customerDetails.agencyName}</div>
                            <div className="text-slate-400 text-[11px] mt-0.5">{sub.agentEmail}</div>
                          </td>
                          <td className="py-4 px-5">
                            <span className="font-semibold text-slate-800">{sub.planDetails.planName}</span>
                            <div className="text-slate-500 text-[11px]">${sub.amount} / {sub.planDetails.duration}</div>
                          </td>
                          <td className="py-4 px-5">
                            <a 
                              href={sub.domainConfig.targetAddress} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-indigo-600 hover:underline flex items-center gap-1 font-mono text-[11px]"
                            >
                              {sub.domainConfig.customUsername}.localhost <ExternalLink className="w-3 h-3" />
                            </a>
                          </td>
                          <td className="py-4 px-5">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-800">{sub.metadata.listedProperty}/{sub.metadata.propertyLimit}</span>
                              <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div 
                                  className="bg-indigo-600 h-full" 
                                  style={{ width: `${(sub.metadata.listedProperty / sub.metadata.propertyLimit) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-5">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-max ${
                              sub.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                              sub.status === 'Expired' ? 'bg-rose-100 text-rose-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {sub.status === 'Active' && <CheckCircle2 className="w-3 h-3" />}
                              {sub.status === 'Expired' && <ShieldAlert className="w-3 h-3" />}
                              {sub.status}
                            </span>
                          </td>
                          <td className="py-4 px-5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => setSelectedUser(sub)}
                                className="p-1.5 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-lg transition"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                className="p-1.5 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white rounded-lg transition"
                                title="Suspend Agency"
                              >
                                <Ban className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="py-8 text-center text-slate-400">
                          No agency subscription found matching your criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Showing {paginatedSubscriptions.length} of {filteredSubscriptions.length} Agencies</span>
                <div className="flex items-center gap-2">
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-50 transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-semibold text-slate-700">Page {currentPage} of {totalPages || 1}</span>
                  <button 
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-50 transition"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ----------------- SECTION 3: AGENCIES / AGENTS VIEW ----------------- */}
          {activeTab === 'agencies' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Registered Agency Owners</h2>
                  <p className="text-xs text-slate-500">Direct directory of all agency contact profiles</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-indigo-700 transition">
                  <Plus className="w-4 h-4" /> Add Manual Agency
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {subscriptions.map((agency) => (
                  <div key={agency._id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center">
                        {agency.customerDetails.fullName.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {agency.planDetails.planName}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">{agency.customerDetails.agencyName}</h3>
                      <p className="text-xs text-slate-500">Owner: {agency.customerDetails.fullName}</p>
                    </div>

                    <div className="text-xs space-y-1.5 text-slate-600 border-t border-slate-100 pt-3">
                      <p>📧 {agency.agentEmail}</p>
                      <p>📞 {agency.customerDetails.whatsappNumber}</p>
                      <p>🌐 <a href={agency.domainConfig.targetAddress} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">{agency.domainConfig.customUsername}.localhost</a></p>
                    </div>

                    <button 
                      onClick={() => setSelectedUser(agency)}
                      className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
                    >
                      View Detailed Profile
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ----------------- SECTION 4: REVENUE & ANALYTICS VIEW ----------------- */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-1">Financial Overview</h3>
                <p className="text-xs text-slate-500 mb-4">Detailed breakdown of monthly subscriptions vs total payout</p>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                      <YAxis stroke="#64748B" fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="#6366F1" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* ----------------- SECTION 5: SYSTEM SETTINGS VIEW ----------------- */}
          {activeTab === 'settings' && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 max-w-2xl space-y-6">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Platform Global Settings</h3>
              
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Base Platform Domain</label>
                  <input type="text" defaultValue="localhost:5173" className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:border-indigo-500" />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Default Currency</label>
                  <select className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:border-indigo-500">
                    <option value="USD">USD ($)</option>
                    <option value="BDT">BDT (৳)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="font-bold text-slate-800">Auto Suspend Expired Accounts</p>
                    <p className="text-slate-500">Automatically revoke subdomain access if subscription ends</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-600" />
                </div>
              </div>

              <button className="bg-indigo-600 text-white font-semibold text-xs px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition">
                Save Platform Settings
              </button>
            </div>
          )}

        </div>
      </main>

      {/* ⚪ 3. USER DETAIL DRAWER (LIGHT MODE) */}
      {selectedUser && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex justify-end">
          <div className="w-full max-w-xl bg-white border-l border-slate-200 h-full overflow-y-auto p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
            
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{selectedUser.customerDetails.agencyName}</h2>
                  <p className="text-xs text-slate-400">Subscription ID: {selectedUser._id}</p>
                </div>
                <button 
                  onClick={() => setSelectedUser(null)}
                  className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 bg-indigo-50/60 border border-indigo-100 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-indigo-600 font-semibold">Active Plan</p>
                  <h3 className="text-lg font-bold text-slate-900">{selectedUser.planDetails.planName} (${selectedUser.amount}/mo)</h3>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                  {selectedUser.paymentStatus.toUpperCase()}
                </span>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Agency Profile</h4>
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400">Owner:</span>
                    <p className="font-semibold text-slate-800 mt-0.5">{selectedUser.customerDetails.fullName}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Email:</span>
                    <p className="font-semibold text-slate-800 mt-0.5">{selectedUser.agentEmail}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">WhatsApp:</span>
                    <p className="font-semibold text-slate-800 mt-0.5">{selectedUser.customerDetails.whatsappNumber}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Tran ID:</span>
                    <p className="font-mono text-slate-800 mt-0.5">{selectedUser.tran_id}</p>
                  </div>
                </div>

                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Domain & Subdomain</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Domain Type:</span>
                    <span className="font-bold text-indigo-600 uppercase">{selectedUser.domainConfig.domainType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Target Address:</span>
                    <a href={selectedUser.domainConfig.targetAddress} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
                      {selectedUser.domainConfig.targetAddress}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex gap-3">
              <button className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg transition">
                Extend Validity (+30 Days)
              </button>
              <button className="py-2.5 px-4 bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold text-xs rounded-lg transition">
                Suspend Agency
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}