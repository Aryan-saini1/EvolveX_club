import React, { useEffect, useState } from 'react';
import { getAssetPath } from '../utils/path-utils';

const TeamMember = ({ 
  image, 
  name, 
  role, 
  isStaff = false,
  isLeader = false 
}: { 
  image: string; 
  name: string; 
  role: string; 
  isStaff?: boolean;
  isLeader?: boolean;
}) => {
  const [imageError, setImageError] = useState(false);
  
  return (
    <div className={`${isStaff ? 'flex justify-center' : ''} ${isLeader ? 'w-full flex justify-center' : ''}`}>
      <div className={`${isStaff ? 'w-72 md:w-80' : ''} ${isLeader ? 'w-56 md:w-64' : ''}`}>
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-900 rounded-xl blur opacity-50 group-hover:opacity-70 transition-all duration-300"></div>
          <div className="glass-card rounded-xl p-1 relative">
            <div className="bg-gray-900/80 rounded-lg overflow-hidden">
              <img 
                src={getAssetPath(image)}
                alt={name} 
                className="w-40 h-40 md:w-44 md:h-44 object-cover object-center transition-transform duration-300 hover:scale-125 mx-auto"
                onError={(e) => {
                  setImageError(true);
                  e.currentTarget.src = `https://via.placeholder.com/200/111/333?text=${name.split(' ').join('+')}`;
                }}
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="font-bold text-xl text-white">{name}</h3>
              <p className="text-red-400">{role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Team = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const teamSectionVisible = scrollY > 200; // Reduced to make it visible earlier
  
  return (
    <section id="team" className="py-12 relative">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-8 transition-all duration-700 transform ${teamSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold mb-2">
            <span className="text-gradient">Our</span> Team
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-700 to-red-500 mx-auto mb-4"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Meet the passionate minds behind EvolveX - dedicated student leaders driving innovation and excellence.
          </p>
        </div>
        
        
        
        <div>
          <h3 className={`text-2xl font-semibold mb-6 text-center text-white transition-all duration-700 transform ${teamSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{ transitionDelay: '0.2s' }}>Student Leaders</h3>
          
          {/* Leader in center */}
          <div className="mb-8">
            <div 
              className={`transition-all duration-700 transform ${teamSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: '0.25s' }}
            >
              <TeamMember 
                image="Aryan.jpeg" 
                name="Aryan Saini" 
                role="President"
                isLeader={true} 
              />
            </div>
          </div>
          
          {/* Core members in one row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 lg:gap-6 place-items-center">
            {[
              { image: "vismaya.jpeg", name: "Vismaya S", role: "Core Member" },
              { image: "anurag.jpeg", name: "Anurag Agarwal", role: "Core Member" },
              { image: "ayush.jpeg", name: "Ayush Anand", role: "Core Member" },
              { image: "deeta.jpeg", name: "Deeta Patil", role: "Core Member" },
              { image: "kushi.jpeg", name: "Kushi S", role: "Core Member" },
              { image: "prajwal.jpeg", name: "Prajwal G", role: "Core Member" },
              { image: "souravi.jpeg", name: "Souravi Hegde", role: "Core Member" },
              { image: "likitha.jpeg", name: "Likitha M N", role: "Core Member" },
              { image: "shashidhar.jpeg", name: "N S Shashidhar", role: "Core Member" },
              { image: "aastha.jpeg", name: "Aastha Agrawal", role: "Core Member" },
              { image: "sanjana.jpeg", name: "Sanjana V", role: "Core Member" },
              { image: "akshaya.jpeg", name: "Bhanu Akshaya", role: "Core Member" }
            ].map((member, index) => (
              <div 
                key={index} 
                className={`transition-all duration-700 transform ${teamSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: `${0.3 + (index * 0.05)}s` }}
              >
                <TeamMember 
                  image={member.image || "placeholder.png"}
                  name={member.name} 
                  role={member.role}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
