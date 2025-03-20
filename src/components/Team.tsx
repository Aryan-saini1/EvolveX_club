
import React, { useEffect, useState } from 'react';
import { getAssetPath } from '../utils/path-utils';

const TeamMember = ({ 
  image, 
  name, 
  role, 
  isStaff = false 
}: { 
  image: string; 
  name: string; 
  role: string; 
  isStaff?: boolean;
}) => {
  const [imageError, setImageError] = useState(false);
  
  return (
    <div className={`${isStaff ? 'md:col-span-2 flex justify-center' : ''}`}>
      <div className={`${isStaff ? 'w-72 md:w-80' : ''}`}>
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-900 rounded-xl blur opacity-50 group-hover:opacity-70 transition-all duration-300"></div>
        <div className="glass-card rounded-xl p-1 relative">
          <div className="bg-gray-900/80 rounded-lg overflow-hidden">
          <img 
            src={getAssetPath(image)}
            alt={name} 
            className="w-40 h-40 md:w-44 md:h-44 object-cover object-center enhanced-hover-zoom transition-transform duration-300 mx-auto"
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

  const teamSectionVisible = scrollY > 400; // Reduced from 600 to make it visible earlier
  
  return (
    <section id="team" className="py-16 relative"> {/* Reduced padding from py-20 to py-16 */}
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-700 transform ${teamSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold mb-2">
            <span className="text-gradient">Our</span> Team
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-700 to-red-500 mx-auto mb-4"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Meet the passionate minds behind EvolveX - dedicated faculty members and student leaders driving innovation and excellence.
          </p>
        </div>
        
        <div className={`mb-10 transition-all duration-700 transform ${teamSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{ transitionDelay: '0.1s' }}>
          <h3 className="text-2xl font-semibold mb-6 text-center text-white">Faculty Advisors</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <TeamMember 
              image="kavita.webp" 
              name="Dr. Kavitha C" 
              role="Head of Department, CSE" 
              isStaff={true}
            />
            <TeamMember 
              image="sushmitha-s.webp" 
              name="Dr. Sushmita S" 
              role="Faculty Coordinator" 
              isStaff={true}
            />
          </div>
        </div>
        
        <div>
          <h3 className={`text-2xl font-semibold mb-6 text-center text-white transition-all duration-700 transform ${teamSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{ transitionDelay: '0.2s' }}>Student Leaders</h3>
          
          {/* Improved hexagonal-inspired layout for team members */}
          <div className="flex flex-wrap justify-center gap-5">
            {[
              { image: "Aryan.jpeg", name: "Aryan Saini", role: "President" },
              { image: "vismaya.jpeg", name: "Vismaya S", role: "Vice President" },
              { image: "anurag.jpeg", name: "Anurag Agarwal", role: "Technical Lead" },
              { image: "ayush.jpeg", name: "Ayush Anand", role: "Core Member" },
              { image: "deeta.jpeg", name: "Deeta Patil", role: "Design Lead" },
              { image: "kushi.jpeg", name: "Kushi S", role: "Core Member" },
              { image: "prajwal.jpeg", name: "Prajwal G", role: "PR Coordinator" },
              { image: "souravi.jpeg", name: "Souravi Hegde", role: "Events Manager" },
              { image: "likitha.jpeg", name: "Likitha M N", role: "Core Member" },
              { image: "sashidhar.jpeg", name: "Sashidhar", role: "Developer" },
              { image: "aastha.jpeg", name: "Aastha Agrawal", role: "Content Creator" },
              { image: "Sanjana.jpeg", name: "Sanjana Venkatesh", role: "Core Member", fallback: true },
              { image: "akshaya.jpeg", name: "Bhanu Akshaya", role: "Technical Member", fallback: true }
            ].map((member, index) => (
              <div 
                key={index} 
                className={`w-[170px] sm:w-[160px] md:w-[170px] transition-all duration-700 transform ${teamSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ 
                  transitionDelay: `${0.2 + (index * 0.05)}s`,
                  transform: index % 2 === 1 ? 'translateY(15px)' : 'translateY(0)' // Staggered arrangement
                }}
              >
                <TeamMember 
                  image={member.image} 
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
