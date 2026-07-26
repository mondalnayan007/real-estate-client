import React, { useRef, useState, useEffect, use } from 'react';
import { useLoaderData, useParams, useNavigate } from 'react-router';
import {
  MapPin, BedDouble, Bath, Maximize2, ArrowLeft,
  Calendar, ShieldCheck, Sparkles, MessageSquare, Building,
  Volume2, VolumeX, Move, Eye, Download, CheckCircle
} from 'lucide-react';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import AgentContext from '../context/AgentContext';
import BookNowModal from '../components/BookNowModal';


// --- HIGH-FIDELITY AUDIO GENERATOR ENGINE ---
function createWaterNoiseNode(ctx) {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  let lastOut = 0.0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    data[i] = (lastOut + (0.02 * white)) / 1.02;
    lastOut = data[i];
    data[i] *= 3.5;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  return source;
}

function createTrafficNoiseNode(ctx) {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    data[i] = b0 + b1 + b2 + white * 0.025;
    data[i] *= 0.05;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  return source;
}

// --- RENDER COMPONENTS (SPATIAL AUDIO) ---
function SpatialAudioEngine({ isMuted }) {
  const { camera } = useThree();
  const audioContextRef = useRef(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    audioContextRef.current = ctx;

    const waterSource = createWaterNoiseNode(ctx);
    const waterPanner = ctx.createPanner();
    waterPanner.panningModel = 'HRTF';
    waterPanner.positionX.setValueAtTime(-15, ctx.currentTime);
    waterPanner.positionY.setValueAtTime(-1, ctx.currentTime);
    waterPanner.positionZ.setValueAtTime(4, ctx.currentTime);

    const waterGain = ctx.createGain();
    waterGain.gain.setValueAtTime(0.18, ctx.currentTime);

    waterSource.connect(waterPanner);
    waterPanner.connect(waterGain);
    waterGain.connect(ctx.destination);

    const trafficSource = createTrafficNoiseNode(ctx);
    const trafficPanner = ctx.createPanner();
    trafficPanner.panningModel = 'HRTF';
    trafficPanner.positionX.setValueAtTime(18, ctx.currentTime);
    trafficPanner.positionY.setValueAtTime(2, ctx.currentTime);
    trafficPanner.positionZ.setValueAtTime(-8, ctx.currentTime);

    const trafficGain = ctx.createGain();
    trafficGain.gain.setValueAtTime(0.4, ctx.currentTime);

    trafficSource.connect(trafficPanner);
    trafficPanner.connect(trafficGain);
    trafficGain.connect(ctx.destination);

    waterSource.start(0);
    trafficSource.start(0);

    nodesRef.current = [waterSource, trafficSource];

    return () => {
      nodesRef.current.forEach(node => {
        try { node.stop(); } catch (e) { }
      });
      ctx.close();
    };
  }, []);

  useEffect(() => {
    if (audioContextRef.current) {
      if (isMuted) {
        audioContextRef.current.suspend();
      } else {
        audioContextRef.current.resume();
      }
    }
  }, [isMuted]);

  useFrame(() => {
    if (audioContextRef.current && audioContextRef.current.listener) {
      const listener = audioContextRef.current.listener;
      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
      const up = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion);

      if (listener.positionX) {
        listener.positionX.setValueAtTime(camera.position.x, audioContextRef.current.currentTime);
        listener.positionY.setValueAtTime(camera.position.y, audioContextRef.current.currentTime);
        listener.positionZ.setValueAtTime(camera.position.z, audioContextRef.current.currentTime);

        listener.forwardX.setValueAtTime(forward.x, audioContextRef.current.currentTime);
        listener.forwardY.setValueAtTime(forward.y, audioContextRef.current.currentTime);
        listener.forwardZ.setValueAtTime(forward.z, audioContextRef.current.currentTime);

        listener.upX.setValueAtTime(up.x, audioContextRef.current.currentTime);
        listener.upZ.setValueAtTime(up.z, audioContextRef.current.currentTime);
      }
    }
  });

  return null;
}

function DrawingRoomScene({ imageUrl }) {
  const texture = useTexture(imageUrl);
  return (
    <Sphere args={[500, 64, 40]} scale={[-1, 1, 1]}>
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} toneMapped={false} />
    </Sphere>
  );
}

