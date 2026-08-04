import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram, 
  FaYoutube, FaPinterestP 
} from 'react-icons/fa';
import { 
  Calendar, Clock, User, ArrowLeft, Share2, Tag, 
  Sparkles, Loader2, Search, ArrowRight, MessageSquare, BookOpen 
} from 'lucide-react';
import AgentContext from '../context/AgentContext';

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Safe Context Access
  const contextValue = useContext(AgentContext);
  const user = contextValue?.user;

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 🚀 Fetch Single Blog & Dynamic Recent Blogs
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        const agentId = user?.agentId;
        
        // 1️⃣ Agent ID থাকলে Dynamic URL, না থাকলে Default Handling
        const singleBlogUrl = agentId 
          ? `http://localhost:4000/api/blogs?agentId=${agentId}&id=${id}` 
          : `http://localhost:4000/api/blogs?id=${id}`;

        const allBlogsUrl = agentId 
          ? `http://localhost:4000/api/blogs?agentId=${agentId}` 
          : `http://localhost:4000/api/blogs`;

        // 2️⃣ Single Blog Details & All Blogs (For Recent Posts) API Request
        const [singleRes, allRes] = await Promise.all([
          fetch(singleBlogUrl).catch(() => null),
          fetch(allBlogsUrl).catch(() => null)
        ]);

        let singleData = null;
        let allData = [];

        if (singleRes && singleRes.ok) {
          singleData = await singleRes.json();
        }
        
        if (allRes && allRes.ok) {
          allData = await allRes.json();
        }

        // 3️⃣ Single Blog Data Setup (If API fails or empty, fallback to Demo Data)
        let currentBlog = null;
        if (singleData) {
          currentBlog = Array.isArray(singleData) 
            ? singleData.find(b => (b._id || b.id).toString() === id) 
            : singleData;
        }

        if (!currentBlog) {
          currentBlog = demoBlogs.find(b => b.id.toString() === id || b._id === id) || demoBlogs[0];
        }
        setBlog(currentBlog);

        // 4️⃣ Dynamic Recent Blogs Setup
        let dynamicRecent = [];
        if (Array.isArray(allData) && allData.length > 0) {
          // বর্তমান দেখা ব্লগ বাদে বাকিগুলো ফিল্টার করা
          dynamicRecent = allData.filter(b => (b._id || b.id).toString() !== id);
        }

        // API ডাটা খালি বা মিসিং থাকলে Demo Data ফিল্টার করে দেওয়া
        if (dynamicRecent.length === 0) {
          dynamicRecent = demoBlogs.filter(b => b.id.toString() !== id);
        }

        setRecentBlogs(dynamicRecent);

      } catch (err) {
        console.error("Error fetching blog details:", err);
        setError(err.message);
        
        // 🛑 Fallback to Default Demo Data on Error
        const foundDemo = demoBlogs.find(b => b.id.toString() === id || b._id === id) || demoBlogs[0];
        setBlog(foundDemo);
        setRecentBlogs(demoBlogs.filter(b => b.id.toString() !== id));
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
    window.scrollTo(0, 0);
  }, [id, user?.agentId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f7f6] flex flex-col items-center justify-center">
        <Loader2 size={40} className="animate-spin text-[#007b57] mb-3" />
        <p className="text-gray-600 font-medium text-sm">Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#f4f7f6] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Article Not Found!</h2>
        <p className="text-gray-500 mb-6 text-sm">The blog post you are looking for does not exist or has been removed.</p>
        <Link 
          to="/blog" 
          className="px-6 py-2.5 bg-[#007b57] text-white font-bold text-xs rounded-xl hover:bg-[#004d34] transition-all flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-[#f4f7f6] py-8 md:py-14 text-gray-900 select-none relative">
      
      {/* 🟢 Top Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#007b57] via-emerald-400 to-amber-400 z-50 origin-left"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* ⬅️ Top Navigation Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center pt-8 justify-between flex-wrap gap-4"
        >
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-xs font-bold text-[#007b57] hover:text-white hover:bg-[#007b57] transition-all bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-200/80"
          >
            <ArrowLeft size={15} /> Back to All Articles
          </Link>
          
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <span>Blogs</span> / <span className="text-[#007b57] font-semibold truncate max-w-[200px] sm:max-w-xs">{blog.title}</span>
          </div>
        </motion.div>

        {/* 📐 Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT COLUMN: MAIN ARTICLE ================= */}
          <main className="lg:col-span-8 space-y-6">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-gray-200/60 overflow-hidden"
            >
              
              {/* 🟩 Header Banner */}
              <div className="bg-[#007b57] text-white p-6 sm:p-8 rounded-2xl mb-8 relative overflow-hidden shadow-md">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-800/60 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-600/30">
                  <Sparkles size={13} /> {blog.category || 'Real Estate'}
                </span>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-6">
                  {blog.title}
                </h1>

                {/* Author, Date & Meta Row */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-emerald-100/90 font-medium pt-4 border-t border-emerald-600/40">
                  <div className="flex items-center gap-1.5">
                    <User size={14} className="text-amber-300" />
                    <span>by <strong className="text-white">{blog.author || 'Admin'}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-amber-300" />
                    <span>{blog.date || blog.publishedDate || '2025-10-19'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-amber-300" />
                    <span>{blog.readTime || '5 min read'}</span>
                  </div>
                </div>
              </div>

              {/* 🖼️ Main Featured Image */}
              <div className="w-full h-64 sm:h-80 md:h-[420px] rounded-2xl overflow-hidden mb-8 bg-gray-100 shadow-sm border border-gray-100">
                <img 
                  src={blog.img || blog.imageUrl || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'} 
                  alt={blog.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 💬 Excerpt Box */}
              {blog.excerpt && (
                <div className="p-5 bg-emerald-50/70 border-l-4 border-[#007b57] rounded-r-2xl mb-8">
                  <p className="text-gray-700 italic font-medium text-sm sm:text-base leading-relaxed">
                    "{blog.excerpt}"
                  </p>
                </div>
              )}

              {/* 📝 Full Article Body */}
              <div className="prose prose-emerald max-w-none text-gray-700 leading-relaxed space-y-6 text-sm sm:text-base font-normal">
                {blog.content ? (
                  blog.content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="leading-7">{paragraph}</p>
                  ))
                ) : (
                  <>
                    <p>
                      Finding a home is a deal. It is not about spending money. You want a place where you feel safe and comfortable. You want a home that will be a place for your family in the future. In Dhaka the city is changing fast. One company is doing a job of making homes that are really nice. The Premium Homes Ltd. Is a company that people trust.
                    </p>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
                      Best Real Estate Company in Bangladesh | The Premium Homes Ltd.
                    </h2>
                    <p>
                      The way people live in Bangladesh is changing. Over the ten years people have started to want homes that are more than just a place to live. They want homes that're nice and have a lot of amenities. The Premium Homes Ltd., is a company that is making this happen.
                    </p>
                  </>
                )}
              </div>

              {/* 🏷️ Article Tags */}
              <div className="mt-10 pt-6 border-t border-gray-100 flex items-center flex-wrap gap-2">
                <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1.5 mr-2">
                  <Tag size={14} className="text-[#007b57]" /> Tags:
                </span>
                {(blog.tags && blog.tags.length > 0 ? blog.tags : ['REAL ESTATE', 'PROPERTY', 'INVESTMENT']).map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="px-3.5 py-1.5 bg-gray-100 hover:bg-[#007b57] hover:text-white rounded-lg text-xs font-bold text-gray-600 transition-all cursor-pointer uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 🎁 CTA Box */}
              <div className="mt-10 p-6 sm:p-8 bg-gradient-to-r from-[#004d34] to-[#007b57] rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
                <div className="space-y-2 text-center sm:text-left">
                  <h4 className="text-lg font-bold">Looking for Premium Properties in Dhaka?</h4>
                  <p className="text-emerald-100/80 text-xs sm:text-sm">Get expert consultation for safe real estate investment today.</p>
                </div>
                <Link to="/contact" className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-gray-950 font-extrabold text-xs rounded-xl shadow-md transition-all whitespace-nowrap flex items-center gap-2">
                  Contact Agent <ArrowRight size={14} />
                </Link>
              </div>

            </motion.div>

          </main>

          {/* ================= RIGHT COLUMN: SIDEBAR ================= */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-6">
            
            {/* 1. Social Networks Widget */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200/60">
              <h3 className="text-base font-bold text-gray-900 pb-3 mb-4 border-b border-gray-100 flex items-center gap-2">
                <Share2 size={16} className="text-[#007b57]" /> Social Networks
              </h3>
              
              <div className="grid grid-cols-2 gap-2.5">
                <a href={blog.socials?.instagram || "#"} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs shadow-sm hover:opacity-90 transition-opacity">
                  <FaInstagram size={15} /> <span>Instagram</span>
                </a>
                <a href={blog.socials?.twitter || "#"} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 p-2.5 rounded-xl bg-sky-500 text-white font-bold text-xs shadow-sm hover:opacity-90 transition-opacity">
                  <FaTwitter size={15} /> <span>Twitter</span>
                </a>
                <a href={blog.socials?.facebook || "#"} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 p-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-sm hover:opacity-90 transition-opacity">
                  <FaFacebookF size={15} /> <span>Facebook</span>
                </a>
                <a href={blog.socials?.youtube || "#"} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 p-2.5 rounded-xl bg-red-600 text-white font-bold text-xs shadow-sm hover:opacity-90 transition-opacity">
                  <FaYoutube size={15} /> <span>Youtube</span>
                </a>
                <a href={blog.socials?.pinterest || "#"} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 p-2.5 rounded-xl bg-red-700 text-white font-bold text-xs shadow-sm hover:opacity-90 transition-opacity">
                  <FaPinterestP size={15} /> <span>Pinterest</span>
                </a>
                <a href={blog.socials?.linkedin || "#"} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 p-2.5 rounded-xl bg-blue-700 text-white font-bold text-xs shadow-sm hover:opacity-90 transition-opacity">
                  <FaLinkedinIn size={15} /> <span>Linkedin</span>
                </a>
              </div>
            </div>

            {/* 2. Search Box Widget */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200/60">
              <h3 className="text-base font-bold text-gray-900 mb-3">Search by Keyword</h3>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#007b57] px-3.5 py-2.5 rounded-xl text-xs text-gray-800 outline-none transition-all"
                  />
                </div>
                <button className="px-4 py-2.5 bg-[#007b57] hover:bg-[#004d34] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm">
                  <Search size={14} /> SEARCH
                </button>
              </div>
            </div>

            {/* 3. Dynamic Recent Posts Widget */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200/60">
              <h3 className="text-base font-bold text-gray-900 pb-3 mb-4 border-b border-gray-100 flex items-center gap-2">
                <BookOpen size={16} className="text-[#007b57]" /> Recent Posts
              </h3>

              <div className="space-y-4">
                {recentBlogs.slice(0, 4).map((item) => (
                  <Link 
                    key={item.id || item._id} 
                    to={`/blogs/${item.id || item._id}`}
                    className="flex items-center gap-3.5 group"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                      <img 
                        src={item.img || item.imageUrl || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-gray-800 group-hover:text-[#007b57] transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                      <span className="text-[11px] text-gray-400 font-medium mt-1 block">
                        {item.date || item.publishedDate || '2025-10-19'}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 4. Tag Cloud Widget */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200/60">
              <h3 className="text-base font-bold text-gray-900 pb-3 mb-4 border-b border-gray-100">Tag Cloud</h3>
              <div className="flex flex-wrap gap-2">
                {['REAL ESTATE', 'PROPERTY', 'INVESTMENT', 'HOUSING', 'DEVELOPMENT', 'MARKET', 'SMART CITY'].map((t, idx) => (
                  <span 
                    key={idx}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wider cursor-pointer transition-all ${
                      idx === 0 
                        ? 'bg-[#007b57] text-white shadow-sm' 
                        : 'bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-[#007b57]'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </aside>

        </div>

      </div>
    </article>
  );
}

// 📌 Fallback / Default Demo Blogs Data
const demoBlogs = [
  {
    id: 1,
    title: 'Top Real Estate Company in Bangladesh | The Premium Homes Ltd.',
    excerpt: 'Looking for the top real estate company in Bangladesh? The Premium Homes Ltd offers trusted property solutions, modern architectural builds, and prime location apartments.',
    category: 'Market Insights',
    date: '2025-10-19',
    readTime: '5 min read',
    author: 'Admin',
    tags: ['REAL ESTATE', 'PROPERTY', 'INVESTMENT'],
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Making the City Look New: A Property Developer in Dhaka You Can Believe In',
    excerpt: 'Finding a home is a personal thing. It is not about the size of the place it is about finding a quiet spot in a busy city.',
    category: 'Architecture',
    date: '2025-10-19',
    readTime: '4 min read',
    author: 'Admin',
    tags: ['HOUSING', 'DEVELOPMENT'],
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Flat for Sale in Dhaka | Luxury Apartments by The Premium Homes',
    excerpt: 'Dhaka is a city that\'s always on the move and changing really fast. Discover top luxury options.',
    category: 'Wealth Strategy',
    date: '2025-10-19',
    readTime: '6 min read',
    author: 'Admin',
    tags: ['SMART CITY', 'PROPERTY'],
    img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'Trusted Real Estate Company in Bangladesh | The Premium Homes',
    excerpt: 'Finding a place to call home is more than buying a house it is a journey to feel safe and comfortable.',
    category: 'Investment',
    date: '2025-10-19',
    readTime: '5 min read',
    author: 'Admin',
    tags: ['REAL ESTATE', 'MARKET'],
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
  }
];