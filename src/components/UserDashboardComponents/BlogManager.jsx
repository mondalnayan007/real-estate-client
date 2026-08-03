import React, { useState, useEffect } from 'react';
import { Newspaper, Plus, Trash2, Loader2, Sparkles, Send, UploadCloud } from 'lucide-react';

export default function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // 📝 Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Market Insights',
    excerpt: '',
    content: '',
    readTime: '5 min read',
    author: 'Admin',
    image: null
  });

  // 🚀 Fetch Existing Blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/blogs');
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // 📷 Handle File / Image Input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // 📤 Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.image) {
      alert('Please fill in title and select an image!');
      return;
    }

    try {
      setSubmitting(true);

      const bodyData = new FormData();
      bodyData.append('title', formData.title);
      bodyData.append('category', formData.category);
      bodyData.append('excerpt', formData.excerpt);
      bodyData.append('content', formData.content);
      bodyData.append('readTime', formData.readTime);
      bodyData.append('author', formData.author);
      bodyData.append('image', formData.image);

      const res = await fetch('/api/blogs', {
        method: 'POST',
        body: bodyData,
      });

      const data = await res.json();

      if (res.ok) {
        alert('Blog published successfully!');
        setFormData({
          title: '',
          category: 'Market Insights',
          excerpt: '',
          content: '',
          readTime: '5 min read',
          author: 'Admin',
          image: null
        });
        setImagePreview(null);
        fetchBlogs();
      } else {
        alert(data.message || 'Failed to upload blog');
      }
    } catch (error) {
      console.error('Error submitting blog:', error);
      alert('Something went wrong during blog upload!');
    } finally {
      setSubmitting(false);
    }
  };

  // 🗑️ Handle Delete Blog
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBlogs(blogs.filter((b) => b._id !== id && b.id !== id));
      } else {
        alert('Failed to delete blog.');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-slate-100 p-4 md:p-8 space-y-8 animate-in fade-in duration-200 max-w-6xl mx-auto rounded-3xl border border-slate-800/60 shadow-2xl">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="border-b border-slate-800/80 pb-5">
        <h2 className="text-2xl font-black text-white tracking-wide uppercase flex items-center gap-2.5">
          <Newspaper className="text-cyan-400" size={26} /> 
          <span className="bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
            Blog Management Console
          </span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Publish premium insights, property updates, and market strategies directly to your core platform.
        </p>
      </div>

      {/* ================= BLOG UPLOAD FORM ================= */}
      <form onSubmit={handleSubmit} className="bg-[#111827] p-6 md:p-8 rounded-2xl border border-slate-800/80 shadow-xl space-y-6">
        <h3 className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
          <Plus size={16} className="text-cyan-400" /> Draft & Publish New Entry
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Title */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-slate-300 mb-1.5">
              Blog Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Top Real Estate Company in Bangladesh"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0b101d] border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-600"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-slate-300 mb-1.5">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0b101d] border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 transition-all cursor-pointer"
            >
              <option value="Market Insights">Market Insights</option>
              <option value="Architecture">Architecture</option>
              <option value="Wealth Strategy">Wealth Strategy</option>
              <option value="Investment">Investment</option>
            </select>
          </div>

          {/* Author Name */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-slate-300 mb-1.5">
              Author Name
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0b101d] border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 transition-all"
            />
          </div>

          {/* Read Time */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-slate-300 mb-1.5">
              Estimated Read Time
            </label>
            <input
              type="text"
              placeholder="e.g. 5 min read"
              value={formData.readTime}
              onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0b101d] border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 transition-all"
            />
          </div>

        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-[11px] uppercase font-bold text-slate-300 mb-1.5">
            Short Excerpt / Card Preview *
          </label>
          <textarea
            rows={2}
            required
            placeholder="Write a catchy 2-line summary to show in card grid..."
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#0b101d] border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 transition-all resize-none placeholder:text-slate-600"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-[11px] uppercase font-bold text-slate-300 mb-1.5">
            Full Article Content
          </label>
          <textarea
            rows={4}
            placeholder="Write full article body text..."
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#0b101d] border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-600"
          />
        </div>

        {/* Image Upload Box */}
        <div>
          <label className="block text-[11px] uppercase font-bold text-slate-300 mb-1.5">
            Banner Image (Upload to Cloudinary) *
          </label>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#0b101d] p-4 rounded-xl border border-slate-800">
            <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border border-slate-700 transition-all">
              <UploadCloud size={16} /> Choose File
              <input
                type="file"
                accept="image/*"
                required
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            <span className="text-xs text-slate-400 truncate max-w-xs">
              {formData.image ? formData.image.name : 'No file selected yet'}
            </span>

            {/* Preview Box */}
            {imagePreview && (
              <div className="sm:ml-auto w-24 h-14 shrink-0 rounded-lg overflow-hidden border border-cyan-500/40 relative">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-3 flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin text-slate-950" /> Publishing to Cloud...
              </>
            ) : (
              <>
                <Send size={15} /> Publish Blog
              </>
            )}
          </button>
        </div>
      </form>

      {/* ================= PUBLISHED BLOGS LIST ================= */}
      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
          <Sparkles size={16} className="text-amber-400" /> Active Articles ({blogs.length})
        </h3>

        {loading ? (
          <div className="flex items-center gap-2 text-slate-400 text-xs py-8 justify-center">
            <Loader2 size={20} className="animate-spin text-cyan-400" /> Fetching live articles...
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 text-center">No blogs published yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blogs.map((blog) => (
              <div
                key={blog._id || blog.id}
                className="bg-[#111827] border border-slate-800 hover:border-slate-700/80 rounded-2xl p-4 flex gap-4 items-center justify-between transition-all"
              >
                {/* Image */}
                <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-[#0b101d] border border-slate-800">
                  <img
                    src={blog.img || blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block mb-0.5">
                    {blog.category}
                  </span>
                  <h4 className="text-xs font-bold text-white truncate mb-1">
                    {blog.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 line-clamp-1">
                    {blog.excerpt}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleDelete(blog._id || blog.id)}
                    className="p-2.5 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors border border-transparent hover:border-rose-500/20"
                    title="Delete Blog"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}