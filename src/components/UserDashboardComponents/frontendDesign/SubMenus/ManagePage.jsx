import React, { useState } from 'react';
import { FilePlus, Edit, X, Save, Layers, Trash2 } from 'lucide-react';

export default function ManagePage() {
  // 📑 ডিফল্ট পেজ লিস্ট স্টেট (শুরুতে About Us থাকছে)
  const [pages, setPages] = useState([
    { id: 1, title: 'About Us Page', path: '/about-us' }
  ]);

  // 🎛️ মোডাল ওপেন/ক্লোজ স্টেট
  const [isOpen, setIsOpen] = useState(false);

  // ✍️ নতুন পেজ তৈরির ইনপুট স্টেট
  const [pageTitle, setPageTitle] = useState('');
  const [pagePath, setPagePath] = useState('');

  // 🚀 নতুন পেজ অ্যাড করার ফাংশন
  const handleCreatePage = (e) => {
    e.preventDefault();

    if (!pageTitle || !pagePath) {
      alert('দয়া করে Title এবং Path দুটিই পূরণ করুন!');
      return;
    }

    // প্যাথ-এর শুরুতে '/' না থাকলে অটোমেটিক যুক্ত করার লজিক
    let formattedPath = pagePath.trim().toLowerCase();
    if (!formattedPath.startsWith('/')) {
      formattedPath = '/' + formattedPath;
    }

    // স্পেস বা ইনভ্যালিড ক্যারেক্টার ইউআরএল ফ্রেন্ডলি (Slug) করা
    formattedPath = formattedPath.replace(/\s+/g, '-');

    const newPage = {
      id: Date.now(), // ইউনিক আইডি
      title: pageTitle.trim(),
      path: formattedPath
    };

    setPages([...pages, newPage]); // লিস্টে যুক্ত করা
    
    // ফর্ম রিসেট ও মোডাল বন্ধ করা
    setPageTitle('');
    setPagePath('');
    setIsOpen(false);
  };

  // 🗑️ পেজ ডিলিট করার ফাংশন (অপশনাল কিন্তু কাজের)
  const handleDeletePage = (id) => {
    if (confirm('আপনি কি এই পেজটি মুছে ফেলতে চান?')) {
      setPages(pages.filter(page => page.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 min-h-screen text-slate-100 p-2">
      
      {/* 🔝 হেডার এবং ক্রিয়েট বাটন */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-wide">Independent Core Pages</h2>
          <p className="text-xs text-slate-400">Create, deploy or inject rich content templates into customized static pages.</p>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-rose-600/20 transition-all active:scale-95"
        >
          <FilePlus size={14} /> Create Page
        </button>
      </div>

      {/* 📋 পেজ লিস্ট এরিয়া */}
      <div className="space-y-3">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1">
          <Layers size={10} /> Active Static Nodes ({pages.length})
        </span>

        {pages.map((page) => (
          <div 
            key={page.id} 
            className="bg-slate-900 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between text-xs text-slate-300 hover:border-slate-700 transition-all shadow-md group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="font-bold text-slate-100">{page.title}</span>
              <span className="hidden sm:inline text-slate-600">|</span>
              <code className="text-rose-400 bg-rose-950/20 px-2 py-0.5 rounded-md border border-rose-900/30 text-[11px] font-mono">
                {page.path}
              </code>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 bg-slate-950 border border-slate-800/60 rounded-lg text-slate-400 hover:text-white hover:border-slate-600 transition-colors">
                <Edit size={14} />
              </button>
              <button 
                onClick={() => handleDeletePage(page.id)}
                className="p-2 bg-slate-950 border border-slate-800/60 rounded-lg text-slate-500 hover:text-red-400 hover:border-red-900/40 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================== */}
      {/* 📥 ক্রিয়েট নিউ পেজ পপ-আপ মোডাল */}
      {/* ========================================== */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-100">
          <div className="bg-[#0b0f19] border border-slate-800 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl relative">
            
            {/* মোডাল হেডার */}
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-rose-500">Inject New static node</h3>
                <p className="text-[11px] text-slate-400">নতুন পেজের নাম এবং ইউআরএল পাথ সেট করুন।</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-500 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-900 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* ইনপুট ফর্ম */}
            <form onSubmit={handleCreatePage} className="space-y-4 text-xs">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Page Title</label>
                <input 
                  type="text" 
                  placeholder="e.g., Contact Us"
                  value={pageTitle}
                  onChange={(e) => setPageTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">URL Path (Slug)</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-slate-600 font-mono select-none">/</span>
                  <input 
                    type="text" 
                    placeholder="contact-us"
                    value={pagePath.replace(/^\//, '')} // ইনপুটে ডাবল '/' প্রিভেন্ট করার ট্রিক
                    onChange={(e) => setPagePath(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-7 pr-4 py-3 text-rose-400 font-mono placeholder:text-slate-600 focus:outline-none focus:border-rose-500 transition-colors"
                    required
                  />
                </div>
                <span className="text-[10px] text-slate-500 block mt-1">সরাসরি নাম লিখলেই হবে, সিস্টেম অটোমেটিক ইউআরএল ফরম্যাট করে নিবে।</span>
              </div>

              {/* অ্যাকশন বাটনসমূহ */}
              <div className="flex gap-3 pt-2 justify-end border-t border-slate-800/60">
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-slate-950 border border-slate-800 text-slate-300 px-4 py-2.5 rounded-xl font-bold hover:bg-slate-900 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-1.5 shadow-lg shadow-rose-600/10 transition-colors"
                >
                  <Save size={14} /> Deploy Node
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}