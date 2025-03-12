
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        scrolled ? "nav-glass py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/rnsit-logo.png" 
            alt="RNSIT Logo" 
            className="h-10 mr-3" 
          />
          <span className="text-xl font-bold text-gradient">EvolveX</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {["home", "about", "team", "events", "contact"].map((item) => (
            <button 
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-white hover:text-red-400 transition-colors uppercase text-sm font-medium tracking-wider"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden text-white p-1"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`fixed inset-0 bg-black/90 backdrop-blur-md z-50 transition-all duration-300 flex flex-col justify-center items-center md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <button 
          className="absolute top-5 right-5 text-white"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
        
        <div className="flex flex-col space-y-6 items-center">
          {["home", "about", "team", "events", "contact"].map((item) => (
            <button 
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-white hover:text-red-400 transition-colors uppercase text-lg font-medium tracking-wider"
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
