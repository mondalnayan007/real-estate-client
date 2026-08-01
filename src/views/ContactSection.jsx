import React, { useState } from 'react';
import { 
  Mail, MapPin, Phone, Clock, Send, 
  User, UserCheck, FileText 
} from 'lucide-react';
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa';

export default function ContactSection() {
  // 🟢 Tab Switcher State
  const [activeTab, setActiveTab] = useState('corporate');
  const [loading, setLoading] = useState(false);

  // 🟢 Form State (কি-গুলোর নাম ঠিক রাখা হয়েছে)
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    subject: '',
    userMessage: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // 👈 লোডিং শুরু করা হলো

    try {
      const response = await fetch('http://localhost:4000/api/contact-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        alert("আপনার মেসেজটি সফলভাবে পাঠানো হয়েছে!");
        // ফর্ম স্টেট রিসেট করা
        setFormData({
          userName: '',
          userEmail: '',
          userPhone: '',
          subject: '',
          userMessage: ''
        });
      } else {
        alert(data.message || "দুঃখিত, মেসেজ পাঠানো যায়নি। আবার চেষ্টা করুন।");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("সার্ভার কানেকশনে সমস্যা হয়েছে।");
    } finally {
      setLoading(false); // 👈 লোডিং শেষ করা হলো
    }
  };

  // 🏢 Office Location Data Map
  const officeLocations = {
    corporate: {
      address: "Land View Commercial Center, 9th Floor 28 Gulshan North C/A, Gulshan Circle-2, Dhaka",
      phone: "+8801958253300",
      email: "info@dpremiumhomes.com",
      hours: "Saturday - Thursday: 9:30 AM - 6:30 PM\nFriday: Closed"
    },
    site: {
      address: "Project Site Office, Block-B, Road-04, Sector-10, Uttara, Dhaka",
      phone: "+8801958253301",
      email: "site@dpremiumhomes.com",
      hours: "Saturday - Thursday: 9:00 AM - 6:00 PM\nFriday: Open"
    },
    ati: {
      address: "Ati Society (Site Office 2), Ati Bazar, Keraniganj, Dhaka",
      phone: "+8801958253302",
      email: "ati@dpremiumhomes.com",
      hours: "Saturday - Thursday: 9:30 AM - 6:30 PM\nFriday: Closed"
    },
    zonal: {
      address: "Zonal Commercial Hub, Floor 4, Agrabad C/A, Chattogram",
      phone: "+8801958253303",
      email: "zonal@dpremiumhomes.com",
      hours: "Saturday - Thursday: 9:30 AM - 6:30 PM\nFriday: Closed"
    }
  };

  const currentOffice = officeLocations[activeTab];

  return (
    <div className="bg-slate-50/60 py-16 px-4 md:px-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto space-y-20">

        {/* ================= 1️⃣ TOP SECTION: GET IN TOUCH ================= */}
        <div>
          {/* Top Header */}
          <div className="text-center mb-12 space-y-2">
            <div className="flex justify-center mb-3">
              <div className="p-2 border border-emerald-400 rounded-lg text-emerald-500 bg-white shadow-sm">
                <Mail size={22} />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
              Get In <span className="text-[#00d285]">Touch</span>
            </h2>
            <p className="text-slate-600 font-medium text-sm md:text-base">
              We're here to help you find your dream home. Reach out to us anytime!
            </p>
          </div>

          {/* Main Grid Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 👈 Left Column: Form & Socials (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Form Card */}
              <div className="bg-[#0b4d34] text-white p-6 md:p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold mb-6 tracking-wide">Send Us a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
                  
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-200 mb-1.5">Your Name *</label>
                      <input 
                        type="text" 
                        name="userName" // 👈 ঠিক করা হয়েছে (আগে name ছিল)
                        value={formData.userName}
                        onChange={handleInputChange}
                        placeholder="John Doe" 
                        className="w-full px-3.5 py-3 rounded-lg bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm font-normal"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-200 mb-1.5">Email Address *</label>
                      <input 
                        type="email" 
                        name="userEmail" // 👈 ঠিক করা হয়েছে (আগে email ছিল)
                        value={formData.userEmail}
                        onChange={handleInputChange}
                        placeholder="john@example.com" 
                        className="w-full px-3.5 py-3 rounded-lg bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm font-normal"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone & Subject Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-200 mb-1.5">Phone Number *</label>
                      <input 
                        type="text" 
                        name="userPhone" // 👈 ঠিক করা হয়েছে (আগে phone ছিল)
                        value={formData.userPhone}
                        onChange={handleInputChange}
                        placeholder="+880 1XXX-XXXXXX" 
                        className="w-full px-3.5 py-3 rounded-lg bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm font-normal"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-200 mb-1.5">Subject *</label>
                      <input 
                        type="text" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Property Inquiry" 
                        className="w-full px-3.5 py-3 rounded-lg bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm font-normal"
                        required
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-slate-200 mb-1.5">Message *</label>
                    <textarea 
                      rows={5}
                      name="userMessage" // 👈 ঠিক করা হয়েছে (আগে message ছিল)
                      value={formData.userMessage}
                      onChange={handleInputChange}
                      placeholder="Tell us about your requirements..." 
                      className="w-full px-3.5 py-3 rounded-lg bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm font-normal resize-none"
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-[#00a859] hover:bg-[#008f4c] cursor-pointer text-white font-bold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 text-sm shadow-md mt-2 disabled:opacity-50"
                  >
                    <Send size={16} /> {loading ? "Sending..." : "Send Message"}
                  </button>

                </form>
              </div>

              {/* Connect With Us Box */}
              <div className="bg-[#0b4d34] text-white p-6 rounded-2xl shadow-xl">
                <h4 className="text-lg font-bold mb-4">Connect With Us</h4>
                <div className="flex items-center gap-3">
                  <a href="#" className="w-10 h-10 rounded-full bg-[#083826] hover:bg-[#00a859] flex items-center justify-center text-white transition-all shadow">
                    <FaFacebookF size={15} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#083826] hover:bg-[#00a859] flex items-center justify-center text-white transition-all shadow">
                    <FaLinkedinIn size={15} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#083826] hover:bg-[#00a859] flex items-center justify-center text-white transition-all shadow">
                    <FaYoutube size={15} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#083826] hover:bg-[#00a859] flex items-center justify-center text-white transition-all shadow">
                    <FaInstagram size={15} />
                  </a>
                </div>
              </div>

            </div>

            {/* 👉 Right Column: Tabs & Office Info Cards (5 Cols) */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Tab Navigation Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'corporate', label: 'Corporate Office' },
                  { id: 'site', label: 'Site Office' },
                  { id: 'ati', label: 'Ati Society (Site Office 2)' },
                  { id: 'zonal', label: 'Zonal Office' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 px-3 rounded-lg text-xs font-bold transition-all border text-center flex items-center justify-center min-h-[52px] ${
                      activeTab === tab.id
                        ? 'bg-[#0b4d34] text-white border-[#0b4d34] shadow-md'
                        : 'bg-white text-slate-800 border-slate-300 hover:border-[#0b4d34]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Info Display Cards */}
              <div className="space-y-4 pt-2">
                
                {/* 1. Address Card */}
                <div className="bg-[#0b4d34] text-white p-5 rounded-2xl shadow-lg flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#00a859]/30 border border-[#00a859]/50 flex items-center justify-center text-[#00d285] shrink-0 mt-0.5">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h5 className="font-bold text-base mb-1">
                      {activeTab === 'corporate' && 'Corporate Office'}
                      {activeTab === 'site' && 'Site Office'}
                      {activeTab === 'ati' && 'Ati Society Office'}
                      {activeTab === 'zonal' && 'Zonal Office'}
                    </h5>
                    <p className="text-slate-200 text-xs md:text-sm leading-relaxed">
                      {currentOffice.address}
                    </p>
                  </div>
                </div>

                {/* 2. Phone Number Card */}
                <div className="bg-[#0b4d34] text-white p-5 rounded-2xl shadow-lg flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#00a859]/30 border border-[#00a859]/50 flex items-center justify-center text-[#00d285] shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-base mb-0.5">Phone Number</h5>
                    <p className="text-slate-200 text-xs md:text-sm font-medium">
                      {currentOffice.phone}
                    </p>
                  </div>
                </div>

                {/* 3. Email Address Card */}
                <div className="bg-[#0b4d34] text-white p-5 rounded-2xl shadow-lg flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#00a859]/30 border border-[#00a859]/50 flex items-center justify-center text-[#00d285] shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-base mb-0.5">Email Address</h5>
                    <p className="text-slate-200 text-xs md:text-sm font-medium">
                      {currentOffice.email}
                    </p>
                  </div>
                </div>

                {/* 4. Business Hours Card */}
                <div className="bg-[#0b4d34] text-white p-5 rounded-2xl shadow-lg flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#00a859]/30 border border-[#00a859]/50 flex items-center justify-center text-[#00d285] shrink-0 mt-0.5">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-base mb-1">Business Hours</h5>
                    <p className="text-slate-200 text-xs md:text-sm whitespace-pre-line leading-relaxed">
                      {currentOffice.hours}
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* ================= 2️⃣ BOTTOM SECTION: DEPARTMENTS ================= */}
        <div className="pt-8">
          
          {/* Sub Header */}
          <div className="text-center mb-12 space-y-2">
            <div className="flex items-center justify-center gap-3">
              <span className="h-[1px] w-12 bg-emerald-400"></span>
              <span className="text-emerald-600 font-extrabold text-xs tracking-widest uppercase">Departments</span>
              <span className="h-[1px] w-12 bg-emerald-400"></span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Reach the <span className="text-[#00d285]">Right Department</span>
            </h3>
            <p className="text-slate-500 text-xs md:text-sm max-w-xl mx-auto">
              Contact the relevant team directly for faster and more personalised assistance.
            </p>
          </div>

          {/* Department Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Client Experience */}
            <div className="bg-[#0b4d34] text-white p-6 rounded-2xl shadow-xl space-y-5">
              <div className="w-12 h-12 rounded-xl bg-[#00a859]/30 border border-[#00a859]/50 flex items-center justify-center text-[#00d285]">
                <User size={24} />
              </div>
              <h4 className="text-lg font-bold">Client Experience Department</h4>
              <div className="space-y-2.5 text-xs text-slate-200">
                <div className="flex items-center gap-2.5">
                  <Mail size={15} className="text-[#00d285] shrink-0" />
                  <span>experience@dpremiumhomes.com</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={15} className="text-[#00d285] shrink-0" />
                  <span>+880 1958-253342</span>
                </div>
              </div>
            </div>

            {/* Card 2: Human Resources */}
            <div className="bg-[#0b4d34] text-white p-6 rounded-2xl shadow-xl space-y-5">
              <div className="w-12 h-12 rounded-xl bg-[#00a859]/30 border border-[#00a859]/50 flex items-center justify-center text-[#00d285]">
                <UserCheck size={24} />
              </div>
              <h4 className="text-lg font-bold">Human Resources Department</h4>
              <div className="space-y-2.5 text-xs text-slate-200">
                <div className="flex items-center gap-2.5">
                  <Mail size={15} className="text-[#00d285] shrink-0" />
                  <span>career@dpremiumhomes.com</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={15} className="text-[#00d285] shrink-0" />
                  <span>+880 1335-258340</span>
                </div>
              </div>
            </div>

            {/* Card 3: Land & Legal Affairs */}
            <div className="bg-[#0b4d34] text-white p-6 rounded-2xl shadow-xl space-y-5">
              <div className="w-12 h-12 rounded-xl bg-[#00a859]/30 border border-[#00a859]/50 flex items-center justify-center text-[#00d285]">
                <FileText size={24} />
              </div>
              <h4 className="text-lg font-bold">Land & Legal Affairs Department</h4>
              <div className="space-y-2.5 text-xs text-slate-200">
                <div className="flex items-center gap-2.5">
                  <Mail size={15} className="text-[#00d285] shrink-0" />
                  <span>legal.affairs@dpremiumhomes.com</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={15} className="text-[#00d285] shrink-0" />
                  <span>+8801958253300</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}