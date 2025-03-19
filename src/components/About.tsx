
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { getAssetPath } from '../utils/path-utils';

const About = () => {
  const isMobile = useIsMobile();
  const [imageError, setImageError] = useState(false);
  
  return (
    <section id="about" className="py-16 md:py-20 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-red-950/10 to-black/0 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className={`${isMobile ? 'w-full' : 'md:w-1/3'} mb-8 md:mb-0`}>
            <div className="relative hover-scale-image animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-2xl blur opacity-30 animate-pulse-glow"></div>
              <div className="glass-card rounded-2xl overflow-hidden p-1">
                {!imageError ? (
                  <img 
                    src={getAssetPath("rns-campus.jpeg")} 
                    alt="RNSIT Campus" 
                    className="w-full h-auto rounded-xl"
                    onError={(e) => {
                      console.log("Image failed to load:", getAssetPath("rns-campus.jpeg"));
                      setImageError(true);
                      e.currentTarget.src = "https://via.placeholder.com/400x300/111/333?text=RNSIT+Campus";
                    }}
                  />
                ) : (
                  <div className="w-full h-48 md:h-64 bg-gray-800 rounded-xl flex items-center justify-center text-red-400">
                    <p className="text-xl font-bold">RNSIT Campus</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className={`${isMobile ? 'w-full' : 'md:w-2/3'} animate-fade-in`} style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-center md:text-left">
              <span className="text-gradient">About</span> EvolveX
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-700 to-red-500 mb-6 mx-auto md:mx-0"></div>
            
            <p className="text-gray-300 mb-6">
              EvolveX is RNSIT's flagship technical club founded in 2025, dedicated to fostering innovation, technical excellence, and collaborative learning among students passionate about technology and engineering.
            </p>
            
            <div className="space-y-6 md:space-y-4 mb-8">
              <div className="flex flex-col md:flex-row md:items-start animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center mx-auto md:mx-0 md:mr-4 mb-3 md:mb-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-semibold text-white mb-1">Innovation Hub</h3>
                  <p className="text-gray-400">A platform for students to explore cutting-edge technologies, develop innovative solutions, and push the boundaries of what's possible.</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-start animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center mx-auto md:mx-0 md:mr-4 mb-3 md:mb-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-semibold text-white mb-1">Collaborative Community</h3>
                  <p className="text-gray-400">Building a vibrant ecosystem where students from diverse backgrounds come together to learn, share knowledge, and grow collectively.</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-start animate-fade-in" style={{ animationDelay: '0.7s' }}>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center mx-auto md:mx-0 md:mr-4 mb-3 md:mb-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-semibold text-white mb-1">Technology Leadership</h3>
                  <p className="text-gray-400">Cultivating the next generation of tech leaders through hands-on projects, workshops, hackathons, and industry collaborations.</p>
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 animate-fade-in text-center md:text-left" style={{ animationDelay: '0.8s' }}>
              EvolveX aims to create a platform where creativity meets technical expertise, preparing students to tackle real-world challenges through practical learning and meaningful collaboration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
