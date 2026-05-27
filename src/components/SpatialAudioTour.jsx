import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Volume2, VolumeX, Move, RotateCcw, Sparkles, MapPin, Maximize2 } from 'lucide-react';

// --- HIGH-FIDELITY AUDIO GENERATOR ENGINE (CORS-PROOF REAL SOUND SYNTHESIZERS) ---
// Generates realistic running water noise mathematically via Web Audio API
function createWaterNoiseNode(ctx) {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  
  let lastOut = 0.0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    // Pink noise filter to simulate heavy texture fluid velocity splash
    data[i] = (lastOut + (0.02 * white)) / 1.02;
    lastOut = data[i];
    data[i] *= 3.5; // Gain multiplier
  }
  
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  return source;
}

// Generates low-frequency ambient road traffic/wind rumble mathematically
function createTrafficNoiseNode(ctx) {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    // Brown noise filter integration loop for deep environmental low rumble
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    data[i] = b0 + b1 + b2 + white * 0.025;
    data[i] *= 0.05; // Bring to subtle background level
  }
  
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  return source;
}

// --- RENDER COMPONENTS ---
function SpatialAudioEngine({ isMuted }) {
  const { camera } = useThree();
  const audioContextRef = useRef(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    audioContextRef.current = ctx;

    // Source 1: Kitchen Attached Area Running Water Splash (Left Side Spatial Zone)
    const waterSource = createWaterNoiseNode(ctx);
    const waterPanner = ctx.createPanner();
    waterPanner.panningModel = 'HRTF';
    waterPanner.positionX.setValueAtTime(-15, ctx.currentTime);
    waterPanner.positionY.setValueAtTime(-1, ctx.currentTime);
    waterPanner.positionZ.setValueAtTime(4, ctx.currentTime);
    
    const waterGain = ctx.createGain();
    waterGain.gain.setValueAtTime(0.18, ctx.currentTime); // Soft running texture

    waterSource.connect(waterPanner);
    waterPanner.connect(waterGain);
    waterGain.connect(ctx.destination);

    // Source 2: Balcony High Panoramic View Outer City Traffic Noise (Right Side Spatial Zone)
    const trafficSource = createTrafficNoiseNode(ctx);
    const trafficPanner = ctx.createPanner();
    trafficPanner.panningModel = 'HRTF';
    trafficPanner.positionX.setValueAtTime(18, ctx.currentTime);
    trafficPanner.positionY.setValueAtTime(2, ctx.currentTime);
    trafficPanner.positionZ.setValueAtTime(-8, ctx.currentTime);
    
    const trafficGain = ctx.createGain();
    trafficGain.gain.setValueAtTime(0.4, ctx.currentTime); // Distant environmental pressure

    trafficSource.connect(trafficPanner);
    trafficPanner.connect(trafficGain);
    trafficGain.connect(ctx.destination);

    // Start playback nodes
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
        listener.upY.setValueAtTime(up.y, audioContextRef.current.currentTime);
        listener.upZ.setValueAtTime(up.z, audioContextRef.current.currentTime);
      }
    }
  });

  return null;
}

// 3D Panoramic Sphere mapping for Luxury Grand Drawing Room Layout
function DrawingRoomScene() {
  const texture = useTexture('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2500&q=80');
  return (
    <Sphere args={[500, 64, 40]} scale={[-1, 1, 1]}>
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} toneMapped={false} />
    </Sphere>
  );
}

