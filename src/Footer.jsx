import React from 'react';
import { Home } from 'lucide-react'; // Keep Home from lucide
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-white text-xl mb-4">
            <Home className="h-6 w-6 text-blue-500" />
            <span>PrimeEstates</span>
          </div>
          <p className="text-sm">Bringing transparency, innovation, and world-class luxury options to the modern real-estate market ecosystem.</p>
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
          <p className="text-sm mb-2">123 Luxury Way, Suite 100<br/>Beverly Hills, CA 90210</p>
          <p className="text-sm">support@primeestates.com</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition"><FaFacebook size={20}/></a>
            <a href="#" className="hover:text-white transition"><FaTwitter size={20}/></a>
            <a href="#" className="hover:text-white transition"><FaInstagram size={20}/></a>
            <a href="#" className="hover:text-white transition"><FaLinkedin size={20}/></a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-gray-800 pt-6 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} PrimeEstates. All rights reserved.</p>
      </div>
    </footer>
  );
}