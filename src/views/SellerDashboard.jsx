import React, { useState } from 'react';
import { 
  Building2, PlusCircle, ListFilter, Layers, 
  DollarSign, MapPin, FileText, Trash2, Eye, 
  CheckCircle, Clock, Upload, Image as ImageIcon, X, 
  Zap, CreditCard, AlertTriangle, HelpCircle 
} from 'lucide-react';

// প্রাথমিক কিছু ডামি প্রোপার্টি ডাটা
const initialProperties = [
  {
    id: 'PRP-9021',
    title: 'The Obsidian Penthouse',
    price: '$4,500,000',
    location: 'Manhattan, NY',
    type: 'Penthouse',
    status: 'Active',
    views: 1240,
    date: 'May 12, 2026',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80']
  },
  {
    id: 'PRP-4402',
    title: 'Malibu Coastal Horizon Villa',
    price: '$8,200,000',
    location: 'Malibu, CA',
    type: 'Villa',
    status: 'Pending',
    views: 850,
    date: 'May 28, 2026',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80']
  }
];

export default function SellerDashboard() {
  const [properties, setProperties] = useState(initialProperties);
  const [activeTab, setActiveTab] = useState('overview');
  
  // 🌟 SUBSCRIPTION STATES
  const [currentPlan, setCurrentPlan] = useState('Basic'); 
  const [totalAllowedListings, setTotalAllowedListings] = useState(5); 
  
  // 🌟 FIX: প্রোপার্টি ডিলিট করলেও যাতে কোটা খালি না হয়, তাই আলাদাভাবে মোট ব্যবহৃত কোটা ট্র্যাক করার স্টেট
  // ডামি ডাটাতে অলরেডি ২টি পোস্ট আছে, তাই শুরুতে ২ সেট করা হলো
  const [usedListingsCount, setUsedListingsCount] = useState(2); 

  // 🌟 SWEET ALERT / MODAL STATE
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // ইমেজ আপলোড ও ফর্ম স্টেট
  const [uploadedImages, setUploadedImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    type: 'Apartment',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileUrls = files.map(file => URL.createObjectURL(file));
    setUploadedImages(prev => [...prev, ...fileUrls]);
  };

  const removePreviewImage = (indexToRemove) => {
    setUploadedImages(uploadedImages.filter((_, index) => index !== indexToRemove));
  };

  const handleBuyPlan = (planName, price, limit) => {
    setCurrentPlan(planName);
    setTotalAllowedListings(limit);
    // প্ল্যান পরিবর্তন বা রিনিউ হলে ব্যবহৃত কোটা নতুন করে রিসেট করতে পারেন
    setUsedListingsCount(0); 
    alert(`Successfully subscribed to ${planName} Plan (৳${price})! Your limit has been reset to ${limit} listings.`);
    setActiveTab('overview');
  };

  // ফর্মের বাটন ক্লিক করলে সরাসরি সাবমিট না হয়ে কনফার্মেশন অ্যালার্ট দেখাবে
  const triggerSubmitConfirmation = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.location) {
      alert("Please fill in all required fields.");
      return;
    }
    setShowConfirmModal(true); // Sweet Alert Modal দৃশ্যমান হবে
  };

  // 🌟 সেলার সুইট অ্যালার্টে "Confirm" করলে এই ফাংশনটি রান হবে
  const confirmAndPublishProperty = () => {
    setShowConfirmModal(false);

    const newProperty = {
      id: `PRP-${Math.floor(1000 + Math.random() * 9000)}`,
      title: formData.title,
      price: formData.price.startsWith('$') ? formData.price : `$${formData.price}`,
      location: formData.location,
      type: formData.type,
      status: 'Active',
      views: 0,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      images: uploadedImages.length > 0 ? uploadedImages : ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80']
    };

    setProperties([newProperty, ...properties]);
    
    // 🌟 ব্যবহৃত কোটা ১ বাড়িয়ে দেওয়া হলো (এটি ডিলিট করলেও কমবে না)
    setUsedListingsCount(prev => prev + 1);

    // ফর্ম রিসেট
    setFormData({ title: '', price: '', location: '', type: 'Apartment', description: '' });
    setUploadedImages([]);
    setActiveTab('my-properties');
  };

  // 🌟 FIX: ডিলিট করলেও usedListingsCount কমবে না, শুধুমাত্র লিস্ট থেকে সরবে
  const handleDeleteProperty = (id) => {
    if(window.confirm("Are you sure you want to delete this listing from your active view? (Note: Used subscription slot will not be refunded)")) {
      setProperties(properties.filter(item => item.id !== id));
    }
  };

  // 🌟 নতুন লজিক অনুযায়ী কোটা শেষ কি না তা চেক
  const isLimitReached = usedListingsCount >= totalAllowedListings;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row pt-20 select-none relative">
      
      {/* ================= 🚨 CUSTOM SWEET ALERT MODAL ================= */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-sm w-full text-center space-y-5 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="h-14 w-14 rounded-full bg-blue-600/10 text-blue-500 flex items-center justify-center mx-auto border border-blue-500/20">
              <HelpCircle size={28} />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-slate-100">Confirm Asset Broadcast?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Publishing this will consume <span className="text-amber-400 font-bold">1 listing slot</span> from your subscription pool. This slot cannot be reclaimed even if you delete the property later.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 bg-slate-950 border border-slate-800 hover:bg-slate-900 text-xs font-bold uppercase tracking-wider rounded-xl transition text-slate-400"
              >
                Cancel
              </button>
              <button 
                onClick={confirmAndPublishProperty}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-xs font-bold uppercase tracking-wider rounded-xl transition text-white shadow-lg shadow-blue-600/20"
              >
                Confirm & Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 🎛️ SIDEBAR NAVIGATION ================= */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800/60 p-6 flex flex-col gap-2 shrink-0">
        <div className="mb-6 px-2">
          <p className="text-[10px] font-mono tracking-widest text-blue-500 uppercase font-bold">Seller Console</p>
          <h2 className="text-xl font-bold text-slate-100 mt-1">Prime Estates</h2>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-full mt-2">
            <Zap size={10} /> {currentPlan} Tier
          </span>
        </div>

        <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'overview' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-950 hover:text-white'}`}><Layers size={16} /> Overview & Analytics</button>
        <button onClick={() => setActiveTab('add-property')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'add-property' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-950 hover:text-white'}`}><PlusCircle size={16} /> Submit Property</button>
        <button onClick={() => setActiveTab('my-properties')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'my-properties' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-950 hover:text-white'}`}><ListFilter size={16} /> My Listings ({properties.length})</button>
        <button onClick={() => setActiveTab('subscription')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'subscription' ? 'bg-amber-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-950 hover:text-white'}`}><CreditCard size={16} /> Subscriptions Plan</button>
      </aside>

      {/* ================= 💻 MAIN CONTENT MONITOR ================= */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        
        {/* TAB 1: OVERVIEW & LIVE PROGRESS BAR */}
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Welcome Back, Elite Seller</h1>
              <p className="text-slate-400 text-xs mt-1">Monitor your tier slot consumption policy.</p>
            </div>

            {/* PROGRESS BAR WIDGET */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-slate-200">Subscription Usage Tracker</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Active Tier: <span className="text-amber-400 font-semibold">{currentPlan} Plan</span></p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-2xl font-black text-white">{usedListingsCount}</span>
                  <span className="text-xs font-bold text-slate-500"> / {totalAllowedListings} Slots Spent</span>
                </div>
              </div>

              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/60">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${isLimitReached ? 'bg-rose-500' : 'bg-gradient-to-r from-blue-500 to-indigo-600'}`}
                  style={{ width: `${Math.min((usedListingsCount / totalAllowedListings) * 100, 100)}%` }}
                />
              </div>

              {isLimitReached && (
                <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/5 border border-rose-500/10 p-3 rounded-xl">
                  <AlertTriangle size={14} className="shrink-0" />
                  <span>Your subscription pool has empty slots. Upgrades required to create further masterworks.</span>
                </div>
              )}
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Live Active Properties</p>
                  <p className="text-3xl font-black mt-2">{properties.length}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500">
                  <Building2 size={22} />
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Spent Subscription Units</p>
                  <p className="text-3xl font-black mt-2">{usedListingsCount}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-amber-600/10 flex items-center justify-center text-amber-500">
                  <Zap size={22} />
                </div>
              </div>
            </div>

            {/* 🌟 NEW: REALESTATE PLATFORM ANALYSIS METRICS (ডিজাইন ও গ্রিড লেআউট অক্ষুণ্ণ রাখা হয়েছে) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Inquiries Received</p>
                  <p className="text-2xl font-black mt-2 text-slate-100">48</p>
                  <p className="text-[10px] text-slate-500 mt-1">Admin notified by buyers</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-400">
                  <FileText size={18} />
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Admin Dealing Action</p>
                  <p className="text-2xl font-black mt-2 text-amber-400">05</p>
                  <p className="text-[10px] text-slate-500 mt-1">Deals currently in negotiation</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-amber-600/10 flex items-center justify-center text-amber-400">
                  <Clock size={18} />
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider font-sans">Conversion Rate</p>
                  <p className="text-2xl font-black mt-2 text-emerald-400">12.4%</p>
                  <p className="text-[10px] text-slate-500 mt-1">Views to Inquiry conversion</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-400">
                  <CheckCircle size={18} />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PROPERTY FORM */}
        {activeTab === 'add-property' && (
          <div className="max-w-3xl space-y-8 animate-in fade-in duration-300">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Post New Premium Asset</h1>
              <p className="text-slate-400 text-xs mt-1">Deploy an architectural masterpiece onto the off-market network grid.</p>
            </div>

            {isLimitReached ? (
              <div className="p-8 bg-slate-900 border-2 border-dashed border-rose-500/30 rounded-2xl text-center space-y-4">
                <AlertTriangle size={32} className="mx-auto text-rose-500" />
                <h3 className="text-lg font-bold text-slate-200">Listing Creation Terminated</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">You have used up all {totalAllowedListings} of your available slots. Deleting properties will not refund your pool limit.</p>
                <button onClick={() => setActiveTab('subscription')} className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition">Upgrade Plan Now</button>
              </div>
            ) : (
              <form onSubmit={triggerSubmitConfirmation} className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Property Title *</label>
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} required placeholder="e.g., Ultra Modern Glass Penthouse" className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Asking Valuation ($) *</label>
                    <input type="text" name="price" value={formData.price} onChange={handleInputChange} required placeholder="e.g., 5,500,000" className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Architecture Category</label>
                    <select name="type" value={formData.type} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition cursor-pointer">
                      <option value="Apartment">Apartment Monolith</option>
                      <option value="Penthouse">Bespoke Penthouse</option>
                      <option value="Villa">Luxury Coastal Villa</option>
                    </select>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Geographic Location *</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-4 top-3.5 text-slate-600" />
                      <input type="text" name="location" value={formData.location} onChange={handleInputChange} required placeholder="e.g., Beverly Hills, California" className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-200 outline-none transition" />
                    </div>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Upload Property Media Galleries</label>
                    <div className="w-full border-2 border-dashed border-slate-800 hover:border-blue-500/50 bg-slate-950/40 rounded-2xl p-6 transition flex flex-col items-center justify-center relative group cursor-pointer">
                      <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      <div className="flex flex-col items-center gap-2 pointer-events-none text-center">
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-400 group-hover:text-blue-400 transition"><Upload size={20} /></div>
                        <p className="text-xs font-bold text-slate-300">Click or Drag images to upload</p>
                      </div>
                    </div>

                    {uploadedImages.length > 0 && (
                      <div className="grid grid-cols-4 gap-4 mt-4 bg-slate-950 p-4 rounded-xl border border-slate-900">
                        {uploadedImages.map((url, index) => (
                          <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-slate-800 bg-slate-900">
                            <img src={url} alt="Preview" className="w-full h-full object-cover" />
                            <button type="button" onClick={() => removePreviewImage(index)} className="absolute top-1 right-1 p-1 bg-black/70 hover:bg-rose-600 rounded-full text-white transition z-20"><X size={12} /></button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl transition shadow-lg">
                  Broadcast Asset To Network
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 3: SELLER PROPERTIES LIST */}
        {activeTab === 'my-properties' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">My Active Portfolio ({properties.length})</h1>
              <p className="text-slate-400 text-xs mt-1">Audit, monitor telemetry, or deprecate your high-end real estate listings.</p>
            </div>

            <div className="w-full bg-slate-900 border border-slate-800/60 rounded-2xl overflow-hidden shadow-2xl">
              {properties.length === 0 ? (
                <div className="p-12 text-center text-slate-500 space-y-3">
                  <Building2 size={40} className="mx-auto text-slate-700" />
                  <p className="text-sm font-medium">No properties found in your vault portfolio.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[750px]">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-950/50 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        <th className="p-4 pl-6">Asset ID</th>
                        <th className="p-4">Visuals</th>
                        <th className="p-4">Property Identity</th>
                        <th className="p-4">Architecture</th>
                        <th className="p-4">Valuation</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Analytics</th>
                        <th className="p-4 pr-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50 text-xs">
                      {properties.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-950/40 transition-colors group">
                          <td className="p-4 pl-6 font-mono text-slate-500 font-bold">{item.id}</td>
                          <td className="p-4">
                            <div className="relative h-11 w-14 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center">
                              {item.images && item.images.length > 0 ? (
                                <>
                                  <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                                  {item.images.length > 1 && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-[9px] font-mono font-bold text-blue-400">+{item.images.length - 1}</div>
                                  )}
                                </>
                              ) : (
                                <ImageIcon size={16} className="text-slate-700" />
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors">{item.title}</p>
                            <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5"><MapPin size={10} />{item.location}</p>
                          </td>
                          <td className="p-4"><span className="bg-slate-950 text-slate-400 px-2 py-0.5 border border-slate-800 rounded font-medium">{item.type}</span></td>
                          <td className="p-4 font-bold text-slate-200">{item.price}</td>
                          <td className="p-4">
                            <span className="flex items-center gap-1.5 text-emerald-400 font-medium bg-emerald-500/10 w-max px-2.5 py-0.5 rounded-full border border-emerald-500/20"><CheckCircle size={11} /> Active</span>
                          </td>
                          <td className="p-4 text-slate-400 font-mono flex items-center gap-1 mt-2.5"><Eye size={12} className="text-slate-600" /> {item.views} views</td>
                          <td className="p-4 pr-6 text-right">
                            <button onClick={() => handleDeleteProperty(item.id)} className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"><Trash2 size={15} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: PRICING SECTION */}
        {activeTab === 'subscription' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Subscription Packages</h1>
              <p className="text-slate-400 text-xs mt-1">Upgrade your slot boundaries to broadcast larger volumes of real estate marvels.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              <div className={`border rounded-3xl p-8 space-y-6 relative flex flex-col justify-between ${currentPlan === 'Basic' ? 'bg-slate-900 border-blue-500 shadow-xl' : 'bg-slate-900/40 border-slate-800'}`}>
                {currentPlan === 'Basic' && <span className="absolute -top-3 left-6 text-[10px] font-mono uppercase bg-blue-600 text-white px-3 py-1 rounded-full font-bold">Active Plan</span>}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-200">Basic Broker Tier</h3>
                  <p className="text-slate-400 text-xs">Ideal for boutique agents or individual premium property owners.</p>
                  <div className="pt-4"><span className="text-3xl font-black text-white">৳1,000</span><span className="text-xs text-slate-500"> / one-time</span></div>
                </div>
                <div className="w-full h-[1px] bg-slate-800" />
                <ul className="text-xs space-y-3 text-slate-300 flex-1">
                  <li className="flex items-center gap-2 text-blue-400 font-bold"><CheckCircle size={14} /> Max 5 Premium Property Listings</li>
                  <li className="flex items-center gap-2"><CheckCircle size={14} className="text-slate-600" /> Multi-Image Upload (Standard Gallery)</li>
                </ul>
                <button onClick={() => handleBuyPlan('Basic', '1,000', 5)} disabled={currentPlan === 'Basic'} className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition ${currentPlan === 'Basic' ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>{currentPlan === 'Basic' ? 'Currently Running' : 'Activate Basic Tier'}</button>
              </div>

              <div className={`border rounded-3xl p-8 space-y-6 relative flex flex-col justify-between ${currentPlan === 'Pro' ? 'bg-slate-900 border-amber-500 shadow-xl' : 'bg-slate-900/40 border-slate-800'}`}>
                {currentPlan === 'Pro' && <span className="absolute -top-3 left-6 text-[10px] font-mono uppercase bg-amber-600 text-white px-3 py-1 rounded-full font-bold">Active Plan</span>}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-200">Institutional Pro Tier</h3>
                  <p className="text-slate-400 text-xs">Engineered for real estate corporations and ultra-luxury broker networks.</p>
                  <div className="pt-4"><span className="text-3xl font-black text-white">৳5,000</span><span className="text-xs text-slate-500"> / one-time</span></div>
                </div>
                <div className="w-full h-[1px] bg-slate-800" />
                <ul className="text-xs space-y-3 text-slate-300 flex-1">
                  <li className="flex items-center gap-2 text-amber-400 font-bold"><CheckCircle size={14} /> Max 10 Premium Property Listings</li>
                  <li className="flex items-center gap-2 text-slate-200"><CheckCircle size={14} className="text-amber-500/80" /> Expanded Asset Host Slots</li>
                </ul>
                <button onClick={() => handleBuyPlan('Pro', '5,000', 10)} disabled={currentPlan === 'Pro'} className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition ${currentPlan === 'Pro' ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-500 text-white'}`}>{currentPlan === 'Pro' ? 'Currently Running' : 'Upgrade to Pro'}</button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}