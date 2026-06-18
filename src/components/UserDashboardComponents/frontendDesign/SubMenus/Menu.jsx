import React, { useState } from 'react';
import { List, PlusCircle, Edit2, Search, CornerDownRight, Save } from 'lucide-react';

export default function Menu() {
  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'form'
  const [isEditing, setIsEditing] = useState(false);

  // 📦 রিয়েল এস্টেট প্রজেক্টের উপযোগী ডাইনামিক মেনু ও সাব-মেনু ডাটা
  const [menuItems, setMenuItems] = useState([
    { id: 1, type: 'System Menu', title: 'Home', position: 1, isSub: false, parentId: null, publish: true },
    { id: 2, type: 'System Menu', title: 'Properties Available', position: 2, isSub: false, parentId: null, publish: true },
    { id: 3, type: 'System Menu', title: 'Our Agents', position: 3, isSub: false, parentId: null, publish: true },
    { id: 4, type: 'System Menu', title: 'Latest Projects', position: 4, isSub: false, parentId: null, publish: true },
    { id: 5, type: 'System Menu', title: 'FAQ', position: 5, isSub: false, parentId: null, publish: true },
    { id: 6, type: 'System Menu', title: 'Book a Viewing', position: 6, isSub: false, parentId: null, publish: true },
    { id: 7, type: 'System Menu', title: 'Gallery / Tours', position: 7, isSub: false, parentId: null, publish: true },
    { id: 8, type: 'System Menu', title: 'Blogs & News', position: 8, isSub: false, parentId: null, publish: true },
    { id: 9, type: 'System Menu', title: 'Pages', position: 9, isSub: false, parentId: null, publish: true },
    
    // 🏠 'Pages' এর ভেতরের রিয়েল এস্টেট সাব-মেনুসমূহ
    { id: 11, type: 'System Menu', title: 'Our Services', position: 1, isSub: true, parentId: 9, publish: true },
    { id: 12, type: 'System Menu', title: 'Client Testimonials', position: 2, isSub: true, parentId: 9, publish: true },
    { id: 13, type: 'System Menu', title: 'Career with Agency', position: 3, isSub: true, parentId: 9, publish: true },
    
    { id: 10, type: 'System Menu', title: 'Contact Us', position: 13, isSub: false, parentId: null, publish: true }
  ]);

  // 📝 ফর্ম স্টেট (রিয়েল এস্টেট ডাটা ফিল্ডস)
  const initialFormState = {
    id: null,
    title: '',
    position: '',
    publish: true,
    targetNewWindow: false,
    externalUrl: false,
    externalLink: '',
    parentMenu: 'Select'
  };
  const [formData, setFormData] = useState(initialFormState);

  // 🔄 টগল পাবলিশ স্ট্যাটাস
  const togglePublish = (id) => {
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, publish: !item.publish } : item));
  };

  // ✍️ এডিট বাটনে ক্লিক করার হ্যান্ডলার
  const handleEditClick = (item) => {
    setFormData({
      id: item.id,
      title: item.title,
      position: item.position,
      publish: item.publish,
      targetNewWindow: false,
      externalUrl: false,
      externalLink: '',
      parentMenu: item.parentId ? String(item.parentId) : 'Select'
    });
    setIsEditing(true);
    setActiveTab('form');
  };

  // ➕ নতুন মেনু অ্যাড করার জন্য ট্যাব ওপেনিং ক্লিনআপ
  const handleAddNewTabClick = () => {
    setFormData(initialFormState);
    setIsEditing(false);
    setActiveTab('form');
  };

  // 📥 ইনপুট হ্যান্ডলার
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxToggle = (field) => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  // 🚀 সাবমিট হ্যান্ডলার (অ্যাড এবং এডিট)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setMenuItems(prev => prev.map(item => item.id === formData.id ? { ...item, title: formData.title, position: Number(formData.position) } : item));
      alert('Real Estate Navigation menu updated successfully!');
    } else {
      const newId = Date.now();
      setMenuItems(prev => [...prev, {
        id: newId,
        type: 'System Menu',
        title: formData.title,
        position: Number(formData.position) || prev.length + 1,
        isSub: formData.parentMenu !== 'Select',
        parentId: formData.parentMenu !== 'Select' ? Number(formData.parentMenu) : null,
        publish: formData.publish
      }]);
      alert('New Real Estate menu node added!');
    }
    setFormData(initialFormState);
    setIsEditing(false);
    setActiveTab('list');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 📢 সেকশন হেডার */}
      <div>
        <h2 className="text-xl font-black text-white uppercase tracking-tight">Navigation Menu Structure</h2>
        <p className="text-xs text-slate-400">Arrange real estate portal navbar routing hierarchies, properties directory, and dynamic custom page links.</p>
      </div>

      {/* 🗂️ ট্যাব নেভিগেশন বার */}
      <div className="flex border-b border-slate-800 gap-1">
        <button 
          onClick={() => setActiveTab('list')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 rounded-t-xl ${
            activeTab === 'list' 
              ? 'border-rose-600 bg-rose-600/5 text-rose-500' 
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <List size={14} /> Menu List
        </button>
        <button 
          onClick={handleAddNewTabClick}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 rounded-t-xl ${
            activeTab === 'form' 
              ? 'border-rose-600 bg-rose-600/5 text-rose-500' 
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <PlusCircle size={14} /> {isEditing ? '✏️ Edit Menu Route' : '➕ Add Menu'}
        </button>
      </div>

      {/* 🎚️ কনটেন্ট এরিয়া */}
      {activeTab === 'list' ? (
        
        /* ================= 📊 ট্যাব ১: মেনু লিস্ট ভিউ ================= */
        <div className="space-y-4">
          
          {/* ইউটিলিটি ফিল্টার বার */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-slate-900/50 p-3 rounded-xl border border-slate-800/60">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <select className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-white">
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <span>rows per page</span>
            </div>
            <div className="relative w-full sm:w-64">
              <input type="text" placeholder="Search menu routes..." className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-1.5 text-xs text-white focus:outline-none focus:border-rose-600" />
              <Search className="absolute left-2.5 top-2 text-slate-500" size={14} />
            </div>
          </div>

          {/* ডাটা টেবিল */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/40 text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                    <th className="px-6 py-3.5 w-16">Sl</th>
                    <th className="px-6 py-3.5">Menu Type</th>
                    <th className="px-6 py-3.5">Title</th>
                    <th className="px-6 py-3.5 w-24 text-center">Position</th>
                    <th className="px-6 py-3.5">Sub Menu</th>
                    <th className="px-6 py-3.5 w-24 text-center">Publish</th>
                    <th className="px-6 py-3.5 w-24 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-slate-300 divide-y divide-slate-800/60">
                  {menuItems.map((item, index) => (
                    <tr key={item.id} className={`hover:bg-slate-950/20 transition-colors ${item.isSub ? 'bg-slate-950/40' : ''}`}>
                      <td className="px-6 py-3 text-slate-500 font-mono">{index + 1}</td>
                      <td className="px-6 py-3 font-medium text-slate-400">{item.isSub ? '' : item.type}</td>
                      <td className="px-6 py-3">
                        {item.isSub ? (
                          <span className="flex items-center gap-1.5 text-rose-400 font-medium pl-6">
                            <CornerDownRight size={14} className="text-slate-600" /> {item.title}
                          </span>
                        ) : (
                          <span className="font-bold text-white">{item.title}</span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-center text-slate-400 font-mono">{item.position}</td>
                      <td className="px-6 py-3 text-slate-500">{item.isSub ? '-' : (item.id === 9 ? '⬇' : '-')}</td>
                      
                      {/* টগল বাটন সুইচ */}
                      <td className="px-6 py-3 text-center">
                        <button 
                          type="button"
                          onClick={() => togglePublish(item.id)}
                          className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 relative inline-flex items-center ${item.publish ? 'bg-rose-500' : 'bg-slate-800'}`}
                        >
                          <span className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200 ${item.publish ? 'translate-x-4' : 'translate-x-0'}`} />
                        </button>
                      </td>

                      {/* অ্যাকশন বাটন (Edit) */}
                      <td className="px-6 py-3 text-center">
                        <button 
                          type="button"
                          onClick={() => handleEditClick(item)}
                          className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-rose-500/50 transition-colors"
                        >
                          <Edit2 size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      ) : (

        /* ================= 📝签名 ট্যাব ২: অ্যাড / এডিট মেনু ফর্ম ================= */
        <form onSubmit={handleFormSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 max-w-3xl shadow-xl">
          
          <div className="border-b border-slate-800 pb-3 mb-2">
            <h3 className="text-xs font-bold uppercase text-rose-500 tracking-wider">
              {isEditing ? '✏️ Modify Real Estate Route' : '📂 Create Agency Navbar Node'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <label className="text-xs font-bold text-slate-400 md:text-right">Title *</label>
            <div className="md:col-span-2">
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g., Luxury Villas, Featured Apartments" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <label className="text-xs font-bold text-slate-400 md:text-right">Position *</label>
            <div className="md:col-span-2">
              <input type="number" name="position" value={formData.position} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <label className="text-xs font-bold text-slate-400 md:text-right">Publish</label>
            <div className="md:col-span-2">
              <button type="button" onClick={() => handleCheckboxToggle('publish')} className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 relative inline-flex items-center ${formData.publish ? 'bg-rose-500' : 'bg-slate-800'}`}>
                <span className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200 ${formData.publish ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <label className="text-xs font-bold text-slate-400 md:text-right">Target New Window</label>
            <div className="md:col-span-2">
              <button type="button" onClick={() => handleCheckboxToggle('targetNewWindow')} className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 relative inline-flex items-center ${formData.targetNewWindow ? 'bg-rose-500' : 'bg-slate-800'}`}>
                <span className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200 ${formData.targetNewWindow ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <label className="text-xs font-bold text-slate-400 md:text-right">External Url</label>
            <div className="md:col-span-2">
              <button type="button" onClick={() => handleCheckboxToggle('externalUrl')} className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 relative inline-flex items-center ${formData.externalUrl ? 'bg-rose-500' : 'bg-slate-800'}`}>
                <span className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200 ${formData.externalUrl ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <label className="text-xs font-bold text-slate-400 md:text-right">External Link</label>
            <div className="md:col-span-2">
              <input type="text" name="externalLink" value={formData.externalLink} onChange={handleInputChange} placeholder="https://external-partner-site.com" disabled={!formData.externalUrl} className={`w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500 ${!formData.externalUrl ? 'opacity-40 cursor-not-allowed' : ''}`} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <label className="text-xs font-bold text-slate-400 md:text-right">Parent Menu</label>
            <div className="md:col-span-2">
              <select name="parentMenu" value={formData.parentMenu} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500 appearance-none">
                <option value="Select">Select (Set as Main Menu)</option>
                {menuItems.filter(item => !item.isSub).map(item => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
            </div>
          </div>

          {/* সাবমিট বাটন গ্রুপ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="hidden md:block"></div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-rose-600/10">
                <Save size={14} /> {isEditing ? 'Update Real Estate Link' : 'Save Config'}
              </button>
              {isEditing && (
                <button type="button" onClick={handleAddNewTabClick} className="bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300 px-5 py-2.5 rounded-xl text-xs font-bold transition-all">
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