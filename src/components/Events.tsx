
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventCard from './events/EventCard';
import { getAssetPath } from '../utils/path-utils';

interface Event {
  id: string;
  name: string;
  description: string;
  image: string;
  categories?: string[];
  date?: string;
  status: 'upcoming' | 'past';
}

// TechFest 2025 is now moved to past events
const techFest = {
  id: "techfest-2025",
  name: "Cyberis",
  description: "EvolveX's inaugural technical festival featuring competitions and networking opportunities.",
  image: "cyberis.jpeg",
  date: "April 7-9, 2025",
  categories: ["Festival", "Competition"],
  status: 'past' as const
};

// Adding Cyberis to past events
const pastEvents: Event[] = [techFest];

interface EventsProps {
  showAllEvents?: boolean;
  isModalView?: boolean;
}

const Events: React.FC<EventsProps> = ({ showAllEvents = false, isModalView = false }) => {
  const [activeFilter, setActiveFilter] = useState<'upcoming' | 'past' | 'all'>('upcoming');
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const eventSectionVisible = scrollY > 300;
  
  return (
    <section id="events" className={`${!isModalView ? 'py-20' : ''} relative`}>
      {!isModalView && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-red-950/10 to-black/0 pointer-events-none"></div>
      )}
      
      <div className={`${!isModalView ? 'container mx-auto px-4' : ''}`}>
        {!isModalView && (
          <div className={`text-center mb-16 transition-all duration-700 transform ${eventSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold mb-2">
              <span className="text-gradient">Events</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-700 to-red-500 mx-auto mb-4"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Check out our past events including the Cyberis technical festival!
            </p>
          </div>
        )}

        {/* Filter tabs */}
        <div className={`flex justify-center mb-8 transition-all duration-500 transform ${eventSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.1s' }}>
          <div className="inline-flex bg-gray-900/50 rounded-full p-1">
            <button
              onClick={() => setActiveFilter('upcoming')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'upcoming' ? 'bg-red-900/70 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveFilter('past')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'past' ? 'bg-red-900/70 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Past
            </button>
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'all' ? 'bg-red-900/70 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              All
            </button>
          </div>
        </div>

        {/* Display upcoming events - removed TechFest 2025 as it's now in past events */}
        {(activeFilter === 'upcoming' || activeFilter === 'all') && (
          <div className="text-center py-16">
            <p className="text-gray-400">No upcoming events to display yet. Stay tuned for future updates!</p>
          </div>
        )}

        {/* Past Events Section */}
        {(activeFilter === 'past' || activeFilter === 'all') && pastEvents.length > 0 && (
          <div className={`mt-12 transition-all duration-700 transform ${eventSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{ transitionDelay: '0.2s' }}>
            <h3 className="text-2xl font-bold text-center mb-6">Past Events</h3>
            <div className="max-w-4xl mx-auto">
              {pastEvents.map((event, index) => (
                <EventCard key={index} {...event} />
              ))}
            </div>
          </div>
        )}

        {/* Empty state for past events - no longer needed as we have past events */}
        {activeFilter === 'past' && pastEvents.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400">No past events to display yet. Stay tuned for future updates!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
