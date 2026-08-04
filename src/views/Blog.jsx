import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Search, Sparkles, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = ['All', 'Market Insights', 'Architecture', 'Wealth Strategy', 'Investment'];

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // 🚀 Fetch Blogs Data from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        // আপনার রিয়েল ব্যাকএন্ড এন্ডপয়েন্ট লিঙ্ক দিন (যেমন: '/api/blogs')
        const response = await fetch('/api/blogs'); 
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError(err.message);
        
        // 🛑 API না থাকা পর্যন্ত ডেমো ডাটা দিয়ে টেস্ট করার জন্য
        setBlogs(demoBlogs);
      }  finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // 🔍 Filter Logic (Category + Search Query)
  const filteredPosts = blogs.filter(post => {
    const matchesTab = activeTab === 'All' || post.category === activeTab;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section className="py-20 bg-[#f4f7f6] text-gray-900 min-h-screen relative overflow-hidden select-none">
      
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
{/* ================= UNIQUE MODERN HEADER (Updated Colors) ================= */}
<div className="bg-gradient-to-r from-[#004d34] via-[#007b57] to-[#0f2d24] text-white rounded-[2.5rem] p-8 md:p-12 mb-16 relative overflow-hidden shadow-2xl border border-emerald-800/40">
  
  {/* Soft Ambient Background Glows */}
  <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-400/20 rounded-full blur-[120px] pointer-events-none" />
  <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-400/10 rounded-full blur-[120px] pointer-events-none" />

  <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
    
    {/* Title & Subtitle */}
    <div className="max-w-2xl">
      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-4 backdrop-blur-md">
        <Sparkles size={14} /> Knowledge Hub
      </span>
      <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight mb-4">
        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-400">Blogs</span> & Insights
      </h1>
      <p className="text-emerald-100/80 font-medium text-sm md:text-base leading-relaxed">
        Stay updated with expert perspectives, real estate trends, architectural innovations, and practical property investment advice.
      </p>
    </div>

    {/* Search Input Box */}
    <div className="relative w-full lg:w-80">
      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-200/70" />
      <input 
        type="text" 
        placeholder="Search articles..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-black/20 border border-white/20 focus:border-amber-300 pl-11 pr-4 py-3.5 rounded-2xl text-sm text-white placeholder-emerald-200/50 outline-none backdrop-blur-md transition-all shadow-inner"
      />
    </div>

  </div>

  {/* Filter Categories Pill Buttons */}
  <div className="flex flex-wrap gap-2.5 mt-8 pt-8 border-t border-white/15">
    {categories.map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 ${
          activeTab === tab 
            ? 'bg-amber-400 text-gray-950 shadow-lg shadow-amber-400/25 font-extrabold' 
            : 'bg-white/10 text-emerald-100 hover:text-white hover:bg-white/20 border border-white/10'
        }`}
      >
        {tab}
      </button>
    ))}
  </div>

</div>

        {/* ================= LOADING STATE ================= */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-28">
            <Loader2 size={40} className="animate-spin text-[#007b57] mb-3" />
            <p className="text-gray-500 font-medium text-sm">Loading intelligence articles...</p>
          </div>
        )}

        {/* ================= BLOG CARDS GRID (Exact Image Style) ================= */}
        {!loading && (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post._id || post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    {/* Top Image Box with Floating Read Time Pill */}
                    <div className="h-56 relative overflow-hidden bg-gray-100">
                      <img 
                        src={post.img} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Floating Read Time Pill (Top Right - Matches Image) */}
                      <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-gray-900 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                        {post.readTime || '5 min read'}
                      </span>
                    </div>

                    {/* Card Body Content */}
                    <div className="p-6">
                      {/* Metadata Row: Date & Time */}
                      <div className="flex items-center gap-4 text-xs text-gray-500 font-medium mb-3">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-gray-400" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} className="text-gray-400" />
                          {post.readTime || '5 min read'}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-[#007b57] transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt Text */}
                      <p className="text-gray-600 text-sm font-normal leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Author & Read More Link */}
                  <div className="px-6 pb-6 pt-2 flex flex-col gap-4">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                      <User size={14} className="text-gray-400" />
                      <span>{post.author || 'Admin'}</span>
                    </div>

                    <div className="pt-2">
                      <Link 
                        to={`/blogs/${post._id || post.id}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#007b57] group-hover:translate-x-1 transition-transform duration-300"
                      >
                        Read More <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ================= NO RESULTS FOUND ================= */}
        {!loading && filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 shadow-sm">
            <p className="text-base font-semibold text-gray-600 mb-1">No blog articles found</p>
            <p className="text-sm text-gray-400">Try searching for a different keyword or category.</p>
          </div>
        )}

      </div>
    </section>
  );
}

// 📌 Fallback / Demo Data Matching the Provided Image Design
const demoBlogs = [
  {
    id: 1,
    title: 'Top Real Estate Company in Bangladesh | The Premium...',
    excerpt: 'Looking for the top real estate company in Bangladesh? The Premium Homes Ltd offers trusted property solutions, modern...',
    category: 'Market Insights',
    date: '2025-10-19',
    readTime: '5 min read',
    author: 'Admin',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Best Real Estate Company in Bangladesh | The Premium...',
    excerpt: 'Finding a home is a deal. It is not about spending money. You want a place where you feel safe and comfortable. You want a home...',
    category: 'Investment',
    date: '2025-10-19',
    readTime: '5 min read',
    author: 'Admin',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Making the City Look New: A Property Developer in Dhak...',
    excerpt: 'Finding a home is a personal thing. It is not about the size of the place it is about finding a quiet spot in a busy city. As a Top Property...',
    category: 'Architecture',
    date: '2025-10-19',
    readTime: '5 min read',
    author: 'Admin',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'Flat for Sale in Dhaka | Luxury Apartments by The...',
    excerpt: 'Dhaka is a city that\'s always on the move and changing really fast. It is the city of Bangladesh. As the city is getting more...',
    category: 'Wealth Strategy',
    date: '2025-10-19',
    readTime: '5 min read',
    author: 'Admin',
    img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    title: 'Trusted Real Estate Company in Bangladesh | T...',
    excerpt: 'Finding a place to call home is more than buying a house it is a journey to feel safe and comfortable and to leave something for the...',
    category: 'Investment',
    date: '2025-10-19',
    readTime: '5 min read',
    author: 'Admin',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    title: 'Luxury Apartments in Bangladesh',
    excerpt: 'Luxury is not about being expensive or in a good location anymore. Now it is about the experience of living. At The Premium Homes...',
    category: 'Architecture',
    date: '2025-10-19',
    readTime: '5 min read',
    author: 'Admin',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80'
  }
];