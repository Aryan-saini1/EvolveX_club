
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import EventCard from './events/EventCard';

interface Event {
  id: string;
  name: string;
  description: string;
  image: string;
  categories?: string[];
  date?: string;
  status: 'upcoming' | 'past';
}

// TechFest 2025 is our main event
const techFest = {
  id: "techfest-2025",
  name: "TechFest 2025",
  description: "EvolveX's inaugural two-day technical festival featuring competitions, workshops, and networking opportunities.",
  image: "/techfest-banner.jpg",
  date: "April 12-13, 2025",
  categories: ["Festival", "Competition", "Workshops"],
  status: 'upcoming' as const
};

// All other events are now part of TechFest 2025
const techFestEvents: Event[] = [
  {
    id: "trade-quest",
    name: "Trade Quest",
    description: "Test your financial knowledge in this quiz covering stocks, fintech, and investments. Make dummy investments and compete for the highest returns!",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f",
    categories: ["Quiz", "Finance"],
    status: 'upcoming'
  },
  {
    id: "pitching",
    name: "Pitching",
    description: "Present your innovative ideas to our panel of judges in this Shark Tank-style competition.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    categories: ["Presentation", "Innovation"],
    status: 'upcoming'
  },
  {
    id: "gaming",
    name: "Gaming Tournament",
    description: "Compete in various gaming challenges and prove your skills in this exciting tournament.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    categories: ["Gaming", "Competition"],
    status: 'upcoming'
  },
  {
    id: "photo-edit",
    name: "Photography & Editing",
    description: "Showcase your photography and editing skills. Winners decided by Instagram followers!",
    image: "https://images.unsplash.com/photo-1552168324-d612d77725e3",
    categories: ["Creative", "Social Media"],
    status: 'upcoming'
  },
  {
    id: "crime-scene",
    name: "Mock Crime Scene Investigation",
    description: "Put on your detective hat and solve a simulated crime scene filled with technical clues.",
    image: "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8",
    categories: ["Investigation", "Problem Solving"],
    status: 'upcoming'
  },
  {
    id: "typing-contest",
    name: "Typing Championship",
    description: "Test your typing speed and accuracy, including a challenging reverse typing round!",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    categories: ["Speed", "Skill"],
    status: 'upcoming'
  },
  {
    id: "programming-relay",
    name: "Programming Relay",
    description: "A unique coding challenge where participants continue each other's code without direct communication.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    categories: ["Coding", "Team Event"],
    status: 'upcoming'
  },
  {
    id: "bounty-bug",
    name: "Bounty on Bug",
    description: "Find security vulnerabilities in given software and compete for the highest bounty.",
    image: "https://images.unsplash.com/photo-1563207153-f403bf289096",
    categories: ["Security", "Debug"],
    status: 'upcoming'
  },
  {
    id: "tech-debate",
    name: "Tech Debate",
    description: "Debate on controversial tech topics like AI ethics, OS wars, and digital privacy.",
    image: "https://images.unsplash.com/photo-1521798552670-3130579c8c86",
    categories: ["Debate", "Discussion"],
    status: 'upcoming'
  },
  {
    id: "capture-flag",
    name: "Capture the Flag",
    description: "Solve technical puzzles, quizzes, and pictionary challenges to capture the flag!",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    categories: ["Puzzle", "Challenge"],
    status: 'upcoming'
  },
  {
    id: "hackathon",
    name: "Detective's Dilemma Hackathon",
    description: "A creative hackathon with a detective theme - build solutions for crime-solving scenarios.",
    image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0",
    categories: ["Hackathon", "Creative"],
    status: 'upcoming'
  },
  {
    id: "tech-memes",
    name: "Tech Meme Contest",
    description: "Create spontaneous, funny, and creative memes about technology.",
    image: "https://images.unsplash.com/photo-1517242027094-631f8c218a0f",
    categories: ["Creative", "Humor"],
    status: 'upcoming'
  },
  {
    id: "treasure-hunt",
    name: "Tech Treasure Hunt",
    description: "Follow the technical clues, decode maps, and find the hidden treasure!",
    image: "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec",
    categories: ["Adventure", "Problem Solving"],
    status: 'upcoming'
  },
  {
    id: "squid-game",
    name: "Tech Squid Game",
    description: "Survive through multiple rounds of technical challenges inspired by the popular series.",
    image: "https://images.unsplash.com/photo-1635716897849-295987622bd9",
    categories: ["Challenge", "Elimination"],
    status: 'upcoming'
  },
  {
    id: "mad-ads",
    name: "Mad Ads",
    description: "Create posters, collages, and creative advertisements for tech products.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    categories: ["Creative", "Design"],
    status: 'upcoming'
  },
  {
    id: "elocution",
    name: "Tech Talk Elocution",
    description: "Speak on pre-assigned technical topics with confidence and clarity.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2",
    categories: ["Speaking", "Presentation"],
    status: 'upcoming'
  },
  {
    id: "art-competition",
    name: "TechArt",
    description: "Express technology through art - drawing, painting, and digital creations.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
    categories: ["Art", "Creative"],
    status: 'upcoming'
  },
  {
    id: "tech-trivia",
    name: "Tech Series Trivia",
    description: "Test your knowledge about popular tech-related TV shows and web series.",
    image: "https://images.unsplash.com/photo-1579532536935-619928decd08",
    categories: ["Quiz", "Entertainment"],
    status: 'upcoming'
  },
  {
    id: "crossfit",
    name: "TechFit Challenge",
    description: "A CrossFit competition for the tech enthusiasts who love fitness.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
    categories: ["Fitness", "Challenge"],
    status: 'upcoming'
  },
  {
    id: "cup-pyramid",
    name: "Cup Pyramid Challenge",
    description: "Test your steady hands and strategy in building the perfect cup pyramid.",
    image: "https://images.unsplash.com/photo-1573676028748-220070e59d61",
    categories: ["Skill", "Strategy"],
    status: 'upcoming'
  }
];

