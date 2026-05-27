import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Menu, X, LogOut, LayoutGrid } from 'lucide-react';

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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Brand Logo */}
        <div className={`flex items-center gap-2 font-bold text-2xl cursor-pointer select-none ${isScrolled ? 'text-blue-600' : 'text-white'}`} onClick={() => navigate('/')}>
          <Home className="h-7 w-7" />
          <span>PrimeEstates</span>
        </div>
        
        {/* Navigation Links */}
        <div className={`hidden md:flex gap-8 font-medium ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
          <a href="#" className="hover:text-blue-500 transition">Home</a>
          <a href="#" className="hover:text-blue-500 transition">Vision</a>
          <a href="#" className="hover:text-blue-500 transition">Projects</a>
          <a href="#" className="hover:text-blue-500 transition">Reviews</a>
        </div>

        {/* Desktop Buttons Wrapper */}
        <div className="hidden md:flex items-center gap-4">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition">
            Contact Us
          </button>

          {/* Dynamic Authentication Module Placement */}
          <div className="relative">
            {currentUser ? (
              <div className="relative flex items-center">
                {/* Logged In State: Render Profile Avatar Image */}
                <button 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="h-10 w-10 rounded-full border-2 border-blue-600 p-0.5 hover:border-blue-400 transition overflow-hidden bg-slate-800 cursor-pointer"
                >
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name || 'Profile'} 
                    className="w-full h-full object-cover rounded-full"
                  />
                </button>

                {/* Profile Dropdown Menu Context Window */}
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-3 w-48 bg-slate-900 border border-slate-800 p-2 rounded-xl shadow-2xl z-50">
                    <div className="px-3 py-2 border-b border-slate-800/60 mb-1">
                      <p className="text-xs font-semibold text-white truncate">{currentUser.name}</p>
                      <p className="text-[10px] font-mono text-blue-400 uppercase font-bold mt-0.5">{currentUser.role}</p>
                    </div>
                    
                    {currentUser.role === 'admin' && (
                      <button 
                        onClick={() => { setProfileOpen(false); navigate('/admin/dashboard'); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg transition text-left"
                      >
                        <LayoutGrid size={12} /> Dashboard
                      </button>
                    )}

                    <button 
                      onClick={handleLogoutAction}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-lg transition text-left"
                    >
                      <LogOut size={12} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Logged Out State: Just show 'Sign Up' */
              <Link 
                to="/signup" 
                className={`px-5 py-2 rounded-full font-medium transition border ${
                  isScrolled 
                    ? 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white' 
                    : 'border-white text-white hover:bg-white/10'
                }`}
              >
                Sign Up
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button className="md:hidden text-gray-800" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className={isScrolled ? 'text-gray-800' : 'text-white'} /> : <Menu className={isScrolled ? 'text-gray-800' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Side-Drawer Overlay Screen */}
      {isOpen && (
        <div className="md:hidden bg-white w-full absolute top-full left-0 shadow-lg py-6 flex flex-col items-center gap-4 text-gray-800 font-medium">
          <a href="#" onClick={() => setIsOpen(false)} className="hover:text-blue-500 transition">Home</a>
          <a href="#" onClick={() => setIsOpen(false)} className="hover:text-blue-500 transition">Vision</a>
          <a href="#" onClick={() => setIsOpen(false)} className="hover:text-blue-500 transition">Projects</a>
          <a href="#" onClick={() => setIsOpen(false)} className="hover:text-blue-500 transition">Reviews</a>
          
          <div className="w-4/5 h-[1px] bg-gray-100 my-1"></div>
          
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full w-4/5 text-center font-medium">
            Contact Us
          </button>

          {/* Mobile Profile Display Interface States */}
          {currentUser ? (
            <div className="w-4/5 flex flex-col items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-3 w-full px-2">
                <img src={currentUser.avatar} alt="Profile" className="h-10 w-10 rounded-full border border-blue-600 object-cover" />
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-800 leading-tight">{currentUser.name}</p>
                  <p className="text-xs font-mono text-blue-600 capitalize font-medium">{currentUser.role}</p>
                </div>
              </div>
              {currentUser.role === 'admin' && (
                <button 
                  onClick={() => { setIsOpen(false); navigate('/admin/dashboard'); }}
                  className="w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold rounded-xl transition"
                >
                  Go to Dashboard
                </button>
              )}
              <button 
                onClick={handleLogoutAction}
                className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-xl transition"
              >
                Logout Session
              </button>
            </div>
          ) : (
            <Link 
              to="/signup" 
              onClick={() => setIsOpen(false)}
              className="border border-blue-600 text-blue-600 px-5 py-2 rounded-full w-4/5 text-center font-medium hover:bg-blue-50 transition"
            >
              Sign Up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}