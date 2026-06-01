import React, { useState } from 'react';
import { 
  Building2, PlusCircle, ListFilter, Layers, 
  DollarSign, MapPin, FileText, Trash2, Eye, 
  CheckCircle, Clock, Upload, Image as ImageIcon, X, 
  Zap, CreditCard, AlertTriangle 
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
  const [activeTab, setActiveTab] = useState('overview'); // tabs: overview, add-property, my-properties, subscription
  
  // 🌟 SUBSCRIPTION STATES (ডিজাইন ও লজিক টেস্ট করার জন্য ডামি স্টেট)
  const [currentPlan, setCurrentPlan] = useState('Basic'); // Basic, Pro, or None
  const [totalAllowedListings, setTotalAllowedListings] = useState(5); // Basic প্ল্যানে ৫টি অনুমতি
  
  // ইমেজ আপলোড স্টেট
  const [uploadedImages, setUploadedImages] = useState([]);

  // ফর্ম স্টেট
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

  // 🌟 নতুন প্ল্যান কেনার ডামি ফাংশন (ডিজাইন টেস্টিং)
  const handleBuyPlan = (planName, price, limit) => {
    setCurrentPlan(planName);
    setTotalAllowedListings(limit);
    alert(`Successfully subscribed to ${planName} Plan (৳${price})! Your limit is now ${limit} listings.`);
    setActiveTab('overview');
  };

  // ফর্ম সাবমিট হ্যান্ডেলার
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // 🌟 লিস্টিং লিমিট চেক করার কড়া লজিক (ডিজাইনে বাটন লক থাকলেও সিকিউরিটি চেক)
    if (properties.length >= totalAllowedListings) {
      alert("Upgrade required! You have exhausted your current subscription limit.");
      return;
    }

    if (!formData.title || !formData.price || !formData.location) {
      alert("Please fill in all required fields.");
      return;
    }

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
    setFormData({ title: '', price: '', location: '', type: 'Apartment', description: '' });
    setUploadedImages([]);
    setActiveTab('my-properties');
  };

  const handleDeleteProperty = (id) => {
    if(window.confirm("Are you sure you want to delete this listing?")) {
      setProperties(properties.filter(item => item.id !== id));
    }
  };

  // লিমিট শেষ কিনা তা ট্র্যাকিং করার শর্টকাট ভেরিয়েবল
  const isLimitReached = properties.length >= totalAllowedListings;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row pt-20 select-none">
      
      {/* ================= 🎛️ SIDEBAR NAVIGATION ================= */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800/60 p-6 flex flex-col gap-2 shrink-0">
        <div className="mb-6 px-2">
          <p className="text-[10px] font-mono tracking-widest text-blue-500 uppercase font-bold">Seller Console</p>
          <h2 className="text-xl font-bold text-slate-100 mt-1">Prime Estates</h2>
          {/* কারেন্ট প্ল্যান ব্যাজ */}
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-full mt-2">
            <Zap size={10} /> {currentPlan} Tier
          </span>
        </div>

        <button 
          onClick={() => setActiveTab('overview')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'overview' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-950 hover:text-white'
          }`}
        >
          <Layers size={16} /> Overview & Analytics
        </button>

        <button 
          onClick={() => setActiveTab('add-property')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'add-property' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-950 hover:text-white'
          }`}
        >
          <PlusCircle size={16} /> Submit Property
        </button>

        <button 
          onClick={() => setActiveTab('my-properties')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'my-properties' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-950 hover:text-white'
          }`}
        >
          <ListFilter size={16} /> My Listings ({properties.length})
        </button>

        <button 
          onClick={() => setActiveTab('subscription')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'subscription' ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/10' : 'text-slate-400 hover:bg-slate-950 hover:text-white'
          }`}
        >
          <CreditCard size={16} /> Subscriptions Plan
        </button>
      </aside>

      {/* ================= 💻 MAIN CONTENT MONITOR ================= */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        
        {/* ================= 📊 TAB 1: OVERVIEW & LIVE PROGRESS BAR ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Welcome Back, Elite Seller</h1>
              <p className="text-slate-400 text-xs mt-1">Monitor your listing telemetry and tier capacity.</p>
            </div>

            {/* 🌟 NEW: LIVE SUBSCRIPTION PROGRESS BAR WIDGET */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-slate-200">Subscription Usage Tracker</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Based on your active <span className="text-amber-400 font-semibold">{currentPlan} Plan</span></p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-2xl font-black text-white">{properties.length}</span>
                  <span className="text-xs font-bold text-slate-500"> / {totalAllowedListings} Posts Used</span>
                </div>
              </div>

              {/* Progress Bar Line */}
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/60">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    isLimitReached ? 'bg-rose-500' : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                  }`}
                  style={{ width: `${Math.min((properties.length / totalAllowedListings) * 100, 100)}%` }}
                />
              </div>

              {isLimitReached && (
                <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/5 border border-rose-500/10 p-3 rounded-xl">
                  <AlertTriangle size={14} className="shrink-0" />
                  <span>You have reached your listing limit. Please upgrade your subscription tier to broadcast new assets.</span>
                </div>
              )}
            </div>

            {/* Metrics Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Active Properties</p>
                  <p className="text-3xl font-black mt-2">{properties.length}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500">
                  <Building2 size={22} />
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Estimated Valuation</p>
                  <p className="text-3xl font-black mt-2">${(properties.length * 3.8).toFixed(1)}M</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-500">
                  <DollarSign size={22} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 📝 TAB 2: PROPERTY FORM (LOCK LOGIC INCLUDED) ================= */}
        {activeTab === 'add-property' && (
          <div className="max-w-3xl space-y-8 animate-in fade-in duration-300">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Post New Premium Asset</h1>
              <p className="text-slate-400 text-xs mt-1">Deploy an architectural masterpiece onto the off-market network grid.</p>
            </div>

            {/* 🌟 LIMIT REACHED BANNER IN FORM */}
            {isLimitReached ? (
              <div className="p-8 bg-slate-900 border-2 border-dashed border-rose-500/30 rounded-2xl text-center space-y-4">
                <AlertTriangle size={32} className="mx-auto text-rose-500" />
                <h3 className="text-lg font-bold text-slate-200">Listing Creation Terminated</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Your account currently holds {properties.length}/{totalAllowedListings} active posts. Upgrade your plan to unlock extended hosting capacity.
                </p>
                <button 
                  onClick={() => setActiveTab('subscription')}
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition"
                >
                  Upgrade Plan Now
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Property Title *</label>
                    <input 
                      type="text" name="title" value={formData.title} onChange={handleInputChange} required
                      placeholder="e.g., Ultra Modern Glass Penthouse"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Asking Valuation ($) *</label>
                    <input 
                      type="text" name="price" value={formData.price} onChange={handleInputChange} required
                      placeholder="e.g., 5,500,000"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Architecture Category</label>
                    <select 
                      name="type" value={formData.type} onChange={handleInputChange}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition cursor-pointer"
                    >
                      <option value="Apartment">Apartment Monolith</option>
                      <option value="Penthouse">Bespoke Penthouse</option>
                      <option value="Villa">Luxury Coastal Villa</option>
                    </select>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Geographic Location *</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-4 top-3.5 text-slate-600" />
                      <input 
                        type="text" name="location" value={formData.location} onChange={handleInputChange} required
                        placeholder="e.g., Beverly Hills, California"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-200 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* MULTIPLE IMAGE UPLOAD FIELD */}
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Upload Property Media Galleries</label>
                    <div className="w-full border-2 border-dashed border-slate-800 hover:border-blue-500/50 bg-slate-950/40 rounded-2xl p-6 transition flex flex-col items-center justify-center relative group cursor-pointer">
                      <input 
                        type="file" multiple accept="image/*" onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="flex flex-col items-center gap-2 pointer-events-none text-center">
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-400 group-hover:text-blue-400 transition">
                          <Upload size={20} />
                        </div>
                        <p className="text-xs font-bold text-slate-300">Click or Drag images to upload</p>
                      </div>
                    </div>

                    {uploadedImages.length > 0 && (
                      <div className="grid grid-cols-4 gap-4 mt-4 bg-slate-950 p-4 rounded-xl border border-slate-900">
                        {uploadedImages.map((url, index) => (
                          <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-slate-800 bg-slate-900">
                            <img src={url} alt="Preview" className="w-full h-full object-cover" />
                            <button 
                              type="button" onClick={() => removePreviewImage(index)}
                              className="absolute top-1 right-1 p-1 bg-black/70 hover:bg-rose-600 rounded-full text-white transition z-20"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl transition shadow-lg"
                >
                  Broadcast Asset To Network
                </button>
              </form>
            )}
          </div>
        )}

        {/* ================= 📋 TAB 3: SELLER PROPERTIES LIST ================= */}
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
                            <button 
                              onClick={() => handleDeleteProperty(item.id)}
                              className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
                            >
                              <Trash2 size={15} />
                            </button>
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

        {/* ================= 💳 NEW TAB 4: PRICING / SUBSCRIPTION PLAN SECTION ================= */}
        {activeTab === 'subscription' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Subscription Packages</h1>
              <p className="text-slate-400 text-xs mt-1">Upgrade your slot boundaries to broadcast larger volumes of real estate marvels.</p>
            </div>

            {/* Price Cards Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              
              {/* Plan 1: ৳1000 */}
              <div className={`border rounded-3xl p-8 space-y-6 relative flex flex-col justify-between ${
                currentPlan === 'Basic' ? 'bg-slate-900 border-blue-500 shadow-xl' : 'bg-slate-900/40 border-slate-800'
              }`}>
                {currentPlan === 'Basic' && (
                  <span className="absolute -top-3 left-6 text-[10px] font-mono uppercase bg-blue-600 text-white px-3 py-1 rounded-full font-bold">Active Plan</span>
                )}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-200">Basic Broker Tier</h3>
                  <p className="text-slate-400 text-xs">Ideal for boutique agents or individual premium property owners.</p>
                  <div className="pt-4">
                    <span className="text-3xl font-black text-white">৳1,000</span>
                    <span className="text-xs text-slate-500"> / one-time</span>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-slate-800" />
                <ul className="text-xs space-y-3 text-slate-300 flex-1">
                  <li className="flex items-center gap-2 text-blue-400 font-bold"><CheckCircle size={14} /> Max 5 Premium Property Listings</li>
                  <li className="flex items-center gap-2"><CheckCircle size={14} className="text-slate-600" /> Multi-Image Upload (Standard Gallery)</li>
                  <li className="flex items-center gap-2"><CheckCircle size={14} className="text-slate-600" /> Base Off-Market Telemetry Analytics</li>
                </ul>
                <button 
                  onClick={() => handleBuyPlan('Basic', '1,000', 5)}
                  disabled={currentPlan === 'Basic'}
                  className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                    currentPlan === 'Basic' ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                >
                  {currentPlan === 'Basic' ? 'Currently Running' : 'Activate Basic Tier'}
                </button>
              </div>

              {/* Plan 2: ৳5000 */}
              <div className={`border rounded-3xl p-8 space-y-6 relative flex flex-col justify-between ${
                currentPlan === 'Pro' ? 'bg-slate-900 border-amber-500 shadow-xl' : 'bg-slate-900/40 border-slate-800'
              }`}>
                {currentPlan === 'Pro' && (
                  <span className="absolute -top-3 left-6 text-[10px] font-mono uppercase bg-amber-600 text-white px-3 py-1 rounded-full font-bold">Active Plan</span>
                )}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-200">Institutional Pro Tier</h3>
                  <p className="text-slate-400 text-xs">Engineered for real estate corporations and ultra-luxury broker networks.</p>
                  <div className="pt-4">
                    <span className="text-3xl font-black text-white">৳5,000</span>
                    <span className="text-xs text-slate-500"> / one-time</span>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-slate-800" />
                <ul className="text-xs space-y-3 text-slate-300 flex-1">
                  <li className="flex items-center gap-2 text-amber-400 font-bold"><CheckCircle size={14} /> Max 10 Premium Property Listings</li>
                  <li className="flex items-center gap-2 text-slate-200"><CheckCircle size={14} className="text-amber-500/80" /> Expanded Asset Host Slots</li>
                  <li className="flex items-center gap-2"><CheckCircle size={14} className="text-slate-600" /> Premium Dashboard Priority Badging</li>
                  <li className="flex items-center gap-2"><CheckCircle size={14} className="text-slate-600" /> 24/7 Institutional Asset Protection</li>
                </ul>
                <button 
                  onClick={() => handleBuyPlan('Pro', '5,000', 10)}
                  disabled={currentPlan === 'Pro'}
                  className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                    currentPlan === 'Pro' ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-500 text-white'
                  }`}
                >
                  {currentPlan === 'Pro' ? 'Currently Running' : 'Upgrade to Pro'}
                </button>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}