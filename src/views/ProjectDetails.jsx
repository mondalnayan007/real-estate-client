import React from 'react';
import { useLoaderData, useParams, useNavigate } from 'react-router'; // রিডাইরেক্টের জন্য useNavigate যোগ করতে পারেন
import { 
  MapPin, BedDouble, Bath, Maximize2, ArrowLeft, 
  Calendar, ShieldCheck, Sparkles, MessageSquare, Building 
} from 'lucide-react';

const ProjectDetails = () => {
    const data = useLoaderData();
    console.log(data);
    const {id} = useParams();
    
    const singleData = data.find(singleData => singleData.id === parseInt(id));
    console.log(singleData);

    // ১. এক্সিজটিং কোড ঠিক রেখে শুধু নিচে একটি নেভিগেট হুক (ব্যাক বাটনের জন্য)
    const navigate = useNavigate();

    // ২. যদি কোনো কারণে ডাটা লোড না হয় বা আইডি ম্যাচ না করে, তার সেফটি গার্ড
    if (!singleData) {
        return (
          <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center font-mono">
            <p className="text-slate-500 mb-4 text-xs tracking-widest uppercase">Asset Intelligence Vault Locked</p>
            <button onClick={() => navigate(-1)} className="text-blue-400 flex items-center gap-2 text-xs uppercase tracking-wider hover:underline">
              <ArrowLeft size={14}/> Return to Safety
            </button>
          </div>
        );
    }

    // আপনার রিটার্নের ভেতরে প্রিমিয়াম ডার্ক ওলেড থিম ডিজাইন
    return (
        <div className="min-h-screen bg-slate-950 text-white pt-32 pb-24 px-6 relative overflow-hidden">
          {/* ব্যাকগ্রাউন্ড অ্যাম্বিয়েন্ট লাক্সারি লাইটিং ইফেক্টস */}
          <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[160px] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            
            {/* ================= BACK BUTTON ================= */}
            <button 
              onClick={() => navigate(-1)} 
              className="mb-8 text-slate-500 hover:text-blue-400 flex items-center gap-2 text-xs uppercase font-mono tracking-widest transition-colors group"
            >
              <ArrowLeft size={14} className="transform group-hover:-translate-x-1 transition-transform" /> 
              Back to Master Portfolio
            </button>

            {/* ================= HERO IMAGE BANNER ================= */}
            <div className="w-full h-[500px] md:h-[550px] rounded-[3.5rem] overflow-hidden relative border border-slate-900 shadow-2xl mb-16 group">
              {/* গ্লাস ওভারলে ডার্ক গ্রেডিয়েন্ট */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
              
              {/* টপ ক্যাটাগরি এবং ট্যাগ ব্যাজ */}
              <div className="absolute top-6 left-8 z-20 flex gap-3">
                <span className="bg-slate-950/80 backdrop-blur-md text-slate-400 border border-slate-900 text-[10px] font-mono tracking-widest px-4 py-2 rounded-xl uppercase">
                  {singleData.category}
                </span>
                <span className="bg-blue-500 text-white text-[10px] font-mono font-bold tracking-widest px-4 py-2 rounded-xl uppercase shadow-lg shadow-blue-500/20 flex items-center gap-1.5">
                  <Sparkles size={11} /> {singleData.tag}
                </span>
              </div>

              <img 
                src={singleData.img} 
                alt={singleData.title} 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-102" 
              />
            </div>

            {/* ================= MAIN CONTENT GRID ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              
              {/* বাম পাশ: মূল প্রজেক্ট ডিটেইলস */}
              <div className="lg:col-span-8">
                <div>
                  <h1 className="text-4xl md:text-6xl font-light font-serif tracking-tight mb-4 leading-tight">
                    {singleData.title}
                  </h1>
                  
                  <p className="text-slate-400 flex items-center gap-2 text-sm font-light mb-8">
                    <MapPin size={16} className="text-blue-500"/> {singleData.location}
                  </p>
                </div>

                {/* ৪টি কোর স্পেসিফিকেশন গ্রিড */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-2 bg-slate-900/10 border border-slate-900 rounded-[2.5rem] backdrop-blur-3xl mb-12">
                  <div className="bg-slate-950/40 border border-slate-900/60 p-5 rounded-[2rem] text-center">
                    <BedDouble size={20} className="text-slate-600 mx-auto mb-2"/>
                    <span className="block text-lg font-bold text-slate-200">{singleData.beds}</span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Bedrooms</span>
                  </div>
                  <div className="bg-slate-950/40 border border-slate-900/60 p-5 rounded-[2rem] text-center">
                    <Bath size={20} className="text-slate-600 mx-auto mb-2"/>
                    <span className="block text-lg font-bold text-slate-200">{singleData.baths}</span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Bathrooms</span>
                  </div>
                  <div className="bg-slate-950/40 border border-slate-900/60 p-5 rounded-[2rem] text-center">
                    <Maximize2 size={18} className="text-slate-600 mx-auto mb-2.5"/>
                    <span className="block text-sm font-bold text-slate-200 mt-0.5">{singleData.sqft ? singleData.sqft.split(' ')[0] : 'N/A'}</span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Sq. Footage</span>
                  </div>
                  <div className="bg-slate-950/40 border border-slate-900/60 p-5 rounded-[2rem] text-center">
                    <Building size={18} className="text-slate-600 mx-auto mb-2.5"/>
                    <span className="block text-xs font-mono font-bold text-blue-400 uppercase mt-1">{singleData.status || 'Active'}</span>
                    <span className="text-[10px] font-mono text-slate-500 tracking-wider uppercase block mt-0.5">Build Status</span>
                  </div>
                </div>

                {/* ডেসক্রিপশন টেক্সট এরিয়া */}
                <div className="border-t border-slate-900 pt-8">
                  <h3 className="text-xl font-bold mb-4 tracking-tight text-slate-200">The Architectural Legacy</h3>
                  <p className="text-slate-400 text-sm font-light leading-relaxed mb-6">
                    Meticulously designed to redefine modern luxury, <span className="text-slate-200 font-medium">{singleData.title}</span> stands as a triumph of contemporary architecture in the heart of {singleData.location}. Featuring expansive floor-to-ceiling glass paneling and raw, premium textures, this estate seamlessly blends absolute privacy with panoramic horizons.
                  </p>
                  <p className="text-slate-400 text-sm font-light leading-relaxed">
                    Every corner of this {singleData.sqft} estate has been curated for high-net-worth capital preservation and premium lifestyle comfort. From structural integrity to bespoke smart home automation, this is not just a residence—it is an appreciating masterpiece.
                  </p>
                </div>
              </div>

              {/* ডান পাশ: ইনভেস্টমেন্ট সাইডবার অ্যাকুইজিশন ডেক্স */}
              <div className="lg:col-span-4 bg-slate-900/20 border border-slate-900 p-8 rounded-[2.5rem] backdrop-blur-3xl h-max relative">
                {/* প্রাইস ট্যাগ */}
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">Acquisition Value</span>
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-blue-400 tracking-tight mb-6">
                  {singleData.price}
                </div>
                
                <div className="w-full h-[1px] bg-slate-900/80 mb-6" />

                {/* ট্রাস্ট ফ্যাক্টরস */}
                <div className="space-y-4 mb-8 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-3 bg-slate-950/40 p-3 rounded-xl border border-slate-900">
                    <ShieldCheck size={16} className="text-blue-500" />
                    <span>Verified Asset Ownership</span>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-950/40 p-3 rounded-xl border border-slate-900">
                    <Calendar size={16} className="text-blue-500" />
                    <span>Immediate Closing Ready</span>
                  </div>
                </div>

                {/* ফর্ম অফার */}
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300 mb-4 flex items-center gap-2">
                  <MessageSquare size={13} className="text-blue-400" /> Request Private Desk
                </h4>
                
                <form onSubmit={(e) => e.preventDefault()} className="space-y-3.5">
                  <input 
                    type="text" 
                    placeholder="Your Full Name" 
                    className="w-full bg-slate-950/60 border border-slate-900 focus:border-blue-500/40 p-3.5 rounded-xl text-xs font-mono text-slate-200 outline-none transition-all placeholder:text-slate-600"
                  />
                  <input 
                    type="email" 
                    placeholder="Secured Email Address" 
                    className="w-full bg-slate-950/60 border border-slate-900 focus:border-blue-500/40 p-3.5 rounded-xl text-xs font-mono text-slate-200 outline-none transition-all placeholder:text-slate-600"
                  />
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold tracking-widest uppercase py-4 rounded-xl shadow-lg shadow-blue-600/15 transition-all hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Initiate Secure Briefing
                  </button>
                </form>
              </div>

            </div>

          </div>
        </div>
    );
};

export default ProjectDetails;