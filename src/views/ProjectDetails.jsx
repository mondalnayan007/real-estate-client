import React, { useRef, useState, useEffect } from 'react';
import { useLoaderData, useParams, useNavigate } from 'react-router'; 
import { 
  MapPin, BedDouble, Bath, Maximize2, ArrowLeft, 
  Calendar, ShieldCheck, Sparkles, MessageSquare, Building,
  Volume2, VolumeX, Move, Eye, Download
} from 'lucide-react';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';

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
        try { node.stop(); } catch(e) {}
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
const hostname = window.location.hostname;
const subdomain = hostname.split('.')[0];
const [singleData,setSingleData]= useState([])

const {id} = useParams();
  useEffect(()=>{
    fetch(`http://localhost:4000/projects?domain=${subdomain}&id=${id}`)
    .then(res =>res.json())
    .then(data => {
      console.log(data);
      setSingleData(data)

    })
  },[])
    
    
   
    
    // const singleData = singleProject.toArray().find(singleData => singleData._id === parseInt(id));
    const navigate = useNavigate();

    const [is3DMode, setIs3DMode] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    if (!singleData) {
        return (
          <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center font-mono">
            <p className="text-slate-500 mb-4 text-xs tracking-widest uppercase">Asset Intelligence Vault Locked</p>
            <button onClick={() => navigate(-1)} className="text-blue-400 flex items-center gap-2 text-xs uppercase tracking-wider hover:underline">
              <ArrowLeft size={14}/> Return to Safety
            </button>
          </div>
        );
    }

    // ব্রোশিওর ডাউনলোডের অ্যালার্ট ফাংশন
    const handleDownloadBrochure = () => {
        alert("Brochure downloaded successfully!");
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white pt-32 pb-24 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[160px] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            
            {/* ================= BACK BUTTON ================= */}
            <button 
              onClick={() => navigate(-1)} 
              className="mb-8 text-slate-500 hover:text-blue-400 flex items-center gap-2 text-xs uppercase font-mono tracking-widest transition-colors group"
            >
              <ArrowLeft size={14} className="transform group-hover:-translate-x-1 transition-transform" /> 
              Back to Master Portfolio
            </button>

            {/* ================= HERO IMAGE BANNER / 3D VIRTUAL TOUR CONTAINER ================= */}
            <div className="w-full h-[500px] md:h-[550px] rounded-[3.5rem] overflow-hidden relative border border-slate-900 shadow-2xl mb-16 group bg-slate-950">
              
              {!is3DMode ? (
                /* LAYER A: ২ডি ইমেজ কভার মোড */
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
                  
                  <div className="absolute top-6 left-8 z-20 flex gap-3">
                    <span className="bg-slate-950/80 backdrop-blur-md text-slate-400 border border-slate-900 text-[10px] font-mono tracking-widest px-4 py-2 rounded-xl uppercase">
                      {singleData.category}
                    </span>
                    <span className="bg-blue-500 text-white text-[10px] font-mono font-bold tracking-widest px-4 py-2 rounded-xl uppercase shadow-lg shadow-blue-500/20 flex items-center gap-1.5">
                      <Sparkles size={11} /> {singleData.tag}
                    </span>
                  </div>

                  <img 
                    src={singleData.img} 
                    alt={singleData.title} 
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-102" 
                  />
                </>
              ) : (
                /* LAYER B: ৩ডি স্পেশাল অডিও ট্যুর ভিউপোর্ট (জুম ফাংশন সহ) */
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

                  {/* লাইভ ইন্ডিকেটরস */}
                  <div className="absolute top-6 left-8 z-20 pointer-events-none bg-slate-950/85 border border-slate-900 backdrop-blur-md p-4 rounded-2xl flex flex-col gap-1 shadow-2xl">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-[9px] font-mono text-blue-400 tracking-widest uppercase font-black">VR Tour Active</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-light">Scroll to Zoom In/Out • Drag to look around</span>
                  </div>

                  {/* ইন্টারেক্টিভ উইজেট ডক */}
                  <div className="absolute bottom-6 right-8 z-20 flex items-center gap-2">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`p-3.5 rounded-xl border transition-all duration-300 backdrop-blur-md ${
                        isMuted 
                          ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' 
                          : 'bg-slate-900/90 border-slate-800 text-blue-400 hover:border-blue-500/40'
                      }`}
                      title={isMuted ? "Unmute Space" : "Mute Space"}
                    >
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                    
                    <button
                      onClick={() => setIs3DMode(false)}
                      className="p-3.5 bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-xl text-xs font-mono tracking-wider transition-all duration-300 backdrop-blur-md"
                    >
                      Exit 3D
                    </button>
                  </div>

                  {/* নেভিগেশন গাইড */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none hidden md:flex items-center gap-2 bg-slate-950/80 border border-slate-900 backdrop-blur-md text-[9px] font-mono font-bold px-4 py-2 rounded-lg tracking-wider text-slate-400">
                    <Move size={12} className="text-blue-400 animate-bounce" />
                    <span>Scroll to Zoom • Drag to look around</span>
                  </div>
                </div>
              )}

            </div>

            {/* ================= MAIN CONTENT GRID ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              
              {/* বাম পাশ: মূল প্রজেক্ট ডিটেইলস */}
              <div className="lg:col-span-8">
                <div className="mb-8">
                  <h1 className="text-4xl md:text-6xl font-light font-serif tracking-tight mb-4 leading-tight">
                    {singleData.title}
                  </h1>
                  
                  <p className="text-slate-400 flex items-center gap-2 text-sm font-light">
                    <MapPin size={16} className="text-blue-500"/> {singleData.location}
                  </p>
                </div>

                {/* ৪টি কোর স্পেসিফিকেশন গ্রিড */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-2 bg-slate-900/10 border border-slate-900 rounded-[2.5rem] backdrop-blur-3xl mb-6">
                  <div className="bg-slate-950/40 border border-slate-900/60 p-5 rounded-[2rem] text-center">
                    <BedDouble size={20} className="text-slate-600 mx-auto mb-2"/>
                    <span className="block text-lg font-bold text-slate-200">{singleData.beds}</span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Bedrooms</span>
                  </div>
                  <div className="bg-slate-950/40 border border-slate-900/60 p-5 rounded-[2rem] text-center">
                    <Bath size={20} className="text-slate-600 mx-auto mb-2"/>
                    <span className="block text-lg font-bold text-slate-200">{singleData.baths}</span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Bathrooms</span>
                  </div>
                  <div className="bg-slate-950/40 border border-slate-900/60 p-5 rounded-[2rem] text-center">
                    <Maximize2 size={18} className="text-slate-600 mx-auto mb-2.5"/>
                    <span className="block text-sm font-bold text-slate-200 mt-0.5">{singleData.sqft ? singleData.sqft.split(' ')[0] : 'N/A'}</span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Sq. Footage</span>
                  </div>
                  <div className="bg-slate-950/40 border border-slate-900/60 p-5 rounded-[2rem] text-center">
                    <Building size={18} className="text-slate-600 mx-auto mb-2.5"/>
                    <span className="block text-xs font-mono font-bold text-blue-400 uppercase mt-1">{singleData.status || 'Active'}</span>
                    <span className="text-[10px] font-mono text-slate-500 tracking-wider uppercase block mt-0.5">Build Status</span>
                  </div>
                </div>

                {/* 🌟 নতুন অ্যাকশন বাটন ডক (গ্রিডের ঠিক নিচে সংযুক্ত করা হয়েছে) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                  {/* ১. ডাউনলোড ব্রোশিওর বাটন */}
                  <button
                    onClick={handleDownloadBrochure}
                    className="w-full px-6 py-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-mono text-xs font-bold tracking-[0.15em] uppercase rounded-2xl transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-98"
                  >
                    <Download size={14} />
                    <span>Download Brochure</span>
                  </button>

                  {/* ২. ভার্চুয়াল ট্যুর বাটন (আগের ফুল ফাংশনালিটি সহ) */}
                  <button
                    onClick={() => {
                      setIs3DMode(true);
                      window.scrollTo({ top: 0, behavior: 'smooth' }); 
                    }}
                    className={`w-full px-6 py-4 font-mono text-xs font-bold tracking-[0.15em] uppercase rounded-2xl transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-98 ${
                      is3DMode 
                        ? 'bg-blue-600 text-white border border-blue-500 shadow-lg shadow-blue-500/20' 
                        : 'bg-blue-600/10 hover:bg-blue-600 border border-blue-500/20 hover:border-blue-500 text-blue-400 hover:text-white shadow-sm'
                    }`}
                  >
                    <Eye size={14} className={!is3DMode ? "animate-pulse" : ""} />
                    <span>{is3DMode ? "Virtual Tour Active" : "Explore Virtual Tour"}</span>
                  </button>
                </div>

                {/* ডেসক্রিপশন টেক্সট এরিয়া */}
                <div className="border-t border-slate-900 pt-8">
                  <h3 className="text-xl font-bold mb-4 tracking-tight text-slate-200">The Architectural Legacy</h3>
                  <p className="text-slate-400 text-sm font-light leading-relaxed mb-6">
                    Meticulously designed to redefine modern luxury, <span className="text-slate-200 font-medium">{singleData.title}</span> stands as a triumph of contemporary architecture in the heart of {singleData.location}. Featuring expansive floor-to-ceiling glass paneling and raw, premium textures, this estate seamlessly blends absolute privacy with panoramic horizons.
                  </p>
                  <p className="text-slate-400 text-sm font-light leading-relaxed">
                    Every corner of this {singleData.sqft} estate has been curated for high-net-worth capital preservation and premium lifestyle comfort. From structural integrity to bespoke smart home automation, this is not just a residence—it is an appreciating masterpiece.
                  </p>
                </div>
              </div>

              {/* ডান পাশ: ইনভেস্টমেন্ট সাইডবার অ্যাকুইজিশন ডেক্স */}
              <div className="lg:col-span-4 bg-slate-900/20 border border-slate-900 p-8 rounded-[2.5rem] backdrop-blur-3xl h-max relative">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">Acquisition Value</span>
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-blue-400 tracking-tight mb-6">
                  {singleData.price}
                </div>
                
                <div className="w-full h-[1px] bg-slate-900/80 mb-6" />

                <div className="space-y-4 mb-8 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-3 bg-slate-950/40 p-3 rounded-xl border border-slate-900">
                    <ShieldCheck size={16} className="text-blue-500" />
                    <span>Verified Asset Ownership</span>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-950/40 p-3 rounded-xl border border-slate-900">
                    <Calendar size={16} className="text-blue-500" />
                    <span>Immediate Closing Ready</span>
                  </div>
                </div>

                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300 mb-4 flex items-center gap-2">
                  <MessageSquare size={13} className="text-blue-400" /> Request Private Desk
                </h4>
                
                <form onSubmit={(e) => e.preventDefault()} className="space-y-3.5">
                  <input 
                    type="text" 
                    placeholder="Your Full Name" 
                    className="w-full bg-slate-950/60 border border-slate-900 focus:border-blue-500/40 p-3.5 rounded-xl text-xs font-mono text-slate-200 outline-none transition-all placeholder:text-slate-600"
                  />
                  <input 
                    type="email" 
                    placeholder="Secured Email Address" 
                    className="w-full bg-slate-950/60 border border-slate-900 focus:border-blue-500/40 p-3.5 rounded-xl text-xs font-mono text-slate-200 outline-none transition-all placeholder:text-slate-600"
                  />
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold tracking-widest uppercase py-4 rounded-xl shadow-lg shadow-blue-600/15 transition-all hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Initiate Secure Briefing
                  </button>
                </form>
              </div>

            </div>

          </div>
        </div>
    );
};

export default ProjectDetails;