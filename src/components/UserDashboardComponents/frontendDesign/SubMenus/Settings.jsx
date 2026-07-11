import React, { useState, useEffect } from 'react';
import { Save, Upload } from 'lucide-react';


// ফর্মে রি-ইউজেবল ইনিশিয়াল স্টেট ডেফিনিশন


export default function Settings() {
  const hostname = window.location.hostname;
const subdomain = hostname.split('.')[0];


  const initialFormState = {
  brandName: '',
  title: '',
  email: '',
  workingHours: '',
  logo: null,
  favIcon: null,
  address: '',
  footerAboutText: '',
  copyrightText: '',
  facebookUrl: '',
  twitterUrl: '',
  youtubeUrl: '',
  linkedinUrl: '',
  pinterestUrl: '',
  instagramUrl: '',
  domain:subdomain
  
};
  // 📦 ব্যাকএন্ড ফ্রেন্ডলি স্টেট অবজেক্ট (ডিফল্ট ব্ল্যাঙ্ক রাখা হয়েছে)
  const [formData, setFormData] = useState(initialFormState);

  // 🖼️ ইমেজ প্রিভিউ ইউআরএল ট্র্যাকিং স্টেট
  const [logoPreview, setLogoPreview] = useState(null);
  const [favIconPreview, setFavIconPreview] = useState(null);

  // 🌐 ১. BACKEND API: ডাটাবেজ থেকে সেটিংস ডাটা তুলে আনার জন্য (GET Request)
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // 🛠️ আপনার আসল API কল করার জন্য নিচের কমেন্টগুলো খুলে দিন:
        /*
        const response = await axios.get('YOUR_BACKEND_GET_API_URL');
        if (response.data) {
          setFormData({
            ...response.data,
            logo: null,    
            favIcon: null  
          });
          if (response.data.logo) setLogoPreview(response.data.logo);
          if (response.data.favIcon) setFavIconPreview(response.data.favIcon);
        }
        */
      } catch (error) {
        console.error("Error loading settings from backend:", error);
      }
    };
    fetchSettings();
  }, []);

  // 🔄 জেনেরিক হ্যান্ডলার (ইনপুট চেঞ্চ ট্র্যাকিং)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 📁 ফাইল আপলোড হ্যান্ডলার (লোগো এবং ফেভআইকন এর জন্য উইথ লাইভ প্রিভিউ)
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [fieldName]: file }));

      const previewUrl = URL.createObjectURL(file);
      if (fieldName === 'logo') {
        setLogoPreview(previewUrl);
      } else if (fieldName === 'favIcon') {
        setFavIconPreview(previewUrl);
      }
    }
  };

  // 🚀 ২. BACKEND API: ফর্ম ডাটাবেজে সেভ করার জন্য (POST / PUT Request)
  const handleSubmit = (e) => {
    e.preventDefault();

    const dataPayload = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        dataPayload.append(key, formData[key]);
      }
    });

    fetch("http://localhost:4000/settings", {
      method: "POST",
      body: dataPayload,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save settings");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Successfully saved to backend payload:", data);

        alert("Global configuration successfully saved to the backend database!");

        // সফল সাবমিট হওয়ার পর ফর্ম রিসেট
        setFormData(initialFormState);
        setLogoPreview(null);
        setFavIconPreview(null);
      })
      .catch((error) => {
        console.error("Error saving config to backend:", error);
        alert("Failed to synchronise configuration.");
      });
  };

  const labelStyle = "text-[10px] uppercase font-bold text-slate-400 block mb-1";
  const inputStyle = "w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200 pb-16">

      {/* হেডার গ্রুপ */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-4">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-tight">Website Engine Configuration</h2>
          <p className="text-xs text-slate-400">Complete frontend branding, metadata alignment, layout styling, and social directory mapping.</p>
        </div>
        <button type="submit" className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-rose-600/10 shrink-0">
          <Save size={14} /> Save Config
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* কলাম ১: কোর ওয়েবসাইট সেটিংস */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800/80 rounded-2xl p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase text-rose-500 tracking-wider mb-2 border-b border-slate-800 pb-2">🌐 Core Architecture Settings</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Brand Name</label>
              <input type="text" name="brandName" value={formData.brandName} onChange={handleChange} placeholder="e.g. Premium Real Estate Engine" className={inputStyle} required />
            </div>
            <div>
              <label className={labelStyle}>Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. premium-estate" className={inputStyle} required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}> Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g. info@yourdomain.com" className={inputStyle} required />
            </div>
          </div>

          <div>
            <label className={labelStyle}>Working Hours *</label>
            <textarea name="workingHours" value={formData.workingHours} onChange={handleChange} placeholder="e.g. Mon To Fri - 09AM - 06PM, Weekend Closed" rows={2} className={inputStyle} required />
          </div>

          {/* মিডিয়া আপলোডার নোড উইথ লাইভ প্রিভিউ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-dashed border-slate-800 p-4 rounded-xl flex items-center justify-between bg-slate-950/40">
              <div className="flex items-center gap-3">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo Preview" className="w-9 h-9 object-contain rounded bg-slate-950 p-1 border border-slate-800" />
                ) : null}
                <div>
                  <label className={labelStyle}>Logo Asset *</label>
                  <p className="text-[10px] text-slate-500">Corporate image nodule</p>
                </div>
              </div>
              <label className="bg-slate-800 hover:bg-slate-700 p-2.5 rounded-lg cursor-pointer transition-colors text-white">
                <Upload size={14} />
                <input type="file" onChange={(e) => handleFileChange(e, 'logo')} className="hidden" accept="image/*" />
              </label>
            </div>

            <div className="border border-dashed border-slate-800 p-4 rounded-xl flex items-center justify-between bg-slate-950/40">
              <div className="flex items-center gap-3">
                {favIconPreview ? (
                  <img src={favIconPreview} alt="FavIcon Preview" className="w-9 h-9 object-contain rounded bg-slate-950 p-1 border border-slate-800" />
                ) : null}
                <div>
                  <label className={labelStyle}>Fav Icon *</label>
                  <p className="text-[10px] text-slate-500">Shortcut icon vector</p>
                </div>
              </div>
              <label className="bg-slate-800 hover:bg-slate-700 p-2.5 rounded-lg cursor-pointer transition-colors text-white">
                <Upload size={14} />
                <input type="file" onChange={(e) => handleFileChange(e, 'favIcon')} className="hidden" accept="image/*" />
              </label>
            </div>
          </div>

          <div>
            <label className={labelStyle}>Address *</label>
            <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Enter company physical address..." rows={2} className={inputStyle} required />
          </div>

          
        </div>

        {/* কলাম ২: থিম অপশন ও কন্টাক্ট নোড */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase text-rose-500 tracking-wider mb-2 border-b border-slate-800 pb-2">📝 Typography Typography</h3>
          <div>
            <label className={labelStyle}>Footer About Text *</label>
            <textarea name="footerAboutText" value={formData.footerAboutText} onChange={handleChange} placeholder="Enter summary paragraph for website footer..." rows={3} className={inputStyle} required />
          </div>
          <div>
            <label className={labelStyle}>Copyright Text *</label>
            <textarea name="copyrightText" value={formData.copyrightText} onChange={handleChange} placeholder="e.g. Copyright &copy; 2026 Brand. All Rights Reserved." rows={2} className={inputStyle} required />
          </div>
        </div>

      </div>

      {/* রো ৩: ফুটার ডেসক্রিপশন এবং সোশ্যাল ডিরেক্টরি */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* সোশ্যাল ডিরেক্টরি ইনপুটস */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800/80 rounded-2xl p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase text-rose-500 tracking-wider mb-2 border-b border-slate-800 pb-2">🔗 Social Graph Endpoints</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Facebook Url</label>
              <input type="url" name="facebookUrl" value={formData.facebookUrl} onChange={handleChange} placeholder="https://facebook.com/yourpage" className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Twitter Url</label>
              <input type="url" name="twitterUrl" value={formData.twitterUrl} onChange={handleChange} placeholder="https://twitter.com/yourhandle" className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Youtube Url</label>
              <input type="url" name="youtubeUrl" value={formData.youtubeUrl} onChange={handleChange} placeholder="https://youtube.com/c/yourchannel" className={inputStyle} />
            </div>

            <div>
              <label className={labelStyle}>Linkedin Url</label>
              <input type="url" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange} placeholder="https://linkedin.com/company/yourcompany" className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Pinterest Url</label>
              <input type="url" name="pinterestUrl" value={formData.pinterestUrl} onChange={handleChange} placeholder="https://pinterest.com/yourprofile" className={inputStyle} />
            </div>
            <div className="md:col-span-2">
              <label className={labelStyle}>Instagram Url</label>
              <input type="url" name="instagramUrl" value={formData.instagramUrl} onChange={handleChange} placeholder="https://instagram.com/yourprofile" className={inputStyle} />
            </div>
          </div>
        </div>
      </div>

    </form>
  );
}