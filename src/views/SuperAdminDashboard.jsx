import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BarChart3, 
  Users, 
  CreditCard, 
  Search, 
  Filter, 
  Eye, 
  Ban, 
  CheckCircle2, 
  Clock, 
  Building2, 
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
  Check,
  Loader2,
  AlertTriangle,
  RefreshCw
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

// 🔗 আপনার ব্যাকএন্ড API Endpoint (প্রয়োজন অনুযায়ী পরিবর্তন করুন)
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
      
      // Authorization Header এর প্রয়োজন হলে headers অবজেক্ট ব্যবহার করুন
      const response = await axios.get(API_BASE_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      // API Response Array নাকি Object তা হ্যান্ডেল করা হচ্ছে
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

  // 📊 2. Dynamic KPI Calculations (Based on Real Fetched Data)
  const totalRevenue = subscriptions.reduce((sum, sub) => sum + (Number(sub.amount) || 0), 0);
  const activeCount = subscriptions.filter(s => (s.paymentStatus === 'paid' || s.status === 'Active')).length;
  const totalProperties = subscriptions.reduce((sum, sub) => sum + (Number(sub.metadata?.listedProperty) || 0), 0);
  const expiringCount = subscriptions.filter(s => {
    if (!s.metadata?.endDate) return false;
    const diffDays = Math.ceil((new Date(s.metadata.endDate) - new Date()) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  }).length;

  // 📈 Dynamic Chart Data Generation from Real Array
  const planDistribution = [
    { name: 'Starter Plan', value: subscriptions.filter(s => s.planDetails?.planName?.toLowerCase().includes('starter')).length || 0, color: '#6366F1' },
    { name: 'Growth Plan', value: subscriptions.filter(s => s.planDetails?.planName?.toLowerCase().includes('growth')).length || 0, color: '#10B981' },
    { name: 'Enterprise', value: subscriptions.filter(s => s.planDetails?.planName?.toLowerCase().includes('enterprise')).length || 0, color: '#F59E0B' },
  ];

  // 🔍 3. Filtering Logic
  const filteredSubscriptions = subscriptions.filter(item => {
    const agencyName = item.customerDetails?.agencyName || item.metadata?.agencyName || '';
    const email = item.agentEmail || item.customerDetails?.senderEmail || '';
    const tranId = item.tran_id || '';

    const matchesSearch = 
      agencyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tranId.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesFilter = statusFilter === 'All' ? true : 
      (statusFilter === 'Active' ? item.paymentStatus === 'paid' : item.paymentStatus !== 'paid');

    return matchesSearch && matchesFilter;
  });

  // 📄 4. Pagination Calculation
  const totalPages = Math.ceil(filteredSubscriptions.length / itemsPerPage);
  const paginatedSubscriptions = filteredSubscriptions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
      
      {/* ⚪ SIDEBAR NAVIGATION */}
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

      {/* ⚪ MAIN WORKSPACE */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <h1 className="text-lg font-bold text-slate-900 capitalize">
            {activeTab === 'dashboard' && 'Overview Dashboard'}
            {activeTab === 'subscriptions' && 'All Subscriptions Management'}
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

        {/* Dashboard Content Container */}
        <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">

          {/* 🌀 LOADING STATE */}
          {loading && (
            <div className="h-96 flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
              <p className="text-sm font-semibold text-slate-500">Fetching live data from database...</p>
            </div>
          )}

          {/* ❌ ERROR STATE */}
          {error && !loading && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-700 text-sm">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{error}</span>
              <button onClick={fetchSubscriptions} className="ml-auto underline font-bold">Try Again</button>
            </div>
          )}

          {/* 🟢 MAIN DASHBOARD CONTENT */}
          {!loading && !error && (
            <>
              {/* SECTION: OVERVIEW DASHBOARD */}
              {activeTab === 'dashboard' && (
                <>
                  {/* Dynamic KPI Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                      <div className="flex items-center justify-between text-slate-500 mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider">Total Revenue</span>
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><CreditCard className="w-4 h-4" /></div>
                      </div>
                      <h3 className="text-2xl font-extrabold text-slate-900">${totalRevenue}</h3>
                      <p className="text-xs text-emerald-600 font-medium mt-2">Calculated from DB</p>
                    </div>

                    <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                      <div className="flex items-center justify-between text-slate-500 mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider">Active Paid Users</span>
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Users className="w-4 h-4" /></div>
                      </div>
                      <h3 className="text-2xl font-extrabold text-slate-900">{activeCount} / {subscriptions.length}</h3>
                      <p className="text-xs text-indigo-600 font-medium mt-2">Agencies with paid status</p>
                    </div>

                    <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                      <div className="flex items-center justify-between text-slate-500 mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider">Total Listed Properties</span>
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Building2 className="w-4 h-4" /></div>
                      </div>
                      <h3 className="text-2xl font-extrabold text-slate-900">{totalProperties}</h3>
                      <p className="text-xs text-slate-500 mt-2">Live property entries</p>
                    </div>

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
                  <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                    <h3 className="text-sm font-bold text-slate-900 mb-1">Database Tier Distribution</h3>
                    <p className="text-xs text-slate-500 mb-4">Real distribution of active tier plans</p>
                    <div className="h-48 flex justify-center">
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
                </>
              )}

              {/* TABLE SECTION: SUBSCRIPTIONS DATA */}
              {(activeTab === 'dashboard' || activeTab === 'subscriptions') && (
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Database Records</h3>
                      <p className="text-xs text-slate-500">Live MongoDB Subscription Entries</p>
                    </div>

                    <div className="relative">
                      <button 
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 font-semibold rounded-lg transition"
                      >
                        <Filter className="w-3.5 h-3.5" /> Filter Status: <span className="text-indigo-600">{statusFilter}</span>
                      </button>

                      {isFilterOpen && (
                        <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-xl z-20 p-1.5 space-y-1">
                          {['All', 'Active', 'Pending'].map((status) => (
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

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-[11px] font-semibold uppercase tracking-wider border-b border-slate-100">
                          <th className="py-3.5 px-5">Agency & Owner</th>
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
                                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-max ${
                                    sub.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                  }`}>
                                    {sub.paymentStatus === 'paid' ? <CheckCircle2 className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
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
                              No DB entries found matching the filter or search.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Showing {paginatedSubscriptions.length} of {filteredSubscriptions.length} records</span>
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

              {/* SECTION: AGENCIES */}
              {activeTab === 'agencies' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {subscriptions.map((agency) => (
                    <div key={agency._id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
                      <h3 className="font-bold text-slate-900">{agency.customerDetails?.agencyName || agency.metadata?.agencyName}</h3>
                      <p className="text-xs text-slate-500">Email: {agency.agentEmail}</p>
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

      {/* ⚪ USER DETAIL MODAL / DRAWER */}
      {selectedUser && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex justify-end">
          <div className="w-full max-w-xl bg-white border-l border-slate-200 h-full overflow-y-auto p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{selectedUser.customerDetails?.agencyName || selectedUser.metadata?.agencyName}</h2>
                  <p className="text-xs text-slate-400 font-mono">ID: {selectedUser._id}</p>
                </div>
                <button onClick={() => setSelectedUser(null)} className="p-2 text-slate-400 hover:text-slate-800 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <p className="text-slate-400">Transaction ID:</p>
                  <p className="font-mono font-bold text-slate-800">{selectedUser.tran_id}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <p className="text-slate-400">Owner Name:</p>
                  <p className="font-bold text-slate-800">{selectedUser.customerDetails?.fullName || selectedUser.metadata?.agentName}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <p className="text-slate-400">Target Address:</p>
                  <p className="font-mono text-indigo-600">{selectedUser.domainConfig?.targetAddress || selectedUser.metadata?.targetAddress}</p>
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