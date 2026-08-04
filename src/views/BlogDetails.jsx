import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { 
  Calendar, Clock, User, ArrowLeft, Share2, Tag, 
   Sparkles, Loader2 
} from 'lucide-react';
import AgentContext from '../context/AgentContext';

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {user} = useContext(AgentContext);
 console.log(id);

  // 🚀 Fetch Single Blog by ID
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:4000/api/blogs?agentId=${user.agentId}&id=${id}`);
        
        if (!response.ok) {
          throw new Error('Blog not found');
        }

        const data = await response.json();
        setBlog(data);
      } catch (err) {
        console.error("Error fetching blog details:", err);
        setError(err.message);
        
        // 🛑 API প্রস্তুত না থাকলে ডেমো ডাটা ফিল্টার করা
        const foundDemo = demoBlogs.find(b => b.id.toString() === id || b._id === id);
        setBlog(foundDemo || demoBlogs[0]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
    window.scrollTo(0, 0); // Scroll to top on page load
  }, [id]);

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
          to="/blogs" 
          className="px-6 py-2.5 bg-[#007b57] text-white font-bold text-xs rounded-xl hover:bg-[#004d34] transition-all flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-[#f4f7f6] py-12 md:py-20 text-gray-900 select-none">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* ⬅️ Back Button */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-xs font-extrabold text-[#007b57] hover:text-[#004d34] transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200"
          >
            <ArrowLeft size={16} /> Back to All Articles
          </Link>
        </motion.div>

        {/* 📰 Main Content Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl p-6 md:p-12 shadow-sm border border-gray-100 overflow-hidden"
        >
          {/* Header Metadata */}
          <div className="space-y-4 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#007b57] text-xs font-bold uppercase tracking-wider border border-emerald-100">
              <Sparkles size={13} /> {blog.category || 'Real Estate'}
            </span>

            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              {blog.title}
            </h1>

            {/* Author, Date & Time Row */}
            <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-gray-500 pt-2 border-b border-gray-100 pb-6">
              <div className="flex items-center gap-2">
                <User size={15} className="text-[#007b57]" />
                <span>{blog.author || 'Admin'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-[#007b57]" />
                <span>{blog.date || blog.publishedDate || '2025-10-19'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-[#007b57]" />
                <span>{blog.readTime || '5 min read'}</span>
              </div>
            </div>
          </div>

          {/* 🖼️ Main Featured Image */}
          <div className="w-full h-72 md:h-[420px] rounded-2xl overflow-hidden mb-10 bg-gray-100 shadow-inner">
            <img 
              src={blog.img || blog.imageUrl} 
              alt={blog.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* 💬 Excerpt / Highlight Box */}
          {blog.excerpt && (
            <div className="p-5 bg-emerald-50/60 border-l-4 border-[#007b57] rounded-r-xl mb-8">
              <p className="text-gray-700 italic font-medium text-sm md:text-base leading-relaxed">
                "{blog.excerpt}"
              </p>
            </div>
          )}

          {/* 📝 Full Article Body */}
          <div className="prose prose-emerald max-w-none text-gray-700 leading-relaxed space-y-6 text-sm md:text-base font-normal">
            {blog.content ? (
              blog.content.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))
            ) : (
              <p>
                Real estate investment in Bangladesh is experiencing unprecedented growth. Modern home design and structured urban developments are redefining luxury standard living across major areas. The Premium Homes Ltd continues to focus on creating structural value and high-trust housing solutions for all modern homeowners.
              </p>
            )}
          </div>

          {/* 🏷️ Article Tags (If Available) */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-gray-100 flex items-center flex-wrap gap-2">
              <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1.5 mr-2">
                <Tag size={14} className="text-[#007b57]" /> Tags:
              </span>
              {blog.tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 bg-gray-100 hover:bg-emerald-50 text-gray-700 hover:text-[#007b57] rounded-lg text-xs font-medium transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 🌐 Social Links & Share Section */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
              <Share2 size={15} className="text-[#007b57]" /> Share or Follow:
            </span>

            <div className="flex items-center gap-3">
              {blog.socials?.facebook && (
                <a href={blog.socials.facebook} target="_blank" rel="noreferrer" className="p-2.5 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-xl text-gray-600 transition-all">
                  <FaFacebookF size={16} />
                </a>
              )}
              {blog.socials?.linkedin && (
                <a href={blog.socials.linkedin} target="_blank" rel="noreferrer" className="p-2.5 bg-gray-100 hover:bg-blue-700 hover:text-white rounded-xl text-gray-600 transition-all">
                  <FaLinkedinIn size={16} />
                </a>
              )}
              {blog.socials?.twitter && (
                <a href={blog.socials.twitter} target="_blank" rel="noreferrer" className="p-2.5 bg-gray-100 hover:bg-sky-500 hover:text-white rounded-xl text-gray-600 transition-all">
                  <FaTwitter size={16} />
                </a>
              )}
              {/* Default Social Fallbacks */}
              {(!blog.socials || (!blog.socials.facebook && !blog.socials.linkedin)) && (
                <div className="flex gap-2">
                  <span className="p-2.5 bg-gray-100 hover:bg-[#007b57] hover:text-white rounded-xl text-gray-600 cursor-pointer transition-all"><FaFacebookF size={16} /></span>
                  <span className="p-2.5 bg-gray-100 hover:bg-[#007b57] hover:text-white rounded-xl text-gray-600 cursor-pointer transition-all"><FaLinkedinIn size={16} /></span>
                  <span className="p-2.5 bg-gray-100 hover:bg-[#007b57] hover:text-white rounded-xl text-gray-600 cursor-pointer transition-all"><FaTwitter size={16} /></span>
                </div>
              )}
            </div>
          </div>

        </motion.div>
      </div>
    </article>
  );
}

// 📌 Fallback / Demo Data
const demoBlogs = [
  {
    id: 1,
    title: 'Top Real Estate Company in Bangladesh | The Premium Homes Ltd',
    excerpt: 'Looking for the top real estate company in Bangladesh? The Premium Homes Ltd offers trusted property solutions, modern architectural builds, and prime location apartments.',
    content: `Finding a home is a deeply personal journey. It is not merely about square footage or modern aesthetics; it is about finding a sanctuary of safety and modern functionality in a bustling metropolis like Dhaka.

    Over the past decade, the demand for planned housing and architectural efficiency has risen drastically. Developers are now focusing on sustainable materials, high-security systems, and smart home integration to satisfy modern investment needs.

    When choosing a top real estate partner, focus on property handover track records, legal documentation transparency, and overall build quality. The Premium Homes Ltd prioritizes long-term property valuation and structural safety in every project.`,
    category: 'Market Insights',
    date: '2025-10-19',
    readTime: '5 min read',
    author: 'Admin',
    tags: ['RealEstate', 'DhakaProperties', 'Investment'],
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Best Real Estate Company in Bangladesh | Architectural Insights',
    excerpt: 'Finding a home is a deal. It is not about spending money. You want a place where you feel safe and comfortable.',
    content: `Real estate investments remain one of the safest wealth preservation tools. As urban centers expand, choosing strategic properties with proximity to major hubs ensures maximum ROI and capital growth.`,
    category: 'Investment',
    date: '2025-10-19',
    readTime: '5 min read',
    author: 'Admin',
    tags: ['Wealth', 'Properties', 'LuxuryLiving'],
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
  }
];