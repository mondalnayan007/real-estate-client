import React, { useEffect, useState } from 'react';
import { Home } from 'lucide-react'; // Keep Home from lucide
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { SettingsContext } from './context/SettingsContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router';

export default function Footer() {

    const { settings } = useContext(SettingsContext);
     const [isScrolled, setIsScrolled] = useState(false);
     const {address,brandName,copyrightText,domain,email,facebookUrl,favIcon,footerAboutText,instagramUrl,linkedinUrl,logo,pinterestUrl,title,twitterUrl,workingHours,youtubeUrl
}= settings || {}

    const navigate = useNavigate();

  // Scroll handler for background color change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          {
            settings ? 
            <div className='flex gap-2 text-white'>
              <img className='h-8 w-10' src={logo} alt="" /> 
              <span className="font-serif font-normal italic tracking-wide">{brandName}</span>
            </div>
            : 
            <div 
            className={`flex items-center gap-2.5 font-sans font-black text-2xl tracking-tight cursor-pointer select-none transition-transform duration-300 active:scale-95 ${
              isScrolled ? 'text-blue-600' : 'text-white'
            }`} 
            onClick={() => { navigate('/');  }}
          >
            <Home className={`h-6 w-6 transition-colors duration-300 ${isScrolled ? 'text-blue-600' : 'text-blue-400'}`} />
            <span className="font-serif font-normal italic tracking-wide">Prime<span className="font-sans font-black not-italic tracking-tight">Estates</span></span>
          </div>
          }
          <p className="text-sm">{settings.footerAboutText}</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Featured Properties</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Contact Info</h4>
          {
            settings? <p className="text-sm mb-2">{address}</p> 
            :
            <p className="text-sm mb-2">123 Luxury Way, Suite 100<br/>Beverly Hills, CA 90210</p>
          }
          {
            settings?<p className="text-sm">{email}</p>
            :
            <p className="text-sm">support@primeestates.com</p>
          }
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4">
            {
              settings? <a href={facebookUrl} className="hover:text-white transition"><FaFacebook size={20}/></a>
              :
              <a href="#" className="hover:text-white transition"><FaFacebook size={20}/></a>
            }
            {
              settings? <a href={twitterUrl} className="hover:text-white transition"><FaTwitter size={20}/></a>
              :
              <a href="#" className="hover:text-white transition"><FaTwitter size={20}/></a>
            }
            {
              settings? <a href={instagramUrl} className="hover:text-white transition"><FaInstagram size={20}/></a>
              :
              <a href="#" className="hover:text-white transition"><FaInstagram size={20}/></a>
            }
            {
              settings? <a href={linkedinUrl} className="hover:text-white transition"><FaLinkedin size={20}/></a>
              :
              <a href="#" className="hover:text-white transition"><FaLinkedin size={20}/></a>
            }
            
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-gray-800 pt-6 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} PrimeEstates. All rights reserved.</p>
      </div>
    </footer>
  );
}