// Empty array for past events (as requested)
const pastEvents: Event[] = [];

interface EventsProps {
  showAllEvents?: boolean;
  isModalView?: boolean;
}

const Events: React.FC<EventsProps> = ({ showAllEvents = false, isModalView = false }) => {
  const [showTechFestEvents, setShowTechFestEvents] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'upcoming' | 'past' | 'all'>('upcoming');
  
  return (
    <section id="events" className={`${!isModalView ? 'py-20' : ''} relative`}>
      {!isModalView && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-red-950/10 to-black/0 pointer-events-none"></div>
      )}
      
      <div className={`${!isModalView ? 'container mx-auto px-4' : ''}`}>
        {!isModalView && (
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-2">
              <span className="text-gradient">Events</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-700 to-red-500 mx-auto mb-4"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Join our upcoming TechFest 2025 - featuring exciting competitions and workshops to enhance your technical skills!
            </p>
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex justify-center mb-8">
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

        {/* Display TechFest 2025 prominently only for upcoming or all events */}
        {(activeFilter === 'upcoming' || activeFilter === 'all') && (
          <div className="mb-10">
            <div className="max-w-4xl mx-auto">
              <EventCard {...techFest} />
              
              {/* Button to show/hide TechFest events list (not dropdown) */}
              <div className="mt-4 text-center">
                <button 
                  onClick={() => setShowTechFestEvents(!showTechFestEvents)}
                  className="flex items-center mx-auto space-x-2 px-6 py-2 bg-red-900/30 text-red-200 rounded-full hover:bg-red-900/50 transition-colors"
                >
                  <span>{showTechFestEvents ? 'Hide TechFest Events' : 'View TechFest Events'}</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${showTechFestEvents ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* TechFest Events List - simple list, no dropdown */}
        {showTechFestEvents && (activeFilter === 'upcoming' || activeFilter === 'all') && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-center mb-6">TechFest 2025 Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techFestEvents.map((event, index) => (
                <EventCard key={index} {...event} />
              ))}
            </div>
          </div>
        )}

        {/* Past Events Section */}
        {(activeFilter === 'past' || activeFilter === 'all') && pastEvents.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center mb-6">Past Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event, index) => (
                <EventCard key={index} {...event} />
              ))}
            </div>
          </div>
        )}

        {/* Empty state for past events */}
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
