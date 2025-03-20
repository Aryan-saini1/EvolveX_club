
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
    // Check if this is the first visit during this session
    const hasVisitedBefore = sessionStorage.getItem('hasVisitedBefore');
    
    if (hasVisitedBefore) {
      // Skip loading if already visited
      setLoading(false);
    } else {
      // Set flag for subsequent visits
      sessionStorage.setItem('hasVisitedBefore', 'true');
      
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
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {loading ? (
        <Loading onLoadComplete={() => setLoading(false)} />
      ) : (
        <div className="content-wrapper">
          <Navbar />
          <Hero />
          <About />
          <Team />
          <Events showAllEvents={true} />
          <Contact />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Index;
