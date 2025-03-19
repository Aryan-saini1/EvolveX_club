
import React, { useState, useEffect } from 'react';
import { Menu, X, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isEventPage = location.pathname.includes('/events/');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (isEventPage) {
      // Navigate to home page with the section hash
      window.location.href = `/#${id}`;
      return;
    }
    
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full z-40 transition-all duration-300",
        scrolled ? "nav-glass shadow-lg py-3" : "bg-black/60 backdrop-blur-sm py-4 md:py-5"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <Logo />
            <span className="text-xl font-bold text-gradient ml-3">EvolveX</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {isEventPage ? (
            <Link 
              to="/"
              className="text-white hover:text-red-400 transition-colors uppercase text-sm font-medium tracking-wider flex items-center nav-link"
            >
              <Home size={18} className="mr-1" /> Home
            </Link>
          ) : null}
          
          {["home", "about", "team", "events", "contact"].map((item) => (
            <button 
              key={item}
              onClick={() => isEventPage ? window.location.href = `/#${item}` : scrollToSection(item)}
              className={`text-white hover:text-red-400 transition-colors uppercase text-sm font-medium tracking-wider nav-link ${isEventPage && item === 'home' ? 'hidden' : ''}`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden text-white p-2 bg-red-900/50 rounded-md hover:bg-red-800/60 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`fixed inset-0 bg-black/95 backdrop-blur-md z-50 transition-all duration-300 flex flex-col justify-center items-center md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <button 
          className="absolute top-5 right-5 text-white bg-red-900/50 p-2 rounded-full hover:bg-red-800/60 transition-colors"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
        
        <div className="flex flex-col space-y-8 items-center">
          {isEventPage ? (
            <Link 
              to="/"
              className="text-white hover:text-red-400 transition-colors uppercase text-lg font-medium tracking-wider flex items-center nav-link-mobile"
              onClick={() => setIsOpen(false)}
            >
              <Home size={20} className="mr-2" /> Home
            </Link>
          ) : null}
          
          {["home", "about", "team", "events", "contact"].map((item) => (
            <button 
              key={item}
              onClick={() => {
                setIsOpen(false);
                isEventPage ? window.location.href = `/#${item}` : scrollToSection(item);
              }}
              className={`text-white hover:text-red-400 transition-colors uppercase text-xl font-medium tracking-wider nav-link-mobile ${isEventPage && item === 'home' ? 'hidden' : ''}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
