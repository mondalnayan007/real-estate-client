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
    readTime: '',
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

      const res = await fetch('http://localhost:4000/api/blogs', {
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
          readTime: '',
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
    <div className="min-h-screen bg-[#e7fced] text-gray-800 p-4 md:p-8 space-y-8 animate-in fade-in duration-200 max-w-6xl mx-auto rounded-3xl border border-gray-200 shadow-sm">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="border-b border-gray-200 pb-5">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase flex items-center gap-2.5">
          <Newspaper className="text-emerald-600" size={26} /> 
          <span>Blog Management Console</span>
        </h2>
        <p className="text-xs text-gray-500 mt-1 font-medium">
          Publish premium insights, property updates, and market strategies directly to your platform.
        </p>
      </div>

      {/* ================= BLOG UPLOAD FORM ================= */}
      <form onSubmit={handleSubmit} className="bg-[#ecece2] p-6 md:p-8 rounded-2xl border border-gray-200/80 shadow-sm space-y-6">
        <h3 className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider flex items-center gap-2">
          <Plus size={16} className="text-emerald-600" /> Draft & Publish New Article
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Title */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-gray-600 mb-1.5">
              Blog Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Top Real Estate Company in Bangladesh"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-emerald-500 transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-gray-600 mb-1.5">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-emerald-500 transition-all cursor-pointer"
            >
              <option value="Market Insights">Market Insights</option>
              <option value="Architecture">Architecture</option>
              <option value="Wealth Strategy">Wealth Strategy</option>
              <option value="Investment">Investment</option>
            </select>
          </div>

          {/* Author Name */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-gray-600 mb-1.5">
              Author Name
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-emerald-500 transition-all"
            />
          </div>

          {/* Read Time */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-gray-600 mb-1.5">
              Estimated Read Time
            </label>
            <input
              type="text"
              placeholder="e.g. 5 min read"
              value={formData.readTime}
              onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-emerald-500 transition-all"
            />
          </div>

        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-[11px] uppercase font-bold text-gray-600 mb-1.5">
            Short Excerpt / Card Preview *
          </label>
          <textarea
            rows={2}
            required
            placeholder="Write a catchy 2-line summary..."
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-emerald-500 transition-all resize-none placeholder:text-gray-400"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-[11px] uppercase font-bold text-gray-600 mb-1.5">
            Full Article Content
          </label>
          <textarea
            rows={4}
            placeholder="Write full article body text..."
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-emerald-500 transition-all placeholder:text-gray-400"
          />
        </div>

        {/* Image Upload Box */}
        <div>
          <label className="block text-[11px] uppercase font-bold text-gray-600 mb-1.5">
            Banner Image (Upload to Cloudinary) *
          </label>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-emerald-700 hover:bg-emerald-50 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border border-gray-300 transition-all shadow-sm">
              <UploadCloud size={16} className="text-emerald-600" /> Choose File
              <input
                type="file"
                accept="image/*"
                required
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            <span className="text-xs text-gray-500 truncate max-w-xs font-medium">
              {formData.image ? formData.image.name : 'No file selected yet'}
            </span>

            {/* Preview Box */}
            {imagePreview && (
              <div className="sm:ml-auto w-24 h-14 shrink-0 rounded-lg overflow-hidden border border-emerald-500 relative shadow-sm">
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
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin text-white" /> Uploading to Cloud...
              </>
            ) : (
              <>
                <Send size={15} /> Publish Article
              </>
            )}
          </button>
        </div>
      </form>

      {/* ================= PUBLISHED BLOGS LIST ================= */}
      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider flex items-center gap-2">
          <Sparkles size={16} className="text-amber-500" /> Published Articles ({blogs.length})
        </h3>

        {loading ? (
          <div className="flex items-center gap-2 text-gray-500 text-xs py-8 justify-center">
            <Loader2 size={20} className="animate-spin text-emerald-600" /> Loading published articles...
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-xs text-gray-400 py-6 text-center">No blogs published yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blogs.map((blog) => (
              <div
                key={blog._id || blog.id}
                className="bg-white border border-gray-200 hover:border-gray-300 rounded-2xl p-4 flex gap-4 items-center justify-between transition-all shadow-sm"
              >
                {/* Image */}
                <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-gray-200">
                  <img
                    src={blog.img || blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-0.5">
                    {blog.category}
                  </span>
                  <h4 className="text-xs font-bold text-gray-900 truncate mb-1">
                    {blog.title}
                  </h4>
                  <p className="text-[10px] text-gray-500 line-clamp-1">
                    {blog.excerpt}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleDelete(blog._id || blog.id)}
                    className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100"
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