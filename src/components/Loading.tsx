
import React, { useState, useEffect, useRef } from 'react';

interface LoadingProps {
  onLoadComplete: () => void;
}

const Loading: React.FC<LoadingProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [lightningSparks, setLightningSparks] = useState(false);
  const [audioMuted, setAudioMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

    // Audio for loading - initially muted
    const audioElement = new Audio('/gun_sound.mp3');
    audioElement.volume = 0;
    audioRef.current = audioElement;
    
    // Play audio and handle autoplay restrictions
    audioElement.play().catch(err => console.log('Audio playback prevented:', err));
    
    // After 1 second, unmute the audio if it's playing
    const audioTimeout = setTimeout(() => {
      if (audioElement && !audioElement.paused) {
        audioElement.volume = 0.3;
        setAudioMuted(false);
      }
    }, 1000);

    // Lightning effect sequence - more intense strike
    const triggerLightning = () => {
      setLightningSparks(true);
      setTimeout(() => setLightningSparks(false), 500);
      setTimeout(() => {
        if (Math.random() > 0.5) {
          setLightningSparks(true);
          setTimeout(() => setLightningSparks(false), 300);
        }
      }, 800);
    };
    
    // Trigger initial lightning
    triggerLightning();
    
    // Random lightning flashes - more frequent
    const lightningIntervalId = setInterval(() => {
      if (Math.random() > 0.6) {
        triggerLightning();
      }
    }, 700);

    // Cleanup
    return () => {
      clearInterval(intervalId);
      clearInterval(lightningIntervalId);
      clearTimeout(audioTimeout);
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, [onLoadComplete]);

  const toggleMute = () => {
    if (audioRef.current) {
      if (audioMuted) {
        audioRef.current.volume = 0.3;
      } else {
        audioRef.current.volume = 0;
      }
      setAudioMuted(!audioMuted);
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      {lightningSparks && <div className="thunder-strike"></div>}
      
      <div className="relative mb-8">
        <div className="relative z-10">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 animate-text-flicker font-tech">
            <span className="text-red-500">EVOLVE</span>
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
      
      <button 
        onClick={toggleMute}
        className="absolute bottom-4 right-4 text-white/70 hover:text-white text-xs bg-black/50 px-3 py-1 rounded-full"
      >
        {audioMuted ? "Unmute" : "Mute"}
      </button>
    </div>
  );
};

export default Loading;
