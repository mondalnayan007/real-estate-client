import React, { useState, useEffect, useRef, use } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, ShieldCheck } from 'lucide-react';
import AgentContext from '../context/AgentContext';

// ব্যাকআপ / ডিফল্ট ভিডিও স্লাইডার ডাটা
const defaultSlides = [
  { 
    type: 'video', 
    photo: 'hero2.mp4', // ডিস্ট্রাকচারিং সহজ রাখতে photo প্রপার্টি ব্যবহার করা হলো
    title: 'Discover Luxury Beyond Compare', 
    description: 'Step into a world of architectural masterpieces and bespoke living spaces tailored just for you.',
    headerTitle: 'Institutional Assets Only'
  },
  { 
    type: 'video',
    photo: 'hero3.mp4', 
    title: 'Luxury Villa in Malibu', 
    description: 'Experience breathtaking beachfront living at its finest with endless ocean views.',
    headerTitle: 'Institutional Assets Only'
  },
  { 
    type: 'video',
    photo: 'hero4.mp4', 
    title: 'Modern Sky Penthouse', 
    description: 'Panoramic cityscapes meets top-tier amenities in the heart of the metropolis.',
    headerTitle: 'Institutional Assets Only'
  },
  { 
    type: 'video',
    photo: 'hero5.mp4', 
    title: 'Elegant Urban Living', 
    description: 'Exquisite attention to detail meets contemporary interior craftmanship.',
    headerTitle: 'Institutional Assets Only'
  }
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const playPromiseRef = useRef(null);

    const {user} = use(AgentContext);
    

  const hostname = window.location.hostname;
  const subdomain = hostname.split('.')[0];

  // শুরুতে ডিফল্ট স্লাইড দিয়ে সেট করা থাকছে
  const [carouselData, setCarouselData] = useState(defaultSlides);

  useEffect(() => {
    fetch(`http://localhost:4000/slider?agentId=${user.agentId}`)
      .then((res) => res.json())
      .then((data) => {
        // ডাটাবেস থেকে যদি ডাটা আসে এবং অ্যারিতে অন্তত ১টি ডাটা থাকে
        if (Array.isArray(data) && data.length > 0) {
          setCarouselData(data);
        } else {
          // কোনো ডাটা না থাকলে বা ফাঁকা array আসলে ডিফল্ট ডাটা থাকবে
          setCarouselData(defaultSlides);
        }
      })
      .catch((err) => {
        console.error("Error fetching carousel data, using default slides:", err);
        // ব্যাকএন্ডে কোনো সমস্যা হলে ডিফল্ট ডাটাই থাকবে
        setCarouselData(defaultSlides);
      });
  }, [user.agentId]);

  const currentSlide = carouselData[currentIndex] || {};
  const slideDuration = currentSlide?.type === 'video' ? 8000 : 5000;

  // প্রোগ্রেস বার এবং স্লাইডার অটো-চেঞ্জ টাইমার
  useEffect(() => {
    if (!carouselData.length) return;

    setProgress(0);
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const calculatedProgress = (elapsedTime / slideDuration) * 100;

      if (calculatedProgress >= 100) {
        setProgress(100);
        clearInterval(progressInterval);
        setCurrentIndex((prev) => (prev + 1) % carouselData.length);
      } else {
        setProgress(calculatedProgress);
      }
    }, 16);

    return () => clearInterval(progressInterval);
  }, [currentIndex, slideDuration, carouselData.length]);

  // ভিডিও প্লেব্যাক হ্যান্ডলার
  useEffect(() => {
    let isMounted = true;

    const handleVideoPlayback = async () => {
      if (currentSlide?.type === 'video' && videoRef.current) {
        try {
          if (playPromiseRef.current) {
            await playPromiseRef.current;
          }

          if (!isMounted) return;

          videoRef.current.muted = true;
          videoRef.current.currentTime = 0;

          const playPromise = videoRef.current.play();
          playPromiseRef.current = playPromise;

          await playPromise;
        } catch (error) {
          if (error.name !== 'AbortError') {
            console.error("Video play failed:", error);
          }
        }
      }
    };

    handleVideoPlayback();

    return () => {
      isMounted = false;
    };
  }, [currentIndex, currentSlide?.type]);

  const prevSlide = () => {
    if (!carouselData.length) return;
    setCurrentIndex((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  const nextSlide = () => {
    if (!carouselData.length) return;
    setCurrentIndex((prev) => (prev + 1) % carouselData.length);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-950 font-sans select-none">
      
      {/* স্লাইডিং ক্যানভাস এরিয়া */}
      <div className="relative w-full h-full">
        {carouselData.map((slide, index) => {
          const { photo, description, title, headerTitle, type = 'image' } = slide;
          const isActive = index === currentIndex;

          return (
            <div
              key={slide._id || index}
              className={`absolute inset-0 w-full h-full transform-gpu will-change-transform transition-all ${
                isActive 
                  ? 'opacity-100 scale-100 z-10 pointer-events-auto' 
                  : 'opacity-0 scale-102 z-0 pointer-events-none'
              }`}
              style={{ 
                transitionDuration: '1200ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                backfaceVisibility: 'hidden'
              }}
            >
              {/* ব্যাকগ্রাউন্ড এলিমেন্ট (ভিডিও অথবা ছবি) */}
              {type === 'video' ? (
                <video
                  ref={isActive ? videoRef : null}
                  loop
                  muted
                  className="absolute inset-0 w-full h-full object-cover"
                  playsInline
                  preload="auto"
                >
                  <source src={photo} type="video/mp4" />
                </video>
              ) : (
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${photo})` }}
                />
              )}

              {/* সিনেমাটিক গ্রাফিক্স মাস্কিং */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent z-10" />

              {/* কন্টেন্ট লেআউট */}
              <div className="absolute inset-0 flex flex-col justify-center items-start text-left text-white px-6 md:px-16 lg:px-24 max-w-4xl z-20">
                
                <div className={`inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[10px] font-bold tracking-[0.2em] uppercase rounded-md transition-all duration-1000 delay-100 transform ${
                  isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <ShieldCheck size={12} /> {headerTitle || 'Institutional Assets Only'}
                </div>

                <h1 className={`text-4xl md:text-6xl lg:text-7xl font-light font-serif tracking-tight leading-[1.1] my-6 transition-all duration-1000 delay-200 transform ${
                  isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}>
                  {title && title.split(' ').map((word, i) => (
                    <span key={i} className={i === 1 ? "font-sans font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-blue-500 tracking-tighter" : ""}>
                      {word}{' '}
                    </span>
                  ))}
                </h1>

                <p className={`text-xs md:text-sm text-slate-400 mb-10 max-w-xl font-light leading-relaxed transition-all duration-1000 delay-300 transform ${
                  isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  {description}
                </p>

                {/* বাটনসমূহ */}
                <div className={`flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto transition-all duration-1000 delay-400 transform ${
                  isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <button className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-4 rounded-xl font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_4px_25px_rgba(37,99,235,0.25)] flex items-center justify-center gap-2 active:scale-98">
                    <span>Explore Properties</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                  
                  <button className="border border-slate-800/80 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900/80 text-slate-300 hover:text-white px-8 py-4 rounded-xl font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 backdrop-blur-md">
                    Contact Private Desk
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* নেভিগেশন কন্ট্রোল */}
      <div className="absolute bottom-12 right-6 md:right-16 flex items-center gap-4 z-30">
        <div className="font-mono text-[11px] font-bold tracking-widest text-slate-500 uppercase mr-2">
          <span className="text-blue-400">0{currentIndex + 1}</span> / 0{carouselData.length}
        </div>

        <button 
          onClick={prevSlide} 
          className="border border-slate-800 bg-slate-950/40 hover:bg-slate-900 text-slate-400 hover:text-white p-3.5 rounded-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <ChevronLeft size={16} />
        </button>
        <button 
          onClick={nextSlide} 
          className="border border-slate-800 bg-slate-950/40 hover:bg-slate-900 text-slate-400 hover:text-white p-3.5 rounded-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* প্রোগ্রেস বার */}
      <div className="absolute bottom-0 inset-x-0 h-[3px] bg-slate-900/40 w-full z-30">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 shadow-[0_0_8px_rgba(37,99,235,0.6)] transition-all ease-linear" 
          style={{ width: `${progress}%`, transitionDuration: '16ms' }}
        />
      </div>
    </div>
  );
}