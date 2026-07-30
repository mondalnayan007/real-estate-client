import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  Image as ImageIcon, 
  Trash2, 
  UploadCloud, 
  Loader2, 
  Briefcase, 
  User, 
  FileText, 
  Globe 
} from 'lucide-react';

// react-icons থেকে সোশ্যাল মিডিয়া আইকন
import { FaLinkedin, FaFacebook } from 'react-icons/fa6';

export default function TeamManagementSection() {
  // 🧑‍💻 টিম মেম্বারদের তালিকা স্টেট
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // 📝 ইনপুট ফর্ম স্টেট
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    bio: '',
    facebook: '',
    linkedin: ''
  });

  // 🖼️ ফাইল ও প্রিভিউ স্টেট
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // ==========================================
  // 🔄 1. GET ALL MEMBERS (Backend Fetch Request)
  // ==========================================
  const fetchTeamMembers = async () => {
    setFetching(true);
    try {
      // 👈 আপনার ব্যাকএন্ডের GET API URL এখানে বসান
      const response = await fetch('http://localhost:5000/api/v1/team-members'); 
      const result = await response.json();

      if (response.ok) {
        setMembers(result.data || result); // Response Structure অনুযায়ী সেট করা হয়েছে
      } else {
        console.error('Failed to fetch:', result.message);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  // 🖼️ স্থানীয় ছবি প্রিভিউ জেনারেটর
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ==========================================
  // 🚀 2. SUBMIT DATA TO BACKEND (MULTER READY)
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.designation || !formData.bio) {
      return alert('Please fill in all required fields!');
    }
    if (!imageFile) {
      return alert('Please select a member profile photo!');
    }

    setLoading(true);

    try {
      // 📦 Multer এর জন্য FormData তৈরি করা হচ্ছে
      const submitData = new FormData();
      
      // key নাম 'image' রাখা হয়েছে (Multer: upload.single('image'))
      submitData.append('image', imageFile); 
      submitData.append('name', formData.name);
      submitData.append('designation', formData.designation);
      submitData.append('bio', formData.bio);
      submitData.append('facebook', formData.facebook);
      submitData.append('linkedin', formData.linkedin);

      // 📤 Backend API Call
      // 👈 আপনার ব্যাকএন্ডের POST API URL এখানে বসান
      const response = await fetch('http://localhost:5000/api/v1/team-members', {
        method: 'POST',
        body: submitData, // FormData পাঠালে 'Content-Type' হেডার দিতে হয় না
      });

      const result = await response.json();

      if (response.ok) {
        alert('Team member added successfully!');
        
        // ফর্ম রিসেট
        setFormData({ name: '', designation: '', bio: '', facebook: '', linkedin: '' });
        setImageFile(null);
        setImagePreview(null);

        // নতুন ডাটা দিয়ে মেম্বারদের লিস্ট আপডেট
        fetchTeamMembers();
      } else {
        alert(result.message || 'Failed to save member.');
      }

    } catch (error) {
      console.error('Submission Error:', error);
      alert('Network error! Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // 🗑️ 3. DELETE MEMBER DATA
  // ==========================================
  const handleDeleteMember = async (id) => {
    if (!window.confirm('Are you sure you want to remove this member?')) return;

    try {
      // 👈 আপনার ব্যাকএন্ডের DELETE API URL এখানে বসান
      const response = await fetch(`http://localhost:5000/api/v1/team-members/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMembers(prev => prev.filter(m => m._id !== id));
      } else {
        alert('Failed to delete member.');
      }
    } catch (error) {
      console.error('Delete Error:', error);
      alert('Could not delete member.');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* 🔝 হেডার সেকশন */}
        <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl font-black uppercase tracking-wider flex items-center gap-2" style={{ color: '#185F35' }}>
              <UserPlus size={24} /> Team Member Management
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Upload team credentials and sync directly with your backend API.
            </p>
          </div>
          <div className="bg-[#185F35]/10 border border-[#185F35]/20 text-[#185F35] text-xs px-4 py-1.5 rounded-full font-bold">
            Total Members: {members.length}
          </div>
        </div>

        {/* ========================================== */}
        {/* ✍️ ১. মেম্বার ডাটা আপলোড ফর্ম */}
        {/* ========================================== */}
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#185F35]">
              Add New Member
            </h3>
            <span className="text-[10px] text-slate-400 font-semibold">* Required Fields</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* 🖼️ ছবি আপলোড বাক্স */}
            <div className="md:col-span-4 flex flex-col">
              <label className="text-[11px] uppercase font-bold text-slate-600 mb-2 flex items-center gap-1">
                <ImageIcon size={13} className="text-[#185F35]" /> Profile Photo *
              </label>
              
              <div className="relative flex-1 min-h-[220px] bg-slate-50 border-2 border-dashed border-slate-200 hover:border-[#185F35] rounded-xl flex flex-col items-center justify-center p-4 transition-all group overflow-hidden">
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="text-xs font-bold text-white bg-[#185F35] px-3 py-1.5 rounded-lg flex items-center gap-1 shadow">
                        <UploadCloud size={14} /> Change Photo
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-center space-y-2 pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-400 group-hover:text-[#185F35] transition-colors">
                      <UploadCloud size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-700">Click to upload photo</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, WEBP up to 5MB</p>
                    </div>
                  </div>
                )}

                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* 📝 টেক্সট ইনপুট সেকশন */}
            <div className="md:col-span-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="text-[11px] uppercase font-bold text-slate-600 mb-1 flex items-center gap-1">
                    <User size={13} className="text-[#185F35]" /> Full Name *
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#185F35] focus:bg-white transition-all"
                    required
                  />
                </div>

                {/* Designation */}
                <div>
                  <label className="text-[11px] uppercase font-bold text-slate-600 mb-1 flex items-center gap-1">
                    <Briefcase size={13} className="text-[#185F35]" /> Designation / Role *
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Senior Real Estate Consultant"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#185F35] focus:bg-white transition-all"
                    required
                  />
                </div>
              </div>

              {/* Bio Description */}
              <div>
                <label className="text-[11px] uppercase font-bold text-slate-600 mb-1 flex items-center gap-1">
                  <FileText size={13} className="text-[#185F35]" /> Brief Description / Bio *
                </label>
                <textarea 
                  rows="3"
                  placeholder="Write a short summary about this team member..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-[#185F35] focus:bg-white transition-all resize-none"
                  required
                />
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <input 
                    type="url" 
                    placeholder="Facebook Profile URL (Optional)"
                    value={formData.facebook}
                    onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-[#185F35] focus:bg-white"
                  />
                </div>
                <div>
                  <input 
                    type="url" 
                    placeholder="LinkedIn Profile URL (Optional)"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-[#185F35] focus:bg-white"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-3 border-t border-slate-100">
            <button 
              type="submit" 
              disabled={loading}
              style={{ backgroundColor: loading ? '#0e3920' : '#185F35' }}
              className="hover:opacity-95 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md shadow-[#185F35]/20 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Saving Data...
                </>
              ) : (
                <>
                  <UploadCloud size={16} /> Save Team Member
                </>
              )}
            </button>
          </div>
        </form>

        {/* ========================================== */}
        {/* 👥 ২. মেম্বার কার্ড প্রিভিউ */}
        {/* ========================================== */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-xs font-black uppercase text-slate-700 tracking-wider">
              Active Team Roster
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">Synced with Backend</span>
          </div>

          {fetching ? (
            <div className="text-center py-12 text-slate-400 flex items-center justify-center gap-2">
              <Loader2 className="animate-spin text-[#185F35]" size={18} /> Fetching Agents...
            </div>
          ) : members.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-400 text-xs">
              No team members found. Fill out the form above to register members.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member) => (
                <div 
                  key={member._id}
                  className="bg-white border border-slate-200/90 hover:border-[#185F35]/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Member Image Container */}
                    <div className="relative h-52 bg-slate-100 overflow-hidden">
                      <img 
                        src={member.imageUrl || member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                      
                      {/* Delete Button */}
                      <button 
                        onClick={() => handleDeleteMember(member._id)}
                        className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-rose-600 text-slate-600 hover:text-white rounded-xl backdrop-blur-md shadow-sm transition-colors"
                        title="Remove Member"
                      >
                        <Trash2 size={14} />
                      </button>

                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <h4 className="text-base font-bold drop-shadow-sm">
                          {member.name}
                        </h4>
                        <p className="text-xs font-semibold text-emerald-300">
                          {member.designation}
                        </p>
                      </div>
                    </div>

                    {/* Member Bio */}
                    <div className="p-4">
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-slate-400">
                    <span className="text-[10px] font-mono text-slate-400">ID: #{member._id?.slice(-5)}</span>
                    
                    <div className="flex items-center gap-2.5">
                      {member.facebook && (
                        <a href={member.facebook} target="_blank" rel="noreferrer" className="hover:text-[#185F35] transition-colors">
                          <FaFacebook size={14} />
                        </a>
                      )}
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#185F35] transition-colors">
                          <FaLinkedin size={14} />
                        </a>
                      )}
                      {!member.facebook && !member.linkedin && (
                        <Globe size={14} className="opacity-30" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}