export default function SpatialAudioTour() {
  const [is3DMode, setIs3DMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <section className="w-full min-h-screen bg-slate-950 text-white font-sans flex items-center justify-center p-4 md:p-12 relative overflow-hidden">
      
      {/* Decorative Branding Accents */}
      <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl w-full bg-slate-900/40 border border-slate-900 rounded-[32px] p-6 md:p-8 backdrop-blur-xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* LEFT COLUMN: Editorial Architecture Metadata */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[10px] font-bold tracking-[0.2em] uppercase rounded-md mb-6 w-fit">
            <Sparkles size={11} className="text-blue-400" /> Premium Listing
          </div>
          
          <h2 className="text-3xl md:text-4xl font-light font-serif tracking-tight leading-tight mb-3">
            The Obsidian <br />
            <span className="font-sans font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-blue-500 tracking-tighter">Grand Salon.</span>
          </h2>

          <p className="text-slate-400 flex items-center gap-1.5 text-xs font-light mb-6">
            <MapPin size={13} className="text-slate-500" /> Fifth Ave, New York • ID: #4092
          </p>

          <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed mb-8">
            An masterfully crafted architectural showcase drawing room. Features full double-height panoramic glass parameters, curated imported stones, and standalone structural layout spaces.
          </p>

          <div className="p-4 bg-slate-950/60 border border-slate-900 rounded-2xl flex justify-between items-center">
            <div>
              <span className="block text-[9px] font-mono text-slate-500 tracking-wider uppercase">Asset Value</span>
              <span className="text-xl font-black tracking-tight text-white">$12,500,000</span>
            </div>
            <div className="text-right">
              <span className="block text-[9px] font-mono text-slate-500 tracking-wider uppercase">Layout Space</span>
              <span className="text-xs font-bold text-slate-300">4,600 sqft</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Media Deck Wrapper */}
        <div className="lg:col-span-8 w-full h-[400px] md:h-[500px] bg-slate-950 rounded-2xl border border-slate-800/60 overflow-hidden relative group">
          
          {!is3DMode ? (
            /* LAYER A: Premium 2D Editorial Image Preview Cover */
            <div className="absolute inset-0 w-full h-full">
              <img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80" 
                alt="Luxury Drawing Room Cover" 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-[1.5s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              {/* Central Trigger Action Pulse Button Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/20 backdrop-blur-[1px]">
                <button
                  onClick={() => setIs3DMode(true)}
                  className="px-6 py-3.5 bg-slate-900/90 hover:bg-blue-600 text-white font-mono text-xs font-bold tracking-[0.2em] uppercase rounded-xl border border-white/10 shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-98 flex items-center gap-3 backdrop-blur-md"
                >
                  <Maximize2 size={14} className="animate-pulse" />
                  <span>Explore 3D Spatial Audio</span>
                </button>
              </div>
            </div>
          ) : (
            /* LAYER B: Immersive Core 3D Scene Viewport */
            <div className="w-full h-full relative">
              <Canvas camera={{ position: [0, 0, 0.1], fof: 70 }}>
                <DrawingRoomScene />
                
                <OrbitControls 
                  enableZoom={false} 
                  enablePan={false} 
                  rotateSpeed={-0.3} 
                />

                <SpatialAudioEngine isMuted={isMuted} />
              </Canvas>

              {/* Dynamic Micro-Indicators Layer */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none bg-slate-950/80 border border-slate-800/80 backdrop-blur-md p-3 rounded-xl flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[9px] font-mono text-blue-400 tracking-widest uppercase font-black">VR Environment Active</span>
                </div>
                <span className="text-[10px] text-slate-400 font-light font-sans">Turn left for sink splash • Turn right for road traffic</span>
              </div>

              {/* Media Interactive Dock Widgets */}
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-xl border transition-all duration-300 backdrop-blur-md ${
                    isMuted 
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' 
                      : 'bg-slate-900/90 border-slate-800 text-blue-400 hover:border-blue-500/40'
                  }`}
                  title={isMuted ? "Unmute Sound" : "Mute Space"}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                
                <button
                  onClick={() => setIs3DMode(false)}
                  className="p-3 bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-xl text-xs font-mono tracking-wider transition-all duration-300 backdrop-blur-md"
                >
                  Exit 3D
                </button>
              </div>

              {/* Navigation Center Tip Badge */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none hidden md:flex items-center gap-2 bg-slate-950/80 border border-slate-800/80 backdrop-blur-md text-[9px] font-mono font-bold px-4 py-2 rounded-lg tracking-wider text-slate-400">
                <Move size={12} className="text-blue-400 animate-bounce" />
                <span>Drag inside window to explore</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}