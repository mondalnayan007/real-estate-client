import React, { useState, useEffect, use } from 'react';
import { useLoaderData, useParams, useNavigate } from 'react-router';
import {
  MapPin, BedDouble, Bath, Maximize2, ArrowLeft,
  Calendar, ShieldCheck, Sparkles, MessageSquare, Building,
  Download, CheckCircle, Mail, Phone, User
} from 'lucide-react';

import AgentContext from '../context/AgentContext';
import BookNowModal from '../components/BookNowModal';

const ProjectDetails = () => {
  const { user } = use(AgentContext);

  const [singleData, setSingleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  console.log(singleData);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/projects?agentId=${user?.agentId}&id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        // Handle array or single object response
        setSingleData(Array.isArray(data) ? data[0] : data);
      })
      .catch((err) => console.error("Error fetching project:", err));
  }, [id, user?.agentId]);

  if (!singleData) {
    return (
      <div className="min-h-screen bg-[#072419] text-white flex flex-col items-center justify-center font-sans">
        <p className="text-emerald-400 mb-4 text-xs tracking-widest uppercase">Loading Property Details...</p>
        <button 
          onClick={() => navigate(-1)} 
          className="text-white bg-emerald-600 px-4 py-2 rounded-lg flex items-center gap-2 text-xs uppercase tracking-wider font-bold hover:bg-emerald-500 transition-colors"
        >
          <ArrowLeft size={14} /> Return Back
        </button>
      </div>
    );
  }

  const handleDownloadBrochure = () => {
    alert("Brochure downloaded successfully!");
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      userName: e.target.userName.value,
      userEmail: e.target.userEmail.value,
      userPhone: e.target.userPhone.value,
      userMessage: e.target.userMessage.value,
      agentEmail: user?.email,
      agencyName: user?.agencyName || "Agent",
      propertyTitle: singleData?.title,
      propertyPrice: singleData?.price,
      propertyLink: window.location.href
    };

    try {
      const response = await fetch('http://localhost:4000/api/contact-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        alert("আপনার মেসেজটি সফলভাবে এজেন্টের কাছে পাঠানো হয়েছে!");
        e.target.reset();
      } else {
        alert("দুঃখিত, মেসেজ পাঠানো যায়নি। আবার চেষ্টা করুন।");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("সার্ভার কানেকশনে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative overflow-hidden">
      
      {/* Booking Modal */}
      <BookNowModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        propertyTitle={singleData?.title}
        sharePrice={singleData?.sharePrice}
        bookingPrice={singleData?.bookingPrice}
        _id={singleData?._id}

      />

      {/* ================= HERO SECTION ================= */}
      <div className="relative h-[80vh] min-h-[500px] w-full bg-slate-900">
        <img
          src={singleData.img || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"}
          alt={singleData.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#072419] via-transparent to-black/40" />

        {/* Back Button */}
        <div className="absolute top-8 left-6 md:left-12 z-20">
          <button
            onClick={() => navigate(-1)}
            className="bg-black/40 hover:bg-black/60 text-white backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold tracking-wider uppercase transition-all border border-white/20"
          >
            <ArrowLeft size={14} /> Back
          </button>
        </div>

        {/* Hero Title & Actions */}
        <div className="absolute bottom-12 left-6 md:left-12 right-6 md:right-12 z-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-white">
            <span className="text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2 block">
              {singleData.location || "Bashundhara R/A"}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-2">
              {singleData.title}
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-xl">
              {singleData.location}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsBookModalOpen(true)}
              className="px-6 py-3 bg shadow-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-all"
            >
              Book Now
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('contact-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all border border-emerald-500/30"
            >
              Contact Agent
            </button>
          </div>
        </div>
      </div>

      {/* ================= OVERVIEW & HIGHLIGHTS SECTION ================= */}
      <section className="py-20 px-6 md:px-12 bg-[#fffdf7]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-slate-400 border-b border-slate-300 pb-1 inline-block">
              Luxury Living Space
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#072419]">
              {singleData.title}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Meticulously designed to redefine modern luxury, <span className="font-semibold text-slate-900">{singleData.title}</span> stands as a triumph of contemporary architecture in the heart of {singleData.location}. Featuring expansive views and premium finishes, this estate seamlessly blends absolute privacy with comfort.
            </p>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200">
                <span className="text-3xl font-black text-[#072419] block">{singleData.beds || '1'}</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Apartments</span>
              </div>
              <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200">
                <span className="text-3xl font-black text-[#072419] block">{singleData.baths || '16'}</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Units</span>
              </div>
            </div>
          </div>

          {/* Right Image Feature */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={singleData.img || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"}
                alt="Property View"
                className="w-full h-[450px] object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ================= SPECIFICATIONS SECTION ================= */}
      <section className="py-20 px-6 md:px-12 bg-[#072419] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
              Details & Features
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-8">
              Specification
            </h2>

            <div className="space-y-4 text-sm divide-y divide-emerald-900/60">
              <div className="flex justify-between items-center py-3">
                <span className="text-slate-300 font-medium">LOCATION</span>
                <span className="font-bold text-emerald-400">{singleData.location || "Bashundhara R/A"}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-slate-300 font-medium">TOTAL LAND</span>
                <span className="font-bold text-emerald-400">5 Katha</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-slate-300 font-medium">UNITS PER FLOOR</span>
                <span className="font-bold text-emerald-400">2</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-slate-300 font-medium">TOTAL APARTMENTS</span>
                <span className="font-bold text-emerald-400">10</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-slate-300 font-medium">TOTAL STORIED</span>
                <span className="font-bold text-emerald-400">G+9</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-slate-300 font-medium">ELECTRICITY / GAS</span>
                <span className="font-bold text-emerald-400">Yes</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-slate-300 font-medium">LIFT / GENERATOR</span>
                <span className="font-bold text-emerald-400">Yes</span>
              </div>
            </div>

            <div className="pt-6">
              <a
              href={singleData.brochureLink}
                target="_blank" rel="noopener noreferrer"
                onClick={handleDownloadBrochure}
                className="px-6 py-3.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/50 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2"
              >
                <Download size={16} /> Download Brochure
              </a>
            </div>
          </div>

          {/* Right Showcase Collage */}
          <div className="lg:col-span-6 bg-[#0c3828] p-6 rounded-3xl border border-emerald-800/40 flex flex-col justify-between">
            <h3 className="text-emerald-200 font-serif italic text-2xl text-right mb-4">
              Luxury Interior
            </h3>
            <div className="grid grid-cols-2 gap-3 h-full">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=500&q=80"
                alt="Interior 1"
                className="w-full h-40 object-cover rounded-xl"
              />
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=500&q=80"
                alt="Interior 2"
                className="w-full h-40 object-cover rounded-xl"
              />
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=500&q=80"
                alt="Interior 3"
                className="w-full h-48 object-cover rounded-xl col-span-2"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ================= AVAILABLE UNITS SECTION ================= */}
      <section className="py-20 px-6 md:px-12 bg-[#072419] border-t border-emerald-900/40 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Available Units</h2>
            <p className="text-emerald-400 text-xs uppercase tracking-widest font-semibold">Choose the perfect space for your lifestyle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Unit A */}
            <div className="bg-[#0e402e] p-8 rounded-2xl border border-emerald-700/50 hover:border-emerald-500 transition-all">
              <h3 className="text-2xl font-bold text-white mb-1">Unit A</h3>
              <p className="text-emerald-300 text-sm font-semibold mb-6">{singleData.sqft || "2120 SQFT"}</p>
              
              <div className="space-y-3 text-sm border-t border-emerald-800/60 pt-4 text-emerald-100">
                <div className="flex justify-between"><span>Bedrooms:</span> <span className="font-bold text-white">{singleData.beds || 3} Beds</span></div>
                <div className="flex justify-between"><span>Bathrooms:</span> <span className="font-bold text-white">{singleData.baths || 3} Baths</span></div>
                <div className="flex justify-between"><span>Balcony:</span> <span className="font-bold text-white">3 Balconies</span></div>
              </div>
            </div>

            {/* Unit B */}
            <div className="bg-[#0e402e] p-8 rounded-2xl border border-emerald-700/50 hover:border-emerald-500 transition-all">
              <h3 className="text-2xl font-bold text-white mb-1">Unit B</h3>
              <p className="text-emerald-300 text-sm font-semibold mb-6">2120 SQFT</p>
              
              <div className="space-y-3 text-sm border-t border-emerald-800/60 pt-4 text-emerald-100">
                <div className="flex justify-between"><span>Bedrooms:</span> <span className="font-bold text-white">3 Beds</span></div>
                <div className="flex justify-between"><span>Bathrooms:</span> <span className="font-bold text-white">3 Baths</span></div>
                <div className="flex justify-between"><span>Balcony:</span> <span className="font-bold text-white">3 Balconies</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LOCATION MAP SECTION ================= */}
      <section className="py-20 px-6 md:px-12 bg-slate-50 text-slate-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-4xl font-extrabold text-[#072419]">Location</h2>
            <p className="text-slate-600 text-base font-semibold">
              {singleData.location || "Bashundhara Residential Area, Dhaka"}
            </p>
            <button className="mt-4 px-5 py-2.5 bg-[#072419] text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-emerald-900 transition-colors">
              <MapPin size={14} /> View On Map
            </button>
          </div>

          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white p-2">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80"
              alt="Map Preview"
              className="w-full h-[320px] object-cover rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* ================= CONTACT FORM SECTION ================= */}
      <section id="contact-section" className="py-20 px-6 md:px-12 bg-[#072419] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">Reach Out To Us</span>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Let us guide you to <br />
              <span className="text-emerald-400">the extraordinary</span>
            </h2>
            <p className="text-slate-300 text-sm max-w-md">
              From your first contact, our team will work to help you find your ideal home.
            </p>
          </div>

          {/* Form */}
          <div className="lg:col-span-6 bg-white text-slate-900 p-8 rounded-3xl shadow-xl">
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-extrabold text-slate-500 tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="userName"
                  required
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-extrabold text-slate-500 tracking-wider mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="userPhone"
                  required
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                  placeholder="+88017XXXXXXXX"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-extrabold text-slate-500 tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="userEmail"
                  required
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-extrabold text-slate-500 tracking-wider mb-1">
                  Message / Details
                </label>
                <textarea
                  name="userMessage"
                  rows="3"
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600 focus:bg-white transition-all resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md disabled:bg-slate-300"
              >
                {loading ? "Sending..." : "Find Property"}
              </button>

              <p className="text-[10px] text-slate-400 text-center mt-2">
                By submitting this form you agree to our terms & privacy policy.
              </p>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
};

export default ProjectDetails;