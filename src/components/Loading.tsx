
import React, { useState, useEffect } from 'react';

interface LoadingProps {
  onLoadComplete: () => void;
}

const Loading: React.FC<LoadingProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [lightningSparks, setLightningSparks] = useState(false);

  useEffect(() => {
    // Progress increment timer
    const intervalId = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          return prev + 2;
        }
        clearInterval(intervalId);
        setTimeout(() => {
          onLoadComplete();
        }, 600);
        return 100;
      });
    }, 60);

    // Audio for loading
    const audioElement = new Audio('/loading-sound.mp3');
    audioElement.volume = 0.3;
    audioElement.play().catch(err => console.log('Audio playback prevented:', err));

    // Lightning effect sequence
    const triggerLightning = () => {
      setLightningSparks(true);
      setTimeout(() => setLightningSparks(false), 300);
      setTimeout(() => {
        if (Math.random() > 0.5) {
          setLightningSparks(true);
          setTimeout(() => setLightningSparks(false), 200);
        }
      }, 500);
    };
    
    // Trigger initial lightning
    triggerLightning();
    
    // Random lightning flashes
    const lightningIntervalId = setInterval(() => {
      if (Math.random() > 0.7) {
        triggerLightning();
      }
    }, 800);

    // Cleanup
    return () => {
      clearInterval(intervalId);
      clearInterval(lightningIntervalId);
      audioElement.pause();
    };
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      {lightningSparks && <div className="lightning-effect"></div>}
      
      <div className="relative mb-8">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-900 rounded-xl blur opacity-70 animate-pulse"></div>
        <div className="relative z-10">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 animate-text-flicker font-tech">
            <span className="text-gradient">EVOLVE</span>
            <span className="text-white">X</span>
          </h1>
          <div className="text-sm text-white/70 text-center">
            Evolving Beyond Limits
          </div>
        </div>
      </div>
      
      <div className="w-64 h-3 bg-gray-800 rounded-full mt-8 overflow-hidden relative">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div 
          className="h-full bg-gradient-to-r from-red-700 via-red-500 to-red-700 relative z-10"
          style={{ 
            width: `${progress}%`, 
            transition: 'width 0.05s ease-out',
            boxShadow: '0 0 10px rgba(255, 0, 0, 0.7), 0 0 20px rgba(255, 0, 0, 0.4)'
          }}
        />
      </div>
      
      <p className="mt-4 text-red-400 font-bold text-xl">
        {progress}%
      </p>
    </div>
  );
};

export default Loading;
