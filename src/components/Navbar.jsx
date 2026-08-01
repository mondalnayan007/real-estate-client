import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link, NavLink, useLocation } from 'react-router-dom'; // 👈 useLocation ইমপোর্ট করা হয়েছে
import { Home, Menu, X, LogOut, LayoutGrid, LogIn, ChevronDown } from 'lucide-react';
import { SettingsContext } from '../context/SettingsContext';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // 1. Location & Contexts
  const location = useLocation(); // 👈 বর্তমান পেজের পাথ জানার জন্য
  const { settings } = useContext(SettingsContext);
  const { adminUser, clientUser, logOutAdmin, logOutClient } = useContext(AuthContext);

  const navigate = useNavigate();

  // 💡 চেক করা হচ্ছে বর্তমান পেজটি হোম পেজ কিনা
  const isHomePage = location.pathname === '/';

  // 💡 যদি ইউজার স্ক্রোল করে অথবা অন্য কোনো পেজে থাকে (হোম পেজ ছাড়া), তবে Solid White Theme একটিভ হবে
  const isSolidNavbar = isScrolled || !isHomePage;

  // 💡 বর্তমান একটিভ ইউজার ও তার রোল ডিটেক্ট করা
  const currentUser = adminUser || clientUser;
  const role = adminUser ? 'admin' : clientUser ? 'client' : null;

  // Scroll handler for background color change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // 🚪 Logout Handler
  const handleLogoutAction = async () => {
    try {
      if (role === 'admin') {
        await logOutAdmin();
      } else {
        logOutClient();
      }
      setProfileOpen(false);
      setIsOpen(false);
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const dashboardPath = role === 'admin' ? '/admin/dashboard' : '/dashboard';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isSolidNavbar
          ? 'bg-white/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-gray-100 py-4'
          : 'bg-gradient-to-b from-black/40 via-black/10 to-transparent backdrop-blur-[2px] py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex justify-between items-center">

          {/* Brand Logo */}
          {settings ? (
            <div
              className={`flex gap-2 items-center cursor-pointer font-bold ${isSolidNavbar ? 'text-gray-900' : 'text-white'
                }`}
              onClick={() => { navigate('/'); closeMenu(); }}
            >
              <img className='h-8 w-10 object-contain' src={settings.logo} alt="Logo" />
              <span className="font-serif font-normal italic tracking-wide">{settings.brandName}</span>
            </div>
          ) : (
            <div
              className={`flex items-center gap-2.5 font-sans font-black text-2xl tracking-tight cursor-pointer select-none transition-transform duration-300 active:scale-95 ${isSolidNavbar ? 'text-[#185F35]' : 'text-white'
                }`}
              onClick={() => { navigate('/'); closeMenu(); }}
            >
              <Home className={`h-6 w-6 transition-colors duration-300 ${isSolidNavbar ? 'text-[#185F35]' : 'text-white'}`} />
              <span className="font-serif font-normal italic tracking-wide">Prime<span className="font-sans font-black not-italic tracking-tight">Estates</span></span>
            </div>
          )}

          {/* Navigation Links (Desktop) */}
          <div className={`hidden md:flex gap-8 text-sm font-semibold tracking-wide uppercase transition-colors duration-300 ${isSolidNavbar ? 'text-gray-700' : 'text-white/90'
            }`}>
            <NavLink to={'/'} className={({ isActive }) => isActive ? "text-[#007b57] font-bold" : ""}>Home</NavLink>
            <NavLink to={'/projects'} className={({ isActive }) => isActive ? "text-[#007b57] font-bold" : ""}>Projects</NavLink>
            <NavLink to={'/team'} className={({ isActive }) => isActive ? "text-[#007b57] font-bold" : ""}>Team</NavLink>
            <NavLink to={'/about'} className={({ isActive }) => isActive ? "text-[#007b57] font-bold" : ""}>About</NavLink>
            <NavLink to={'/blog'} className={({ isActive }) => isActive ? "text-[#007b57] font-bold" : ""}>Blog</NavLink>
            <NavLink to={'/contact'} className={({ isActive }) => isActive ? "text-[#007b57] font-bold" : ""}>Contact</NavLink>
          </div>

          {/* Desktop Buttons Wrapper */}
          <div className="hidden md:flex items-center gap-4 ">
            <div className='aura aura-dual text-blue-400 rounded-full'>
              <button className="bg-[#007b57] text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#006245] transition-all duration-300 shadow-[0_4px_15px_rgba(0,123,87,0.2)] active:scale-95">
                Property Price Predictor
              </button>
            </div>


            {/* 🌟 DESKTOP AUTH BUTTON / PROFILE DROPDOWN */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${isSolidNavbar
                    ? 'bg-gray-100 border-gray-200 text-gray-800 hover:bg-gray-200'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                    }`}
                >
                  <div className="w-7 h-7 bg-[#007b57] text-white font-bold text-xs rounded-full flex items-center justify-center uppercase">
                    {currentUser.name ? currentUser.name[0] : currentUser.email ? currentUser.email[0] : 'U'}
                  </div>
                  <span className="text-xs font-semibold max-w-[100px] truncate">
                    {currentUser.name || 'Account'}
                  </span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown Menu */}
                {profileOpen && (
                  <div
                    className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 text-gray-800 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setProfileOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs font-bold text-gray-900 truncate">
                        {currentUser.name || 'User'}
                      </p>
                      <p className="text-[10px] text-[#007b57] font-extrabold uppercase tracking-wider mt-0.5">
                        {role} Mode
                      </p>
                    </div>

                    <Link
                      to={dashboardPath}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold hover:bg-gray-50 transition-colors"
                    >
                      <LayoutGrid size={15} className="text-[#007b57]" />
                      <span>Dashboard</span>
                    </Link>

                    <button
                      onClick={handleLogoutAction}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left"
                    >
                      <LogOut size={15} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-sm active:scale-95 ${isSolidNavbar
                  ? 'bg-amber-500 text-white hover:bg-amber-600'
                  : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
              >
                <LogIn size={15} />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            className="md:hidden p-1.5 rounded-lg transition-colors focus:outline-none z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="text-gray-800" size={24} />
            ) : (
              <Menu className={isSolidNavbar ? 'text-gray-800' : 'text-white'} size={24} />
            )}
          </button>
        </div>

        {/* Mobile Side-Drawer Overlay Screen */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl w-full absolute top-full left-0 shadow-2xl border-b border-gray-100 py-6 flex flex-col items-center gap-4 text-gray-800 font-semibold text-sm uppercase tracking-wider animate-in fade-in slide-in-from-top-4 duration-300 z-50">
            <Link to={'/'} onClick={closeMenu}>Home</Link>
            <Link to={'/projects'} onClick={closeMenu}>Projects</Link>
            <Link to={'/team'} onClick={closeMenu}>Team</Link>
            <Link to={'/about'} onClick={closeMenu}>About</Link>
            <Link to={'/blog'} onClick={closeMenu}>Blog</Link>
            <Link to={'/contact'} onClick={closeMenu}>Contact</Link>

            <div className="w-4/5 h-[1px] bg-gray-100 my-1"></div>

            <div className="aura text-[#7b7300] w-4/5 flex justify-center">
              <button
                onClick={closeMenu}
                className="bg-[#007b57] text-white px-5 py-3 rounded-full w-full text-center text-xs font-bold tracking-widest uppercase shadow-md active:scale-95 transition-all"
              >
                Property Price Predictor
              </button>
            </div>

            {/* 🌟 MOBILE AUTH / PROFILE INTERFACE */}
            {currentUser ? (
              <div className="w-4/5 flex flex-col items-center gap-3 bg-gray-50/80 p-4 rounded-2xl border border-gray-100 shadow-sm mt-1">
                <div className="flex items-center gap-3 w-full px-1">
                  <div className="h-10 w-10 rounded-full bg-[#007b57] text-white font-bold flex items-center justify-center text-sm uppercase">
                    {currentUser.name ? currentUser.name[0] : 'U'}
                  </div>
                  <div className="text-left overflow-hidden">
                    <p className="text-xs font-bold text-gray-900 leading-tight tracking-wide uppercase truncate">
                      {currentUser.name || 'User'}
                    </p>
                    <p className="text-[10px] font-mono text-[#007b57] capitalize font-bold mt-0.5 tracking-wider">
                      {role} Account
                    </p>
                  </div>
                </div>

                <Link
                  to={dashboardPath}
                  onClick={closeMenu}
                  className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold tracking-wider rounded-xl shadow-sm text-center flex items-center justify-center gap-2"
                >
                  <LayoutGrid size={15} />
                  <span>Go to Dashboard</span>
                </Link>

                <button
                  onClick={handleLogoutAction}
                  className="w-full py-2.5 bg-rose-50 hover:bg-rose-100/70 text-rose-600 text-xs font-bold tracking-wider rounded-xl transition flex items-center justify-center gap-2"
                >
                  <LogOut size={15} />
                  <span>Logout Session</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="border-2 border-blue-600 text-blue-600 px-5 py-2.5 rounded-full w-4/5 text-center text-xs font-bold tracking-widest uppercase hover:bg-blue-50 transition shadow-sm flex items-center justify-center gap-2"
              >
                <LogIn size={15} />
                <span>Login</span>
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40 md:hidden"
          onClick={closeMenu}
        />
      )}
    </>
  );
}