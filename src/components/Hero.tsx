
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAssetPath } from '../utils/path-utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [imageError, setImageError] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setTimeout(() => {
      setAnimationComplete(true);
    }, 300);
  }, []);

  return (
    <section id="home" className="relative overflow-hidden pt-0 pb-8">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-red-900/30 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-red-700/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '-2s' }}></div>
      </div>

      <div className="container mx-auto px-5 md:px-6 z-10 pt-16 md:pt-16">
        <div className={`flex flex-col ${isMobile ? 'gap-8' : 'md:flex-row items-center justify-between gap-10'}`}>
          <div className={`${isMobile ? 'w-full' : 'md:w-3/5'} text-center md:text-left ${animationComplete ? 'animate-scale-in' : 'opacity-0'}`}>
            <div className="inline-block text-xs font-semibold bg-red-900/50 text-white px-3 py-1 rounded-full mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              RNSIT's Premier Tech Club
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 glow-text animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <span className="text-gradient">Evolve</span>X
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-200 mb-6 md:mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <span className="italic">Evolving Beyond Limits</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-300 mb-8 mx-auto md:mx-0 max-w-xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Join the revolution of innovation, technology, and collaboration at RNSIT's newest and most ambitious technical club.
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <Link 
                to="/events/techfest-2025"
                className="button-glow px-5 py-3 md:px-6 md:py-3 bg-gradient-to-r from-red-700 to-red-600 text-white rounded-lg font-medium animate-pulse-glow shadow-lg min-w-[140px] text-center"
              >
                TechFest 2025
              </Link>
              <button 
                className="button-glow px-5 py-3 md:px-6 md:py-3 bg-black/50 border border-white/20 text-white rounded-lg font-medium hover:bg-black/80 transition-all shadow-lg min-w-[140px]"
                onClick={() => {
                  document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Meet Our Team
              </button>
            </div>
          </div>
          
          <div className={`${isMobile ? 'w-full mt-2' : 'md:w-2/5'} ${animationComplete ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
            <div className="relative enhanced-hover-zoom max-w-xs sm:max-w-sm mx-auto">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-900 rounded-2xl blur opacity-50 animate-pulse-glow"></div>
              <div className="glass-card rounded-2xl overflow-hidden p-1">
                {!imageError ? (
                  <img 
                    src={getAssetPath("evolve.jpeg")} 
                    alt="EvolveX Activities" 
                    className="w-full h-auto rounded-xl object-cover transform transition-transform duration-300 hover:scale-110"
                    onError={(e) => {
                      console.log("Image failed to load:", getAssetPath("evolve.jpeg"));
                      setImageError(true);
                      e.currentTarget.src = "https://via.placeholder.com/600x400/111/333?text=EvolveX";
                    }}
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-800 rounded-xl flex items-center justify-center text-red-400">
                    <p className="text-xl font-bold">EvolveX</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
