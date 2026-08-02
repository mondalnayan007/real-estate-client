import React from 'react';
import MarqueeComponent from 'react-fast-marquee';
const Marquee = MarqueeComponent.default || MarqueeComponent;
import { Play, Star, ArrowLeft, ArrowRight, Quote } from 'lucide-react';

const premiumReviews = [
  {
    id: 1,
    name: 'Rj Kibria',
    role: 'Business Owner',
    tag: 'Property Tour',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    text: 'The professionalism and transparency throughout the entire process was outstanding.'
  },
  {
    id: 2,
    name: 'Md. Chowdhury',
    role: 'Property Investor',
    tag: 'Exclusive Client',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    text: 'The Premium Homes exceeded all our expectations. The quality of construction is top notch.'
  },
  {
    id: 3,
    name: 'Client Residing Abroad',
    role: 'NRI Investor',
    tag: 'NRI Feedback',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    text: 'I am a Foreign Residing abroad client who bought a flat without any hassle.'
  },
  {
    id: 4,
    name: 'Elena & Sister',
    role: 'Happy Buyers',
    tag: 'Home Owners',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    text: 'Two honored clients, two sisters, have taken flats from our premium project.'
  }
];

export default function ClientReviews() {
  return (
    <section className="py-20 bg-[#fafcfb] text-gray-800 relative overflow-hidden select-none">
      
      {/* Top Header Section */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[#007b57] tracking-[0.2em] text-xs font-black uppercase block mb-2">
            TESTIMONIALS
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">
            Client Reviews
          </h2>
          <div className="w-12 h-1 bg-[#007b57] rounded-full mb-4" />
          <p className="text-gray-500 font-medium text-sm md:text-base max-w-xl">
            Hear from our satisfied clients about their experiences with us. Your trust is our greatest achievement.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <button className="px-6 py-3 border-2 border-gray-900 hover:bg-gray-900 hover:text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-sm">
            VIEW ALL
          </button>
          <div className="flex items-center gap-2">
            <button className="p-3 border border-gray-200 bg-white rounded-xl hover:border-gray-900 hover:bg-gray-50 transition-all shadow-sm">
              <ArrowLeft size={18} className="text-gray-800" />
            </button>
            <button className="p-3 border border-gray-200 bg-white rounded-xl hover:border-gray-900 hover:bg-gray-50 transition-all shadow-sm">
              <ArrowRight size={18} className="text-gray-800" />
            </button>
          </div>
        </div>
      </div>

      {/* Endless Marquee Container */}
      <div className="relative w-full overflow-hidden">
        
        {/* Soft Side Masks */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#fafcfb] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#fafcfb] to-transparent z-20 pointer-events-none" />

        <Marquee
          speed={40}
          pauseOnHover={true}
          gradient={false}
          className="py-6"
        >
          {premiumReviews.map((review) => (
            <div 
              key={review.id} 
              className="w-[290px] md:w-[330px] h-[480px] mx-4 relative rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 shrink-0 border border-gray-200/80 cursor-pointer bg-slate-900"
            >
              {/* Background Image */}
              <img 
                src={review.img} 
                alt={review.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />

              {/* Multi-Layer Cinematic Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-black/20" />

              {/* Floating Top Tag & Rating */}
              <div className="absolute top-4 inset-x-4 flex justify-between items-center z-10">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/20 shadow-sm">
                  {review.tag}
                </span>
                
                <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-[11px] font-bold text-white">5.0</span>
                </div>
              </div>

              {/* Center Play Button Accent */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="relative">
                  {/* Glowing Pulse Circle */}
                  <div className="absolute -inset-2 bg-[#007b57] rounded-full blur-md opacity-40 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                  
                  <div className="relative w-16 h-16 bg-[#007b57] group-hover:bg-white rounded-full flex items-center justify-center text-white group-hover:text-[#007b57] shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                    <Play size={24} className="fill-current ml-1" />
                  </div>
                </div>
              </div>

              {/* Unique Bottom Card Info Panel */}
              <div className="absolute bottom-4 inset-x-4 p-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl z-10 text-white flex flex-col justify-between shadow-lg">
                <Quote size={20} className="text-[#38d39f] mb-1 opacity-80" />
                
                <p className="text-xs md:text-sm font-medium text-gray-100 leading-snug mb-4 line-clamp-2">
                  "{review.text}"
                </p>

                <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-sm text-white tracking-wide">
                      {review.name}
                    </h4>
                    <p className="text-[11px] text-[#38d39f] font-semibold">
                      {review.role}
                    </p>
                  </div>
                  
                  <div className="w-2 h-2 rounded-full bg-[#38d39f] animate-ping" />
                </div>
              </div>

            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}