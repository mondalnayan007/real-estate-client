import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, ShieldCheck, Sparkles } from 'lucide-react';

const CompanyContact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', mobile: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Secure Node Synced:", formState);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', mobile: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-28 bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* 🌌 Cybernetic Background Glow Matrix */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-[300px] h-[300px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 📢 Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-[11px] font-bold text-blue-400 uppercase tracking-widest">
            <Sparkles size={11} /> Global HQ Connection
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Let's Build Something <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Exceptional</span>
          </h2>
          <p className="text-slate-400 text-sm font-medium max-w-xl mx-auto">
            Have architectural questions, deployment bottlenecks, or enterprise scaling needs? Drop us a signal below.
          </p>
        </div>

        {/* 🗺️ Core Grid Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Grid Metadata / Contact Cards (4 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Direct Node Routing</h3>
              <p className="text-xs text-slate-400 font-medium">Skip the queue and interface directly with our localized regional infrastructure channels.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Card 1: Technical Mail */}
              <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-900 hover:border-slate-800 transition-all group flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                  <Mail size={18} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Corporate Communications</h4>
                  <p className="text-sm font-bold text-white font-mono">support@primeestates.com</p>
                  <p className="text-[11px] text-slate-400">Response standard token: &lt; 2 hours</p>
                </div>
              </div>

              {/* Card 2: Voice Interface */}
              <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-900 hover:border-slate-800 transition-all group flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all shrink-0">
                  <Phone size={18} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Hotline Escalations</h4>
                  <p className="text-sm font-bold text-white font-mono">+1 (800) 555-REAL</p>
                  <p className="text-[11px] text-slate-400">Mon - Fri • 09:00 - 18:00 EST</p>
                </div>
              </div>

              {/* Card 3: Global Headquarters */}
              <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-900 hover:border-slate-800 transition-all group flex items-start gap-4">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Physical Base Node</h4>
                  <p className="text-sm font-bold text-white">79 Science Park Drive, #04-01</p>
                  <p className="text-[11px] text-slate-400">Singapore Science Park I, Singapore 118256</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Secure Communication Form (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-900/30 border border-slate-900 rounded-3xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
            
            <div className="mb-6 flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-1.5">
                  <MessageSquare size={16} className="text-blue-400" /> Contact Us 
                </h3>
                <p className="text-xs text-slate-400">All outbound payloads are end-to-end sandbox verified.</p>
              </div>
            </div>

            {/* Interactive Form Engine */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="Your Name"
                    value={formState.name}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800/80 focus:border-blue-500/80 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-700 outline-none transition-all font-medium"
                  />
                </div>
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider"> Email</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="you@corporate.com"
                    value={formState.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800/80 focus:border-blue-500/80 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-700 outline-none transition-all font-medium"
                  />
                </div>
              </div>

              {/* mobile */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Mobile</label>
                <input 
                  type="text" 
                  name="mobile"
                  required
                  placeholder="e.g. Requesting API Sandbox Access"
                  value={formState.mobile}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800/80 focus:border-blue-500/80 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-700 outline-none transition-all font-medium"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Message</label>
                <textarea 
                  name="message"
                  required
                  rows="4"
                  placeholder="State the technical or business parameters of your deployment inquiry..."
                  value={formState.message}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800/80 focus:border-blue-500/80 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-700 outline-none transition-all font-medium resize-none"
                />
              </div>

              {/* Success / Submit Feedback Vector */}
              {isSubmitted ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-2 text-xs font-bold uppercase tracking-wider animate-in fade-in duration-200">
                  <ShieldCheck size={16} /> Transmission Successful! Secure Node Synced.
                </div>
              ) : (
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3.5 rounded-xl text-xs  tracking-wider shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                >
                  Send Message <Send size={12} />
                </button>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CompanyContact;