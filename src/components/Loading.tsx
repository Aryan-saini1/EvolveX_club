
import React, { useState, useEffect } from 'react';

interface LoadingProps {
  onLoadComplete: () => void;
}

const Loading: React.FC<LoadingProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [lightningSparks, setLightningSparks] = useState(false);

  useEffect(() => {
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

    const audioElement = new Audio('/loading-sound.mp3');
    audioElement.volume = 0.3;
    audioElement.play().catch(err => console.log('Audio playback prevented:', err));

    // Trigger lightning effect
    setTimeout(() => {
      setLightningSparks(true);
      setTimeout(() => setLightningSparks(false), 1000);
    }, 300);

    return () => {
      clearInterval(intervalId);
      audioElement.pause();
    };
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      {lightningSparks && <div className="lightning-effect"></div>}
      <div className="relative">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-12 animate-text-flicker">
          <span className="text-gradient">Evolve</span>
          <span className="text-white">X</span>
        </h1>
        <div className="absolute -bottom-2 left-0 text-sm text-white/70">
          Evolving Beyond Limits
        </div>
      </div>
      
      <div className="w-64 h-2 bg-gray-800 rounded-full mt-8 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-red-700 to-red-500"
          style={{ width: `${progress}%`, transition: 'width 0.05s ease-out' }}
        />
      </div>
      <p className="mt-4 text-white">{progress}%</p>
    </div>
  );
};

export default Loading;
