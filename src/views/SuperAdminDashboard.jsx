import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BarChart3, Users, CreditCard, Search, Filter, Eye, Ban, CheckCircle2, Clock, 
  Building2, ArrowUpRight, LayoutDashboard, ShieldAlert, Settings, LogOut, Bell, X, 
  ExternalLink, ChevronLeft, ChevronRight, Plus, Check, Loader2, AlertTriangle, RefreshCw
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';

const API_BASE_URL = 'http://localhost:4000/api/subscriptions';

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // 🟢 Real Data States
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔍 Filter & Search States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // 📄 Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 📥 1. API Fetch Function
  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(API_BASE_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = Array.isArray(response.data) ? response.data : response.data.subscriptions || [];
      setSubscriptions(data);
    } catch (err) {
      console.error("Data Fetching Error:", err);
      setError("Failed to connect to server. Please verify your backend API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // 🎯 ১. Revenue Calculation: সমস্ত ডাটা (subscriptions) থেকে হিসাব হবে
  const totalRevenue = subscriptions.reduce((sum, sub) => {
  const price = Number(sub.amount) || Number(sub.planDetails?.price) || Number(sub.metadata?.planPrice) || 0;
  return sum + price;
}, 0);

  // 🎯 ২. Paid Filtered Data: বাকি সব ক্ষেত্রের জন্য শুধুমাত্র paymentStatus === 'paid' ডাটা
  const paidSubscriptions = subscriptions.filter(
    (sub) => sub.paymentStatus === 'paid'
  );

  // 📊 3. Dynamic KPI Calculations (Paid Subscriptions অনুযায়ী)
  const activeCount = paidSubscriptions.length;
  const totalProperties = paidSubscriptions.reduce((sum, sub) => sum + (Number(sub.metadata?.listedProperty) || 0), 0);
  const expiringCount = paidSubscriptions.filter(s => {
    if (!s.metadata?.endDate) return false;
    const diffDays = Math.ceil((new Date(s.metadata.endDate) - new Date()) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  }).length;

  // 📊 ১. Monthly Revenue Data Processing (Bar Chart-এর জন্য)
const monthlyRevenueData = subscriptions.reduce((acc, sub) => {
  const dateStr = sub.createdAt || sub.updatedAt;
  if (!dateStr) return acc;

  // মাস এবং বছর বের করা (যেমন: 'Sep 2026')
  const month = new Date(dateStr).toLocaleString('default', { month: 'short', year: '2-digit' });
  const amount = Number(sub.amount) || Number(sub.planDetails?.price) || Number(sub.metadata?.planPrice) || 0;

  const existingMonth = acc.find(item => item.month === month);
  if (existingMonth) {
    existingMonth.revenue += amount;
  } else {
    acc.push({ month, revenue: amount });
  }

  return acc;
}, []);

// 📈 ২. Plan Purchase Distribution Data (Pie Chart-এর জন্য)
// 📈 ২. Plan Purchase Distribution Data (শুধুমাত্র paymentStatus === 'paid' ডাটার ওপর ভিত্তি করে)
const paidSubscriptionsOnly = subscriptions.filter(s => s.paymentStatus === 'paid');

const planDistribution = [
  { 
    name: 'Professional Plan', 
    value: paidSubscriptionsOnly.filter(s => (s.planDetails?.planName || s.metadata?.planName || '').toLowerCase().includes('professional')).length, 
    color: '#6366F1' 
  },
  { 
    name: 'Growth Plan', 
    value: paidSubscriptionsOnly.filter(s => (s.planDetails?.planName || s.metadata?.planName || '').toLowerCase().includes('growth')).length, 
    color: '#10B981' 
  },
  { 
    name: 'Starter Plan', 
    value: paidSubscriptionsOnly.filter(s => (s.planDetails?.planName || s.metadata?.planName || '').toLowerCase().includes('starter')).length, 
    color: '#F59E0B' 
  },
].filter(item => item.value > 0); // যেসব প্ল্যান অন্তত ১ বার পেইড হিসেবে কেনা হয়েছে সেগুলোই দেখাবে

  // 🔍 4. Table Search & Filtering Logic (Paid Subscriptions-এর ওপর ভিত্তি করে)
  const filteredSubscriptions = paidSubscriptions.filter(item => {
    const agencyName = item.customerDetails?.agencyName || item.metadata?.agencyName || '';
    const email = item.agentEmail || item.customerDetails?.senderEmail || '';
    const tranId = item.tran_id || item.renewal_id || '';

    const matchesSearch = 
      agencyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tranId.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  // 📄 5. Pagination Calculation
  const totalPages = Math.ceil(filteredSubscriptions.length / itemsPerPage);
  const paginatedSubscriptions = filteredSubscriptions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 hidden md:flex">
        <div>
          <div className="h-16 flex items-center px-6 border-b border-slate-100 gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-900 tracking-wide">RealEstate SaaS</h2>
              <p className="text-[10px] text-indigo-600 font-semibold uppercase tracking-wider">Super Admin Panel</p>
            </div>
          </div>

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
              <CreditCard className="w-4 h-4" /> Paid Subscriptions
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
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === 'settings' ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Settings className="w-4 h-4" /> System Settings
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
              SA
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Super Admin</p>
              <p className="text-[11px] text-slate-400">admin@saas.com</p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-rose-600 transition">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <h1 className="text-lg font-bold text-slate-900 capitalize">
            {activeTab === 'dashboard' && 'Overview Dashboard'}
            {activeTab === 'subscriptions' && 'Paid Subscriptions Management'}
            {activeTab === 'agencies' && 'Registered Agencies'}
            {activeTab === 'settings' && 'System Settings'}
          </h1>

          <div className="flex items-center gap-3">
            <button 
              onClick={fetchSubscriptions} 
              className="p-2 bg-slate-100 rounded-lg text-slate-600 hover:bg-slate-200 transition"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
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
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">

          {/* LOADING STATE */}
          {loading && (
            <div className="h-96 flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
              <p className="text-sm font-semibold text-slate-500">Fetching live data from database...</p>
            </div>
          )}

          {/* ERROR STATE */}
          {error && !loading && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-700 text-sm">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{error}</span>
              <button onClick={fetchSubscriptions} className="ml-auto underline font-bold">Try Again</button>
            </div>
          )}

          {/* MAIN CONTENT */}
          {!loading && !error && (
            <>
              {activeTab === 'dashboard' && (
                <>
                  {/* KPI Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* 💰 Total Revenue: Calculated from ALL data */}
                    <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                      <div className="flex items-center justify-between text-slate-500 mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider">Total Revenue</span>
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><CreditCard className="w-4 h-4" /></div>
                      </div>
                      <h3 className="text-2xl font-extrabold text-slate-900">${totalRevenue}</h3>
                      <p className="text-xs text-emerald-600 font-medium mt-2">Calculated from ALL records ({subscriptions.length})</p>
                    </div>

                    {/* Active Paid Users */}
                    <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                      <div className="flex items-center justify-between text-slate-500 mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider">Active Paid Users</span>
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Users className="w-4 h-4" /></div>
                      </div>
                      <h3 className="text-2xl font-extrabold text-slate-900">{activeCount}</h3>
                      <p className="text-xs text-indigo-600 font-medium mt-2">Paid Status Subscribers</p>
                    </div>

                    {/* Total Listed Properties */}
                    <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                      <div className="flex items-center justify-between text-slate-500 mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider">Total Listed Properties</span>
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Building2 className="w-4 h-4" /></div>
                      </div>
                      <h3 className="text-2xl font-extrabold text-slate-900">{totalProperties}</h3>
                      <p className="text-xs text-slate-500 mt-2">Paid accounts' properties</p>
                    </div>

                    {/* Expiring Count */}
                    <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                      <div className="flex items-center justify-between text-slate-500 mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider">Expiring in 7 Days</span>
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Clock className="w-4 h-4" /></div>
                      </div>
                      <h3 className="text-2xl font-extrabold text-slate-900">{expiringCount}</h3>
                      <p className="text-xs text-amber-600 font-medium mt-2">Requires renewal attention</p>
                    </div>
                  </div>

                  {/* Plan Chart */}
                  {/* CHART SECTION: 2-COLUMN GRID */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

  {/* 📊 CHART 1: MONTHLY REVENUE (BAR CHART) */}
  <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="text-sm font-bold text-slate-900">Monthly Revenue</h3>
        <p className="text-xs text-slate-500">Monthly earnings overview</p>
      </div>
      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
        Bar View
      </span>
    </div>
    
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
          <Tooltip 
            formatter={(value) => [`$${value}`, 'Revenue']}
            contentStyle={{ backgroundColor: '#0F172A', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
          />
          <Bar dataKey="revenue" fill="#6366F1" radius={[6, 6, 0, 0]} barSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* 📈 CHART 2: PLAN PURCHASES (PIE CHART) */}
  <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col justify-between">
    <div>
      <h3 className="text-sm font-bold text-slate-900 mb-1">Plan Distribution</h3>
      <p className="text-xs text-slate-500 mb-2">Purchased plans breakdown</p>
    </div>

    <div className="h-44 flex justify-center items-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie 
            data={planDistribution} 
            innerRadius={50} 
            outerRadius={70} 
            paddingAngle={5} 
            dataKey="value"
          >
            {planDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`${value} Purchases`, 'Count']}
            contentStyle={{ backgroundColor: '#0F172A', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>

    {/* Custom Legend */}
    <div className="flex justify-center flex-wrap gap-4 pt-2 border-t border-slate-100">
      {planDistribution.map((item, index) => (
        <div key={index} className="flex items-center gap-1.5 text-xs text-slate-600">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
          <span className="font-medium">{item.name}:</span>
          <span className="font-bold text-slate-800">{item.value}</span>
        </div>
      ))}
    </div>
  </div>

</div>
                </>
              )}

              {/* TABLE SECTION (Paid Data Only) */}
              {(activeTab === 'dashboard' || activeTab === 'subscriptions') && (
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Paid Subscription Records</h3>
                      <p className="text-xs text-slate-500">Only showing subscriptions with paymentStatus = 'paid'</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-[11px] font-semibold uppercase tracking-wider border-b border-slate-100">
                          <th className="py-3.5 px-5">Agency & Agent Email</th>
                          <th className="py-3.5 px-5">Plan Details</th>
                          <th className="py-3.5 px-5">Target Domain</th>
                          <th className="py-3.5 px-5">Property Usage</th>
                          <th className="py-3.5 px-5">Payment</th>
                          <th className="py-3.5 px-5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                        {paginatedSubscriptions.length > 0 ? (
                          paginatedSubscriptions.map((sub) => {
                            const agencyName = sub.customerDetails?.agencyName || sub.metadata?.agencyName || "N/A";
                            const email = sub.agentEmail || sub.customerDetails?.senderEmail || "N/A";
                            const planName = sub.planDetails?.planName || sub.metadata?.planName || "Standard";
                            const target = sub.domainConfig?.targetAddress || sub.metadata?.targetAddress || "#";
                            const listed = sub.metadata?.listedProperty || 0;
                            const limit = sub.metadata?.propertyLimit || sub.planDetails?.limits?.listings || 1;

                            return (
                              <tr key={sub._id} className="hover:bg-slate-50/80 transition">
                                <td className="py-4 px-5">
                                  <div className="font-bold text-slate-900 text-sm">{agencyName}</div>
                                  <div className="text-slate-400 text-[11px] mt-0.5">{email}</div>
                                </td>
                                <td className="py-4 px-5">
                                  <span className="font-semibold text-slate-800">{planName}</span>
                                  <div className="text-slate-500 text-[11px]">${sub.amount} / {sub.planDetails?.duration || 'mo'}</div>
                                </td>
                                <td className="py-4 px-5">
                                  <a 
                                    href={target} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="text-indigo-600 hover:underline flex items-center gap-1 font-mono text-[11px]"
                                  >
                                    {sub.domainConfig?.customUsername || 'subdomain'} <ExternalLink className="w-3 h-3" />
                                  </a>
                                </td>
                                <td className="py-4 px-5">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-slate-800">{listed}/{limit}</span>
                                    <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                      <div 
                                        className="bg-indigo-600 h-full" 
                                        style={{ width: `${Math.min(100, (listed / limit) * 100)}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-4 px-5">
                                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-max bg-emerald-100 text-emerald-800">
                                    <CheckCircle2 className="w-3 h-3" />
                                    {sub.paymentStatus}
                                  </span>
                                </td>
                                <td className="py-4 px-5 text-right">
                                  <button 
                                    onClick={() => setSelectedUser(sub)}
                                    className="p-1.5 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-lg transition"
                                    title="View Full Profile"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="6" className="py-8 text-center text-slate-400">
                              No paid subscription records found matching your search.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Showing {paginatedSubscriptions.length} of {filteredSubscriptions.length} paid records</span>
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

              {/* SECTION: AGENCIES (Paid Only) */}
              {activeTab === 'agencies' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {paidSubscriptions.map((agency) => (
                    <div key={agency._id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
                      <h3 className="font-bold text-slate-900">{agency.customerDetails?.agencyName || agency.metadata?.agencyName || 'Agency Name N/A'}</h3>
                      <p className="text-xs text-slate-500">Agent Email: <span className="font-semibold text-slate-700">{agency.agentEmail || agency.customerDetails?.senderEmail || 'N/A'}</span></p>
                      <p className="text-xs text-slate-500">Phone: {agency.customerDetails?.whatsappNumber || 'N/A'}</p>
                      <button 
                        onClick={() => setSelectedUser(agency)}
                        className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
                      >
                        View Full Details
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* SECTION: SETTINGS */}
              {activeTab === 'settings' && (
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 max-w-xl space-y-4">
                  <h3 className="text-base font-bold text-slate-900">System Configuration</h3>
                  <p className="text-xs text-slate-500">Configure global parameters for agencies</p>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">API Base Route</label>
                    <input type="text" readOnly value={API_BASE_URL} className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-xs font-mono text-slate-600" />
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </main>

      {/* USER DETAIL MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex justify-end">
          <div className="w-full max-w-xl bg-white border-l border-slate-200 h-full overflow-y-auto p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{selectedUser.customerDetails?.agencyName || selectedUser.metadata?.agencyName || 'Agency Details'}</h2>
                  <p className="text-xs text-slate-400 font-mono">ID: {selectedUser._id}</p>
                </div>
                <button onClick={() => setSelectedUser(null)} className="p-2 text-slate-400 hover:text-slate-800 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <p className="text-slate-400">Transaction/Renewal ID:</p>
                  <p className="font-mono font-bold text-slate-800">{selectedUser.tran_id || selectedUser.renewal_id || 'N/A'}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <p className="text-slate-400">Agent Email:</p>
                  <p className="font-bold text-slate-800">{selectedUser.agentEmail || selectedUser.customerDetails?.senderEmail || 'N/A'}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <p className="text-slate-400">Target Address:</p>
                  <p className="font-mono text-indigo-600">{selectedUser.domainConfig?.targetAddress || selectedUser.metadata?.targetAddress || 'N/A'}</p>
                </div>
              </div>
            </div>

            <button onClick={() => setSelectedUser(null)} className="w-full py-2.5 bg-slate-900 text-white font-semibold text-xs rounded-lg">
              Close Detail View
            </button>
          </div>
        </div>
      )}

    </div>
  );
}