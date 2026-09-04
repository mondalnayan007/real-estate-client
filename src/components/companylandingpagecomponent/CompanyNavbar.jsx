import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router';
import { 
  FaTerminal, 
  FaBars, 
  FaXmark, 
  FaArrowRight, 
  FaUser, 
  FaRightFromBracket, 
  FaShieldHalved 
} from 'react-icons/fa6';
import { FaSignInAlt } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';


const CompanyNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userInfo,setUserInfo] = useState({});
  const { logOut } = useContext(AuthContext)
  const profileRef = useRef(null);
 const userData = userInfo[0];
 console.log(userData);


  const {authUser} = useContext(AuthContext);
  console.log(authUser);

  const baseUrl = 'http://localhost:4000'


  if(authUser){
     useEffect(()=>{
      fetch(`${baseUrl}/agents?email=${authUser.email}`)
      .then(res=> res.json())
      .then(data=>setUserInfo(data))
     },[authUser])
  }

 

  const handleLogout = () => {
    setIsProfileOpen(false);
    logOut();
    // আপনার Logout Function টি এখানে কল করুন (যেমন: logOut())
  };

  // ড্রপডাউনের বাইরে ক্লিক করলে মেনু বন্ধ করার জন্য Event Listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/70 backdrop-blur-md border-b border-slate-900/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* 🚀 Brand Logo Section */}
          <Link to="/" className="flex items-center gap-2.5 select-none group">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform duration-300">
              <FaTerminal size={14} />
            </div>
            <span className="text-xl font-black tracking-wider text-white">
              PRIME<span className="text-blue-500">ESTATES</span>
            </span>
            <span className="bg-blue-500/10 text-blue-400 text-[9px] font-bold uppercase px-2 py-0.5 rounded-md border border-blue-500/20 tracking-wider">
              SaaS Core
            </span>
          </Link>
          
          {/* 📡 Desktop Link Matrix */}
          <div className="hidden md:flex items-center gap-8 font-medium text-xs uppercase tracking-wider text-slate-400">
            {menuLinks.map((link, idx) => (
              <a 
                key={idx} 
                href={link.href} 
                className="hover:text-white transition-colors relative py-2 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* 🔒 Gateway Action / User Profile Section */}
          <div className="hidden md:flex items-center gap-6">
            {authUser ? (
              /* User Dropdown */
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 focus:outline-none group p-1.5 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900/50 transition-all"
                >
                  {authUser.photoURL || userData?.avatar ? (
                    <img 
                      src={authUser.photoURL || userData.avatar} 
                      alt="User Avatar" 
                      className="w-8 h-8 rounded-lg object-cover ring-2 ring-blue-500/30"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-xs">
                      <FaUser size={13} />
                    </div>
                  )}
                  <div className="text-left pr-1">
                    <p className="text-xs font-bold text-slate-200 leading-none group-hover:text-blue-400 transition-colors">
                      {authUser.displayName || userData?.name || 'User Profile'}
                    </p>
                  </div>
                </button>

                {/* Profile Popover / Modal Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-3 border-b border-slate-800/80">
                      <p className="text-xs font-bold text-white truncate">{authUser.displayName || userData?.name || 'User'}</p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{authUser.email}</p>
                    </div>

                    <div className="p-1.5">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all"
                      >
                        <FaShieldHalved size={13} className="text-blue-400" /> Dashboard & Profile
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-all"
                      >
                        <FaRightFromBracket size={13} /> Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Non-logged in action buttons */
              <>
                <Link 
                  to="/signin" 
                  className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider transition-colors flex items-center gap-1.5 group"
                >
                  <FaSignInAlt size={12} className="text-slate-500 group-hover:text-blue-400 transition-colors" /> Sign In
                </Link>
                <Link 
                  to={'/register'} 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all flex items-center gap-1.5 group"
                >
                  Activate Workspace <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </>
            )}
          </div>

          {/* 📱 Mobile Menu Trigger */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-slate-400 hover:text-white p-2 focus:outline-none bg-slate-900 border border-slate-800 rounded-xl transition-all"
            >
              {isOpen ? <FaXmark size={16} /> : <FaBars size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* 📥 Mobile Expansion Drawer */}
      {isOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-lg border-b border-slate-900 px-4 pt-4 pb-8 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1">
            {menuLinks.map((link, idx) => (
              <a 
                key={idx} 
                href={link.href} 
                onClick={() => setIsOpen(false)} 
                className="block font-bold text-slate-400 hover:text-white py-3 border-b border-slate-900/60 text-xs uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <div className="pt-2 space-y-3">
            {authUser ? (
              <>
                <div className="flex items-center gap-3 p-3 bg-slate-900 border border-slate-800 rounded-xl">
                  {authUser.photoURL || userData?.avatar ? (
                    <img src={authUser.photoURL || userData?.avatar} alt="User Avatar" className="w-9 h-9 rounded-lg object-cover" />
                  ) : (
                    <div className="w-9 h-9 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                      <FaUser size={14} />
                    </div>
                  )}
                  <div className="truncate">
                    <p className="text-xs font-bold text-white truncate">{authUser.displayName || userData?.name || 'User Profile'}</p>
                    <p className="text-[10px] text-slate-400 truncate">{authUser.email}</p>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 text-xs font-bold text-slate-200 py-3 bg-slate-900 border border-slate-800 rounded-xl"
                >
                  <FaShieldHalved size={13} className="text-blue-400" /> Go to Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 text-xs font-bold text-rose-400 py-3 bg-rose-500/10 border border-rose-500/20 rounded-xl"
                >
                  <FaRightFromBracket size={13} /> Log Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider py-3 bg-slate-900 border border-slate-800 rounded-xl"
                >
                  <FaSignInAlt size={12} /> Account Sign In
                </Link>
                <Link 
                  to={'/register'} 
                  onClick={() => setIsOpen(false)} 
                  className="block text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-blue-500/10"
                >
                  Create Your Website
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default CompanyNavbar;