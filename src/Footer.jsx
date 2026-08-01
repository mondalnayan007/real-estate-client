import React, { useEffect, useState, useContext } from 'react';
import { Home, MapPin, Mail, Clock, Send } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { SettingsContext } from './context/SettingsContext';
import { useNavigate } from 'react-router';

export default function Footer() {
  const { settings } = useContext(SettingsContext);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { 
    address, brandName, email, facebookUrl, footerAboutText, 
    instagramUrl, linkedinUrl, logo, twitterUrl, workingHours, youtubeUrl 
  } = settings || {};

  const navigate = useNavigate();

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="bg-[#052316] text-slate-300 pt-16 pb-8 px-6 font-sans border-t border-[#0a3824]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        
        {/* 1️⃣ Brand Info Column */}
        <div className="space-y-4">
          {settings ? (
            <div className="flex items-center gap-3">
              {logo && <img className="h-10 w-auto object-contain" src={logo} alt={brandName || "Logo"} />}
              <span className="font-serif font-bold text-xl text-white tracking-wide">
                {brandName || "Prime Estates"}
              </span>
            </div>
          ) : (
            <div
              className={`flex items-center gap-2.5 font-sans font-black text-2xl tracking-tight cursor-pointer select-none transition-transform duration-300 active:scale-95 ${
                isScrolled ? 'text-emerald-400' : 'text-white'
              }`}
              onClick={() => { navigate('/'); }}
            >
              <Home className="h-7 w-7 text-emerald-400" />
              <span className="font-serif font-normal italic tracking-wide">
                Prime<span className="font-sans font-black not-italic tracking-tight">Estates</span>
              </span>
            </div>
          )}

          <p className="text-sm leading-relaxed text-slate-300/80">
            {settings ? footerAboutText : "Empowering communities through compassion and dedication to making a positive difference with modern luxury properties."}
          </p>
        </div>

        {/* 2️⃣ Quick Menu Links Column */}
        <div>
          <h4 className="text-white font-bold text-lg mb-5 relative inline-block after:content-[''] after:block after:w-8 after:h-[2px] after:bg-emerald-500 after:mt-1">
            Quick Menu
          </h4>
          <ul className="space-y-3 text-sm">
            {['Home', 'About Us', 'Projects', 'Privacy Policy'].map((item, idx) => (
              <li key={idx}>
                <a href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="text-emerald-500 font-bold text-xs">›</span> {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 3️⃣ Contact Us Info Column */}
        <div>
          <h4 className="text-white font-bold text-lg mb-5 relative inline-block after:content-[''] after:block after:w-8 after:h-[2px] after:bg-emerald-500 after:mt-1">
            Contact Us
          </h4>
          <div className="space-y-4 text-sm">
            
            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-semibold mb-0.5">Address:</strong>
                <span className="text-slate-300/80">{settings ? address : "123 Luxury Way, Beverly Hills, CA 90210"}</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-semibold mb-0.5">Email:</strong>
                <span className="text-slate-300/80">{settings ? email : "support@primeestates.com"}</span>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-semibold mb-0.5">Hours:</strong>
                <span className="text-emerald-400 font-medium">{settings ? workingHours : "Mon to Fri from 9 AM to 10 PM"}</span>
              </div>
            </div>

          </div>
        </div>

        {/* 4️⃣ Newsletter Column */}
        <div>
          <h4 className="text-white font-bold text-lg mb-5 relative inline-block after:content-[''] after:block after:w-8 after:h-[2px] after:bg-emerald-500 after:mt-1">
            Newsletter
          </h4>
          <p className="text-sm mb-4 text-slate-300/80">
            Stay updated with our latest news and promotions.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full px-4 py-2.5 rounded-lg bg-[#083522] border border-[#0f4e32] text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 text-sm transition-all"
            />
            <button 
              type="submit" 
              className="w-full bg-[#00a859] hover:bg-[#008f4c] text-white font-bold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 text-sm shadow-md"
            >
              <Send size={16} /> Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* 🟢 Bottom Social & Copyright Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-[#0a3824] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p>&copy; {new Date().getFullYear()} {brandName || "PrimeEstates"}. All rights reserved.</p>
        
        {/* Social Icons (Moved to Bottom Bar as seen in image) */}
        <div className="flex items-center gap-3">
          <a href={facebookUrl || "#"} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-[#083522] hover:bg-emerald-600 text-white transition-all">
            <FaFacebookF size={14} />
          </a>
          <a href={twitterUrl || "#"} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-[#083522] hover:bg-emerald-600 text-white transition-all">
            <FaTwitter size={14} />
          </a>
          <a href={instagramUrl || "#"} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-[#083522] hover:bg-emerald-600 text-white transition-all">
            <FaInstagram size={14} />
          </a>
          <a href={linkedinUrl || "#"} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-[#083522] hover:bg-emerald-600 text-white transition-all">
            <FaLinkedinIn size={14} />
          </a>
          {youtubeUrl && (
            <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-[#083522] hover:bg-emerald-600 text-white transition-all">
              <FaYoutube size={14} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}