import React, { use, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Plus, Search, RotateCcw, Filter } from 'lucide-react';
import { Link } from 'react-router';
import AgentContext from './context/AgentContext';

const statusList = ['Completed', 'Sold Out', 'Under Construction', 'Up Coming'];
const communityList = [
  'Bashundhara Residential Area',
  'Jolshiri Abashon',
  'Ashulia Model Town',
  'The Premium Royal City',
  'The Premium Smart City'
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.2 }
  }
};

// Helper: Extra Space, Hyphen & Special Characters রিমুভ করার ফাংশন
const normalizeText = (str) => {
  if (!str) return '';
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
};

export default function Projects() {
  const [premiumProjects, setPremiumProjects] = useState([]);
  
  // Multiple Selection States
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedCommunities, setSelectedCommunities] = useState([]);
  
  const { user } = use(AgentContext);

  const hostname = window.location.hostname;
  const subdomain = hostname.split('.')[0];

  const [visibleLimit, setVisibleLimit] = useState(6);

  useEffect(() => {
    if (user?.agentId) {
      fetch(`http://localhost:4000/projects?agentId=${user.agentId}`)
        .then(res => res.json())
        .then(data => setPremiumProjects(data))
        .catch(err => console.error("Error fetching data:", err));
    }
  }, [user?.agentId]);

  // Multiple Status Toggle Function
  const handleStatusToggle = (status) => {
    setSelectedStatuses(prev => 
      prev.includes(status) 
        ? prev.filter(item => item !== status) 
        : [...prev, status]
    );
    setVisibleLimit(6);
  };

  // Multiple Community Toggle Function
  const handleCommunityToggle = (community) => {
    setSelectedCommunities(prev => 
      prev.includes(community) 
        ? prev.filter(item => item !== community) 
        : [...prev, community]
    );
    setVisibleLimit(6);
  };

  // Reset All Filters
  const handleResetFilters = () => {
    setSelectedStatuses([]);
    setSelectedCommunities([]);
    setVisibleLimit(6);
  };

  // Robust Multiple Filter Logic Engine
  const filteredProjects = premiumProjects.filter(project => {
    // 1. Double word status matching handle
    const projectStatusNormalized = normalizeText(project.status) || 'onsale';

    const matchStatus = selectedStatuses.length === 0 || selectedStatuses.some(selected => {
      const selectedStatusNormalized = normalizeText(selected);
      return projectStatusNormalized === selectedStatusNormalized;
    });
    
    // 2. Community Filter Matching
    const matchCommunity = selectedCommunities.length === 0 || selectedCommunities.some(c => 
      normalizeText(project.location).includes(normalizeText(c))
    );

    return matchStatus && matchCommunity;
  });

  const displayedProjects = filteredProjects.slice(0, visibleLimit);

  const handleLoadMore = () => {
    setVisibleLimit(prevLimit => prevLimit + 6);
  };

  const hasActiveFilters = selectedStatuses.length > 0 || selectedCommunities.length > 0;

  return (
    <section className="py-16 bg-[#f8faf9] text-gray-800 min-h-screen px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#007b57] tracking-[0.2em] pt-5 font-extrabold uppercase block mb-2"
          >
            ---PROJECTS---
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight max-w-3xl mx-auto leading-tight"
          >
            We Are Renowned For Flagship Residential Projects
          </motion.h2>
          <div className="w-12 h-1 bg-[#007b57] mx-auto mt-4 rounded-full" />
        </div>

        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Showing <span className="font-bold text-gray-800">{displayedProjects.length > 0 ? 1 : 0}–{displayedProjects.length}</span> of <span className="font-bold text-gray-800">{filteredProjects.length}</span> projects
            </p>

            {/* Top Clear Filter Button */}
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold rounded-full transition-all"
              >
                <RotateCcw size={12} /> Clear All Filters
              </button>
            )}
          </div>

          <button className="bg-[#007b57] hover:bg-[#006245] text-white px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-sm transition-all">
            <Search size={15} /> Advanced Search
          </button>
        </div>

        {/* Main Layout: Sidebar Filters + Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

          {/* LEFT SIDEBAR FILTERS */}
          <div className="lg:col-span-1 space-y-6 sticky top-24">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
                <h3 className="text-xs font-black tracking-widest text-gray-900 uppercase flex items-center gap-2">
                  <Filter size={14} className="text-[#007b57]" /> Filters
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[11px] font-bold text-rose-500 hover:underline flex items-center gap-1"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Status Multiple Filter */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Project Status</span>
                  {selectedStatuses.length > 0 && (
                    <span className="text-[10px] bg-[#007b57] text-white px-2 py-0.5 rounded-full font-bold">
                      {selectedStatuses.length}
                    </span>
                  )}
                </h4>
                <div className="space-y-2.5">
                  {statusList.map((status) => {
                    const isChecked = selectedStatuses.includes(status);
                    return (
                      <label key={status} className="flex items-center gap-3 cursor-pointer group text-xs text-gray-600 hover:text-gray-900">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleStatusToggle(status)}
                          className="w-4 h-4 rounded text-[#007b57] focus:ring-[#007b57] border-gray-300 transition"
                        />
                        <span className={isChecked ? "font-bold text-[#007b57]" : ""}>
                          {status}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Community Multiple Filter */}
              <div>
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Communities</span>
                  {selectedCommunities.length > 0 && (
                    <span className="text-[10px] bg-[#007b57] text-white px-2 py-0.5 rounded-full font-bold">
                      {selectedCommunities.length}
                    </span>
                  )}
                </h4>
                <div className="space-y-2.5">
                  {communityList.map((area) => {
                    const isChecked = selectedCommunities.includes(area);
                    return (
                      <label key={area} className="flex items-center gap-3 cursor-pointer group text-xs text-gray-600 hover:text-gray-900">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCommunityToggle(area)}
                          className="w-4 h-4 rounded text-[#007b57] focus:ring-[#007b57] border-gray-300 transition"
                        />
                        <span className={isChecked ? "font-bold text-[#007b57]" : "truncate max-w-[180px]"}>
                          {area}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PROJECT GRID */}
          <div className="lg:col-span-3">
            {displayedProjects.length > 0 ? (
              <motion.div
                layout
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch"
              >
                <AnimatePresence mode="popLayout">
                  {displayedProjects.map((item) => {
                    const isSoldOut = normalizeText(item.status) === 'soldout';

                    return (
                      <Link key={item._id || item.id} to={`/project-details/${item._id}`} className="flex h-full">
                        <motion.div
                          layout
                          variants={cardVariants}
                          initial="hidden"
                          animate="show"
                          exit="exit"
                          whileHover={{ y: -5 }}
                          className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between w-full h-full"
                        >
                          {/* Image Container */}
                          <div className="relative h-56 w-full overflow-hidden bg-gray-100 flex-shrink-0">
                            <img
                              src={item.img}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Status Badge */}
                            <span
                              className={`absolute top-3 right-3 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-white shadow-sm z-10 ${
                                isSoldOut ? 'bg-red-600' : 'bg-[#007b57]'
                              }`}
                            >
                              {item.status || 'On Sale'}
                            </span>
                          </div>

                          {/* Card Content */}
                          <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                              <span className="text-[10px] font-extrabold text-[#007b57] uppercase tracking-wider block mb-1">
                                {item.location || 'Bashundhara Residential'}
                              </span>
                              <h3 className="text-base font-bold text-gray-900 group-hover:text-[#007b57] transition-colors leading-snug mb-1 line-clamp-1">
                                {item.title}
                              </h3>
                              <p className="text-xs text-gray-500 font-medium">
                                {item.category || 'Single Project'}
                              </p>
                            </div>

                            {/* Footer Location Link */}
                            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-medium group-hover:text-gray-600 transition-colors">
                              <span className="truncate max-w-[180px]">{item.location || 'Bashundhara Residential...'}</span>
                              <ChevronRight size={14} className="text-gray-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* Empty Filter Fallback View */
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                <p className="text-gray-500 font-semibold text-sm mb-4">No properties match your selected filters.</p>
                <button
                  onClick={handleResetFilters}
                  className="bg-[#007b57] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Load More CTA */}
            <AnimatePresence>
              {filteredProjects.length > displayedProjects.length && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-center mt-12"
                >
                  <button
                    onClick={handleLoadMore}
                    className="group inline-flex items-center gap-2 bg-white hover:bg-[#007b57] text-[#007b57] hover:text-white border border-[#007b57] font-bold text-xs tracking-wider uppercase px-8 py-3.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <span>Explore More Properties</span>
                    <Plus size={15} className="group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}