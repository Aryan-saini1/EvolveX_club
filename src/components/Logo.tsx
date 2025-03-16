
import React, { useState } from 'react';

const Logo = () => {
  const [imageError, setImageError] = useState(false);
  
  return (
    <div className="h-8 w-8 rounded-full overflow-hidden bg-red-900/30">
      {!imageError ? (
        <img 
          src="evolve.jpeg" 
          alt="EvolveX Logo" 
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center text-white font-bold">
          EX
        </div>
      )}
    </div>
  );
};

export default Logo;
