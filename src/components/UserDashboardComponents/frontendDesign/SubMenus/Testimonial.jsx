import React, { useState, useEffect } from 'react';
import { Star, Trash2, EyeOff, Eye, MessageSquare } from 'lucide-react';

// ==========================================
// 🌐 TESTIMONIAL BACKEND CONFIGURATION
// ==========================================
// ব্যাকএন্ড রেডি হলে নিচে আপনার এপিআই ইউআরএল বসিয়ে দিবেন। e.g., 'http://localhost:5000/api'
const API_BASE_URL = ''; 

export default function TestimonialManager() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);

  // 📡 ১. FETCH: ডাটাবেস থেকে সব টেস্টীমোনিয়াল নিয়ে আসার ফাংশন (GET)
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
      // 💾 ব্যাকএন্ড না থাকলে ফলব্যাক ডেমো ডাটা
      setTestimonials([
        { 
          id: 1, 
          name: 'Zayan Al Mansoor', 
          rating: 5, 
          comment: 'Phenomenal transaction flow handled by the dynamic deployment network.', 
          status: 'active' 
        },
        { 
          id: 2, 
          name: 'Anika Rahman', 
          rating: 4, 
          comment: 'Excellent UI/UX and super fast response from the core support modules.', 
          status: 'active' 
        }
      ]);
    }
  }, []);

  // 📡 ২. PATCH: টেস্টীমোনিয়াল সাসপেন্ড বা একটিভ টগল করার ফাংশন
  const handleToggleStatus = async (id) => {
    const target = testimonials.find(t => t.id === id);
    const newStatus = target.status === 'active' ? 'suspended' : 'active';

    // ফ্রন্টএন্ড স্টেট সাথে সাথে আপডেট (Instant UI Response)
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, status: newStatus } : t));

    if (API_BASE_URL) {
      try {
        await fetch(`${API_BASE_URL}/testimonials/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        });
      } catch (err) { 
        console.error("Failed to update status on server:", err); 
      }
    }
  };

  // 📡 ৩. DELETE: ডাটাবেস থেকে স্থায়ীভাবে মুছে ফেলার ফাংশন
  const handleDelete = async (id) => {
    if (!confirm('আপনি কি এই টেস্টীমোনিয়ালটি স্থায়ীভাবে ডিলিট করতে চান?')) return;
    
    // ফ্রন্টএন্ড স্টেট থেকে রিমুভ
    setTestimonials(testimonials.filter(t => t.id !== id));

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

  // 📊 একটিভ টেস্টীমোনিয়াল কাউন্ট করার জন্য
  const activeCount = testimonials.filter(t => t.status === 'active').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200 min-h-screen bg-[#020617] text-slate-100 p-6">
      
      {/* 🔝 হেডার এবং লাইভ কাউন্টার স্ট্রিম */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-wide">Client Endorsement Stream</h2>
          <p className="text-xs text-slate-400">Manage social proof reviews and credentials sent by buyers.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800/80 px-4 py-2.5 rounded-xl self-start sm:self-center">
          <MessageSquare size={14} className="text-rose-500" />
          <div className="text-xs font-bold">
            <span className="text-white">{activeCount} Active</span>
            <span className="text-slate-600 mx-1.5">/</span>
            <span className="text-slate-400">{testimonials.length} Total</span>
          </div>
        </div>
      </div>

      {/* ⏳ লোডিং স্টেট */}
      {loading && (
        <div className="text-xs text-slate-500 italic animate-pulse">Syncing with database server...</div>
      )}

      {/* 📋 রিভিউ গ্রিড লিস্ট */}
      <div className="grid gap-4 sm:grid-cols-2 max-w-4xl">
        {testimonials.length === 0 && !loading ? (
          <div className="col-span-2 text-center py-12 bg-slate-900/20 border border-dashed border-slate-800 rounded-2xl">
            <p className="text-xs text-slate-500 font-medium">No testimonials found in the stream.</p>
          </div>
        ) : (
          testimonials.map((item) => (
            <div 
              key={item.id} 
              className={`bg-slate-900 border p-5 rounded-2xl space-y-3 flex flex-col justify-between transition-all relative overflow-hidden ${
                item.status === 'suspended' 
                  ? 'border-transparent opacity-40 bg-slate-950/40' 
                  : 'border-slate-800 hover:border-slate-700 shadow-md'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-white tracking-wide">{item.name}</span>
                    {item.status === 'suspended' && (
                      <span className="text-[9px] font-black uppercase tracking-wider bg-red-950/40 text-red-400 px-1.5 py-0.5 rounded border border-red-900/30">
                        Suspended
                      </span>
                    )}
                  </div>
                  
                  {/* রেটিং স্টার জেনারেটর */}
                  <div className="flex text-amber-500 gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={10} fill="currentColor" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-400 italic leading-relaxed">
                  "{item.comment}"
                </p>
              </div>

              {/* 🛠️ অ্যাকশন বাটন কন্ট্রোল */}
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800/40">
                {/* সাসপেন্ড টগল বাটন */}
                <button 
                  onClick={() => handleToggleStatus(item.id)}
                  title={item.status === 'active' ? 'Suspend Review' : 'Activate Review'}
                  className={`p-2 rounded-lg border text-xs font-bold transition-colors ${
                    item.status === 'active' 
                      ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-amber-400' 
                      : 'bg-amber-950/20 border-amber-900/30 text-amber-400'
                  }`}
                >
                  {item.status === 'active' ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>

                {/* ডিলিট বাটন */}
                <button 
                  onClick={() => handleDelete(item.id)}
                  title="Delete Review"
                  className="p-2 bg-slate-950 border border-slate-800 text-slate-500 hover:text-red-400 hover:border-red-900/40 rounded-lg transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}