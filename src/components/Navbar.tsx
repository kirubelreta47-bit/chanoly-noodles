
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import logoImg from '../public/logo/logo.png';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    return isMobile ? (location.pathname === "/" && window.scrollY === 0) : true;
  });
  const checkVisibility = (pathname: string, scrollY: number) => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      if (pathname !== "/" || scrollY > 0) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(checkVisibility(location.pathname, currentScrollY));
      setScrolled(currentScrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(checkVisibility(location.pathname, window.scrollY));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [location.pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsVisible(checkVisibility(location.pathname, window.scrollY));
  }, [location]);

  const isHome = location.pathname === "/";
  const navScrolled = scrolled || !isHome;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full md:translate-y-0"
      } ${
        navScrolled 
          ? "bg-transparent md:bg-white/95 md:backdrop-blur-md md:shadow-sm py-2" 
          : "bg-transparent py-4"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center p-1 bg-white rounded-full shadow-lg border-2 border-primary/20">
               <img 
                 src={logoImg} 
                 alt="Chanoly Logo" 
                 className="w-full h-full object-contain"
               />
            </div>
            <div className="flex flex-col">
              <span className={`text-lg sm:text-xl font-black tracking-tight leading-none ${navScrolled ? "text-black" : "text-white"}`}>
                CHANOLY
              </span>
              <span className="text-[10px] font-bold text-primary tracking-[0.3em] leading-none uppercase">SMOOTHIE & NOODLES</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {["Home", "Menu", "Gallery", "Contact"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={`text-sm font-bold uppercase tracking-wider transition-colors hover:text-primary ${
                  location.pathname === (item === "Home" ? "/" : `/${item.toLowerCase()}`)
                    ? "text-primary"
                    : navScrolled ? "text-black" : "text-white"
                }`}
              >
                {item}
              </Link>
            ))}
            <div className="relative group">
              <button 
                className="px-6 py-3 bg-primary text-white rounded-xl text-sm font-black transition-all flex items-center gap-2 shadow-lg"
              >
                <ShoppingCart size={18} />
                ORDER NOW
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col overflow-hidden">
                <a href="https://deliveraddis.com/restaurants/chanoly-noodles" target="_blank" rel="noreferrer" className="px-4 py-3 hover:bg-gray-50 text-black font-bold text-sm border-b border-gray-50">DeliverAddis</a>
                <a href="https://beudelivery.com/" target="_blank" rel="noreferrer" className="px-4 py-3 hover:bg-gray-50 text-black font-bold text-sm">beU Delivery</a>
              </div>
            </div>
          </div>


        </div>
      </div>
    </nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 text-white flex flex-col p-8 md:hidden shadow-2xl border-l-[6px] border-primary"
            style={{ backgroundColor: "#0b0b0b" }}
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white leading-none">CHANOLY</span>
                <span className="text-[9px] font-bold text-primary tracking-[0.2em] leading-none uppercase mt-1">SMOOTHIE & NOODLES</span>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)} 
                className="p-3 bg-white/10 hover:bg-primary hover:text-white rounded-full transition-colors duration-300"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col space-y-4">
              {["Home", "Menu", "Gallery", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className={`text-xl font-display font-bold uppercase tracking-wider border-b border-white/5 pb-3 transition-all duration-300 ${
                    location.pathname === (item === "Home" ? "/" : `/${item.toLowerCase()}`)
                      ? "text-primary italic translate-x-2"
                      : "text-white/80 hover:text-primary hover:translate-x-1"
                  }`}
                >
                  {item === "Contact" ? "Contact Us" : item}
                </Link>
              ))}
            </div>

            <div className="mt-auto">
               <div className="flex flex-col gap-3">
                 <a 
                  href="https://deliveraddis.com/restaurants/chanoly-noodles" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full py-4 bg-primary text-white rounded-2xl text-center font-black text-lg flex items-center justify-center gap-3 shadow-lg hover:bg-primary/90 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <ShoppingCart size={24} />
                  DeliverAddis
                </a>
                 <a 
                  href="https://beudelivery.com/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full py-4 bg-white text-black rounded-2xl text-center font-black text-lg flex items-center justify-center gap-3 shadow-lg hover:bg-neutral-100 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <ShoppingCart size={24} />
                  beU Delivery
                </a>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Mobile Hamburger Menu Toggle */}
      {!isMenuOpen && (
        <button 
          onClick={() => setIsMenuOpen(true)} 
          className="md:hidden fixed top-5 right-5 z-[60] p-3 rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80 active:scale-95 transition-all shadow-lg border border-white/10"
        >
          <Menu size={22} />
        </button>
      )}
    </>
  );
}
