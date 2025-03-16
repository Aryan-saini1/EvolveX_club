
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/events/EventCard';
import { getAssetPath } from '../utils/path-utils';

// Import the events data from our Events component
const techFestEvents = [
  {
    id: "trade-quest",
    name: "Trade Quest",
    description: "Test your financial knowledge in this quiz covering stocks, fintech, and investments. Make dummy investments and compete for the highest returns!",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f",
    categories: ["Quiz", "Finance"],
    status: 'upcoming' as const,
    details: "Participants will test their financial knowledge through a series of challenging questions and scenarios. You'll analyze market trends, make investment decisions, and compete to achieve the highest returns on your virtual portfolio."
  },
  {
    id: "pitching",
    name: "Pitching",
    description: "Present your innovative ideas to our panel of judges in this Shark Tank-style competition.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    categories: ["Presentation", "Innovation"],
    status: 'upcoming' as const,
    details: "Channel your inner entrepreneur in this Shark Tank-style competition. Present your innovative ideas to our panel of judges, answer tough questions, and compete for potential funding and mentorship opportunities."
  },
  {
    id: "gaming",
    name: "Gaming Tournament",
    description: "Compete in various gaming challenges and prove your skills in this exciting tournament.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    categories: ["Gaming", "Competition"],
    status: 'upcoming' as const,
    details: "Battle it out in multiple game categories including FPS, MOBA, and racing simulations. Both casual and competitive gamers are welcome to join this thrilling tournament with exciting prizes for the winners."
  },
  {
    id: "photo-edit",
    name: "Photography & Editing",
    description: "Showcase your photography and editing skills. Winners decided by Instagram followers!",
    image: "https://images.unsplash.com/photo-1552168324-d612d77725e3",
    categories: ["Creative", "Social Media"],
    status: 'upcoming' as const,
    details: "Capture and edit compelling images under specified themes and constraints. Your work will be showcased on our Instagram page, and winners will be determined based on audience engagement and expert evaluation."
  },
  {
    id: "crime-scene",
    name: "Mock Crime Scene Investigation",
    description: "Put on your detective hat and solve a simulated crime scene filled with technical clues.",
    image: "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8",
    categories: ["Investigation", "Problem Solving"],
    status: 'upcoming' as const,
    details: "Analyze evidence, interview witnesses, and piece together clues to solve a complex technical mystery. This immersive experience will test your analytical thinking, attention to detail, and teamwork skills."
  },
  {
    id: "typing-contest",
    name: "Typing Championship",
    description: "Test your typing speed and accuracy, including a challenging reverse typing round!",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    categories: ["Speed", "Skill"],
    status: 'upcoming' as const,
    details: "Compete for the title of fastest typist through multiple rounds of increasing difficulty. Test your WPM, accuracy, and adaptability with standard, code, and even reverse typing challenges."
  },
  {
    id: "programming-relay",
    name: "Programming Relay",
    description: "A unique coding challenge where participants continue each other's code without direct communication.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    categories: ["Coding", "Team Event"],
    status: 'upcoming' as const,
    details: "Work as a team to solve complex programming challenges in relay format. Each member will have limited time to understand, modify, and extend code before passing it to the next teammate without direct communication."
  },
  {
    id: "bounty-bug",
    name: "Bounty on Bug",
    description: "Find security vulnerabilities in given software and compete for the highest bounty.",
    image: "https://images.unsplash.com/photo-1563207153-f403bf289096",
    categories: ["Security", "Debug"],
    status: 'upcoming' as const,
    details: "Channel your inner cybersecurity expert as you identify and exploit vulnerabilities in provided software. Earn bounties based on the severity and creativity of your discoveries."
  },
  {
    id: "tech-debate",
    name: "Tech Debate",
    description: "Debate on controversial tech topics like AI ethics, OS wars, and digital privacy.",
    image: "https://images.unsplash.com/photo-1521798552670-3130579c8c86",
    categories: ["Debate", "Discussion"],
    status: 'upcoming' as const,
    details: "Present compelling arguments on divisive technology topics such as AI ethics, cryptocurrency adoption, digital privacy, and more. Develop your public speaking skills while engaging with current tech controversies."
  },
  {
    id: "capture-flag",
    name: "Capture the Flag",
    description: "Solve technical puzzles, quizzes, and pictionary challenges to capture the flag!",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    categories: ["Puzzle", "Challenge"],
    status: 'upcoming' as const,
    details: "Navigate through a series of technical puzzles, cryptography challenges, and hidden clues to capture the virtual flag before your opponents. Test your problem-solving skills in this timed competition."
  },
  // Additional gaming events
  {
    id: "vr-challenge",
    name: "VR Gaming Challenge",
    description: "Experience cutting-edge virtual reality games and compete for the highest scores.",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac",
    categories: ["Gaming", "VR"],
    status: 'upcoming' as const,
    details: "Immerse yourself in stunning virtual worlds and compete in various VR games testing your reflexes, spatial awareness, and adaptability. No prior VR experience required!"
  },
  {
    id: "esports-tournament",
    name: "eSports Tournament",
    description: "Compete in popular eSports titles including Valorant, CS:GO, and League of Legends.",
    image: "https://images.unsplash.com/photo-1542751110-97427bbecf20",
    categories: ["Gaming", "eSports"],
    status: 'upcoming' as const,
    details: "Join our collegiate eSports tournament featuring popular competitive games. Form your team and battle for glory, prizes, and the chance to represent RNSIT in inter-college competitions."
  },
  {
    id: "retro-gaming",
    name: "Retro Gaming Marathon",
    description: "Relive the golden age of gaming with classic titles from the 80s and 90s.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
    categories: ["Gaming", "Retro"],
    status: 'upcoming' as const,
    details: "Travel back in time with classics like Pac-Man, Space Invaders, and Super Mario Bros. Compete for high scores on original hardware and experience the games that started it all."
  },
  {
    id: "game-development",
    name: "48-Hour Game Jam",
    description: "Design and build a playable game from scratch in just 48 hours.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766",
    categories: ["Gaming", "Development"],
    status: 'upcoming' as const,
    details: "Put your game development skills to the test in this intense 48-hour challenge. Create a game based on a surprise theme using any engine or framework of your choice. Both beginners and experienced developers welcome!"
  },
  {
    id: "mobile-gaming",
    name: "Mobile Gaming Tournament",
    description: "Compete in popular mobile games like PUBG Mobile, Clash Royale, and more.",
    image: "https://images.unsplash.com/photo-1609146568317-95261927f5c3",
    categories: ["Gaming", "Mobile"],
    status: 'upcoming' as const,
    details: "Showcase your skills in a variety of mobile games across different genres. Bring your own device and compete in 1v1 and team-based competitions for exciting prizes."
  },
  {
    id: "hackathon",
    name: "Detective's Dilemma Hackathon",
    description: "A creative hackathon with a detective theme - build solutions for crime-solving scenarios.",
    image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0",
    categories: ["Hackathon", "Creative"],
    status: 'upcoming' as const,
    details: "Combine your programming skills with detective thinking to build innovative solutions for fictional crime scenarios. This unique hackathon challenges you to use technology creatively in solving complex mysteries."
  },
  {
    id: "tech-memes",
    name: "Tech Meme Contest",
    description: "Create spontaneous, funny, and creative memes about technology.",
    image: "https://images.unsplash.com/photo-1517242027094-631f8c218a0f",
    categories: ["Creative", "Humor"],
    status: 'upcoming' as const,
    details: "Channel your humor and creativity to produce tech-related memes that will make even the most serious engineers laugh. Submissions will be judged on originality, humor, and relevance to current tech trends."
  },
  {
    id: "treasure-hunt",
    name: "Tech Treasure Hunt",
    description: "Follow the technical clues, decode maps, and find the hidden treasure!",
    image: "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec",
    categories: ["Adventure", "Problem Solving"],
    status: 'upcoming' as const,
    details: "Embark on an adventure across the campus, using your technical knowledge to decipher clues, solve puzzles, and locate hidden treasures. Teamwork and diverse technical skills will be crucial to your success."
  },
  {
    id: "squid-game",
    name: "Tech Squid Game",
    description: "Survive through multiple rounds of technical challenges inspired by the popular series.",
    image: "https://images.unsplash.com/photo-1635716897849-295987622bd9",
    categories: ["Challenge", "Elimination"],
    status: 'upcoming' as const,
    details: "Face a series of increasingly difficult technical challenges inspired by the popular Squid Game series. Participants will be eliminated in each round until only the most skilled remain to claim the ultimate prize."
  },
  {
    id: "mad-ads",
    name: "Mad Ads",
    description: "Create posters, collages, and creative advertisements for tech products.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    categories: ["Creative", "Design"],
    status: 'upcoming' as const,
    details: "Design and present creative advertisements for fictional or existing tech products. Showcase your marketing creativity, design skills, and persuasive presentation abilities in this fun challenge."
  }
];

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Find the selected event for any sub-event pages
    if (eventId && eventId !== 'techfest-2025') {
      const event = techFestEvents.find(e => e.id === eventId);
      if (event) {
        setSelectedEvent(event);
      }
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [eventId]);
  
  // Special case for techfest
  if (eventId === 'techfest-2025') {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <Link 
              to="/"
              className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
            
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-2xl blur opacity-30"></div>
              <div className="glass-card rounded-2xl overflow-hidden p-1 relative">
                <img 
                  src={getAssetPath("techfest-banner.jpg")} 
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
                        Explore our exciting lineup of events below. Click on any event to learn more and register!
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
                              <EventCard 
                                {...event} 
                                showDetails={true}
                              />
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
  
  // Regular event details for sub-events
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link 
            to="/events/techfest-2025"
            className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to TechFest Events
          </Link>
          
          {selectedEvent ? (
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-2xl blur opacity-30"></div>
              <div className="glass-card rounded-2xl overflow-hidden p-1 relative">
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.name} 
                  className="w-full h-60 md:h-80 object-cover object-center rounded-t-xl hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/1200x600/111/333?text=${selectedEvent.name.split(' ').join('+')}`;
                  }}
                />
                
                <div className="p-6 md:p-8">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">
                    {selectedEvent.name}
                  </h1>
                  
                  <div className="flex flex-wrap gap-2 my-4">
                    <span className="px-3 py-1 text-sm rounded-full bg-red-900/30 text-red-200">
                      April 12-13, 2025
                    </span>
                    <span className="px-3 py-1 text-sm rounded-full bg-red-900/30 text-red-200">
                      TechFest 2025
                    </span>
                    {selectedEvent.categories?.map((category: string, index: number) => (
                      <span key={index} className="px-3 py-1 text-sm rounded-full bg-red-900/30 text-red-200">
                        {category}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                    {selectedEvent.details || selectedEvent.description}
                  </p>
                  
                  <div className="space-y-6 mb-8">
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-3">Event Details</h2>
                      <ul className="list-disc pl-5 text-gray-400 space-y-2">
                        <li>Date: April 12-13, 2025</li>
                        <li>Time: 9:00 AM - 6:00 PM</li>
                        <li>Venue: RNSIT Campus, Main Auditorium</li>
                        <li>Participation: Open to all RNSIT students</li>
                        <li>Team Size: {Math.floor(Math.random() * 3) + 1}-{Math.floor(Math.random() * 2) + 3} members</li>
                        <li>Registration Fee: ₹{Math.floor(Math.random() * 150) + 50} per team</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-3">What to Expect</h2>
                      <p className="text-gray-400">
                        Participants will engage in challenging activities designed to test their skills and creativity. This event provides an excellent opportunity to learn, network, and showcase your talents in the {selectedEvent.categories?.join(' and ')} domains.
                      </p>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-3">Prizes</h2>
                      <ul className="list-disc pl-5 text-gray-400 space-y-2">
                        <li>1st Place: ₹{Math.floor(Math.random() * 5000) + 5000}</li>
                        <li>2nd Place: ₹{Math.floor(Math.random() * 3000) + 2000}</li>
                        <li>3rd Place: ₹{Math.floor(Math.random() * 1000) + 1000}</li>
                        <li>Certificates for all participants</li>
                      </ul>
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
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-400">Event not found</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EventDetails;
