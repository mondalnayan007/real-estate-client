import React from 'react';
import MarqueeComponent from 'react-fast-marquee';
const Marquee = MarqueeComponent.default || MarqueeComponent;
import { Play, Star, ArrowLeft, ArrowRight, MoreVertical } from 'lucide-react';

const premiumReviews = [
  {
    id: 1,
    name: 'Rj Kibria',
    role: 'Business Owner',
    company: 'Malibu Villa Owner',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    text: 'The professionalism and transparency throughout the entire process was outstanding.'
  },
  {
    id: 2,
    name: 'Md. Chowdhury',
    role: 'Property Investor',
    company: 'The Obsidian Penthouse',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    text: 'The Premium Homes exceeded all our expectations. The quality of construction is top notch.'
  },
  {
    id: 3,
    name: 'Client Residing Abroad',
    role: 'Property Investor',
    company: 'Aspen Monolith Owner',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    text: 'I am a Foreign Residing abroad client who bought a flat without any hassle.'
  },
  {
    id: 4,
    name: 'Elena & Sister',
    role: 'Client From Premium Royal City',
    company: 'Beverly Hills Mansion',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    text: 'Two honored clients, two sisters, have taken flats from our premium project.'
  }
];

export default function ClientReviews() {
  return (
    <section className="py-20 bg-white text-gray-800 relative overflow-hidden select-none">
      
      {/* Top Header Section Matching Image Design */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">
            Client Reviews
          </h2>
          <div className="w-12 h-1 bg-[#007b57] rounded-full mb-4" />
          <p className="text-gray-500 font-medium text-sm md:text-base max-w-xl">
            Hear from our satisfied clients about their experiences with us. Your trust is our greatest achievement.
          </p>
        </div>

        {/* View All & Navigation Control Accent Buttons */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <button className="px-6 py-2.5 border-2 border-gray-900 hover:bg-gray-900 hover:text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all">
            VIEW ALL
          </button>
          <div className="flex items-center gap-2">
            <button className="p-2.5 border border-gray-300 rounded-lg hover:border-gray-900 hover:bg-gray-100 transition-all">
              <ArrowLeft size={18} className="text-gray-800" />
            </button>
            <button className="p-2.5 border border-gray-300 rounded-lg hover:border-gray-900 hover:bg-gray-100 transition-all">
              <ArrowRight size={18} className="text-gray-800" />
            </button>
          </div>
        </div>
      </div>

      {/* Endless Marquee Container */}
      <div className="relative w-full overflow-hidden">
        
        {/* Subtle Edge Gradients for Smooth Infinite Scroll Effect */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

        {/* react-fast-marquee Integration */}
        <Marquee
          speed={45}
          pauseOnHover={true}
          gradient={false}
          className="py-4"
        >
          {premiumReviews.map((review) => (
            <div 
              key={review.id} 
              className="w-[280px] md:w-[320px] h-[460px] mx-4 relative rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-500 shrink-0 border border-gray-100 cursor-pointer"
            >
              {/* Client Image Background */}
              <img 
                src={review.img} 
                alt={review.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark Gradient Overlay for Reading Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

              {/* Play Button Icon Accent (Center) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#007b57] shadow-xl transform group-hover:scale-110 group-hover:bg-[#007b57] group-hover:text-white transition-all duration-300">
                  <Play size={24} className="fill-current ml-1" />
                </div>
              </div>

              {/* Star Rating Tag Top Left */}
              <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Content Overlay Bottom */}
              <div className="absolute bottom-0 inset-x-0 p-5 text-white flex flex-col justify-end">
                {/* Quote / Testimonial Excerpt */}
                <p className="text-xs md:text-sm font-semibold text-gray-100 leading-snug mb-3 line-clamp-2">
                  "{review.text}"
                </p>

                {/* Client Info Bar */}
                <div className="flex items-center justify-between pt-2 border-t border-white/20">
                  <div className="truncate pr-2">
                    <h4 className="font-bold text-sm text-[#38d39f] truncate">
                      {review.name}
                    </h4>
                    <p className="text-[11px] text-gray-300 truncate">
                      {review.role}
                    </p>
                  </div>

                  <button className="text-gray-300 hover:text-white p-1 rounded-full transition-colors flex-shrink-0">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}