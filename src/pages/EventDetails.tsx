
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/events/EventCard';

// Import the events data from our Events component
const techFestEvents = [
  {
    id: "trade-quest",
    name: "Trade Quest",
    description: "Test your financial knowledge in this quiz covering stocks, fintech, and investments. Make dummy investments and compete for the highest returns!",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f",
    categories: ["Quiz", "Finance"],
    status: 'upcoming' as const
  },
  {
    id: "pitching",
    name: "Pitching",
    description: "Present your innovative ideas to our panel of judges in this Shark Tank-style competition.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    categories: ["Presentation", "Innovation"],
    status: 'upcoming' as const
  },
  {
    id: "gaming",
    name: "Gaming Tournament",
    description: "Compete in various gaming challenges and prove your skills in this exciting tournament.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    categories: ["Gaming", "Competition"],
    status: 'upcoming' as const
  },
  {
    id: "photo-edit",
    name: "Photography & Editing",
    description: "Showcase your photography and editing skills. Winners decided by Instagram followers!",
    image: "https://images.unsplash.com/photo-1552168324-d612d77725e3",
    categories: ["Creative", "Social Media"],
    status: 'upcoming' as const
  },
  {
    id: "crime-scene",
    name: "Mock Crime Scene Investigation",
    description: "Put on your detective hat and solve a simulated crime scene filled with technical clues.",
    image: "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8",
    categories: ["Investigation", "Problem Solving"],
    status: 'upcoming' as const
  },
  {
    id: "typing-contest",
    name: "Typing Championship",
    description: "Test your typing speed and accuracy, including a challenging reverse typing round!",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    categories: ["Speed", "Skill"],
    status: 'upcoming' as const
  },
  {
    id: "programming-relay",
    name: "Programming Relay",
    description: "A unique coding challenge where participants continue each other's code without direct communication.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    categories: ["Coding", "Team Event"],
    status: 'upcoming' as const
  },
  {
    id: "bounty-bug",
    name: "Bounty on Bug",
    description: "Find security vulnerabilities in given software and compete for the highest bounty.",
    image: "https://images.unsplash.com/photo-1563207153-f403bf289096",
    categories: ["Security", "Debug"],
    status: 'upcoming' as const
  },
  {
    id: "tech-debate",
    name: "Tech Debate",
    description: "Debate on controversial tech topics like AI ethics, OS wars, and digital privacy.",
    image: "https://images.unsplash.com/photo-1521798552670-3130579c8c86",
    categories: ["Debate", "Discussion"],
    status: 'upcoming' as const
  },
  {
    id: "capture-flag",
    name: "Capture the Flag",
    description: "Solve technical puzzles, quizzes, and pictionary challenges to capture the flag!",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    categories: ["Puzzle", "Challenge"],
    status: 'upcoming' as const
  },
  {
    id: "hackathon",
    name: "Detective's Dilemma Hackathon",
    description: "A creative hackathon with a detective theme - build solutions for crime-solving scenarios.",
    image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0",
    categories: ["Hackathon", "Creative"],
    status: 'upcoming' as const
  },
  {
    id: "tech-memes",
    name: "Tech Meme Contest",
    description: "Create spontaneous, funny, and creative memes about technology.",
    image: "https://images.unsplash.com/photo-1517242027094-631f8c218a0f",
    categories: ["Creative", "Humor"],
    status: 'upcoming' as const
  },
  {
    id: "treasure-hunt",
    name: "Tech Treasure Hunt",
    description: "Follow the technical clues, decode maps, and find the hidden treasure!",
    image: "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec",
    categories: ["Adventure", "Problem Solving"],
    status: 'upcoming' as const
  },
  {
    id: "squid-game",
    name: "Tech Squid Game",
    description: "Survive through multiple rounds of technical challenges inspired by the popular series.",
    image: "https://images.unsplash.com/photo-1635716897849-295987622bd9",
    categories: ["Challenge", "Elimination"],
    status: 'upcoming' as const
  },
  {
    id: "mad-ads",
    name: "Mad Ads",
    description: "Create posters, collages, and creative advertisements for tech products.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    categories: ["Creative", "Design"],
    status: 'upcoming' as const
  },
  {
    id: "elocution",
    name: "Tech Talk Elocution",
    description: "Speak on pre-assigned technical topics with confidence and clarity.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2",
    categories: ["Speaking", "Presentation"],
    status: 'upcoming' as const
  },
  {
    id: "art-competition",
    name: "TechArt",
    description: "Express technology through art - drawing, painting, and digital creations.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
    categories: ["Art", "Creative"],
    status: 'upcoming' as const
  },
  {
    id: "tech-trivia",
    name: "Tech Series Trivia",
    description: "Test your knowledge about popular tech-related TV shows and web series.",
    image: "https://images.unsplash.com/photo-1579532536935-619928decd08",
    categories: ["Quiz", "Entertainment"],
    status: 'upcoming' as const
  },
  {
    id: "crossfit",
    name: "TechFit Challenge",
    description: "A CrossFit competition for the tech enthusiasts who love fitness.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
    categories: ["Fitness", "Challenge"],
    status: 'upcoming' as const
  },
  {
    id: "cup-pyramid",
    name: "Cup Pyramid Challenge",
    description: "Test your steady hands and strategy in building the perfect cup pyramid.",
    image: "https://images.unsplash.com/photo-1573676028748-220070e59d61",
    categories: ["Skill", "Strategy"],
    status: 'upcoming' as const
  }
];

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Special case for techfest
  if (eventId === 'techfest-2025') {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </button>
            
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-2xl blur opacity-30"></div>
              <div className="glass-card rounded-2xl overflow-hidden p-1 relative">
                <img 
                  src="/techfest-banner.jpg" 
                  alt="TechFest 2025" 
                  className="w-full h-60 md:h-80 object-cover object-center rounded-t-xl hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/1200x600/111/333?text=TechFest+2025`;
                  }}
                />
                
                <div className="p-6 md:p-8">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">
                    TechFest 2025
                  </h1>
                  
                  <div className="flex flex-wrap gap-2 my-4">
                    <span className="px-3 py-1 text-sm rounded-full bg-red-900/30 text-red-200">
                      April 12-13, 2025
                    </span>
                    <span className="px-3 py-1 text-sm rounded-full bg-red-900/30 text-red-200">
                      RNSIT Campus
                    </span>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed mb-6">
                    EvolveX presents our inaugural TechFest - a two-day celebration of innovation, technology, and creativity. Join us for an exciting lineup of events designed to challenge your skills and expand your horizons.
                  </p>
                  
                  <div className="space-y-6 mb-8">
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-3">Event Details</h2>
                      <ul className="list-disc pl-5 text-gray-400 space-y-2">
                        <li>Date: April 12-13, 2025</li>
                        <li>Time: 9:00 AM - 6:00 PM</li>
                        <li>Venue: RNSIT Campus, Main Auditorium</li>
                        <li>Participation: Open to all RNSIT students</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-3">All TechFest Events</h2>
                      <p className="text-gray-400 mb-4">
                        Explore our exciting lineup of events below:
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {techFestEvents.map((event, index) => {
                          const shouldAnimate = scrollY > 300 + (index * 50);
                          const animationDelay = `${index * 0.1}s`;
                          
                          return (
                            <div 
                              key={event.id}
                              className={`transition-all duration-700 transform ${shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                              style={{ transitionDelay: animationDelay }}
                            >
                              <div className="group relative cursor-pointer overflow-hidden rounded-xl">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-900 rounded-xl blur opacity-50 group-hover:opacity-75 transition-all duration-300"></div>
                                <div className="glass-card rounded-xl p-1 relative overflow-hidden h-full">
                                  <div className="h-48 bg-gray-900/80 rounded-t-lg overflow-hidden relative">
                                    <img 
                                      src={event.image} 
                                      alt={event.name} 
                                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                                      onError={(e) => {
                                        e.currentTarget.src = `https://via.placeholder.com/400x300/111/333?text=${event.name.split(' ').join('+')}`;
                                      }}
                                    />
                                    
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                                      <div className="text-white px-4 py-2 rounded-full text-sm font-semibold bg-red-600/90 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                                        View Details
                                      </div>
                                    </div>
                                  </div>
                                  <div className="p-5">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                      {event.categories?.map((category, idx) => (
                                        <span key={idx} className="px-2 py-1 text-xs rounded-full bg-red-900/30 text-red-200">
                                          {category}
                                        </span>
                                      ))}
                                    </div>
                                    <h3 className="font-bold text-xl text-white mb-2">{event.name}</h3>
                                    <p className="text-gray-400 line-clamp-2">{event.description}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-3">How to Register</h2>
                      <p className="text-gray-400 mb-4">
                        Registration is open until April 5th, 2025. Fill out the form below or contact the event coordinators for more information.
                      </p>
                      <button 
                        className="button-glow px-6 py-3 bg-gradient-to-r from-red-700 to-red-600 text-white rounded-lg font-medium animate-pulse-glow"
                      >
                        Register Now
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
                    <p className="text-gray-400">
                      For more information, please contact:<br />
                      <a href="mailto:evolvex@rnsit.ac.in" className="text-red-400 hover:underline">evolvex@rnsit.ac.in</a> or call +91 98765 43210
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }
  
  // Regular event details
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Events
          </button>
          
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-2xl blur opacity-30"></div>
            <div className="glass-card rounded-2xl overflow-hidden p-1 relative">
              <img 
                src={`/event-${eventId}.jpg`} 
                alt={`Event ${eventId}`} 
                className="w-full h-60 md:h-80 object-cover object-center rounded-t-xl"
                onError={(e) => {
                  e.currentTarget.src = `https://via.placeholder.com/1200x600/111/333?text=Event+Details`;
                }}
              />
              
              <div className="p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">
                  {eventId?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </h1>
                
                <div className="flex flex-wrap gap-2 my-4">
                  <span className="px-3 py-1 text-sm rounded-full bg-red-900/30 text-red-200">
                    April 12-13, 2025
                  </span>
                  <span className="px-3 py-1 text-sm rounded-full bg-red-900/30 text-red-200">
                    TechFest 2025
                  </span>
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  This is a detailed description of the event. More comprehensive information about this specific event will be displayed here. The content will depend on which event the user has selected from the events section.
                </p>
                
                <div className="space-y-6 mb-8">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-3">Event Details</h2>
                    <ul className="list-disc pl-5 text-gray-400 space-y-2">
                      <li>Date: April 12-13, 2025</li>
                      <li>Time: 9:00 AM - 6:00 PM</li>
                      <li>Venue: RNSIT Campus, Main Auditorium</li>
                      <li>Participation: Open to all RNSIT students</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-3">What to Expect</h2>
                    <p className="text-gray-400">
                      Participants will engage in challenging activities designed to test their skills and creativity. This event provides an excellent opportunity to learn, network, and showcase your talents.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-3">How to Register</h2>
                    <p className="text-gray-400 mb-4">
                      Registration is open until April 5th, 2025. Fill out the form below or contact the event coordinators for more information.
                    </p>
                    <button 
                      className="button-glow px-6 py-3 bg-gradient-to-r from-red-700 to-red-600 text-white rounded-lg font-medium animate-pulse-glow"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
                  <p className="text-gray-400">
                    For more information, please contact:<br />
                    <a href="mailto:evolvex@rnsit.ac.in" className="text-red-400 hover:underline">evolvex@rnsit.ac.in</a> or call +91 98765 43210
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EventDetails;
