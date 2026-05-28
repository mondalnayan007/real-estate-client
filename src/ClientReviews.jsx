import React from 'react';
import MarqueeComponent from 'react-fast-marquee';
const Marquee = MarqueeComponent.default || MarqueeComponent;
import { Star, Quote } from 'lucide-react';

const premiumReviews = [
  {
    id: 1,
    name: 'Alexander Vance',
    role: 'CEO, VentureCap',
    company: 'Malibu Villa Owner',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    text: 'The absolute pinnacle of real estate acquisition. PrimeEstates didn’t just find us a house; they secured an architectural legacy. Their discretion and white-glove service are completely unmatched.'
  },
  {
    id: 2,
    name: 'Elena Rostova',
    role: 'International Ballerina',
    company: 'The Obsidian Penthouse',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    text: 'From the private viewing to the final bespoke closing details, the experience was flawless. They understand luxury, privacy, and design at a level that traditional brokers simply cannot comprehend.'
  },
  {
    id: 3,
    name: 'Marcus Sterling',
    role: 'Managing Director',
    company: 'Aspen Monolith Owner',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    text: 'An exceptional investment experience. Their access to off-market premium assets provided us with opportunities we couldn’t find anywhere else. Truly the gold standard of high-end real estate.'
  },
  {
    id: 4,
    name: 'Dr. Sophia Loren',
    role: 'Phonetics Philanthropist',
    company: 'Beverly Hills Mansion',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    text: 'Bespoke service from start to finish. The team handled our complex requirements with complete grace and professionalism. I cannot recommend their elite advisory team highly enough.'
  }
];

export default function ClientReviews() {
  return (
    <section className="py-24 bg-slate-950 text-white overflow-hidden relative border-t border-slate-900 select-none">
      {/* Visual Ambient Glow Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <div className="text-center">
          <span className="text-blue-400 tracking-[0.25em] text-xs font-bold uppercase block mb-3">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-light font-serif tracking-tight mb-4">
            The Voice of <span className="font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-white">Excellence</span>
          </h2>
          <div className="w-12 h-[1px] bg-blue-500/30 mx-auto"></div>
        </div>
      </div>

      {/* Endless Marquee Container */}
      <div className="relative w-full flex overflow-hidden">
        
        {/* Soft Premium Edge Blurs */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-slate-950 via-slate-950/70 to-transparent z-20 pointer-events-none" />

        {/* 🌟 react-fast-marquee integration */}
        <Marquee
          speed={60} // স্পিড কন্ট্রোল করার জন্য (পিক্সেল প্রতি সেকেন্ড)
          pauseOnHover={true} // হোভার করলে পজ হবে
          gradient={false} // আমরা কাস্টম গ্রাডিয়েন্ট মাস্ক উপরেই তৈরি করেছি, তাই এটি ফলস থাকবে
          className="flex gap-8 py-4"
        >
          {premiumReviews.map((review) => (
            <div 
              key={review.id} 
              // এখানে mx-4 দেওয়া হয়েছে যাতে কার্ডগুলোর মাঝখানের গ্যাপ ঠিক থাকে
              className="w-[420px] max-w-[85vw] mx-4 bg-gradient-to-b from-slate-900 via-slate-900/60 to-slate-950/40 border border-slate-900 hover:border-blue-500/30 rounded-[2rem] p-8 flex flex-col justify-between relative group transition-all duration-500 shadow-2xl shrink-0"
            >
              {/* Premium Hover Glow Grid */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-blue-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                {/* Header Inside Card */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-1 text-amber-500/90">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} fill="currentColor" size={14} strokeWidth={0} />
                    ))}
                  </div>
                  <Quote size={28} className="text-slate-800/60 group-hover:text-blue-500/10 transition-colors duration-500 transform group-hover:rotate-6" />
                </div>

                {/* Review Content */}
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300 font-light leading-relaxed tracking-wide text-sm md:text-base mb-8">
                  "{review.text}"
                </p>
              </div>

              {/* Client Profile Footer */}
              <div className="flex items-center gap-4 mt-auto border-t border-slate-900/60 pt-5">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/50 to-indigo-500/30 rounded-full p-[1px] -z-10 group-hover:rotate-180 transition-transform duration-1000" />
                  <img 
                    src={review.img} 
                    alt={review.name} 
                    className="w-11 h-11 object-cover rounded-full filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="truncate">
                  <h4 className="font-bold text-slate-200 text-sm tracking-wide group-hover:text-blue-400 transition-colors duration-300">
                    {review.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                    {review.role} • <span className="text-slate-400 italic font-light">{review.company}</span>
                  </p>
                </div>
              </div>

            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}