
import React from 'react';

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
  return (
    <div className={`${isStaff ? 'md:col-span-2' : ''}`}>
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-900 rounded-xl blur opacity-50 group-hover:opacity-70 transition-all duration-300"></div>
        <div className="glass-card rounded-xl p-1 relative">
          <div className="bg-gray-900/80 rounded-lg overflow-hidden">
            <img 
              src={image} 
              alt={name} 
              className="w-full aspect-[4/5] object-cover object-center group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.src = `https://via.placeholder.com/400x500/111/333?text=${name.split(' ').join('+')}`;
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
  );
};

const Team = () => {
  return (
    <section id="team" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-2">
            <span className="text-gradient">Our</span> Team
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-700 to-red-500 mx-auto mb-4"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Meet the passionate minds behind EvolveX - dedicated faculty members and student leaders driving innovation and excellence.
          </p>
        </div>
        
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-8 text-center text-white">Faculty Advisors</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <TeamMember 
              image="/hod-maam.jpg" 
              name="Dr. G N Srinivasa Prasad" 
              role="Head of Department, CSE" 
              isStaff={true}
            />
            <TeamMember 
              image="/kavitha-maam.jpg" 
              name="Dr. Kavitha C" 
              role="Faculty Coordinator" 
              isStaff={true}
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center text-white">Student Leaders</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <TeamMember 
              image="/student-president.jpg" 
              name="Rahul Sharma" 
              role="President" 
            />
            <TeamMember 
              image="/student-vp.jpg" 
              name="Priya Desai" 
              role="Vice President" 
            />
            <TeamMember 
              image="/student-tech.jpg" 
              name="Akash Patel" 
              role="Technical Lead" 
            />
            <TeamMember 
              image="/student-creative.jpg" 
              name="Meera Joshi" 
              role="Creative Director" 
            />
            <TeamMember 
              image="/student-events.jpg" 
              name="Vikram Singh" 
              role="Events Coordinator" 
            />
            <TeamMember 
              image="/student-marketing.jpg" 
              name="Ananya Gupta" 
              role="Marketing Lead" 
            />
            <TeamMember 
              image="/student-pr.jpg" 
              name="Raj Kumar" 
              role="Public Relations" 
            />
            <TeamMember 
              image="/student-content.jpg" 
              name="Shreya Patil" 
              role="Content Creator" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
