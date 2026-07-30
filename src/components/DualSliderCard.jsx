import React from 'react';
import { Link } from 'react-router-dom'; 

const DualSliderCard = ({ assets }) => {
    

    const { title, price, status, category, img, id, tag } = assets;

    // 🎨 আপনার দেওয়া নির্দিষ্ট ৩টি স্ট্যাটাসের জন্য কাস্টম ডাইনামিক কালার অবজেক্ট
    const statusColors = {
        // ১. pending -> গোল্ডেন/অ্যাম্বার ভাইব (Neon Glow)
        pending: 'bg-amber-500/10 border-amber-500/40 text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.25)]',
        
        // ২. completed -> স্মুথ এমারেল্ড গ্রিন ভাইব
        completed: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.25)]',
        
        // ৩. upcomming -> নিয়ন সায়ান/ব্লু ভাইব (আপনার ডেটার বানান অনুযায়ী ম্যাচ করা হয়েছে)
        upcomming: 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.25)]',
        upcoming: 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.25)]', // সেফটির জন্য স্ট্যান্ডার্ড বানানও রাখা হলো
    };

    // ডেটা থেকে আসা স্ট্যাটাসকে লোয়ারকেস ও স্পেস ক্লিন করে নিচ্ছি যাতে নিখুঁতভাবে ম্যাচ করে
    const currentStatus = status ? status.toLowerCase().trim() : '';
    
    // যদি কোনো কারণে ম্যাচ না করে, তবে একটি চমৎকার ডার্ক স্লেট কালার ডিফল্ট হিসেবে পাবে
    const activeStatusColor = statusColors[currentStatus] || 'bg-slate-800/40 border-slate-700 text-slate-300';

    return (
        <div>
            <div className="flex gap-6 animate-marquee whitespace-nowrap py-4 hover:[animation-play-state:paused]">
                
                <div className="w-[340px] sm:w-[380px] shrink-0  group relative aspect-[4/3] cursor-pointer">
                    <Link to={`/project-details/${id}`}>
                        
                        {/* ১. ডাইনামিক ব্যাকগ্রাউন্ড ইমেজ */}
                        <img
                            src={img}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* 🌟 টপ রাইট কর্নারে ডাইনামিক গ্লোয়িং স্ট্যাটাস ব্যাজ */}
                        {status && (
                            <div className="absolute top-5 right-5 z-20">
                                <span className={`backdrop-blur-md border text-[10px] font-mono font-black tracking-widest uppercase px-3.5 py-1.5 rounded-xl shadow-2xl transition-all duration-300 ${activeStatusColor}`}>
                                    {status}
                                </span>
                            </div>
                        )}

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