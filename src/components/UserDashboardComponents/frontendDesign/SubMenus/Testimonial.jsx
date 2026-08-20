import React, { useState, useEffect } from 'react';
import { Star, Trash2, EyeOff, Eye, MessageSquare, Plus, Video, X, Upload, CheckCircle2 } from 'lucide-react';

// ==========================================
// 🌐 TESTIMONIAL BACKEND CONFIGURATION
// ==========================================
// ব্যাকএন্ড এপিআই ইউআরএল এখানে বসাবেন। e.g., 'http://localhost:4000/api'
const API_BASE_URL = ''; 

export default function TestimonialManager() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 📝 Form State
  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    tag: '',
    comment: '',
    rating: 5,
  });
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  // 📡 ১. FETCH: টেস্টীমোনিয়াল ডাটা লোড
  useEffect(() => {
    if (API_BASE_URL) {
      setLoading(true);
      fetch(`${API_BASE_URL}/testimonials`)
        .then(res => res.json())
        .then(data => {
          setTestimonials(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching testimonials:", err);
          setLoading(false);
        });
    } else {
      // 💾 ব্যাকএন্ড এপিআই খালি থাকলে ডেমো ডাটা
      setTestimonials([
        { 
          _id: '1', 
          name: 'Zayan Al Mansoor', 
          profession: 'CEO, TechCorp Bangladesh',
          tag: 'Flagship Villa Buyer',
          rating: 5, 
          comment: 'The architectural precision and timeline commitment were outstanding. Truly premium experience!', 
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          status: 'active' 
        },
        { 
          _id: '2', 
          name: 'Anika Rahman', 
          profession: 'Architect & Interior Designer',
          tag: 'Apartment Owner',
          rating: 4, 
          comment: 'Seamless transaction and incredible cooperation from the site managers.', 
          videoUrl: '',
          status: 'active' 
        }
      ]);
    }
  }, []);

  // 🎥 ভিডিও ফাইল সিলেক্ট ও প্রিভিউ
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  // 📤 ২. POST: Multer সাপোর্টসহ নতুন টেস্টীমোনিয়াল আপলোড
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Multipart Data প্রস্তুতকরণ
    const data = new FormData();
    data.append('name', formData.name);
    data.append('profession', formData.profession);
    data.append('tag', formData.tag);
    data.append('comment', formData.comment);
    data.append('rating', formData.rating);
    if (videoFile) {
      data.append('video', videoFile); // Multer ফিল্ড নাম 'video'
    }

    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/testimonials`, {
          method: 'POST',
          body: data, // Multer এর জন্য Headers এ Content-Type সেট করার প্রয়োজন নেই
        });
        const newTestimonial = await res.json();
        setTestimonials([newTestimonial, ...testimonials]);
      } catch (err) {
        console.error("Failed to upload testimonial:", err);
      }
    } else {
      // লোকাল স্টেট ডেমো রেসপন্স
      const dummyNew = {
        _id: Date.now().toString(),
        ...formData,
        videoUrl: videoPreview,
        status: 'active'
      };
      setTestimonials([dummyNew, ...testimonials]);
    }

    // রিসেট ও মোডাল ক্লোজ
    setSubmitting(false);
    resetForm();
    setIsModalOpen(false);
  };

  const resetForm = () => {
    setFormData({ name: '', profession: '', tag: '', comment: '', rating: 5 });
    setVideoFile(null);
    setVideoPreview('');
  };

  // 📡 ৩. PATCH: সাসপেন্ড বা একটিভ টগল
  const handleToggleStatus = async (id) => {
    const target = testimonials.find(t => (t._id || t.id) === id);
    const newStatus = target.status === 'active' ? 'suspended' : 'active';

    setTestimonials(testimonials.map(t => (t._id || t.id) === id ? { ...t, status: newStatus } : t));

    if (API_BASE_URL) {
      try {
        await fetch(`${API_BASE_URL}/testimonials/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        });
      } catch (err) { 
        console.error("Failed to update status:", err); 
      }
    }
  };

  // 📡 ৪. DELETE: ডিলিট অপারেশন
  const handleDelete = async (id) => {
    if (!confirm('আপনি কি এই টেস্টীমোনিয়ালটি স্থায়ীভাবে ডিলিট করতে চান?')) return;
    
    setTestimonials(testimonials.filter(t => (t._id || t.id) !== id));

    if (API_BASE_URL) {
      try {
        await fetch(`${API_BASE_URL}/testimonials/${id}`, { 
          method: 'DELETE' 
        });
      } catch (err) { 
        console.error("Failed to delete from server:", err); 
      }
    }
  };

  const activeCount = testimonials.filter(t => t.status === 'active').length;

  return (
    <div className="min-h-screen bg-[#f8faf9] text-gray-800 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* 🔝 হেডার ও অ্যাকশন বার */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#007b57]" />
              <h2 className="text-xl font-extrabold text-gray-900 tracking-tight uppercase">
                Client Testimonials Control
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              Manage client reviews, ratings, and video endorsements for public view.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* কাউন্টার */}
            <div className="flex items-center gap-2 bg-[#f0f7f4] border border-[#d2e8df] px-4 py-2.5 rounded-xl">
              <MessageSquare size={16} className="text-[#007b57]" />
              <div className="text-xs font-bold">
                <span className="text-[#007b57]">{activeCount} Active</span>
                <span className="text-gray-300 mx-1.5">/</span>
                <span className="text-gray-600">{testimonials.length} Total</span>
              </div>
            </div>

            {/* অ্যাডমিন টেস্টীমোনিয়াল আপলোড বাটন */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#007b57] hover:bg-[#006245] text-white text-xs font-bold px-5 py-3 rounded-xl flex items-center gap-2 shadow-sm transition-all duration-200"
            >
              <Plus size={16} /> Add New Review
            </button>
          </div>
        </div>

        {/* ⏳ লোডিং স্টেট */}
        {loading && (
          <div className="text-center py-8 text-xs text-[#007b57] font-semibold animate-pulse">
            Syncing client stream with server...
          </div>
        )}

        {/* 📋 টেস্টীমোনিয়াল কার্ড গ্রিড */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.length === 0 && !loading ? (
            <div className="col-span-full text-center py-16 bg-white border border-dashed border-gray-200 rounded-2xl">
              <p className="text-sm text-gray-400 font-medium">No testimonials uploaded yet.</p>
            </div>
          ) : (
            testimonials.map((item) => {
              const itemId = item._id || item.id;
              const isSuspended = item.status === 'suspended';

              return (
                <div 
                  key={itemId} 
                  className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden relative shadow-sm hover:shadow-md ${
                    isSuspended ? 'border-gray-200 opacity-60 bg-gray-50' : 'border-gray-100 hover:border-[#d2e8df]'
                  }`}
                >
                  {/* ভিডীও প্লেয়ার অপশন (যদি থাকে) */}
                  {item.videoUrl && (
                    <div className="relative h-44 w-full bg-black">
                      <video 
                        src={item.videoUrl} 
                        controls 
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1.5">
                        <Video size={12} className="text-[#007b57]" /> Video Review
                      </span>
                    </div>
                  )}

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      
                      {/* হেডার: নাম ও রেটিং */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 leading-snug">{item.name}</h3>
                          <p className="text-[11px] text-gray-500 font-medium">{item.profession}</p>
                          {item.tag && (
                            <span className="inline-block mt-1 bg-[#f0f7f4] text-[#007b57] text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase">
                              {item.tag}
                            </span>
                          )}
                        </div>

                        {/* স্টার ডিসপ্লে */}
                        <div className="flex text-amber-400 gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={12} 
                              fill={i < item.rating ? "currentColor" : "none"} 
                              className={i < item.rating ? "" : "text-gray-300"}
                            />
                          ))}
                        </div>
                      </div>

                      {/* রিভিউ কমেন্ট */}
                      <p className="text-xs text-gray-600 leading-relaxed italic bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                        "{item.comment}"
                      </p>
                    </div>

                    {/* অ্যাকশন কন্ট্রোল */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        isSuspended ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {item.status || 'Active'}
                      </span>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleToggleStatus(itemId)}
                          title={isSuspended ? 'Activate' : 'Suspend'}
                          className={`p-2 rounded-lg border transition-colors ${
                            isSuspended 
                              ? 'bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100' 
                              : 'bg-gray-50 text-gray-600 border-gray-200 hover:text-[#007b57] hover:border-[#007b57]'
                          }`}
                        >
                          {isSuspended ? <Eye size={14} /> : <EyeOff size={14} />}
                        </button>

                        <button 
                          onClick={() => handleDelete(itemId)}
                          title="Delete Review"
                          className="p-2 bg-gray-50 border border-gray-200 text-gray-500 hover:text-rose-600 hover:border-rose-200 rounded-lg transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* ➕ ADMIN MODAL: নতুন রিভিউ আপলোড ফর্ম */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-gray-100 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* মোডাল হেডার */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#f0f7f4] flex items-center justify-center text-[#007b57]">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Add New Endorsement</h3>
                  <p className="text-[11px] text-gray-500">Upload client review & optional video</p>
                </div>
              </div>
              <button 
                onClick={() => { setIsModalOpen(false); resetForm(); }}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* ইনপুট ফর্ম */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              
              {/* Client Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Client Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Tanvir Hossain"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#007b57] focus:ring-1 focus:ring-[#007b57]"
                />
              </div>

              {/* Profession & Tag */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Profession *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Managing Director"
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#007b57] focus:ring-1 focus:ring-[#007b57]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Tag/Category</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Plot Owner"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#007b57] focus:ring-1 focus:ring-[#007b57]"
                  />
                </div>
              </div>

              {/* ⭐ Interactive Star Rating Picker */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Rating Score *</label>
                <div className="flex items-center gap-1.5 bg-gray-50 p-2.5 rounded-xl border border-gray-200 w-fit">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star 
                        size={20} 
                        fill={(hoverRating || formData.rating) >= star ? "#f59e0b" : "none"} 
                        className={(hoverRating || formData.rating) >= star ? "text-amber-500" : "text-gray-300"}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-extrabold text-[#007b57] ml-2">
                    {formData.rating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* 🎥 Video File Upload (Multer) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Upload Video (Optional)</label>
                <div className="border-2 border-dashed border-gray-200 hover:border-[#007b57] rounded-xl p-4 text-center transition-colors bg-gray-50/50">
                  <input 
                    type="file" 
                    accept="video/*"
                    id="video-upload"
                    onChange={handleVideoChange}
                    className="hidden"
                  />
                  <label htmlFor="video-upload" className="cursor-pointer flex flex-col items-center gap-1">
                    <Upload size={20} className="text-[#007b57]" />
                    <span className="text-xs font-bold text-gray-700">Click to attach client video</span>
                    <span className="text-[10px] text-gray-400">MP4, WEBM up to 50MB</span>
                  </label>
                </div>

                {/* Video Preview */}
                {videoPreview && (
                  <div className="mt-3 relative rounded-xl overflow-hidden bg-black h-32 border border-gray-200">
                    <video src={videoPreview} controls className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => { setVideoFile(null); setVideoPreview(''); }}
                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>

              {/* Description / Review Comment */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Review Statement *</label>
                <textarea 
                  required
                  rows={3}
                  placeholder="Write the detailed testimonial comment..."
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#007b57] focus:ring-1 focus:ring-[#007b57]"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#007b57] hover:bg-[#006245] text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  {submitting ? 'Uploading to Server...' : 'Publish Testimonial'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}