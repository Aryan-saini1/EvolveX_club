import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/events/EventCard';
import { getAssetPath } from '../utils/path-utils';

const techFestEvents = [
  {
    id: "capture-the-flag",
    name: "Capture The Flag",
    description: "An exciting tech competition where teams tackle coding challenges, problem-solving tasks, and creative rounds to outsmart opponents.",
    image: "capture.jpeg",
    categories: ["Coding", "Puzzle", "Competition"],
    status: 'upcoming' as const,
    details: `Event Structure & Rounds:
• Round 1: Quiz – 20 multiple-choice questions testing coding proficiency and problem-solving.
• Round 2: Image Generation – Teams generate an image based on a topic.
• Round 3: Bingo – Teams strike out coding-related words from a Bingo card.
• Final Round: Solve coding problems at five junctions to capture all flags.`,
    teamSize: "2 members per team",
    registrationFee: "₹200 per team",
    venue: "CSE Block",
    prizes: ["₹1,500"],
    contact: {}
  },
  {
    id: "treasure-hunt",
    name: "Treasure Hunt",
    description: "A thrilling adventure where teams use old-style maps to navigate and uncover hidden clues.",
    image: "treasure_hunt.jpeg",
    categories: ["Adventure", "Puzzle"],
    status: 'upcoming' as const,
    details: `Event Structure & Rounds:
• Starting Clue: Provided at the CSE Department.
• Round 1: Search for Clue #2 and interpret its hidden message.
• Round 2: Locate Clue #3 by solving a puzzle.
• Round 3: Decode Clue #4 to find the key.`,
    teamSize: "3 members per team",
    registrationFee: "₹150 per team",
    venue: "CSE Block",
    prizes: ["₹1,000"],
    contact: {}
  },
  {
    id: "thinktank-pitch-battle",
    name: "The ThinkTank - Pitch Battle",
    description: "A high-energy competition where teams present business ideas and innovative solutions.",
    image: "pitch.webp",
    categories: ["Presentation", "Innovation"],
    status: 'upcoming' as const,
    details: `Event Structure:
• Registration: Submit team details, idea title, and a brief summary.
• Pitch: Each team gets 5 minutes to present their idea.
• Q&A: Followed by a 5-minute question and answer session.
• Judging: Based on content quality, clarity, creativity, and confidence.`,
    teamSize: "2-3 members per team",
    registrationFee: "Rs.90 per team",
    venue: "Mini Auditorium",
    prizes: ["Rs.800"],
    contact: {}
  },
  {
    id: "mad-ads",
    name: "Mad Ads – Creative Ad Campaign Competition",
    description: "A competition where teams create innovative ad campaigns on the spot.",
    image: "mad_ads.jpg",
    categories: ["Creative", "Campaign"],
    status: 'upcoming' as const,
    details: `Event Structure:
• Product Reveal: Teams receive a random product/service on the spot.
• Brainstorm: 45 minutes to develop an ad campaign.
• Pitch: A 5-minute presentation to the judges.
• Judging: Based on creativity, concept, execution, and teamwork.`,
    teamSize: "4-5 members per team",
    registrationFee: "Rs.150 per team",
    venue: "Seminar Hall",
    prizes: ["Rs.1000"],
    contact: {}
  },
  {
    id: "trade-quest",
    name: "Trade Quest",
    description: "A two-round competition testing financial acumen with a quiz and a virtual stock market simulation.",
    image: "trade.jpeg",
    categories: ["Finance", "Quiz"],
    status: 'upcoming' as const,
    details: `Event Structure:
• Round 1: Trade Quiz – Answer questions on stock markets and trading strategies.
• Round 2: Virtual Stock Market Challenge – Invest a virtual capital of ₹10,000.`,
    teamSize: "2 per team",
    registrationFee: "Rs.60 per team",
    venue: "Edusat Hall",
    prizes: ["Rs.800"],
    contact: {}
  },
  {
    id: "techsketch",
    name: "TechSketch - Tech Poster Design",
    description: "A poster design competition where participants create eye-catching tech posters.",
    image: "tech.jpg",
    categories: ["Design", "Creative"],
    status: 'upcoming' as const,
    details: `Event Structure:
• Duration: 45 minutes to hand-draw a poster on a chosen tech theme.
• Presentation: A 2-minute pitch to explain the concept.
• Judging: Based on creativity, clarity, and visual appeal.`,
    teamSize: "3",
    registrationFee: "Rs.120 per team",
    venue: "Seminar Hall",
    prizes: ["Rs.800"],
    contact: {}
  },
  {
    id: "techtalks-elocution",
    name: "TechTalks: Elocution Competition",
    description: "Showcase your public speaking skills in this competitive elocution contest.",
    image: "elocution.jpg",
    categories: ["Elocution", "Speech"],
    status: 'upcoming' as const,
    details: `Event Details:
• Speech Duration: 3 to 5 minutes per participant.
• Judging: Based on content, clarity, confidence, pronunciation, and grammar.`,
    teamSize: "Individual",
    registrationFee: "Rs.30",
    venue: "Seminar Hall",
    prizes: ["Rs.700"],
    contact: {}
  },
  {
    id: "murder-mystery",
    name: "Murder Mystery: The Final Lecture",
    description: "Investigate a simulated murder mystery to uncover the real killer.",
    image: "murder.jpeg",
    categories: ["Investigation", "Puzzle"],
    status: 'upcoming' as const,
    details: `Event Flow:
• Crime Scene Investigation: Search for hidden clues.
• Interrogation: Question suspects.
• Final Theories: Present your findings.
• Reveal: Uncover the truth behind Professor Jonathan Reed's murder.`,
    teamSize: "4 members per team",
    registrationFee: "₹120 per team",
    venue: "CSE Block (Classroom/Office Setup)",
    prizes: ["Rs.800"],
    contact: {}
  },
  {
    id: "tech-debate-zeal",
    name: "Tech Debate: ZEAL",
    description: "A team debate contest on provocative tech topics.",
    image: "Debate.jpeg",
    categories: ["Debate", "Discussion"],
    status: 'upcoming' as const,
    details: `Event Structure & Rounds:
• Preliminary Rounds: Teams are divided into groups for initial debates.
• Qualifiers: Top teams advance based on performance.
• Final Round: A 20-minute debate with a side swap after 10 minutes.
• Judging: Based on argument strength, clarity, technical knowledge, and stage presence.`,
    teamSize: "3-4 members per team",
    registrationFee: "₹120 per team",
    venue: "Mini Auditorium",
    prizes: ["Winner: ₹1111 + Certificate", "Runner-Up: Certificate", "Best Speaker Award: ₹80"],
    contact: {}
  },
  {
    id: "cup-pyramid",
    name: "Cup Pyramid Competition",
    description: "Stack cups into a pyramid as quickly as possible.",
    image: "cup_pyramid.jpeg",
    categories: ["Speed", "Skill"],
    status: 'upcoming' as const,
    details: `Rules:
• Participants receive a pre-decided number of cups (15 or 21).
• The goal is to stack them into a stable pyramid.
• If the pyramid collapses, the participant must restart.`,
    teamSize: "Individual",
    registrationFee: "₹30 per person",
    venue: "To Be Announced",
    prizes: ["₹200"],
    contact: {}
  },
  {
    id: "typing-speed",
    name: "Typing Speed Competition",
    description: "Test your typing speed and accuracy across multiple challenging rounds.",
    image: "speed.jpeg",
    categories: ["Speed", "Skill"],
    status: 'upcoming' as const,
    details: `Competition Format:
• Round 1: Type a given paragraph; time is recorded.
• Round 2: Blindfolded typing of a paragraph read aloud.
• Round 3: An online typing test.
• Additional Round: Tie-breaker if required.`,
    teamSize: "Individual",
    registrationFee: "₹30 per person",
    venue: "To Be Announced",
    prizes: ["₹200"],
    contact: {}
  },
  {
    id: "photography-contest",
    name: "Photography Contest",
    description: "Capture a unique photograph based on a given theme.",
    image: "photograph.jpeg",
    categories: ["Photography", "Creative"],
    status: 'upcoming' as const,
    details: `Event Details:
• Theme Selection: Choose from themes like Joy in Everyday Life, Reflections, or Textures of Life.
• Submission: Provide a JPEG/PNG image along with a short description.
• Judging: Based on creativity, explanation, and relevance to the chosen theme.`,
    teamSize: "Individual",
    registrationFee: "₹20 per person",
    venue: "To Be Announced",
    prizes: ["₹200"],
    contact: {}
  },
  {
    id: "squid-game",
    name: "Squid Game Challenge",
    description: "Compete in a series of strategic and physical challenges inspired by Squid Game.",
    image: "squid_game.jpeg",
    categories: ["Strategy", "Team"],
    status: 'upcoming' as const,
    details: `Challenge Rounds:
• Target Aiming: Hit a target using small objects.
• Hopscotch: Navigate a grid while avoiding traps.
• Bottle Flip: Successfully land a bottle flip.
• Final Challenge: Spin a wheel to receive the ultimate task.`,
    teamSize: "2 members per team",
    registrationFee: "₹100 per team",
    venue: "Basketball Court",
    prizes: ["₹1000"],
    contact: {}
  },
  {
    id: "rizzlerbyte",
    name: "RizzlerByte: Tech Memes with Sauce",
    description: "Create a tech meme within 45 minutes using an allotted template.",
    image: "meme.jpeg",
    categories: ["Meme", "Creative"],
    status: 'upcoming' as const,
    details: `Event Details:
• Duration: 45 minutes to design a tech meme.
• Submission: Final meme will be posted on the official Instagram.
• Judging: Based on likes and creativity.`,
    teamSize: "2-3 members",
    registrationFee: "₹80 per team",
    venue: "To Be Announced",
    prizes: ["Some Gift"],
    contact: {}
  },
  {
    id: "binge-trivia",
    name: "Binge Watches Trivia",
    description: "A trivia contest based on Netflix shows and movies.",
    image: "trivia.jpeg",
    categories: ["Trivia", "Entertainment"],
    status: 'upcoming' as const,
    details: `Competition Format:
• Round 1: Pen & Paper multiple choice questions.
• Round 2: Audio/Visual round with iconic scenes.
• Round 3: Dumb charades with Netflix shows or movies.`,
    teamSize: "2 person team",
    registrationFee: "₹200 per team",
    venue: "To Be Announced",
    prizes: ["Some Gift"],
    contact: {}
  },
  {
    id: "bgmi-tournament",
    name: "BGMI Tournament",
    description: "Battle it out in a BGMI tournament across three classic mode matches.",
    image: "bgmi.jpeg",
    categories: ["Gaming", "Esports"],
    status: 'upcoming' as const,
    details: `Tournament Format:
• Three rounds of Classic Mode matches.
• Points awarded for placements and kills.
• Tie-breaker based on total kills and final match performance.`,
    teamSize: "4 members per team",
    registrationFee: "₹200 per team",
    venue: "CSE Block",
    prizes: ["₹4,000"],
    contact: {}
  },
  {
    id: "hackignite",
    name: "HackIgnite",
    description: "A 3-hour hackathon where teams develop innovative solutions to a real-world problem.",
    image: "hackathon.jpeg",
    categories: ["Coding", "Hackathon"],
    status: 'upcoming' as const,
    details: `Event Structure:
• Problem Statement: Revealed at the start of the event.
• Development: 3 hours to design and prototype a solution.
• Pitching: Present your solution to a panel of judges.`,
    teamSize: "3 members per team",
    registrationFee: "₹200 per team",
    venue: "CSE Block",
    prizes: ["HackIgnite T-shirt + ₹1000"],
    contact: {}
  },
  {
    id: "valorant",
    name: "VALORANT",
    description: "Engage in intense knockout matches in VALORANT.",
    image: "valo.jpeg",
    categories: ["Gaming", "Esports"],
    status: 'upcoming' as const,
    details: `Tournament Details:
• Format: Best-of-three rounds.
• Knockout and full game formats during semis and finals.`,
    teamSize: "5 members per team",
    registrationFee: "₹200 per team",
    venue: "CSE Block",
    prizes: ["₹2000"],
    contact: {}
  },
  {
    id: "deadshot",
    name: "DEADSHOT",
    description: "A fun gaming event focused on team coordination and skill.",
    image: "deadshot.jpeg",
    categories: ["Gaming", "Esports"],
    status: 'upcoming' as const,
    details: `Rules:
• Teams of 6 are divided into 3 pairs.
• Within each pair, one uses the mouse while the other uses the keyboard.
• Finals are conducted in a best-of-three format.`,
    teamSize: "6 members per team",
    registrationFee: "₹180 per team",
    venue: "CSE Block",
    prizes: ["₹2000"],
    contact: {}
  },
  {
    id: "blog-writing",
    name: "BLOG WRITING",
    description: "Express your creativity and analytical skills in a timed blog writing contest.",
    image: "blog.jpeg",
    categories: ["Writing", "Creative"],
    status: 'upcoming' as const,
    details: `Event Structure:
• Topic Reveal: A topic is provided on the spot.
• Writing Session: 1.5 hours to draft and finalize the blog.
• Submission: Blogs must be submitted in a digital format.
• Judging: Based on content quality, creativity, and structure.`,
    teamSize: "Individual",
    registrationFee: "₹50 per participant",
    venue: "CSE Block",
    prizes: ["₹800"],
    contact: {}
  },
  {
    id: "titan-challenge",
    name: "TITAN CHALLENGE",
    description: "A CrossFit event testing strength, endurance, and teamwork.",
    image: "crossfit.jpeg",
    categories: ["Fitness", "Competition"],
    status: 'upcoming' as const,
    details: `Event Structure:
• Challenge 1: AMRAP Inferno – Complete as many reps as possible in 10 minutes.
• Challenge 2: Deadlift Gauntlet – Perform maximum repetitions in 90 seconds (choose weight category).
• Challenge 3: Agility Blitz – Timed obstacle course with cone sprints, ladder drills, and burpees.`,
    teamSize: "Individual",
    registrationFee: "₹40 per person",
    venue: "Gym/Basketball Court",
    prizes: ["₹1000"],
    contact: {}
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
  
  // Special case for techfest main page
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
                  src={getAssetPath("evolve.jpeg")} 
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
                    EvolveX presents our inaugural TechFest – a two-day celebration of innovation, technology, and creativity.
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
                      {selectedEvent.venue}
                    </span>
                    <span className="px-3 py-1 text-sm rounded-full bg-red-900/30 text-red-200">
                      {selectedEvent.registrationFee}
                    </span>
                    {selectedEvent.categories?.map((category: string, index: number) => (
                      <span key={index} className="px-3 py-1 text-sm rounded-full bg-red-900/30 text-red-200">
                        {category}
                      </span>
                    ))}
                  </div>
                  <div className="text-gray-300 leading-relaxed mb-6 text-lg whitespace-pre-line">
                    {selectedEvent.details}
                  </div>
                  <div className="space-y-6 mb-8">
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-3">Event Details</h2>
                      <ul className="list-disc pl-5 text-gray-400 space-y-2">
                        <li>Venue: {selectedEvent.venue}</li>
                        <li>Team Size: {selectedEvent.teamSize}</li>
                        <li>Registration Fee: {selectedEvent.registrationFee}</li>
                      </ul>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-3">What to Expect</h2>
                      <p className="text-gray-400">
                        {selectedEvent.description}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-3">Prizes</h2>
                      <ul className="list-disc pl-5 text-gray-400 space-y-2">
                        {selectedEvent.prizes?.map((prize: string, index: number) => (
                          <li key={index}>{prize}</li>
                        )) || <li>Prizes to be announced</li>}
                      </ul>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-3">How to Register</h2>
                      <p className="text-gray-400 mb-4">
                        Registration details and deadlines will be announced soon.
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
                      For more information, please check the event page.
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
