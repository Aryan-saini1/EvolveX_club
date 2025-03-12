
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import EventCard from './events/EventCard';

interface Event {
  id: string;
  name: string;
  description: string;
  image: string;
  categories?: string[];
}

const techFestEvents: Event[] = [
  {
    id: "trade-quest",
    name: "Trade Quest",
    description: "Test your financial knowledge in this quiz covering stocks, fintech, and investments. Make dummy investments and compete for the highest returns!",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f",
    categories: ["Quiz", "Finance"]
  },
  {
    id: "pitching",
    name: "Pitching",
    description: "Present your innovative ideas to our panel of judges in this Shark Tank-style competition.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    categories: ["Presentation", "Innovation"]
  },
  {
    id: "gaming",
    name: "Gaming Tournament",
    description: "Compete in various gaming challenges and prove your skills in this exciting tournament.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    categories: ["Gaming", "Competition"]
  },
  {
    id: "photo-edit",
    name: "Photography & Editing",
    description: "Showcase your photography and editing skills. Winners decided by Instagram followers!",
    image: "https://images.unsplash.com/photo-1552168324-d612d77725e3",
    categories: ["Creative", "Social Media"]
  },
  {
    id: "crime-scene",
    name: "Mock Crime Scene Investigation",
    description: "Put on your detective hat and solve a simulated crime scene filled with technical clues.",
    image: "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8",
    categories: ["Investigation", "Problem Solving"]
  },
  {
    id: "typing-contest",
    name: "Typing Championship",
    description: "Test your typing speed and accuracy, including a challenging reverse typing round!",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    categories: ["Speed", "Skill"]
  },
  {
    id: "programming-relay",
    name: "Programming Relay",
    description: "A unique coding challenge where participants continue each other's code without direct communication.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    categories: ["Coding", "Team Event"]
  },
  {
    id: "bounty-bug",
    name: "Bounty on Bug",
    description: "Find security vulnerabilities in given software and compete for the highest bounty.",
    image: "https://images.unsplash.com/photo-1563207153-f403bf289096",
    categories: ["Security", "Debug"]
  },
  {
    id: "tech-debate",
    name: "Tech Debate",
    description: "Debate on controversial tech topics like AI ethics, OS wars, and digital privacy.",
    image: "https://images.unsplash.com/photo-1521798552670-3130579c8c86",
    categories: ["Debate", "Discussion"]
  },
  {
    id: "capture-flag",
    name: "Capture the Flag",
    description: "Solve technical puzzles, quizzes, and pictionary challenges to capture the flag!",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    categories: ["Puzzle", "Challenge"]
  },
  {
    id: "hackathon",
    name: "Detective's Dilemma Hackathon",
    description: "A creative hackathon with a detective theme - build solutions for crime-solving scenarios.",
    image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0",
    categories: ["Hackathon", "Creative"]
  },
  {
    id: "tech-memes",
    name: "Tech Meme Contest",
    description: "Create spontaneous, funny, and creative memes about technology.",
    image: "https://images.unsplash.com/photo-1517242027094-631f8c218a0f",
    categories: ["Creative", "Humor"]
  },
  {
    id: "treasure-hunt",
    name: "Tech Treasure Hunt",
    description: "Follow the technical clues, decode maps, and find the hidden treasure!",
    image: "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec",
    categories: ["Adventure", "Problem Solving"]
  },
  {
    id: "squid-game",
    name: "Tech Squid Game",
    description: "Survive through multiple rounds of technical challenges inspired by the popular series.",
    image: "https://images.unsplash.com/photo-1635716897849-295987622bd9",
    categories: ["Challenge", "Elimination"]
  },
  {
    id: "mad-ads",
    name: "Mad Ads",
    description: "Create posters, collages, and creative advertisements for tech products.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    categories: ["Creative", "Design"]
  },
  {
    id: "elocution",
    name: "Tech Talk Elocution",
    description: "Speak on pre-assigned technical topics with confidence and clarity.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2",
    categories: ["Speaking", "Presentation"]
  },
  {
    id: "art-competition",
    name: "TechArt",
    description: "Express technology through art - drawing, painting, and digital creations.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
    categories: ["Art", "Creative"]
  },
  {
    id: "tech-trivia",
    name: "Tech Series Trivia",
    description: "Test your knowledge about popular tech-related TV shows and web series.",
    image: "https://images.unsplash.com/photo-1579532536935-619928decd08",
    categories: ["Quiz", "Entertainment"]
  },
  {
    id: "crossfit",
    name: "TechFit Challenge",
    description: "A CrossFit competition for the tech enthusiasts who love fitness.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
    categories: ["Fitness", "Challenge"]
  },
  {
    id: "cup-pyramid",
    name: "Cup Pyramid Challenge",
    description: "Test your steady hands and strategy in building the perfect cup pyramid.",
    image: "https://images.unsplash.com/photo-1573676028748-220070e59d61",
    categories: ["Skill", "Strategy"]
  }
];

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
        
        <div className="grid grid-cols-1 gap-8">
          {upcomingEvents.map((event, index) => (
            <EventCard key={index} {...event} />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowTechFest(false)}></div>
          <div className="glass-card relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl animate-scale-in">
            <button 
              className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors"
              onClick={() => setShowTechFest(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            </button>
            
            <div className="p-6 md:p-8">
              <h2 className="text-3xl font-bold mb-2 text-gradient">TechFest 2025</h2>
              <p className="text-gray-300 mb-4">April 12-13, 2025</p>
              <p className="text-gray-400 mb-6">
                EvolveX presents our inaugural TechFest - a two-day celebration of innovation, technology, and creativity. Join us for an exciting lineup of events designed to challenge your skills and expand your horizons.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {techFestEvents.map((event, index) => (
                  <EventCard key={index} {...event} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Events;
