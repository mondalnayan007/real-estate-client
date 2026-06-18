import React, { useState } from 'react';
import { Save, Upload } from 'lucide-react';

export default function Settings() {
  // 📦 ব্যাকএন্ড ফ্রেন্ডলি সিঙ্গেল স্টেট অবজেক্ট (স্ক্রিনশটের সব ফিল্ড এখানে রেডি)
  const [formData, setFormData] = useState({
    // Screenshot 2026-06-19 014539.png এর ফিল্ডসমূহ
    cmsTitle: 'Icon School Management System With CMS',
    cmsUrlAlias: 'Iconschool',
    cmsFrontend: 'Enabled',
    onlineAdmission: 'Enabled',
    receiveEmailTo: 'Info@example.com',
    captchaStatus: 'Disable',
    workingHours: '<span>Hours : </span> Mon To Fri - 10AM - 04PM, Sunday Closed',
    logo: null,
    favIcon: null,
    address: '3470 Geraldine Lane, New York',
    googleAnalytics: '',

    // Screenshot 2026-06-19 014559.png এর ফিল্ডসমূহ
    primaryColor: '#ff685c',
    menuBgColor: '#ffffff',
    buttonHoverColor: '#f04133',
    textColor: '#232323',
    textSecondaryColor: '#383838',
    footerBgColor: '#383838',
    footerTextColor: '#8d8d8d',
    copyrightBgColor: '#262626',
    copyrightTextColor: '#8d8d8d',
    borderRadius: '0',
    mobileNo: '+1-954-648-1802',
    email: 'info@demo.com',
    fax: '001 - 785 987 1234',
    footerAboutText: 'If you are going to use a passage Lorlsum, you anythirassing hidden in the middle of text. Lators on the Internet tend to.',

    // Screenshot 2026-06-19 014622.png এর ফিল্ডসমূহ
    copyrightText: 'Copyright &copy; 2026 <span>Ramom</span>. All Rights Reserved.',
    facebookUrl: 'https://facebook.com',
    twitterUrl: 'https://twitter.com',
    youtubeUrl: 'https://youtube.com',
    googlePlus: 'https://google.com',
    linkedinUrl: 'https://linkedin.com',
    pinterestUrl: 'https://pinterest.com',
    instagramUrl: 'https://instagram.com',
  });

  // 🔄 জেনেরিক হ্যান্ডলার (ইনপুট চেঞ্জ ট্র্যাকিং)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 📁 ফাইল আপলোড হ্যান্ডলার (লোগো এবং ফেভআইকন এর জন্য)
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [fieldName]: file }));
    }
  };

  // 🚀 ব্যাকএন্ড সাবমিট ফাংশন
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Backend Ready Payload:', formData);
    alert('Settings form logged to console! Ready for your API fetch() call.');
    // এখানে আপনার axios.post('/api/settings', formData) চলে যাবে সরাসরি
  };

  // স্টাইল হেল্পার ম্যাক্রো
  const labelStyle = "text-[10px] uppercase font-bold text-slate-400 block mb-1";
  const inputStyle = "w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-6浏览 animate-in fade-in duration-200 pb-16">
      
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
        
        {/* কলাম ১: কোর ওয়েবসাইট সেটিংস (Screenshot 1) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800/80 rounded-2xl p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase text-rose-500 tracking-wider mb-2 border-b border-slate-800 pb-2">🌐 Core Architecture Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Cms Title *</label>
              <input type="text" name="cmsTitle" value={formData.cmsTitle} onChange={handleChange} className={inputStyle} required />
            </div>
            <div>
              <label className={labelStyle}>Cms Url Alias *</label>
              <input type="text" name="cmsUrlAlias" value={formData.cmsUrlAlias} onChange={handleChange} className={inputStyle} required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* রেডিয়াল/টগল বাটন গ্রুপ */}
            <div>
              <label className={labelStyle}>Cms Frontend *</label>
              <div className="flex gap-4 mt-2">
                {['Enabled', 'Disabled'].map((status) => (
                  <label key={status} className="flex items-center gap-2 text-xs text-white cursor-pointer">
                    <input type="radio" name="cmsFrontend" value={status} checked={formData.cmsFrontend === status} onChange={handleChange} className="accent-rose-500" /> {status}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelStyle}>Online Admission *</label>
              <div className="flex gap-4 mt-2">
                {['Enabled', 'Disabled'].map((status) => (
                  <label key={status} className="flex items-center gap-2 text-xs text-white cursor-pointer">
                    <input type="radio" name="onlineAdmission" value={status} checked={formData.onlineAdmission === status} onChange={handleChange} className="accent-rose-500" /> {status}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Receive Email To *</label>
              <input type="email" name="receiveEmailTo" value={formData.receiveEmailTo} onChange={handleChange} className={inputStyle} required />
            </div>
            <div>
              <label className={labelStyle}>Captcha Status *</label>
              <select name="captchaStatus" value={formData.captchaStatus} onChange={handleChange} className={`${inputStyle} appearance-none`}>
                <option value="Enable">Enable</option>
                <option value="Disable">Disable</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelStyle}>Working Hours *</label>
            <textarea name="workingHours" value={formData.workingHours} onChange={handleChange} rows={2} className={inputStyle} required />
          </div>

          {/* মিডিয়া আপলোডার নোড */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-dashed border-slate-800 p-4 rounded-xl flex items-center justify-between bg-slate-950/40">
              <div>
                <label className={labelStyle}>Logo Asset *</label>
                <p className="text-[10px] text-slate-500">Corporate image nodule</p>
              </div>
              <label className="bg-slate-800 hover:bg-slate-700 p-2.5 rounded-lg cursor-pointer transition-colors text-white"><Upload size={14} /><input type="file" onChange={(e) => handleFileChange(e, 'logo')} className="hidden" accept="image/*" /></label>
            </div>
            <div className="border border-dashed border-slate-800 p-4 rounded-xl flex items-center justify-between bg-slate-950/40">
              <div>
                <label className={labelStyle}>Fav Icon *</label>
                <p className="text-[10px] text-slate-500">Shortcut icon vector</p>
              </div>
              <label className="bg-slate-800 hover:bg-slate-700 p-2.5 rounded-lg cursor-pointer transition-colors text-white"><Upload size={14} /><input type="file" onChange={(e) => handleFileChange(e, 'favIcon')} className="hidden" accept="image/*" /></label>
            </div>
          </div>

          <div>
            <label className={labelStyle}>Address *</label>
            <textarea name="address" value={formData.address} onChange={handleChange} rows={2} className={inputStyle} required />
          </div>

          <div>
            <label className={labelStyle}>Google Analytics</label>
            <textarea name="googleAnalytics" value={formData.googleAnalytics} onChange={handleChange} placeholder="Paste your tracker script tags here..." rows={2} className={inputStyle} />
          </div>
        </div>

        {/* কলাম ২: থিম অপশন ও কন্টাক্ট নোড (Screenshot 2) */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase text-rose-500 tracking-wider mb-2 border-b border-slate-800 pb-2">🎨 Custom Theme Options</h3>
            
            {/* ডাইনামিক কালার ম্যাপিং লুপ */}
            {[
              { label: 'Primary Color *', name: 'primaryColor' },
              { label: 'Menu BG Color *', name: 'menuBgColor' },
              { label: 'Button Hover Color *', name: 'buttonHoverColor' },
              { label: 'Text Color *', name: 'textColor' },
              { label: 'Footer BG Color *', name: 'footerBgColor' },
            ].map((colorField) => (
              <div key={colorField.name} className="flex items-center justify-between gap-4 bg-slate-950/40 p-2 rounded-xl border border-slate-800/40">
                <label className="text-[11px] font-medium text-slate-300">{colorField.label}</label>
                <div className="flex items-center gap-2">
                  <input type="text" name={colorField.name} value={formData[colorField.name]} onChange={handleChange} className="bg-transparent text-right text-xs text-slate-400 focus:outline-none w-20 font-mono" />
                  <input type="color" name={colorField.name} value={formData[colorField.name]} onChange={handleChange} className="w-6 h-6 rounded-md cursor-pointer border-0 bg-transparent" />
                </div>
              </div>
            ))}

            <div>
              <label className={labelStyle}>Border Radius *</label>
              <input type="number" name="borderRadius" value={formData.borderRadius} onChange={handleChange} className={inputStyle} required />
            </div>
          </div>

          {/* কন্টাক্ট সাব-মডিউল */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase text-rose-500 tracking-wider mb-2 border-b border-slate-800 pb-2">📞 Communication Nodes</h3>
            <div>
              <label className={labelStyle}>Mobile No *</label>
              <input type="text" name="mobileNo" value={formData.mobileNo} onChange={handleChange} className={inputStyle} required />
            </div>
            <div>
              <label className={labelStyle}>Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputStyle} required />
            </div>
            <div>
              <label className={labelStyle}>Fax *</label>
              <input type="text" name="fax" value={formData.fax} onChange={handleChange} className={inputStyle} required />
            </div>
          </div>
        </div>

      </div>

      {/* রো ৩: ফুটার ডেসক্রিপশন এবং সোশ্যাল ডিরেক্টরি (Screenshot 2 & 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase text-rose-500 tracking-wider mb-2 border-b border-slate-800 pb-2">📝 Typography Typography</h3>
          <div>
            <label className={labelStyle}>Footer About Text *</label>
            <textarea name="footerAboutText" value={formData.footerAboutText} onChange={handleChange} rows={3} className={inputStyle} required />
          </div>
          <div>
            <label className={labelStyle}>Copyright Text *</label>
            <textarea name="copyrightText" value={formData.copyrightText} onChange={handleChange} rows={2} className={inputStyle} required />
          </div>
        </div>

        {/* সোশ্যাল ডিরেক্টরি ইনপুটস */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800/80 rounded-2xl p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase text-rose-500 tracking-wider mb-2 border-b border-slate-800 pb-2">🔗 Social Graph Endpoints</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Facebook Url</label>
              <input type="url" name="facebookUrl" value={formData.facebookUrl} onChange={handleChange} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Twitter Url</label>
              <input type="url" name="twitterUrl" value={formData.twitterUrl} onChange={handleChange} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Youtube Url</label>
              <input type="url" name="youtubeUrl" value={formData.youtubeUrl} onChange={handleChange} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Google Plus</label>
              <input type="url" name="googlePlus" value={formData.googlePlus} onChange={handleChange} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Linkedin Url</label>
              <input type="url" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Pinterest Url</label>
              <input type="url" name="pinterestUrl" value={formData.pinterestUrl} className={inputStyle} />
            </div>
            <div className="md:col-span-2">
              <label className={labelStyle}>Instagram Url</label>
              <input type="url" name="instagramUrl" value={formData.instagramUrl} onChange={handleChange} className={inputStyle} />
            </div>
          </div>
        </div>
      </div>

    </form>
  );
}