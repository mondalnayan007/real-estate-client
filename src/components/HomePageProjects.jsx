import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const locations = [
  'All',
  'Bashundhara Residential Area',
  'Jolshiri Abashon',
  'The Premium Royal City',
  'The Premium Smart City',
  'Ashulia Model town'
];

export default function HomePageProjects() {
  const [premiumProjects, setPremiumProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch('data.json')
      .then(res => res.json())
      .then(data => setPremiumProjects(data))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  // Filter based on location/community tab
  const filteredProjects = activeTab === 'All'
    ? premiumProjects
    : premiumProjects.filter(project => 
        project.location?.toLowerCase().includes(activeTab.toLowerCase()) || 
        project.category?.toLowerCase().includes(activeTab.toLowerCase())
      );

  // Left & Right Horizontal Scroll Handler
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 bg-white text-slate-800 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* 🔝 Title Section with Green Line Underline */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1B2B] tracking-tight">
            Projects by Community
          </h2>
          <div className="w-16 h-[4px] bg-[#185F35] mt-2 rounded-full" />
        </div>

        {/* 🔘 Filter Buttons & Slider Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          
          {/* Location Filter Pills */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {locations.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-300 border ${
                  activeTab === tab
                    ? 'bg-[#185F35] text-white border-[#185F35] shadow-md'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Left & Right Slide Buttons */}
          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
            <button
              onClick={() => handleScroll('left')}
              className="p-3 bg-[#0F172A] text-white rounded-lg hover:bg-black transition-all duration-200 shadow-md active:scale-95 cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-3 bg-[#0F172A] text-white rounded-lg hover:bg-black transition-all duration-200 shadow-md active:scale-95 cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* 🏙️ Horizontal Dynamic Card Carousel (Single Row) */}
        <div 
          ref={scrollRef}
          className="flex items-center gap-6 overflow-x-auto scroll-smooth scrollbar-none pb-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((item) => (
              <motion.div
                key={item.id || item._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-[280px] sm:w-[310px] md:w-[320px] shrink-0 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <Link to={`/project-details/${item.id || item._id}`} className="block h-full">
                  
                  {/* Image & Status Tag */}
                  <div className="relative h-64 overflow-hidden bg-slate-100">
                    <img 
                      src={item.img || item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Green "On Sale" Badge */}
                    <span className="absolute top-4 right-4 bg-[#185F35] text-white text-[11px] font-bold px-3 py-1 rounded-md shadow-md uppercase tracking-wider">
                      {item.status || 'On Sale'}
                    </span>
                  </div>

                  {/* Card Main Info */}
                  <div className="p-5 flex flex-col justify-between">
                    <div>
                      {/* Location Badge */}
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#185F35] uppercase tracking-wider mb-1.5">
                        <MapPin size={13} className="shrink-0" />
                        <span className="truncate">{item.location || 'Ashulia Model Town'}</span>
                      </div>

                      {/* Project Title */}
                      <h3 className="text-lg font-bold text-slate-900 leading-snug tracking-tight mb-1 group-hover:text-[#185F35] transition-colors duration-200 line-clamp-1">
                        {item.title}
                      </h3>

                      {/* Subtitle / Structural Info */}
                      <p className="text-slate-500 text-xs font-medium mb-4">
                        {item.structure || item.beds ? `${item.beds || 'B+G+9'}` : 'Condominium'}
                      </p>
                    </div>

                    {/* Bottom Border Line & Arrow Link */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-slate-500 text-xs font-semibold group-hover:text-slate-900 transition-colors">
                      <span className="truncate max-w-[200px]">{item.location || 'Ashulia Model town'}</span>
                      <ChevronRight size={16} className="text-[#185F35] transition-transform group-hover:translate-x-1" />
                    </div>

                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}