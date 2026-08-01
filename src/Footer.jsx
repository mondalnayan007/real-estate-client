import React, { useEffect, useState, useContext } from 'react';
import { Home, MapPin, Phone, Mail, Send, Bell } from 'lucide-react';
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram, FaApple, FaGooglePlay } from 'react-icons/fa';
import { SettingsContext } from './context/SettingsContext';
import { useNavigate } from 'react-router';

export default function Footer() {
  const { settings } = useContext(SettingsContext);
  const [isScrolled, setIsScrolled] = useState(false);

  const {
    address, brandName, email,phone, facebookUrl, footerAboutText,
    instagramUrl, linkedinUrl, logo, twitterUrl, workingHours, youtubeUrl
  } = settings || {};

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="bg-[#0b3323] text-slate-200 font-sans border-t border-[#0e402c]">
      
      {/* 📌 Main Upper Footer Content */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* 1️⃣ Brand & Description Column */}
        <div className="space-y-4">
          {settings ? (
            <div className="flex items-center gap-3">
              {logo && <img className="h-10 w-auto object-contain" src={logo} alt={brandName || "Logo"} />}
              <span className="font-bold text-lg text-white tracking-wide uppercase">
                {brandName || "THE PREMIUM HOMES LTD"}
              </span>
            </div>
          ) : (
            <div
              className={`flex items-center gap-2.5 font-sans font-black text-xl tracking-tight cursor-pointer select-none transition-transform duration-300 active:scale-95 ${
                isScrolled ? 'text-[#00a859]' : 'text-white'
              }`}
              onClick={() => { navigate('/'); }}
            >
              <Home className="h-6 w-6 text-[#00a859]" />
              <span className="font-serif font-normal italic tracking-wide">
                Prime<span className="font-sans font-black not-italic tracking-tight">Estates</span>
              </span>
            </div>
          )}

          <p className="text-sm leading-relaxed text-slate-300/80">
            {settings ? footerAboutText : "Empowering communities through compassion and dedication to making a positive difference."}
          </p>

          {/* Icon list (Left-aligned under brand) */}
          <div className="flex items-center gap-2 pt-2">
            <a href={facebookUrl || "#"} className="w-8 h-8 rounded-full bg-[#124230] flex items-center justify-center text-slate-300 hover:bg-[#00a859] hover:text-white transition-all">
              <FaFacebookF size={12} />
            </a>
            <a href={linkedinUrl || "#"} className="w-8 h-8 rounded-full bg-[#124230] flex items-center justify-center text-slate-300 hover:bg-[#00a859] hover:text-white transition-all">
              <FaLinkedinIn size={12} />
            </a>
            <a href={youtubeUrl || "#"} className="w-8 h-8 rounded-full bg-[#124230] flex items-center justify-center text-slate-300 hover:bg-[#00a859] hover:text-white transition-all">
              <FaYoutube size={12} />
            </a>
            <a href={instagramUrl || "#"} className="w-8 h-8 rounded-full bg-[#124230] flex items-center justify-center text-slate-300 hover:bg-[#00a859] hover:text-white transition-all">
              <FaInstagram size={12} />
            </a>
          </div>
        </div>

        {/* 2️⃣ Quick Menu Column */}
        <div>
          <h4 className="text-white font-bold text-base mb-4">Quick Menu</h4>
          <ul className="space-y-2.5 text-sm text-slate-300">
            {['Home', 'About Us', 'Projects', 'Wishlist', 'Contact', 'Company Policies', 'App Privacy Policy'].map((menu, i) => (
              <li key={i}>
                <a href="#" className="hover:text-[#00a859] transition-colors flex items-center gap-2">
                  <span className="text-[#00a859] text-xs">›</span> {menu}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 3️⃣ Contact Us Column */}
        <div>
          <h4 className="text-white font-bold text-base mb-4">Contact Us</h4>
          <div className="space-y-4 text-sm">
            
            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#00a859] shrink-0 mt-1" />
              <div>
                <strong className="block text-white font-semibold">Address:</strong>
                <span className="text-slate-300/80">
                  {settings ? address : "Land View Commercial Center, 9th Floor 28 Gulshan North C/A, Gulshan Circle-2, Dhaka"}
                </span>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#00a859] shrink-0 mt-1" />
              <div>
                <strong className="block text-white font-semibold">Phone:</strong>
                <span className="text-slate-300/80">{settings ? phone : "+8801958253301"}</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#00a859] shrink-0 mt-1" />
              <div>
                <strong className="block text-white font-semibold">Email:</strong>
                <span className="text-slate-300/80">
                  {settings ? email : "info@dpremiumhomes.com"}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* 4️⃣ Newsletter Column */}
        <div>
          <h4 className="text-white font-bold text-base mb-4">Newsletter</h4>
          <p className="text-sm mb-4 text-slate-300/80">
            Stay updated with our latest news and promotions.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-2.5 rounded bg-[#10402e] border border-[#16543d] text-white placeholder-slate-400 focus:outline-none focus:border-[#00a859] text-sm"
            />
            <button
              type="submit"
              className="w-full bg-[#00a859] hover:bg-[#008f4c] text-white font-medium py-2.5 rounded transition-all flex items-center justify-center gap-2 text-sm shadow-md"
            >
              <Send size={15} /> Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* 🟢 Mobile App Banner Bar (ছবিতে থাকা সবুজ ব্যানার সেকশন) */}
      <div className="bg-[#008f4c] py-8 px-6 text-white relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div>
            <h3 className="text-2xl font-bold mb-1">Mobile App</h3>
            <p className="text-slate-100 text-sm mb-2">Get Your Own Home Throught Us</p>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
              <span>Get It On App Stores Now!</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            
            {/* Play Store Button */}
            <a href="#" className="flex items-center gap-3 bg-black hover:bg-gray-900 text-white px-5 py-2.5 rounded-xl transition-all">
              <FaGooglePlay size={20} />
              <div className="text-left leading-tight">
                <span className="text-[10px] uppercase block text-gray-400">Get it on</span>
                <span className="text-sm font-bold">Play Store</span>
              </div>
            </a>

            {/* App Store Button */}
            <a href="#" className="flex items-center gap-3 bg-black hover:bg-gray-900 text-white px-5 py-2.5 rounded-xl transition-all">
              <FaApple size={24} />
              <div className="text-left leading-tight">
                <span className="text-[10px] uppercase block text-gray-400">Download on the</span>
                <span className="text-sm font-bold">App Store</span>
              </div>
            </a>

          </div>

        </div>
      </div>

      {/* 📌 Bottom Copyright Bar */}
      <div className="bg-[#08291c] py-4 px-6 text-xs text-slate-400 text-left">
        <div className="max-w-7xl mx-auto">
          <p>&copy; {new Date().getFullYear()} {brandName || "The Premium Homes Ltd."} All rights reserved.</p>
        </div>
      </div>

    </footer>
  );
}