import React, { useState, useEffect } from 'react';
import { Plus, List, Edit2, Trash2, Search, Upload, Save, Image as ImageIcon } from 'lucide-react';

export default function Slider() {
  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'form'
  const [isEditing, setIsEditing] = useState(false);
  const [menuItems, setMenuItems] = useState([]); // স্লাইডার লিস্ট কন্টেইনার
  const [searchQuery, setSearchQuery] = useState('');

  // 📝 ফর্ম স্টেট (Screenshot 2026-06-19 021032.png এর সব ফিল্ড)
  const initialFormState = {
    id: null,
    title: '',
    buttonText1: '',
    buttonUrl1: '',
    buttonText2: '',
    buttonUrl2: '',
    description: '',
    position: 'Left',
    photo: null,
    photoPreview: '' // ফ্রন্টএন্ডে ইমেজ প্রিভিউ দেখানোর জন্য
  };
  const [formData, setFormData] = useState(initialFormState);

  // 🌐 ১. BACKEND API: স্লাইডার লিস্ট গেট করার জন্য (GET Request)
  useEffect(() => {
    const fetchSliders = async () => {
      try {
        // const response = await axios.get('YOUR_BACKEND_API_URL/sliders');
        // setMenuItems(response.data);
        
        // ডামি রিয়েল এস্টেট ডাটা (যদি ব্যাকএন্ড এপিআই ফাকা থাকে)
        const mockData = [
          { id: 1, photoPreview: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=150', title: 'Find Your Dream Luxury Penthouse', buttonText1: 'View Properties', buttonUrl1: '#', buttonText2: 'Contact Agent', buttonUrl2: '#', position: 'Left', description: 'Premium apartments available.' },
          { id: 2, photoPreview: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=150', title: 'Modern Beachfront Villas Available', buttonText1: 'Explore Now', buttonUrl1: '#', buttonText2: 'Book a Tour', buttonUrl2: '#', position: 'Left', description: 'Exclusive ocean view estates.' }
        ];
        setMenuItems(mockData);
      } catch (error) {
        console.error("Error fetching sliders:", error);
      }
    };
    fetchSliders();
  }, []);

  // 📥 ইনপুট হ্যান্ডলার
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 📁 ফাইল আপলোড এবং প্রিভিউ হ্যান্ডলার
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file,
        photoPreview: URL.createObjectURL(file) // টেম্পোরারি ইমেজ লিংক তৈরি
      }));
    }
  };

  // ✍️ এডিট মোড এক্টিভেশন (টেবিল থেকে ডেটা ফর্মে নেওয়া)
  const handleEditClick = (item) => {
    setFormData({ ...item });
    setIsEditing(true);
    setActiveTab('form');
  };

  // ❌ ২. BACKEND API: স্লাইডার ডিলিট (DELETE Request)
  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this slider?")) {
      try {
        // await axios.delete(`YOUR_BACKEND_API_URL/sliders/${id}`);
        setMenuItems(prev => prev.filter(item => item.id !== id));
        alert('Slider asset deleted successfully.');
      } catch (error) {
        console.error("Error deleting slider:", error);
      }
    }
  };

  // 🚀 ৩. BACKEND API: ফর্ম সাবমিট (POST / PUT Request)
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // যেহেতু ইমেজ আপলোড হবে, তাই FormData ব্যবহার করা ব্যাকএন্ডের জন্য বেস্ট প্র্যাকটিস
    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('buttonText1', formData.buttonText1);
    payload.append('buttonUrl1', formData.buttonUrl1);
    payload.append('buttonText2', formData.buttonText2);
    payload.append('buttonUrl2', formData.buttonUrl2);
    payload.append('description', formData.description);
    payload.append('position', formData.position);
    if (formData.photo) payload.append('photo', formData.photo); // ফাইল অবজেক্ট

    try {
      if (isEditing) {
        // await axios.put(`YOUR_BACKEND_API_URL/sliders/${formData.id}`, payload);
        setMenuItems(prev => prev.map(item => item.id === formData.id ? { ...formData } : item));
        alert('Slider node updated!');
      } else {
        // const response = await axios.post('YOUR_BACKEND_API_URL/sliders', payload);
        const newSlider = { ...formData, id: Date.now() };
        setMenuItems(prev => [...prev, newSlider]);
        alert('New luxury slider asset added!');
      }

      // ফর্ম রিসেট ও ব্যাক টু লিস্ট
      setFormData(initialFormState);
      setIsEditing(false);
      setActiveTab('list');
    } catch (error) {
      console.error("Error saving slider:", error);
    }
  };

  // ফিল্টারিং লজিক (সার্চ বার)
  const filteredItems = menuItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* হেডার */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-tight">Hero Banner Sliders</h2>
          <p className="text-xs text-slate-400">Configure corporate widescreen real estate promotional slides and redirect endpoints.</p>
        </div>
        {activeTab === 'list' && (
          <button onClick={() => { setFormData(initialFormState); setIsEditing(false); setActiveTab('form'); }} className="bg-rose-600 hover:bg-rose-500 text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all">
            <Plus size={14} /> Add Slide
          </button>
        )}
      </div>

      {/* ট্যাব নেভিগেশন */}
      <div className="flex border-b border-slate-800 gap-1">
        <button onClick={() => setActiveTab('list')} className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 rounded-t-xl ${activeTab === 'list' ? 'border-rose-600 bg-rose-600/5 text-rose-500' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>
          <List size={14} /> Slider List
        </button>
        <button onClick={() => { setFormData(initialFormState); setIsEditing(false); setActiveTab('form'); }} className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 rounded-t-xl ${activeTab === 'form' ? 'border-rose-600 bg-rose-600/5 text-rose-500' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>
          <Plus size={14} /> {isEditing ? '✏️ Edit Slider' : '➕ Add Slider'}
        </button>
      </div>

      {/* কনটেন্ট এরিয়া */}
      {activeTab === 'list' ? (
        
        /* ================= 📊 ট্যাব ১: স্লাইডার লিস্ট টেবিল ================= */
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-slate-900/50 p-3 rounded-xl border border-slate-800/60">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <select className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-white">
                <option value="25">25</option>
              </select>
              <span>rows per page</span>
            </div>
            <div className="relative w-full sm:w-64">
              <input type="text" placeholder="Search sliders..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-1.5 text-xs text-white focus:outline-none focus:border-rose-600" />
              <Search className="absolute left-2.5 top-2 text-slate-500" size={14} />
            </div>
          </div>

          {filteredItems.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-xs flex flex-col items-center justify-center gap-2 shadow-xl">
              <ImageIcon size={28} className="text-slate-700 animate-pulse" /> No showcase banner elements found.
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/40 text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                      <th className="px-6 py-3.5 w-16">Sl</th>
                      <th className="px-6 py-3.5 w-32">Photo</th>
                      <th className="px-6 py-3.5">Title</th>
                      <th className="px-6 py-3.5">Button Text 1</th>
                      <th className="px-6 py-3.5">Button Url 1</th>
                      <th className="px-6 py-3.5">Button Text 2</th>
                      <th className="px-6 py-3.5">Button Url 2</th>
                      <th className="px-6 py-3.5 w-24 text-center">Position</th>
                      <th className="px-6 py-3.5 w-24 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs text-slate-300 divide-y divide-slate-800/60">
                    {filteredItems.map((item, index) => (
                      <tr key={item.id} className="hover:bg-slate-950/20 transition-colors">
                        <td className="px-6 py-4 text-slate-500 font-mono">{index + 1}</td>
                        <td className="px-6 py-4">
                          {item.photoPreview ? (
                            <img src={item.photoPreview} alt="slider" className="w-20 h-11 object-cover rounded-lg border border-slate-800 shadow" />
                          ) : (
                            <div className="w-20 h-11 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center text-slate-600"><ImageIcon size={14} /></div>
                          )}
                        </td>
                        <td className="px-6 py-4 font-bold text-white max-w-xs truncate">{item.title}</td>
                        <td className="px-6 py-4 text-slate-400">{item.buttonText1 || '-'}</td>
                        <td className="px-6 py-4 font-mono text-slate-500">{item.buttonUrl1 || '-'}</td>
                        <td className="px-6 py-4 text-slate-400">{item.buttonText2 || '-'}</td>
                        <td className="px-6 py-4 font-mono text-slate-500">{item.buttonUrl2 || '-'}</td>
                        <td className="px-6 py-4 text-center text-slate-400"><span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-[10px] font-mono">{item.position}</span></td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex gap-2 justify-center">
                            <button type="button" onClick={() => handleEditClick(item)} className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-rose-500/50 transition-colors"><Edit2 size={12} /></button>
                            <button type="button" onClick={() => handleDeleteClick(item.id)} className="p-1.5 rounded-lg bg-rose-950/40 border border-rose-900/40 text-rose-400 hover:bg-rose-600 hover:text-white transition-all"><Trash2 size={12} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

      ) : (

        /* ================= 📝 ট্যাব ২: অ্যাড / এডিট স্লাইডার ফর্ম ================= */
        <form onSubmit={handleFormSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-5 max-w-3xl shadow-xl">
          <div className="border-b border-slate-800 pb-3 mb-2">
            <h3 className="text-xs font-bold uppercase text-rose-500 tracking-wider">
              {isEditing ? '✏️ Modify Hero Slider Node' : '📂 Establish Showcase Slider Record'}
            </h3>
          </div>

          {/* Title */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <label className="text-xs font-bold text-slate-400 md:text-right">Title</label>
            <div className="md:col-span-3">
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g., Ultra Modern Smart Apartments" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500" />
            </div>
          </div>

          {/* Button Group 1 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <label className="text-xs font-bold text-slate-400 md:text-right">Button Text 1 *</label>
            <div className="md:col-span-3">
              <input type="text" name="buttonText1" value={formData.buttonText1} onChange={handleInputChange} placeholder="e.g., View Catalog" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <label className="text-xs font-bold text-slate-400 md:text-right">Button Url 1 *</label>
            <div className="md:col-span-3">
              <input type="text" name="buttonUrl1" value={formData.buttonUrl1} onChange={handleInputChange} placeholder="#" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500" required />
            </div>
          </div>

          {/* Button Group 2 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <label className="text-xs font-bold text-slate-400 md:text-right">Button Text 2 *</label>
            <div className="md:col-span-3">
              <input type="text" name="buttonText2" value={formData.buttonText2} onChange={handleInputChange} placeholder="e.g., Speak to Agent" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <label className="text-xs font-bold text-slate-400 md:text-right">Button Url 2 *</label>
            <div className="md:col-span-3">
              <input type="text" name="buttonUrl2" value={formData.buttonUrl2} onChange={handleInputChange} placeholder="#" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500" required />
            </div>
          </div>

          {/* Description */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <label className="text-xs font-bold text-slate-400 md:text-right">Description *</label>
            <div className="md:col-span-3">
              <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Enter sub-headline context details..." rows={3} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500" required />
            </div>
          </div>

          {/* Position Selector */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <label className="text-xs font-bold text-slate-400 md:text-right">Position *</label>
            <div className="md:col-span-3">
              <select name="position" value={formData.position} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500 appearance-none">
                <option value="Left">Left</option>
                <option value="Center">Center</option>
                <option value="Right">Right</option>
              </select>
            </div>
          </div>

          {/* Drag & Drop Photo Area */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
            <label className="text-xs font-bold text-slate-400 md:text-right pt-2">Photo *</label>
            <div className="md:col-span-3">
              <label className="border border-dashed border-slate-800 bg-slate-950/40 rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-rose-500/40 transition-all group overflow-hidden max-w-full relative min-h-[140px]">
                <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" required={!isEditing} />
                
                {formData.photoPreview ? (
                  <div className="absolute inset-0 w-full h-full bg-slate-950 flex items-center justify-center">
                    <img src={formData.photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[11px] text-white font-bold transition-opacity">Change Image</div>
                  </div>
                ) : (
                  <>
                    <Upload className="text-slate-600 group-hover:text-rose-500 transition-colors" size={24} />
                    <span className="text-xs text-slate-400 font-medium">Drag and drop a file here or click</span>
                    <span className="text-[10px] text-slate-600">Supports JPEG, PNG wide formats</span>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* সাবমিট একশন রুট */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
            <div className="hidden md:block"></div>
            <div className="md:col-span-3 flex gap-3">
              <button type="submit" className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-rose-600/10">
                <Save size={14} /> {isEditing ? 'Update Slide Data' : 'Save Config'}
              </button>
              {isEditing && (
                <button type="button" onClick={() => { setFormData(initialFormState); setIsEditing(false); setActiveTab('list'); }} className="bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300 px-5 py-2.5 rounded-xl text-xs font-bold transition-all">
                  Cancel Edit
                </button>
              )}
            </div>
          </div>

        </form>
      )}

    </div>
  );
}