const ProjectDetails = () => {
  const { user } = use(AgentContext);

  const [singleData, setSingleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false); // Modal State

  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/projects?agentId=${user.agentId}&id=${id}`)
      .then(res => res.json())
      .then(data => {
        setSingleData(data);
      });
  }, []);

  const navigate = useNavigate();

  const [is3DMode, setIs3DMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  if (!singleData) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center justify-center font-mono">
        <p className="text-slate-400 mb-4 text-xs tracking-widest uppercase">Asset Intelligence Vault Locked</p>
        <button onClick={() => navigate(-1)} className="text-blue-600 flex items-center gap-2 text-xs uppercase tracking-wider hover:underline font-bold">
          <ArrowLeft size={14} /> Return to Safety
        </button>
      </div>
    );
  }

  const handleDownloadBrochure = () => {
    alert("Brochure downloaded successfully!");
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      userName: e.target.userName.value,
      userEmail: e.target.userEmail.value,
      userPhone: e.target.userPhone.value,
      userMessage: e.target.userMessage.value,
      agentEmail: user?.email,
      agencyName: user?.agencyName || "Agent",
      propertyTitle: singleData?.title,
      propertyPrice: singleData?.price,
      propertyLink: window.location.href
    };

    try {
      const response = await fetch('http://localhost:4000/api/contact-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        alert("আপনার মেসেজটি সফলভাবে এজেন্টের কাছে ইমেল আকারে পাঠানো হয়েছে!");
        e.target.reset();
      } else {
        alert("দুঃখিত, ইমেল পাঠানো যায়নি। আবার চেষ্টা করুন।");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("সার্ভার কানেকশনে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-28 pb-24 px-6 relative overflow-hidden">
      
      {/* 🟢 Booking Modal Rendered Here */}
      <BookNowModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        propertyTitle={singleData?.title}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ================= BACK BUTTON & HEADER ACTIONS ================= */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-slate-500 hover:text-blue-600 flex items-center gap-2 text-xs uppercase font-bold tracking-widest transition-colors group"
          >
            <ArrowLeft size={14} className="transform group-hover:-translate-x-1 transition-transform" />
            Back to Master Portfolio
          </button>

          {/* 🌟 ৩ডি বাটনটি ইমেজ সেকশনে স্থানান্তরিত বিকল্প হিসেবে হেডার ডকে যুক্ত করা হলো */}
          <button
            onClick={() => {
              setIs3DMode(!is3DMode);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-4 py-2 text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all border flex items-center gap-2 ${
              is3DMode
                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10'
                : 'bg-white text-slate-700 border-slate-200 hover:border-blue-500 hover:text-blue-600'
            }`}
          >
            <Eye size={14} className={is3DMode ? "" : "text-blue-600"} />
            <span>{is3DMode ? "Close VR Tour" : "3D VR View"}</span>
          </button>
        </div>

        {/* ================= HERO IMAGE BANNER / 3D CONTAINER ================= */}
        <div className="w-full h-[500px] md:h-[550px] rounded-[2.5rem] overflow-hidden relative border border-slate-200/80 shadow-lg mb-12 group bg-slate-100">

          {!is3DMode ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent z-10" />

              <div className="absolute top-6 left-8 z-20 flex gap-3">
                <span className="bg-white/90 backdrop-blur-md text-slate-800 border border-slate-200/80 text-[10px] font-bold tracking-widest px-4 py-2 rounded-xl uppercase shadow-sm">
                  {singleData.category || "Estate"}
                </span>
                <span className="bg-blue-600 text-white text-[10px] font-bold tracking-widest px-4 py-2 rounded-xl uppercase shadow-md shadow-blue-500/20 flex items-center gap-1.5">
                  <Sparkles size={11} /> {singleData.tag || "Featured"}
                </span>
              </div>

              <img
                src={singleData.img}
                alt={singleData.title}
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-102"
              />
            </>
          ) : (
            <div className="w-full h-full relative">
              <Canvas camera={{ position: [0, 0, 0.1], fov: 70 }}>
                <DrawingRoomScene imageUrl={singleData.img} />
                <OrbitControls
                  enableZoom={true}
                  minDistance={0.01}
                  maxDistance={2.0}
                  enablePan={false}
                  rotateSpeed={-0.3}
                />
                <SpatialAudioEngine isMuted={isMuted} />
              </Canvas>

              <div className="absolute top-6 left-8 z-20 pointer-events-none bg-white/90 border border-slate-200/80 backdrop-blur-md p-4 rounded-2xl flex flex-col gap-1 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[10px] text-blue-600 tracking-widest uppercase font-black">VR Tour Active</span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium">Scroll to Zoom • Drag to look around</span>
              </div>

              <div className="absolute bottom-6 right-8 z-20 flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-xl border transition-all backdrop-blur-md ${
                    isMuted
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-blue-500'
                  }`}
                  title={isMuted ? "Unmute Space" : "Mute Space"}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                <button
                  onClick={() => setIs3DMode(false)}
                  className="p-3 bg-slate-900 border border-slate-900 text-white rounded-xl text-xs font-bold tracking-wider hover:bg-slate-800 transition-all"
                >
                  Exit 3D Mode
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ================= MAIN CONTENT GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* বাম পাশ: প্রজেক্ট ডিটেইলস */}
          <div className="lg:col-span-8">
            <div className="mb-8">
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">
                {singleData.title}
              </h1>

              <p className="text-slate-500 flex items-center gap-1.5 text-sm font-semibold">
                <MapPin size={16} className="text-blue-600" /> {singleData.location}
              </p>
            </div>

            {/* ৪টি কোর স্পেসিফিকেশন গ্রিড */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-2 bg-white border border-slate-200/80 rounded-3xl shadow-sm mb-6">
              <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                <BedDouble size={20} className="text-slate-400 mx-auto mb-1.5" />
                <span className="block text-base font-extrabold text-slate-900">{singleData.beds}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bedrooms</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                <Bath size={20} className="text-slate-400 mx-auto mb-1.5" />
                <span className="block text-base font-extrabold text-slate-900">{singleData.baths}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bathrooms</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                <Maximize2 size={18} className="text-slate-400 mx-auto mb-2" />
                <span className="block text-xs font-extrabold text-slate-900">{singleData.sqft ? singleData.sqft.split(' ')[0] : 'N/A'}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sq. Footage</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                <Building size={18} className="text-slate-400 mx-auto mb-2" />
                <span className="block text-xs font-bold text-emerald-600 uppercase">{singleData.status || 'Active'}</span>
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Build Status</span>
              </div>
            </div>

            {/* 🌟 নতুন অ্যাকশন বাটন ডক (এখানে "Book Now" সংযুক্ত করা হয়েছে) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              
              {/* ১. ডাউনলোড ব্রোশিওর বাটন */}
              <button
                onClick={handleDownloadBrochure}
                className="w-full px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2 active:scale-98"
              >
                <Download size={15} />
                <span>Download Brochure</span>
              </button>

              {/* 🎯 ২. Book Now Button (Modal Triggers Here) */}
              <button
                onClick={() => setIsBookModalOpen(true)}
                className="w-full px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 active:scale-98"
              >
                <Calendar size={15} />
                <span>Book Now / Schedule Tour</span>
              </button>

            </div>

            {/* ডেসক্রিপশন টেক্সট এরিয়া */}
            <div className="border-t border-slate-200/80 pt-8">
              <h3 className="text-lg font-black text-slate-900 mb-3">The Architectural Legacy</h3>
              <p className="text-slate-600 text-sm font-normal leading-relaxed mb-4">
                Meticulously designed to redefine modern luxury, <span className="text-slate-900 font-semibold">{singleData.title}</span> stands as a triumph of contemporary architecture in the heart of {singleData.location}. Featuring expansive floor-to-ceiling glass paneling and raw, premium textures, this estate seamlessly blends absolute privacy with panoramic horizons.
              </p>
              <p className="text-slate-600 text-sm font-normal leading-relaxed">
                Every corner of this {singleData.sqft} estate has been curated for high-net-worth capital preservation and premium lifestyle comfort. From structural integrity to bespoke smart home automation, this is not just a residence—it is an appreciating masterpiece.
              </p>
            </div>
          </div>

          {/* ডান পাশ: ইনভেস্টমেন্ট সাইডবার / কন্টাক্ট ফরম */}
          <div className="lg:col-span-4 bg-white border border-slate-200/80 p-6 md:p-8 rounded-3xl shadow-sm h-max">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Acquisition Value</span>
            <div className="text-3xl font-black text-slate-900 tracking-tight mb-6">
              {singleData.price}
            </div>

            <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
              <MessageSquare size={14} className="text-blue-600" /> Request Private Desk
            </h4>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="userName"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"  
                  name="userEmail"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="userPhone"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                  placeholder="+88017XXXXXXXX"
                />
              </div>

              {/* Your Message */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
                  Your Message *
                </label>
                <textarea
                  name="userMessage"
                  required
                  rows="3"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all resize-none"
                  placeholder="Hi, I am interested in this property..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-[0.99] disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message to Agent"}
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProjectDetails;