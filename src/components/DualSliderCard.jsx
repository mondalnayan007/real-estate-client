import React from 'react';
import { Link } from 'react-router';

const DualSliderCard = ({assets}) => {
    console.log(assets);

    const {title,price,status,category,img,id,tag} = assets;
    return (
        <div>
            <div className="flex gap-6 animate-marquee whitespace-nowrap py-4 hover:[animation-play-state:paused]">
                
                    <div  className="w-[340px] sm:w-[380px] shrink-0 bg-slate-950 border-2 border-blue-500/20 rounded-[2rem] overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.1)] group relative aspect-[4/3] cursor-pointer">
                        <Link to={`/project-details/${id}`}>
                            {/* ১. ডাইনামিক ব্যাকগ্রাউন্ড ইমেজ */}
                            <img
                                src={img}
                                alt={title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* ২. সিনেমাটিক ওভারলে */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent z-10" />

                            {/* ৩. ডাইনামিক কন্টেন্ট লেয়ার */}
                            <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                                <div className="flex items-center justify-between mb-3">
                                    {/* প্রজেক্ট কোড বা ট্যাগ */}
                                    <span className="bg-blue-950/70 backdrop-blur-md text-blue-400 border border-blue-500/30 text-[10px] font-mono font-bold tracking-wider px-3.5 py-1.5 rounded-xl">
                                        {tag || `#PRP-0${id}`}
                                    </span>

                                    {/* প্রাইস ট্যাগ */}
                                    <span className="text-emerald-400 font-sans font-black text-lg tracking-tight drop-shadow-[0_2px_8px_rgba(16,185,129,0.3)]">
                                        {price}
                                    </span>
                                </div>

                                {/* মেইন টাইটেল */}
                                <h3 className="text-xl font-sans font-extrabold text-white tracking-tight leading-none group-hover:text-blue-400 transition-colors duration-300 truncate">
                                    {title}
                                </h3>
                            </div>
                        </Link>
                    </div>
                
            </div>
        </div>
    );
};

export default DualSliderCard;