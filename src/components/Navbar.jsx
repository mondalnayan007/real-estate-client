import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Menu, X, LogOut, LayoutGrid } from 'lucide-react';
import { NavLink } from 'react-router';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoutAction = () => {
    setProfileOpen(false);
    setIsOpen(false);
    logout();
    navigate('/');
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-gray-100 py-4' 
          : 'bg-gradient-to-b from-black/40 via-black/10 to-transparent backdrop-blur-[2px] py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex justify-between items-center">
        
        {/* Brand Logo */}
        <div 
          className={`flex items-center gap-2.5 font-sans font-black text-2xl tracking-tight cursor-pointer select-none transition-transform duration-300 active:scale-95 ${
            isScrolled ? 'text-blue-600' : 'text-white'
          }`} 
          onClick={() => navigate('/')}
        >
          <Home className={`h-6 w-6 transition-colors duration-300 ${isScrolled ? 'text-blue-600' : 'text-blue-400'}`} />
          <span className="font-serif font-normal italic tracking-wide">Prime<span className="font-sans font-black not-italic tracking-tight">Estates</span></span>
        </div>
        
        {/* Navigation Links */}
        <div className={`hidden md:flex gap-8 text-sm font-semibold tracking-wide uppercase ${isScrolled ? 'text-gray-700' : 'text-white/90'}`}>
          <NavLink to={'/'}>Home</NavLink>
          <NavLink to={'/projects'}>Projects</NavLink>
          <NavLink to={'/team'}>Team</NavLink>
          <NavLink to={'/about'}>About</NavLink>
          <NavLink to={'/blog'}>Blog</NavLink>
        </div>

        {/* Desktop Buttons Wrapper */}
        <div className="hidden md:flex items-center gap-5">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase hover:from-blue-500 hover:to-blue-600 transition-all duration-300 shadow-[0_4px_15px_rgba(37,99,235,0.2)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.3)] active:scale-98">
            Property Price Predictor
          </button>

          {/* Dynamic Authentication Module Placement */}
          <div className="relative">
            {currentUser ? (
              <div className="relative flex items-center">
                {/* Logged In State: Render Profile Avatar Image */}
                <button 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="h-10 w-10 rounded-full border-2 border-blue-600 p-0.5 hover:border-blue-400 hover:scale-105 transition-all duration-300 overflow-hidden bg-slate-800 cursor-pointer shadow-md"
                >
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name || 'Profile'} 
                    className="w-full h-full object-cover rounded-full"
                  />
                </button>

                {/* Profile Dropdown Menu Context Window */}
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-4 w-52 bg-slate-950/95 backdrop-blur-xl border border-slate-800 p-2 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                    <div className="px-3 py-2.5 border-b border-slate-800/60 mb-1.5">
                      <p className="text-xs font-bold text-white truncate tracking-wide">{currentUser.name}</p>
                      <p className="text-[9px] font-mono text-blue-400 uppercase font-extrabold tracking-wider mt-1 bg-blue-500/10 inline-block px-2 py-0.5 rounded">{currentUser.role}</p>
                    </div>
                    
                    {currentUser.role === 'admin' && (
                      <button 
                        onClick={() => { setProfileOpen(false); navigate('/admin/dashboard'); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:bg-slate-900 hover:text-white rounded-lg transition-all duration-200 text-left"
                      >
                        <LayoutGrid size={13} className="text-slate-400" /> Dashboard
                      </button>
                    )}

                    <button 
                      onClick={handleLogoutAction}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all duration-200 text-left mt-1"
                    >
                      <LogOut size={13} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Logged Out State: Just show 'Sign Up' */
              <Link 
                to="/signup" 
                className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
                  isScrolled 
                    ? 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-sm' 
                    : 'border-white/80 text-white hover:bg-white hover:text-slate-900 shadow-none'
                }`}
              >
                Sign Up
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button 
          className="md:hidden p-1.5 rounded-lg transition-colors focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className={isScrolled ? 'text-gray-800' : 'text-white'} size={24} />
          ) : (
            <Menu className={isScrolled ? 'text-gray-800' : 'text-white'} size={24} />
          )}
        </button>
      </div>

      {/* Mobile Side-Drawer Overlay Screen */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl w-full absolute top-full left-0 shadow-2xl border-b border-gray-100 py-6 flex flex-col items-center gap-4 text-gray-800 font-semibold text-sm uppercase tracking-wider animate-in fade-in slide-in-from-top-4 duration-300">
          {['Home', 'Vision', 'Projects', 'Reviews'].map((item) => (
            <a 
              key={item} 
              href="#" 
              onClick={() => setIsOpen(false)} 
              className="hover:text-blue-600 transition py-1"
            >
              {item}
            </a>
          ))}
          
          <div className="w-4/5 h-[1px] bg-gray-100 my-2"></div>
          
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-3 rounded-full w-4/5 text-center text-xs font-bold tracking-widest uppercase shadow-md active:scale-95 transition-all">
            Contact Us
          </button>

          {/* Mobile Profile Display Interface States */}
          {currentUser ? (
            <div className="w-4/5 flex flex-col items-center gap-3.5 bg-gray-50/80 p-4 rounded-2xl border border-gray-100 shadow-sm mt-2">
              <div className="flex items-center gap-3 w-full px-1">
                <img src={currentUser.avatar} alt="Profile" className="h-11 w-11 rounded-full border-2 border-blue-600 object-cover p-0.5" />
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-900 leading-tight tracking-wide uppercase">{currentUser.name}</p>
                  <p className="text-[10px] font-mono text-blue-600 capitalize font-bold mt-0.5 tracking-wider">{currentUser.role}</p>
                </div>
              </div>
              {currentUser.role === 'admin' && (
                <button 
                  onClick={() => { setIsOpen(false); navigate('/admin/dashboard'); }}
                  className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold tracking-wider rounded-xl shadow-sm hover:bg-gray-50 transition"
                >
                  Go to Dashboard
                </button>
              )}
              <button 
                onClick={handleLogoutAction}
                className="w-full py-2.5 bg-rose-50 hover:bg-rose-100/70 text-rose-600 text-xs font-bold tracking-wider rounded-xl transition"
              >
                Logout Session
              </button>
            </div>
          ) : (
            <Link 
              to="/signup" 
              onClick={() => setIsOpen(false)}
              className="border-2 border-blue-600 text-blue-600 px-5 py-2.5 rounded-full w-4/5 text-center text-xs font-bold tracking-widest uppercase hover:bg-blue-50 transition shadow-sm"
            >
              Sign Up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}