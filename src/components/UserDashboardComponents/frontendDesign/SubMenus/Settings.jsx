import React, { useState, useEffect, use } from 'react';
import { Save, Upload } from 'lucide-react';
import AgentContext from '../../../../context/AgentContext';

export default function Settings() {
  const { user } = use(AgentContext);
  console.log(user?.agentId);

  const hostname = window.location.hostname;
  const subdomain = hostname.split('.')[0];

  const initialFormState = {
    brandName: '',
    title: '',
    email: '',
    phone: '',
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
    domain: subdomain,
    agentId: user?.agentId || ''
  };

  const [formData, setFormData] = useState(initialFormState);

  const [logoPreview, setLogoPreview] = useState(null);
  const [favIconPreview, setFavIconPreview] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataPayload = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        dataPayload.append(key, formData[key]);
      }
    });

    fetch("/backend/settings", {
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

        setFormData(initialFormState);
        setLogoPreview(null);
        setFavIconPreview(null);
      })
      .catch((error) => {
        console.error("Error saving config to backend:", error);
        alert("Failed to synchronise configuration.");
      });
  };

  const labelStyle = "text-[10px] uppercase font-black tracking-wider text-slate-500 block mb-1.5";
  const inputStyle = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-slate-800 outline-none transition-all duration-200 focus:bg-white focus:border-[#007b57] focus:ring-4 focus:ring-[#007b57]/10 shadow-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200 pb-16 text-slate-800">

      {/* হেডার গ্রুপ */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Website Engine Configuration</h2>
          <p className="text-xs font-medium text-slate-500 mt-0.5">Complete frontend branding, metadata alignment, layout styling, and social directory mapping.</p>
        </div>
        <button type="submit" className="bg-[#007b57] hover:bg-[#006346] text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-[#007b57]/20 shrink-0">
          <Save size={15} /> Save Config
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* কলাম ১: কোর ওয়েবসাইট সেটিংস */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
          <h3 className="text-xs font-black uppercase text-[#007b57] tracking-wider mb-2 border-b border-slate-100 pb-3">🌐 Core Architecture Settings</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelStyle}>Brand Name</label>
              <input type="text" name="brandName" value={formData.brandName} onChange={handleChange} placeholder="e.g. Premium Real Estate Engine" className={inputStyle} required />
            </div>
            <div>
              <label className={labelStyle}>Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. premium-estate" className={inputStyle} required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelStyle}>Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g. info@yourdomain.com" className={inputStyle} required />
            </div>
            <div>
              <label className={labelStyle}>Phone *</label>
              <input type="number" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. +8801********" className={inputStyle} required />
            </div>
          </div>

          <div>
            <label className={labelStyle}>Working Hours *</label>
            <textarea name="workingHours" value={formData.workingHours} onChange={handleChange} placeholder="e.g. Mon To Fri - 09AM - 06PM, Weekend Closed" rows={2} className={inputStyle} required />
          </div>

          {/* মিডিয়া আপলোডার নোড উইথ লাইভ প্রিভিউ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="border border-dashed border-slate-300 p-4 rounded-2xl flex items-center justify-between bg-slate-50/60">
              <div className="flex items-center gap-3">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo Preview" className="w-10 h-10 object-contain rounded-xl bg-white p-1 border border-slate-200 shadow-sm" />
                ) : null}
                <div>
                  <label className={labelStyle}>Logo Asset *</label>
                  <p className="text-[10px] font-medium text-slate-400">Corporate image nodule</p>
                </div>
              </div>
              <label className="bg-slate-900 hover:bg-slate-800 p-2.5 rounded-xl cursor-pointer transition-colors text-white shadow-sm">
                <Upload size={15} />
                <input type="file" onChange={(e) => handleFileChange(e, 'logo')} className="hidden" accept="image/*" />
              </label>
            </div>

            <div className="border border-dashed border-slate-300 p-4 rounded-2xl flex items-center justify-between bg-slate-50/60">
              <div className="flex items-center gap-3">
                {favIconPreview ? (
                  <img src={favIconPreview} alt="FavIcon Preview" className="w-10 h-10 object-contain rounded-xl bg-white p-1 border border-slate-200 shadow-sm" />
                ) : null}
                <div>
                  <label className={labelStyle}>Fav Icon *</label>
                  <p className="text-[10px] font-medium text-slate-400">Shortcut icon vector</p>
                </div>
              </div>
              <label className="bg-slate-900 hover:bg-slate-800 p-2.5 rounded-xl cursor-pointer transition-colors text-white shadow-sm">
                <Upload size={15} />
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
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
          <h3 className="text-xs font-black uppercase text-[#007b57] tracking-wider mb-2 border-b border-slate-100 pb-3">📝 Typography & Content</h3>
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

      {/* রো ৩: সোশ্যাল ডিরেক্টরি */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
          <h3 className="text-xs font-black uppercase text-[#007b57] tracking-wider mb-2 border-b border-slate-100 pb-3">🔗 Social Graph Endpoints</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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