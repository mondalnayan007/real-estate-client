import React, { useState } from 'react';
import { Search, Edit3, PlusCircle, List, Save, RotateCcw, Plus, Trash2, Image } from 'lucide-react';

export default function DynamicPageManager() {
  const [activeTab, setActiveTab] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(25);

  // 📑 পেজ ডাটা স্ট্রাকচার (ডিফল্ট কিছু ডেমো ডাটা ও ইমেজ প্রিভিউ সহ)
  const [pages, setPages] = useState([
    { id: 1, title: 'Home', type: 'System Page', position: 1, published: true },
    { 
      id: 2, 
      title: 'Properties Available', 
      type: 'Properties Page', 
      position: 2, 
      published: true,
      config: { columns: '3' }
    },
    { 
      id: 3, 
      title: 'Our Agents', 
      type: 'Teams Page', 
      position: 3, 
      published: true,
      members: [
        { id: 101, name: 'John Doe', designation: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150', bio: 'Real estate expert.', social: { fb: '', ln: '' } }
      ]
    },
    { 
      id: 4, 
      title: 'Latest Projects', 
      type: 'Properties Page', 
      position: 4, 
      published: true,
      config: { columns: '4' } 
    },
    { id: 5, title: 'FAQ', type: 'System Page', position: 5, published: true },
    { 
      id: 8, 
      title: 'Blogs & News', 
      type: 'Blog Page', 
      position: 8, 
      published: true,
      blogs: [
        { id: 201, title: 'Market Trends 2026', image: 'https://images.unsplash.com/photo-1512403754473-2785561399cf?w=150', text: 'Real estate market is booming right now...' }
      ]
    },
    { id: 9, title: 'Pages Overview', type: 'System Page', position: 9, subMenu: 'arrow', published: true, 
      children: [
        { id: 10, title: 'Our Services', type: 'System Page', position: 1, published: true }
      ]
    },
  ]);

  // 🔄 ওয়ান-স্টপ এডিট ফর্ম স্টেট
  const [selectedPage, setSelectedPage] = useState(null);
  
  // 🧑‍💻 টিম মেম্বার লোকাল ফর্ম স্টেট (image সহ)
  const [memberForm, setMemberForm] = useState({ name: '', designation: '', bio: '', fb: '', ln: '', image: '' });
  
  // ✍️ ব্লগ লোকাল ফর্ম স্টেট (image সহ)
  const [blogForm, setBlogForm] = useState({ title: '', text: '', image: '' });

  // 🎛️ লাইভ পাবলিশ টগল
  const handleTogglePublish = (id, parentId = null) => {
    setPages(prev => prev.map(p => {
      if (parentId && p.id === parentId && p.children) {
        return { ...p, children: p.children.map(c => c.id === id ? { ...c, published: !c.published } : c) };
      } else if (!parentId && p.id === id) {
        return { ...p, published: !p.published };
      }
      return p;
    }));
  };

  const handleEditClick = (page) => {
    setSelectedPage({ ...page });
    setActiveTab('form');
  };

  // 🖼️ ইমেজ ফাইল হ্যান্ডলার (Local Preview Generation)
  const handleImageChange = (e, setFormState) => {
    const file = e.target.files[0];
    if (file) {
      const localImageUrl = URL.createObjectURL(file);
      setFormState(prev => ({ ...prev, image: localImageUrl }));
    }
  };

  // ➕ টিম মেম্বার যোগ করার ফাংশন
  const addTeamMember = () => {
    if (!memberForm.name || !memberForm.designation) return alert('Name & Designation required!');
    const newMember = {
      id: Date.now(),
      name: memberForm.name,
      designation: memberForm.designation,
      bio: memberForm.bio,
      image: memberForm.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', // ডিফল্ট অবতার যদি ইমেজ না দেয়
      social: { fb: memberForm.fb, ln: memberForm.ln }
    };
    setSelectedPage({
      ...selectedPage,
      members: [...(selectedPage.members || []), newMember]
    });
    setMemberForm({ name: '', designation: '', bio: '', fb: '', ln: '', image: '' });
  };

  // ➕ ব্লগ পোস্ট যোগ করার ফাংশন
  const addBlogPost = () => {
    if (!blogForm.title || !blogForm.text) return alert('Blog Title & Content required!');
    const newBlog = {
      id: Date.now(),
      title: blogForm.title,
      text: blogForm.text,
      image: blogForm.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150' // ডিফল্ট ইমেজ
    };
    setSelectedPage({
      ...selectedPage,
      blogs: [...(selectedPage.blogs || []), newBlog]
    });
    setBlogForm({ title: '', text: '', image: '' });
  };

  // 🚀 ফাইনাল সেভ লজিক
  const handleSavePageConfig = (e) => {
    e.preventDefault();
    setPages(prev => prev.map(p => {
      if (p.id === selectedPage.id) return selectedPage;
      if (p.children) {
        return { ...p, children: p.children.map(c => c.id === selectedPage.id ? selectedPage : c) };
      }
      return p;
    }));
    alert(`${selectedPage.title} Dynamic layout updated successfully!`);
    setActiveTab('list');
    setSelectedPage(null);
  };

  const filteredPages = pages.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="bg-[#020617] min-h-screen text-slate-100 font-sans antialiased">
      
      {/* 🔝 নেভিগেশন ট্যাব */}
      <div className="border-b border-slate-900 bg-[#070a13] flex items-center px-4">
        <button 
          onClick={() => { setActiveTab('list'); setSelectedPage(null); }}
          className={`flex items-center gap-2 px-6 py-4 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
            activeTab === 'list' ? 'border-rose-600 text-rose-500 bg-rose-950/5' : 'border-transparent text-slate-400'
          }`}
        >
          <List size={14} /> Live Page Nodes
        </button>
        {selectedPage && (
          <button className="flex items-center gap-2 px-6 py-4 text-xs font-black uppercase tracking-wider border-b-2 border-rose-600 text-rose-500 bg-rose-950/5">
            <Edit3 size={14} /> Customizing: {selectedPage.title}
          </button>
        )}
      </div>

      <div className="p-6 max-w-[1600px] mx-auto space-y-4">
        
        {/* ========================================== */}
        {/* 📑 লিস্ট ভিউ ট্যাব */}
        {/* ========================================== */}
        {activeTab === 'list' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#090d1a] p-4 rounded-xl border border-slate-900 shadow-xl">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))} className="bg-[#020617] border border-slate-800 text-slate-200 px-3 py-1.5 rounded-lg text-xs">
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                </select>
                <span>rows per page</span>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-2.5 text-slate-500" size={14} />
                <input type="text" placeholder="Search target pages..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#020617] border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none" />
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-900 bg-[#070b16] shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-900 text-[10px] font-black text-slate-400 uppercase tracking-wider bg-[#090e1c]">
                    <th className="py-4 px-4 w-16">SL</th>
                    <th className="py-4 px-4">Dynamic Module Type</th>
                    <th className="py-4 px-4">Page Title</th>
                    <th className="py-4 px-4 text-center w-24">Position</th>
                    <th className="py-4 px-4 text-center w-28">Publish</th>
                    <th className="py-4 px-4 text-center w-24">Customize Content</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/60 text-xs">
                  {filteredPages.slice(0, rowsPerPage).map((page, index) => (
                    <React.Fragment key={page.id}>
                      <tr className="hover:bg-slate-900/30 transition-colors">
                        <td className="py-3.5 px-4 text-slate-500 font-mono">{index + 1}</td>
                        <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] text-slate-400">{page.type}</span></td>
                        <td className="py-3.5 px-4 font-bold text-slate-200">{page.title}</td>
                        <td className="py-3.5 px-4 text-center text-slate-400 font-mono">{page.position}</td>
                        <td className="py-3.5 px-4 text-center">
                          <button onClick={() => handleTogglePublish(page.id)} className={`w-9 h-5 rounded-full p-0.5 transition-colors ${page.published ? 'bg-rose-500' : 'bg-slate-800'}`}>
                            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ${page.published ? 'translate-x-4' : 'translate-x-0'}`} />
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button onClick={() => handleEditClick(page)} className="px-3 py-1.5 bg-rose-950/20 hover:bg-rose-900/40 border border-rose-900/40 rounded-lg text-rose-400 font-bold text-[11px] transition-all flex items-center gap-1 mx-auto">
                            <Edit3 size={11} /> Settings
                          </button>
                        </td>
                      </tr>

                      {/* চাইল্ড পেজ */}
                      {page.children && page.children.map((child) => (
                        <tr key={child.id} className="bg-slate-950/40 hover:bg-slate-900/20">
                          <td className="py-3 px-4"></td>
                          <td className="py-3 px-4 text-slate-500 italic pl-6">{child.type}</td>
                          <td className="py-3 px-4 text-rose-400/90 font-semibold pl-8"><span className="text-slate-600 font-mono">↳</span> {child.title}</td>
                          <td className="py-3 px-4 text-center text-slate-500 font-mono">{child.position}</td>
                          <td className="py-3 px-4 text-center">
                            <button onClick={() => handleTogglePublish(child.id, page.id)} className={`w-9 h-5 rounded-full p-0.5 transition-colors ${child.published ? 'bg-rose-500' : 'bg-slate-800'}`}>
                              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ${child.published ? 'translate-x-4' : 'translate-x-0'}`} />
                            </button>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button onClick={() => handleEditClick(child)} className="px-3 py-1.5 bg-rose-950/20 hover:bg-rose-900/40 border border-rose-900/40 rounded-lg text-rose-400 font-bold text-[11px] transition-all flex items-center gap-1 mx-auto">
                              <Edit3 size={11} /> Settings
                            </button>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* ✍️ ডাইনামিক এডিট ফর্ম */}
        {/* ========================================== */}
        {activeTab === 'form' && selectedPage && (
          <form onSubmit={handleSavePageConfig} className="bg-[#070b16] border border-slate-900 rounded-xl p-6 max-w-3xl mx-auto space-y-6 shadow-2xl">
            <div className="border-b border-slate-900 pb-4">
              <h3 className="text-sm font-black uppercase text-rose-500 tracking-wider">Configure Layout Architecture</h3>
              <p className="text-xs text-slate-400 mt-1">Editing custom blocks for: <span className="text-white font-bold">{selectedPage.title} ({selectedPage.type})</span></p>
            </div>

            {/* বেসিক ইনফো */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Rename Page Title</label>
                <input type="text" value={selectedPage.title} onChange={(e) => setSelectedPage({...selectedPage, title: e.target.value})} className="w-full bg-[#020617] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500" required />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Layout Sequence Position</label>
                <input type="number" value={selectedPage.position} onChange={(e) => setSelectedPage({...selectedPage, position: Number(e.target.value)})} className="w-full bg-[#020617] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500" />
              </div>
            </div>

            {/* 🏢 ১. PROPERTIES / PROJECTS PAGE */}
            {(selectedPage.type === 'properties Page' || selectedPage.type === 'Properties Page') && (
              <div className="bg-[#020617] p-5 rounded-xl border border-slate-900 space-y-3">
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wide">📦 Properties Layout Engine</h4>
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {['2', '3', '4'].map((col) => (
                    <label key={col} className={`border p-3 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${selectedPage.config?.columns === col ? 'border-rose-600 bg-rose-950/10 text-white' : 'border-slate-800 bg-[#070b16] text-slate-400'}`}>
                      <input type="radio" name="columns" value={col} checked={selectedPage.config?.columns === col} onChange={(e) => setSelectedPage({...selectedPage, config: { ...selectedPage.config, columns: e.target.value }})} className="sr-only" />
                      <span className="text-xs font-bold">{col} Columns Grid</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* 👥 ২. TEAMS / AGENTS PAGE (Image Upload সহ) */}
            {selectedPage.type === 'Teams Page' && (
              <div className="bg-[#020617] p-5 rounded-xl border border-slate-900 space-y-4">
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wide">👥 Team Member Upload Registry</h4>
                
                <div className="grid grid-cols-2 gap-3 bg-[#070b16] p-4 rounded-xl border border-slate-900">
                  {/* ইমেজ আপলোড ও প্রিভিউ সেকশন */}
                  <div className="col-span-2 flex items-center gap-4 bg-[#020617] p-3 rounded-xl border border-slate-800/60">
                    <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                      {memberForm.image ? (
                        <img src={memberForm.image} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Image className="text-slate-600" size={20} />
                      )}
                    </div>
                    <div className="w-full">
                      <label className="text-[10px] text-slate-400 font-bold block mb-1">Member Profile Photo</label>
                      <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, setMemberForm)} className="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 cursor-pointer w-full" />
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-[10px] text-slate-400 font-bold block mb-1">Full Name *</label>
                    <input type="text" placeholder="John Doe" value={memberForm.name} onChange={(e) => setMemberForm({...memberForm, name: e.target.value})} className="w-full bg-[#020617] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-[10px] text-slate-400 font-bold block mb-1">Designation *</label>
                    <input type="text" placeholder="Senior Agent" value={memberForm.designation} onChange={(e) => setMemberForm({...memberForm, designation: e.target.value})} className="w-full bg-[#020617] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] text-slate-400 font-bold block mb-1">Short Biography</label>
                    <textarea placeholder="Bio details..." value={memberForm.bio} onChange={(e) => setMemberForm({...memberForm, bio: e.target.value})} className="w-full bg-[#020617] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none h-14" />
                  </div>
                  <button type="button" onClick={addTeamMember} className="col-span-2 mt-1 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1 transition-colors">
                    <Plus size={14} /> Add Member to List
                  </button>
                </div>

                {/* মেম্বার লিস্ট ভিউ */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Registered Members ({selectedPage.members?.length || 0})</span>
                  <div className="max-h-44 overflow-y-auto space-y-2 pr-2">
                    {selectedPage.members?.map((member) => (
                      <div key={member.id} className="flex justify-between items-center bg-[#070b16] p-3 rounded-lg border border-slate-900">
                        <div className="flex items-center gap-3">
                          <img src={member.image} alt={member.name} className="w-9 h-9 rounded-lg object-cover bg-slate-900 border border-slate-800" />
                          <div>
                            <p className="text-xs font-bold text-white">{member.name}</p>
                            <p className="text-[10px] text-rose-400">{member.designation}</p>
                          </div>
                        </div>
                        <button type="button" onClick={() => setSelectedPage({ ...selectedPage, members: selectedPage.members.filter(m => m.id !== member.id) })} className="text-slate-500 hover:text-red-400 p-1">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 📝 ৩. BLOG PAGE (Image Upload সহ) */}
            {selectedPage.type === 'Blog Page' && (
              <div className="bg-[#020617] p-5 rounded-xl border border-slate-900 space-y-4">
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wide">📝 Content / Blog Publisher Engine</h4>
                
                <div className="bg-[#070b16] p-4 rounded-xl border border-slate-900 space-y-3">
                  {/* ব্লগ কভার ইমেজ আপলোড ও প্রিভিউ */}
                  <div className="flex items-center gap-4 bg-[#020617] p-3 rounded-xl border border-slate-800/60">
                    <div className="w-20 h-14 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                      {blogForm.image ? (
                        <img src={blogForm.image} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Image className="text-slate-600" size={20} />
                      )}
                    </div>
                    <div className="w-full">
                      <label className="text-[10px] text-slate-400 font-bold block mb-1">Blog Banner / Cover Image</label>
                      <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, setBlogForm)} className="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 cursor-pointer w-full" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-1">Article / Blog Title *</label>
                    <input type="text" placeholder="e.g., Real Estate Investment Tips" value={blogForm.title} onChange={(e) => setBlogForm({...blogForm, title: e.target.value})} className="w-full bg-[#020617] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-1">Blog Body Content *</label>
                    <textarea placeholder="Write whole article content here..." value={blogForm.text} onChange={(e) => setBlogForm({...blogForm, text: e.target.value})} className="w-full bg-[#020617] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none h-20" />
                  </div>
                  <button type="button" onClick={addBlogPost} className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1 transition-colors">
                    <Plus size={14} /> Insert Blog Post
                  </button>
                </div>

                {/* ব্লগ লিস্ট ভিউ */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Published Blogs ({selectedPage.blogs?.length || 0})</span>
                  <div className="max-h-44 overflow-y-auto space-y-2 pr-2">
                    {selectedPage.blogs?.map((blog) => (
                      <div key={blog.id} className="flex justify-between items-start bg-[#070b16] p-3 rounded-lg border border-slate-900">
                        <div className="flex items-start gap-3 max-w-[85%]">
                          <img src={blog.image} alt={blog.title} className="w-14 h-10 rounded-lg object-cover bg-slate-900 border border-slate-800 shrink-0" />
                          <div className="truncate">
                            <p className="text-xs font-bold text-white truncate">{blog.title}</p>
                            <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{blog.text}</p>
                          </div>
                        </div>
                        <button type="button" onClick={() => setSelectedPage({ ...selectedPage, blogs: selectedPage.blogs.filter(b => b.id !== blog.id) })} className="text-slate-500 hover:text-red-400 p-1 shrink-0">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ⚙️ ৪. SYSTEM / GENERAL PAGE */}
            {selectedPage.type === 'System Page' && (
              <div className="bg-[#020617] p-5 rounded-xl border border-slate-900 text-center py-8">
                <p className="text-xs text-slate-400">This is a core <span className="text-rose-400 font-bold">System Page</span>. No custom content blocks needed.</p>
              </div>
            )}

            {/* 🔘 অ্যাকশন বাটন কন্ট্রোল */}
            <div className="flex gap-3 pt-3 border-t border-slate-900">
              <button type="submit" className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-rose-600/10">
                <Save size={14} /> Save Page Parameters
              </button>
              <button type="button" onClick={() => { setSelectedPage(null); setActiveTab('list'); }} className="bg-[#020617] border border-slate-800 text-slate-300 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5">
                <RotateCcw size={14} /> Back to Dashboard
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}