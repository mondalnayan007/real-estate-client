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

// 2. সোশ্যাল মিডিয়া ব্র্যান্ড আইকনগুলো react-icons থেকে নিন
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
  // 🔄 1. GET ALL MEMBERS (Backend Fetching)
  // ==========================================
  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    setFetching(true);
    try {
      // API Call simulation
      setTimeout(() => {
        setMembers([
          {
            _id: '1',
            name: 'Alex Rivera',
            designation: 'Lead Architect & Designer',
            bio: 'Passionate about modern minimalism and sustainable building architectures.',
            imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
            social: { facebook: 'https://facebook.com', linkedin: 'https://linkedin.com' }
          }
        ]);
        setFetching(false);
      }, 500);

    } catch (error) {
      console.error('Error fetching members:', error);
      setFetching(false);
    }
  };

  // 🖼️ স্থানীয় ছবি প্রিভিউ জেনারেটর
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ☁️ Cloudinary Upload Helper Function
  const uploadToCloudinary = async (file) => {
    const cloudName = 'YOUR_CLOUDINARY_CLOUD_NAME'; // 👈 আপনার Cloudinary Cloud Name বসান
    const uploadPreset = 'YOUR_UNSIGNED_UPLOAD_PRESET'; // 👈 আপনার Upload Preset বসান

    const cloudinaryData = new FormData();
    cloudinaryData.append('file', file);
    cloudinaryData.append('upload_preset', uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: cloudinaryData,
    });

    if (!res.ok) throw new Error('Cloudinary upload failed!');
    const data = await res.json();
    return data.secure_url; // Cloudinary Hosted Image URL
  };

  // ==========================================
  // 🚀 2. SUBMIT / UPLOAD MEMBER DATA
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.designation || !formData.bio) {
      return alert('Please fill in all required fields!');
    }
    if (!imageFile) {
      return alert('Please upload a member profile photo!');
    }

    setLoading(true);

    try {
      // Step A: Upload Image to Cloudinary
      const uploadedImageUrl = await uploadToCloudinary(imageFile);

      // Step B: Prepare Final Data Payload
      const payload = {
        name: formData.name,
        designation: formData.designation,
        bio: formData.bio,
        imageUrl: uploadedImageUrl,
        social: {
          facebook: formData.facebook,
          linkedin: formData.linkedin,
        }
      };

      // Step C: Send Payload to Backend API
      /*
      const response = await fetch('/api/v1/team-members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const newMemberData = await response.json();
      */

      // Demo State Update
      setMembers(prev => [{ ...payload, _id: Date.now().toString() }, ...prev]);

      alert('Team member added successfully!');
      
      // Reset Form State
      setFormData({ name: '', designation: '', bio: '', facebook: '', linkedin: '' });
      setImageFile(null);
      setImagePreview(null);

    } catch (error) {
      console.error('Submission Error:', error);
      alert('Failed to upload team member data. Make sure Cloudinary credentials are valid.');
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
      // API call placeholder
      setMembers(prev => prev.filter(m => m._id !== id));
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
              Upload team credentials, manage roles, and host images seamlessly via Cloudinary.
            </p>
          </div>
          <div className="bg-[#185F35]/10 border border-[#185F35]/20 text-[#185F35] text-xs px-4 py-1.5 rounded-full font-bold">
            Total Members: {members.length}
          </div>
        </div>

        {/* ========================================== */}
        {/* ✍️ ১. মেম্বার ডাটা আপলোড ফর্ম (WHITE THEME) */}
        {/* ========================================== */}
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#185F35]">
              Add New Member
            </h3>
            <span className="text-[10px] text-slate-400 font-semibold">* Required Fields</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* 🖼️ ছবি আপলোড বাক্স (4 Columns) */}
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

            {/* 📝 টেক্সট ইনপুট সেকশন (8 Columns) */}
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

              {/* Social Links (Optional) */}
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
                  <Loader2 size={16} className="animate-spin" /> Uploading to Cloudinary...
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
        {/* 👥 ২. মেম্বার কার্ড প্রিভিউ (PREMIUM LIGHT CARDS) */}
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
              <Loader2 className="animate-spin text-[#185F35]" size={18} /> Loading Team Data...
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
                        src={member.imageUrl} 
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
                    <span className="text-[10px] font-mono text-slate-400">ID: #{member._id.slice(-5)}</span>
                    
                    <div className="flex items-center gap-2.5">
                      {member.social?.facebook && (
                        <a href={member.social.facebook} target="_blank" rel="noreferrer" className="hover:text-[#185F35] transition-colors">
                          <Facebook size={14} />
                        </a>
                      )}
                      {member.social?.linkedin && (
                        <a href={member.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#185F35] transition-colors">
                          <Linkedin size={14} />
                        </a>
                      )}
                      {!member.social?.facebook && !member.social?.linkedin && (
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