
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Event {
  id: string;
  name: string;
  description: string;
  image: string;
  date?: string;
  categories?: string[];
}

interface TechFestEvent extends Event {
  organizers: string[];
}

const UpcomingEvent = ({ event, onClick }: { event: Event; onClick: () => void }) => {
  return (
    <div className="relative group cursor-pointer" onClick={onClick}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-900 rounded-xl blur opacity-50 group-hover:opacity-70 transition-all duration-300"></div>
      <div className="glass-card rounded-xl p-1 relative overflow-hidden">
        <div className="h-48 md:h-56 bg-gray-900/80 rounded-t-lg overflow-hidden">
          <img 
            src={event.image} 
            alt={event.name} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              e.currentTarget.src = `https://via.placeholder.com/400x300/111/333?text=${event.name.split(' ').join('+')}`;
            }}
          />
        </div>
        <div className="p-5">
          {event.categories && (
            <div className="flex gap-2 mb-3 flex-wrap">
              {event.categories.map((category, index) => (
                <span key={index} className="px-2 py-1 text-xs rounded-full bg-red-900/30 text-red-200">
                  {category}
                </span>
              ))}
            </div>
          )}
          <h3 className="font-bold text-xl text-white mb-2">{event.name}</h3>
          <p className="text-gray-400 line-clamp-2 mb-4">{event.description}</p>
          {event.date && (
            <div className="text-red-400 font-medium">{event.date}</div>
          )}
        </div>
      </div>
    </div>
  );
};

const TechFestDetails = ({ events, onClose }: { events: TechFestEvent[]; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="glass-card relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl animate-scale-in">
        <button 
          className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        
        <div className="p-6 md:p-8">
          <h2 className="text-3xl font-bold mb-2 text-gradient">TechFest 2025</h2>
          <p className="text-gray-300 mb-4">April 12-13, 2025</p>
          <p className="text-gray-400 mb-6">
            EvolveX presents our inaugural TechFest - a two-day celebration of innovation, technology, and creativity. Join us for an exciting lineup of events, workshops, and competitions designed to challenge your skills and expand your horizons.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {events.map((event, index) => (
              <div key={index} className="glass-card rounded-xl p-5 hover:bg-gray-800/30 transition-colors">
                <h3 className="font-bold text-xl text-white mb-2">{event.name}</h3>
                {event.categories && (
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {event.categories.map((category, idx) => (
                      <span key={idx} className="px-2 py-1 text-xs rounded-full bg-red-900/30 text-red-200">
                        {category}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-gray-400 mb-4">{event.description}</p>
                <p className="text-sm text-gray-500">Organized by: {event.organizers.join(', ')}</p>
                <Link 
                  to={`/events/${event.id}`} 
                  className="mt-4 inline-block px-4 py-2 bg-red-700/50 hover:bg-red-700/70 text-white rounded transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Events = () => {
  const [showTechFest, setShowTechFest] = useState(false);
  
  const upcomingEvents: Event[] = [
    {
      id: "techfest-2025",
      name: "TechFest 2025",
      description: "EvolveX's inaugural two-day technical festival featuring competitions, workshops, and networking opportunities.",
      image: "/techfest-banner.jpg",
      date: "April 12-13, 2025",
      categories: ["Festival", "Competition", "Workshops"]
    },
    {
      id: "coding-bootcamp",
      name: "Coding Bootcamp",
      description: "An intensive weekend of coding challenges and mentorship from industry experts.",
      image: "/coding-bootcamp.jpg",
      date: "May 20, 2025",
      categories: ["Learning", "Coding"]
    },
    {
      id: "industry-connect",
      name: "Industry Connect",
      description: "Connect with leading tech professionals and explore career opportunities in the tech industry.",
      image: "/industry-connect.jpg",
      date: "June 5, 2025",
      categories: ["Networking", "Career"]
    }
  ];
  
  const techFestEvents: TechFestEvent[] = [
    {
      id: "hackathon",
      name: "24-Hour Hackathon",
      description: "Form teams and build innovative solutions to real-world problems in this intense 24-hour challenge.",
      image: "/hackathon.jpg",
      categories: ["Competition", "Team Event"],
      organizers: ["Technical Team", "Industry Partners"]
    },
    {
      id: "coding-competition",
      name: "CodeWars",
      description: "Test your coding skills in this competitive programming challenge with multiple rounds and increasing difficulty.",
      image: "/codewars.jpg",
      categories: ["Competition", "Individual"],
      organizers: ["Coding Team"]
    },
    {
      id: "design-sprint",
      name: "UI/UX Design Sprint",
      description: "Design innovative user interfaces and experiences in this fast-paced design challenge.",
      image: "/design-sprint.jpg",
      categories: ["Competition", "Design"],
      organizers: ["Creative Team"]
    },
    {
      id: "tech-talks",
      name: "Tech Talks",
      description: "Listen to inspiring talks from industry leaders and tech innovators about the future of technology.",
      image: "/tech-talks.jpg",
      categories: ["Learning", "Networking"],
      organizers: ["Events Team"]
    }
  ];
  
  return (
    <section id="events" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-red-950/10 to-black/0 pointer-events-none"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-2">
            <span className="text-gradient">Upcoming</span> Events
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-700 to-red-500 mx-auto mb-4"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Stay updated with our latest events and activities designed to enhance your technical skills and expand your network.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingEvents.map((event, index) => (
            <UpcomingEvent 
              key={index} 
              event={event}
              onClick={() => {
                if (event.id === "techfest-2025") {
                  setShowTechFest(true);
                } else {
                  // Navigate to event page
                  console.log(`Navigate to ${event.id}`);
                }
              }}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button 
            className="button-glow group flex items-center mx-auto px-6 py-3 bg-black/50 border border-white/20 text-white rounded-lg font-medium hover:bg-black/80 transition-all"
            onClick={() => setShowTechFest(true)}
          >
            <span>View TechFest 2025 Details</span>
            <ChevronDown className="ml-2 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
      
      {showTechFest && (
        <TechFestDetails 
          events={techFestEvents}
          onClose={() => setShowTechFest(false)}
        />
      )}
    </section>
  );
};

export default Events;
