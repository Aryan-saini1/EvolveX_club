
import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Team from '../components/Team';
import Events from '../components/Events';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Preload any images if needed
    const preloadImages = () => {
      const imagesToPreload = [
        '/rnsit-logo.png',
        '/evolve-x-showcase.png',
        '/rnsit-campus.jpg'
      ];
      
      imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    
    preloadImages();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {loading ? (
        <Loading onLoadComplete={() => setLoading(false)} />
      ) : (
        <>
          <Navbar />
          <Hero />
          <About />
          <Team />
          <Events />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
