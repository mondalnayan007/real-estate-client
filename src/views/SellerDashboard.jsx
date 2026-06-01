import React, { useState } from 'react';
import { 
  Building2, PlusCircle, ListFilter, Users, 
  DollarSign, MapPin, Layers, FileText, 
  Trash2, Eye, CheckCircle, Clock, Upload, Image as ImageIcon, X 
} from 'lucide-react';

// প্রাথমিক কিছু ডামি প্রোপার্টি ডাটা (ডিফল্ট ইমেজ সহ)
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

const dummyLeads = [
  { id: 1, name: 'Johnathan Doe', email: 'john@example.com', property: 'The Obsidian Penthouse', date: 'Today' },
  { id: 2, name: 'Sarah Jenkins', email: 'sarah.j@example.com', property: 'Malibu Coastal Horizon Villa', date: 'Yesterday' }
];

export default function SellerDashboard() {
  const [properties, setProperties] = useState(initialProperties);
  const [activeTab, setActiveTab] = useState('overview');
  
  // আপলোড করা ইমেজের লোকাল প্রিভিউ স্টোর করার জন্য স্টেট
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

  // 🌟 মাল্টিপল ইমেজ আপলোড এবং লোকাল URL তৈরি করার হ্যান্ডেলার
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // ফাইলগুলোকে লোকাল প্রিভিউ ইউআরএল-এ কনভার্ট করা
    const fileUrls = files.map(file => URL.createObjectURL(file));
    
    // আগের আপলোড করা ছবির সাথে নতুন ছবি যুক্ত করা
    setUploadedImages(prevImages => [...prevImages, ...fileUrls]);
  };

  // প্রিভিউ থেকে কোনো ছবি রিমুভ করতে চাইলে
  const removePreviewImage = (indexToRemove) => {
    setUploadedImages(uploadedImages.filter((_, index) => index !== indexToRemove));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
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
      // 🌟 আপলোড করা সব ইমেজ প্রোপার্টি অবজেক্টে সেট হবে (কোনো ছবি না দিলে ডিফল্ট প্লেসহোল্ডার)
      images: uploadedImages.length > 0 ? uploadedImages : ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80']
    };

    setProperties([newProperty, ...properties]);
    
    // ফর্ম এবং ইমেজ স্টেট রিসেট
    setFormData({ title: '', price: '', location: '', type: 'Apartment', description: '' });
    setUploadedImages([]);
    setActiveTab('my-properties');
  };

  const handleDeleteProperty = (id) => {
    if(window.confirm("Are you sure you want to delete this listing?")) {
      setProperties(properties.filter(item => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row pt-20 select-none">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800/60 p-6 flex flex-col gap-2 shrink-0">
        <div className="mb-6 px-2">
          <p className="text-[10px] font-mono tracking-widest text-blue-500 uppercase font-bold">Seller Console</p>
          <h2 className="text-xl font-bold text-slate-100 mt-1">Dashboard</h2>
        </div>

        <button 
          onClick={() => setActiveTab('overview')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'overview' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10' : 'text-slate-400 hover:bg-slate-950 hover:text-white'
          }`}
        >
          <Layers size={16} /> Overview & Analytics
        </button>

        <button 
          onClick={() => setActiveTab('add-property')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'add-property' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10' : 'text-slate-400 hover:bg-slate-950 hover:text-white'
          }`}
        >
          <PlusCircle size={16} /> Submit Property
        </button>

        <button 
          onClick={() => setActiveTab('my-properties')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'my-properties' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10' : 'text-slate-400 hover:bg-slate-950 hover:text-white'
          }`}
        >
          <ListFilter size={16} /> My Listings ({properties.length})
        </button>
      </aside>

      {/* MAIN CONTENT MONITOR */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        
        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Welcome Back, Elite Seller</h1>
              <p className="text-slate-400 text-xs mt-1">Here is a snapshot performance metric of your real estate portfolio.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Listed Assets</p>
                  <p className="text-3xl font-black mt-2">{properties.length}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500">
                  <Building2 size={22} />
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Cumulative Value</p>
                  <p className="text-3xl font-black mt-2">$12.7M</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-500">
                  <DollarSign size={22} />
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Acquisition Enquiries</p>
                  <p className="text-3xl font-black mt-2">{dummyLeads.length}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-500">
                  <Users size={22} />
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">Recent Acquisition Leads</h3>
              <div className="space-y-3">
                {dummyLeads.map(lead => (
                  <div key={lead.id} className="bg-slate-950/60 border border-slate-900 rounded-xl p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div>
                      <p className="text-xs font-bold text-slate-200">{lead.name} <span className="text-slate-500 font-normal">({lead.email})</span></p>
                      <p className="text-[11px] text-blue-400 mt-1">Interested in: <span className="font-medium underline">{lead.property}</span></p>
                    </div>
                    <span className="text-[10px] font-mono bg-slate-900 text-slate-400 px-2.5 py-1 rounded border border-slate-800 w-max">{lead.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROPERTY SUBMISSION FORM (WITH MULTI-IMAGE UPLOAD) */}
        {activeTab === 'add-property' && (
          <div className="max-w-3xl space-y-8 animate-in fade-in duration-300">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Post New Premium Asset</h1>
              <p className="text-slate-400 text-xs mt-1">Deploy an architectural masterpiece onto the off-market network grid.</p>
            </div>

            <form onSubmit={handleFormSubmit} className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Property Title *</label>
                  <input 
                    type="text" name="title" value={formData.title} onChange={handleInputChange} required
                    placeholder="e.g., Ultra Modern Glass Penthouse"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Asking Valuation ($) *</label>
                  <input 
                    type="text" name="price" value={formData.price} onChange={handleInputChange} required
                    placeholder="e.g., 5,500,000"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition"
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
                    <option value="Mansion">High-Barrier Estate</option>
                  </select>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Geographic Location *</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-4 top-3.5 text-slate-600" />
                    <input 
                      type="text" name="location" value={formData.location} onChange={handleInputChange} required
                      placeholder="e.g., Beverly Hills, California"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition"
                    />
                  </div>
                </div>

                {/* 🌟 NEW: MULTIPLE IMAGE UPLOAD FIELD */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Upload Property Media Galleries (Multiple)</label>
                  
                  {/* Upload Dropzone Container */}
                  <div className="w-full border-2 border-dashed border-slate-800 hover:border-blue-500/50 bg-slate-950/40 rounded-2xl p-6 transition flex flex-col items-center justify-center relative group cursor-pointer">
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="flex flex-col items-center gap-2 pointer-events-none text-center">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-400 group-hover:text-blue-400 transition">
                        <Upload size={20} />
                      </div>
                      <p className="text-xs font-bold text-slate-300">Click or Drag images to upload</p>
                      <p className="text-[10px] text-slate-500 font-mono">PNG, JPG, WEBP up to 5MB each</p>
                    </div>
                  </div>

                  {/* Real-time Uploaded Images Previews Grid */}
                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-4 bg-slate-950 p-4 rounded-xl border border-slate-900">
                      {uploadedImages.map((url, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-slate-800 bg-slate-900 group">
                          <img src={url} alt="Preview" className="w-full h-full object-cover" />
                          <button 
                            type="button"
                            onClick={() => removePreviewImage(index)}
                            className="absolute top-1 right-1 p-1 bg-black/70 hover:bg-rose-600 rounded-full text-white transition z-20"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Detailed Structural Manifesto</label>
                  <textarea 
                    name="description" value={formData.description} onChange={handleInputChange} rows="3"
                    placeholder="Describe interior design details..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-600 outline-none transition resize-none"
                  />
                </div>

              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl transition shadow-lg shadow-blue-600/10 flex items-center justify-center gap-2"
              >
                <FileText size={14} /> Broadcast Asset To Network
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: SELLER PROPERTIES LIST (WITH IMAGE THUMBNAIL SHOWCASE) */}
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
                        <th className="p-4">Visuals</th> {/* থাম্বনেইল কলাম */}
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
                          
                          {/* 🌟 NEW: আপলোড করা প্রথম ছবি থাম্বনেইল হিসেবে দেখাবে এবং সাথে কাউন্ট থাকবে */}
                          <td className="p-4">
                            <div className="relative h-12 w-16 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center">
                              {item.images && item.images.length > 0 ? (
                                <>
                                  <img 
                                    src={item.images[0]} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover"
                                  />
                                  {item.images.length > 1 && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-[10px] font-mono font-bold text-blue-400">
                                      +{item.images.length - 1}
                                    </div>
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
                            {item.status === 'Active' ? (
                              <span className="flex items-center gap-1.5 text-emerald-400 font-medium bg-emerald-500/10 w-max px-2.5 py-0.5 rounded-full border border-emerald-500/20"><CheckCircle size={11} /> Active</span>
                            ) : (
                              <span className="flex items-center gap-1.5 text-amber-400 font-medium bg-amber-500/10 w-max px-2.5 py-0.5 rounded-full border border-amber-500/20"><Clock size={11} /> Pending</span>
                            )}
                          </td>
                          
                          <td className="p-4 text-slate-400 font-mono"><span className="flex items-center gap-1"><Eye size={12} className="text-slate-600" /> {item.views} views</span></td>
                          
                          <td className="p-4 pr-6 text-right">
                            <button 
                              onClick={() => handleDeleteProperty(item.id)}
                              className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
                              title="Delete Listing"
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

      </main>
    </div>
  );
}