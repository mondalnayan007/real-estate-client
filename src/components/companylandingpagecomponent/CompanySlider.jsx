import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

export default function CompanySlider() {
  // সুপার-এডমিনের SaaS প্রোডাক্ট মার্কেটিং স্লাইডার ডেটা
  const slides = [
    {
      id: 1,
      photo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015",
      title: "Launch Your Real Estate Agency Website Instantly",
      description: "Get a fully functional, high-converting premium property portal with an advanced CRM dashboard. No coding required.",
      buttonText1: "Get Started Free",
      buttonUrl1: "#pricing",
      buttonText2: "Watch SaaS Demo",
      buttonUrl2: "https://real-estate-client-kappa-lilac.vercel.app",
      position: "Left",
    },
    {
      id: 2,
      photo: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070",
      title: "Automate Property Inventory & Lead Capture",
      description: "Empower your agency with automated WhatsApp triggers, seamless Facebook pixel integration, and modern SEO management tools.",
      buttonText1: "Explore Features",
      buttonUrl1: "#features",
      buttonText2: "View Premium Themes",
      buttonUrl2: "#themes",
      position: "Center",
    },
    {
      id: 3,
      photo: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=2069",
      title: "Scale Your Real Estate Business with Smart Analytics",
      description: "Track visitor traffic, monitoring call conversions, and manage unlimited buyer leads from one single centralized dashboard.",
      buttonText1: "Choose a Plan",
      buttonUrl1: "#pricing",
      buttonText2: "Talk to Sales",
      buttonUrl2: "#contact",
      position: "Right",
    }
  ];

  const [current, setCurrent] = useState(0);

  // ⏱️ Auto Play Logic
  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000); // SaaS পিচের জন্য একটু বেশি সময় (৬ সেকেন্ড) রাখা হয়েছে যাতে ইউজার পড়তে পারে
    return () => clearInterval(sliderInterval);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const getPositionClasses = (pos) => {
    if (pos === "Center") return "text-center items-center mx-auto";
    if (pos === "Right") return "text-right items-end ml-auto";
    return "text-left items-start mr-auto";
  };

  return (
    <div className="relative w-full h-[85vh] md:h-[90vh] bg-slate-950 overflow-hidden group select-none">
      
      {/* 🎞️ SLIDES ANCHOR CONTAINER */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image with Clean Tech/Corporate Blur Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 scale-105"
            style={{ backgroundImage: `url(${slide.photo})` }}
          />
          {/* SaaS ভাইব দেওয়ার জন্য ব্লু/ডার্ক গ্রেডিয়েন্ট মিক্সিং */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/80 to-blue-950/30 backdrop-blur-[2px]" />

          {/* 📝 Content Matrix */}
          <div className="absolute inset-0 flex items-center px-6 sm:px-12 md:px-24">
            <div className={`max-w-4xl flex flex-col gap-4 md:gap-5 ${getPositionClasses(slide.position)}`}>
              
              {/* SaaS Badge / Tag */}
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full text-[11px] font-bold text-blue-400 uppercase tracking-widest animate-pulse">
                ⚡ Next-Gen Real Estate SaaS
              </div>

              {/* Hook / Catchy Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                {slide.title}
              </h1>

              {/* B2B Product Value Proposition */}
              <p className="text-slate-400 text-sm md:text-base font-medium max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                {slide.description}
              </p>

              {/* 🎯 CTA Actions (SaaS Funnel) */}
              <div className="flex flex-wrap gap-3 mt-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                {slide.buttonText1 && (
                  <a
                    href={slide.buttonUrl1}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs md:text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl hover:shadow-lg hover:shadow-blue-600/20 hover:scale-[1.02] transition-all flex items-center gap-1.5"
                  >
                    {slide.buttonText1} <ArrowUpRight size={14} />
                  </a>
                )}
                {slide.buttonText2 && (
                  <a
                    href={slide.buttonUrl2}
                    className="bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-bold text-xs md:text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl hover:bg-slate-800 transition-all"
                  >
                    {slide.buttonText2}
                  </a>
                )}
              </div>

            </div>
          </div>
        </div>
      ))}

      {/* 🎛️ CONTROLS */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-slate-900/40 hover:bg-blue-600 text-white p-2.5 rounded-xl border border-slate-800/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-slate-900/40 hover:bg-blue-600 text-white p-2.5 rounded-xl border border-slate-800/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
      >
        <ChevronRight size={18} />
      </button>

      {/* 🟢 DOTS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`transition-all duration-300 h-1.5 rounded-full ${
              idx === current ? "w-8 bg-blue-500" : "w-2 bg-slate-700 hover:bg-slate-500"
            }`}
          />
        ))}
      </div>

    </div>
  );
}