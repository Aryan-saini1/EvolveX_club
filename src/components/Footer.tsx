
import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img 
              src="/evolve.jpeg" 
              alt="CLUB Logo" 
              className="h-10 mr-3" 
            />
            <div>
              <div className="text-xl font-bold text-gradient">EvolveX</div>
              <div className="text-sm text-gray-400">Evolving Beyond Limits</div>
            </div>
          </div>
          
          <div className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} EvolveX at RNSIT. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
