
import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimationComplete(true);
    }, 300);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-red-900/30 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-red-700/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '-2s' }}></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className={`md:w-1/2 text-center md:text-left ${animationComplete ? 'animate-scale-in' : 'opacity-0'}`}>
            <div className="inline-block text-xs font-semibold bg-red-900/30 text-red-200 px-3 py-1 rounded-full mb-4">
              RNSIT's Premier Tech Club
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 glow-text">
              <span className="text-gradient">Evolve</span>X
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 mb-8">
              <span className="italic">Evolving Beyond Limits</span>
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl">
              Join the revolution of innovation, technology, and collaboration at RNSIT's newest and most ambitious technical club.
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button 
                className="button-glow px-6 py-3 bg-gradient-to-r from-red-700 to-red-600 text-white rounded-lg font-medium animate-pulse-glow"
                onClick={() => {
                  document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Upcoming Events
              </button>
              <button 
                className="button-glow px-6 py-3 bg-black/50 border border-white/20 text-white rounded-lg font-medium hover:bg-black/80 transition-all"
                onClick={() => {
                  document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Meet Our Team
              </button>
            </div>
          </div>
          
          <div className={`md:w-1/2 ${animationComplete ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-900 rounded-2xl blur opacity-50 animate-pulse-glow"></div>
              <div className="glass-card rounded-2xl overflow-hidden p-1">
                <img 
                  src="/evolve-x-showcase.png" 
                  alt="EvolveX Activities" 
                  className="w-full h-auto rounded-xl"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/600x400/111/333?text=EvolveX";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
