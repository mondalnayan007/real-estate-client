import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, ArrowUpRight, Search, Sparkles } from 'lucide-react';

const categories = ['All Articles', 'Market Insights', 'Architecture', 'Wealth Strategy'];

const blogPosts = [
  {
    id: 1,
    title: 'The Sovereign Ascent: Why Global Ultra-HNWIs are Pivoting to Penthouses in 2026',
    excerpt: 'An in-depth analysis of high-net-worth investment trends, focusing on off-market vertical estates and capital preservation.',
    category: 'Market Insights',
    date: 'May 24, 2026',
    readTime: '6 min read',
    author: 'Marcus Thorne',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    featured: true
  },
  {
    id: 2,
    title: 'Minimalism Meets Brutalism: Curating the Modern Mansion',
    excerpt: 'Exploring how raw concrete textures and organic glass architectural boundaries define this era’s luxury estates.',
    category: 'Architecture',
    date: 'May 18, 2026',
    readTime: '4 min read',
    author: 'Elena Rostova',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
    featured: false
  },
  {
    id: 3,
    title: 'Real Estate As a Shield: Navigating Modern Inflationary Pressures',
    excerpt: 'How multi-family asset portfolios and premium land acquisitions act as the ultimate defense mechanism for family offices.',
    category: 'Wealth Strategy',
    date: 'May 12, 2026',
    readTime: '8 min read',
    author: 'Alexander Sterling',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    featured: false
  },
  {
    id: 4,
    title: 'Coastal Engineering: The Cost of Absolute Oceanfront Isolation',
    excerpt: 'Understanding the private infrastructure required to maintain and secure modern glass estates on remote coastal lines.',
    category: 'Architecture',
    date: 'May 05, 2026',
    readTime: '5 min read',
    author: 'Seraphina Vance',
    img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    featured: false
  }
];

export default function Blog() {
  const [activeTab, setActiveTab] = useState('All Articles');
  const [searchQuery, setSearchQuery] = useState('');

  // ফিল্টারিং লজিক (ক্যাটাগরি এবং সার্চ কুয়েরি একসাথে কাজ করবে)
  const filteredPosts = blogPosts.filter(post => {
    const matchesTab = activeTab === 'All Articles' || post.category === activeTab;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // ফিচার্ড পোস্ট আলাদা করা (যদি ফিল্টার 'All Articles' থাকে এবং সার্চ খালি থাকে)
  const featuredPost = activeTab === 'All Articles' && searchQuery === '' 
    ? blogPosts.find(p => p.featured) 
    : null;

  // গ্রিডে দেখানোর জন্য বাকি পোস্টগুলো ফিল্টার করা
  const gridPosts = featuredPost 
    ? filteredPosts.filter(p => p.id !== featuredPost.id) 
    : filteredPosts;

  return (
    <section className="py-28 bg-slate-950 text-white px-6 overflow-hidden relative">
      {/* ব্যাকগ্রাউন্ড ওলেড লাক্সারি গ্লো */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-blue-400 tracking-[0.25em] text-xs font-mono font-bold uppercase block mb-3">
              Prime Intelligence
            </span>
            <h2 className="text-4xl md:text-5xl font-light font-serif tracking-tight">
              The Sovereign <span className="font-sans font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-blue-500">Journal</span>
            </h2>
          </div>

          {/* প্রিমিয়াম সার্চ বার */}
          <div className="relative w-full md:w-80 group">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search intelligence reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/40 border border-slate-900 focus:border-blue-500/40 pl-11 pr-4 py-3 rounded-2xl text-xs font-mono text-slate-200 outline-none backdrop-blur-md transition-all placeholder:text-slate-600"
            />
          </div>
        </div>

        {/* ================= FILTER TABS ================= */}
        <div className="flex flex-wrap gap-2.5 mb-16 border-b border-slate-900 pb-6">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-5 py-2 rounded-full text-xs font-mono tracking-wide transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                  : 'bg-transparent text-slate-500 border border-transparent hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ================= FEATURED POST (LARGE HERO) ================= */}
        <AnimatePresence mode="popLayout">
          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 50, damping: 15 }}
              className="group bg-slate-900/20 border border-slate-900/60 hover:border-slate-800/40 rounded-[3rem] overflow-hidden backdrop-blur-3xl p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 cursor-pointer"
            >
              <div className="lg:col-span-7 h-72 lg:h-[400px] rounded-[2.5rem] overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 opacity-60" />
                <span className="absolute top-4 left-4 z-20 bg-blue-500 text-white text-[9px] font-mono font-bold tracking-widest px-3 py-1.5 rounded-xl uppercase flex items-center gap-1.5 shadow-lg shadow-blue-500/20">
                  <Sparkles size={10} /> Featured Report
                </span>
                <img 
                  src={featuredPost.img} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-103"
                />
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between py-2">
                <div>
                  <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest font-bold block mb-3">
                    {featuredPost.category}
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-100 group-hover:text-blue-400 transition-colors duration-300 mb-4 leading-snug">
                    {featuredPost.title}
                  </h3>
                  <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500">
                    <span className="flex items-center gap-1.5"><User size={12}/> {featuredPost.author}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={12}/> {featuredPost.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12}/> {featuredPost.readTime}</span>
                  </div>
                  <div className="p-3.5 bg-slate-950 border border-slate-900 group-hover:border-blue-500/30 group-hover:bg-blue-500/10 text-slate-400 group-hover:text-blue-400 rounded-2xl transition-all duration-300">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= REGULAR POSTS GRID ================= */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {gridPosts.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 80, damping: 16 }}
                className="group bg-slate-900/30 border border-slate-900 hover:border-slate-800/60 rounded-[2.5rem] overflow-hidden flex flex-col justify-between backdrop-blur-3xl cursor-pointer"
              >
                <div>
                  {/* ইমেজ পার্ট */}
                  <div className="h-56 overflow-hidden relative m-3 rounded-[2rem]">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 opacity-70" />
                    <span className="absolute top-3 left-3 z-20 bg-slate-950/80 backdrop-blur-md text-slate-400 border border-slate-900 text-[9px] font-mono tracking-wider px-2.5 py-1 rounded-xl uppercase">
                      {post.category}
                    </span>
                    <img 
                      src={post.img} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    />
                  </div>

                  {/* টেক্সট পার্ট */}
                  <div className="px-6 pt-3 pb-6">
                    <h4 className="text-lg font-bold text-slate-200 tracking-tight leading-snug mb-3 group-hover:text-blue-400 transition-colors duration-300">
                      {post.title}
                    </h4>
                    <p className="text-slate-400 text-xs font-light leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* মেটা কন্টেন্ট ফুটার */}
                <div className="mx-6 pb-6 pt-4 border-t border-slate-950 flex items-center justify-between">
                  <div className="flex flex-wrap gap-3 text-[10px] font-mono text-slate-500">
                    <span className="flex items-center gap-1"><User size={10}/> {post.author.split(' ')[0]}</span>
                    <span className="flex items-center gap-1"><Clock size={10}/> {post.readTime}</span>
                  </div>
                  <span className="text-[10px] font-mono text-blue-500/70 group-hover:text-blue-400 flex items-center gap-0.5 transition-colors">
                    Read Report <ArrowUpRight size={12} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ================= NO RESULTS FOUND ================= */}
        {filteredPosts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-slate-900/10 border border-dashed border-slate-900 rounded-[2rem]"
          >
            <p className="text-sm font-mono text-slate-500">No intelligence reports matching your criteria were found.</p>
          </motion.div>
        )}

      </div>
    </section>
  );
}