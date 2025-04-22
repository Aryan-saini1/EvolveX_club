
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
    status: 'past' as const,
    details: `Event Structure & Rounds:
• Round 1: Quiz – 20 multiple-choice questions testing coding proficiency and problem-solving.
• Round 2: Image Generation – Teams generate an image based on a topic.
• Round 3: Bingo – Teams strike out coding-related words from a Bingo card.
• Final Round: Solve coding problems at five junctions to capture all flags.`,
    teamSize: "2 members per team",
    registrationFee: "Free",
    venue: "CSE Department",
    prizes: ["₹1,500"],
    contact: {"Aryan":"9610937743",
      "Anurag":"7011228018",
      "Aastha":"9669900096"},
    registrationLink: "https://forms.gle/BMNecXBx7DnaTRFq6"
  },
  {
    id: "treasure-hunt",
    name: "Treasure Hunt",
    description: "A thrilling adventure where teams use old-style maps to navigate and uncover hidden clues.",
    image: "treasure_hunt.jpeg",
    categories: ["Adventure", "Puzzle"],
    status: 'past' as const,
    details: `Event Structure & Rounds:
• Starting Clue: Provided at the CSE Department.
• Round 1: Search for Clue #2 and interpret its hidden message.
• Round 2: Locate Clue #3 by solving a puzzle.
• Round 3: Decode Clue #4 to find the key.`,
    teamSize: "3 members per team",
    registrationFee: "Free",
    venue: "CSE Department",
    prizes: ["Rs.1,500"],
    contact: {"Aryan": "9610937743",
      "Kushi":"9606851816",
      "Anurag":"7011228018"
    },
    registrationLink: "https://forms.gle/treasure-hunt-registration"
  },
  {
    id: "thinktank-pitch-battle",
    name: "The ThinkTank - Pitch Battle",
    description: "A high-energy competition where teams present business ideas and innovative solutions.",
    image: "pitch.webp",
    categories: ["Presentation", "Innovation"],
    status: 'past' as const,
    details: `Event Structure:
• Registration: Submit team details, idea title, and a brief summary.
• Pitch: Each team gets 5 minutes to present their idea.
• Q&A: Followed by a 5-minute question and answer session.
• Judging: Based on content quality, clarity, creativity, and confidence.`,
    teamSize: "2-3 members per team",
    registrationFee: "Free",
    venue: "CSE Department",
    prizes: ["1st place:500","2nd place:300"],
    contact: {"Likitha":"9535416823" , 
      "Vismaya":"9902109551"},
    registrationLink: "https://forms.gle/pitch-battle-registration"
  },
  {
    id: "mad-ads",
    name: "Mad Ads – Creative Ad Campaign Competition",
    description: "A competition where teams create innovative ad campaigns on the spot.",
    image: "mad_ads.jpg",
    categories: ["Creative", "Campaign"],
    status: 'past' as const,
    details: `Event Structure:
• Product Reveal: Teams receive a random product/service on the spot.
• Brainstorm: 45 minutes to develop an ad campaign.
• Pitch: A 5-minute presentation to the judges.
• Judging: Based on creativity, concept, execution, and teamwork.`,
    teamSize: "4-5 members per team",
    registrationFee: "Free",
    venue: "CSE Department",
    prizes: ["1st place:500","2nd place:300"],
    contact: {"Aastha":"9669900096" , 
      "Vismaya":"9902109551"},
    registrationLink: "https://forms.gle/mad-ads-registration"
  },
  {
    id: "techsketch",
    name: "TechSketch - Tech Poster Design",
    description: "A poster design competition where participants create eye-catching tech posters.",
    image: "tech.jpg",
    categories: ["Design", "Creative"],
    status: 'past' as const,
    details: `Event Structure:
• Duration: 45 minutes to hand-draw a poster on a chosen tech theme.
• Presentation: A 2-minute pitch to explain the concept.
• Judging: Based on creativity, clarity, and visual appeal.`,
    teamSize: "3 members per team",
    registrationFee: "Free",
    venue: "CSE Department",
    prizes: ["1st place:Rs.500","2nd place:Rs.300"],
    contact: {"Vismaya":"9902109551" , 
      "Akshaya":"9740333918"},
    registrationLink: "https://forms.gle/techsketch-registration"
  },
  {
    id: "techtalks-elocution",
    name: "TechTalks: Elocution Competition",
    description: "Showcase your public speaking skills in this competitive elocution contest.",
    image: "elocution.jpg",
    categories: ["Elocution", "Speech"],
    status: 'past' as const,
    details: `Event Details:
• Speech Duration: 3 to 5 minutes per participant.
• Judging: Based on content, clarity, confidence, pronunciation, and grammar.`,
    teamSize: "Individual",
    registrationFee: "Free",
    venue: "CSE Department",
    prizes: ["1st place:Rs.300","2nd place:Rs.100"],
    contact: {"Akshaya":"9740333918"},
    registrationLink: "https://forms.gle/techtalks-registration"
  },
  {
    id: "murder-mystery",
    name: "Murder Mystery: The Final Lecture",
    description: "Investigate a simulated murder mystery to uncover the real killer.",
    image: "murder.jpeg",
    categories: ["Investigation", "Puzzle"],
    status: 'past' as const,
    details: `Event Flow:
• Crime Scene Investigation: Search for hidden clues.
• Interrogation: Question suspects.
• Final Theories: Present your findings.
• Reveal: Uncover the truth behind Professor Jonathan Reed's murder.`,
    teamSize: "4 members per team",
    registrationFee: "Free",
    venue: "CSE Department",
    prizes: ["Rs.1000"],
    contact: {"Deeta":"8431932905"},
    registrationLink: "https://forms.gle/murder-mystery-registration"
  },
  {
    id: "tech-debate-zeal",
    name: "Tech Debate: ZEAL",
    description: "A team debate contest on provocative tech topics.",
    image: "Debate.jpeg",
    categories: ["Debate", "Discussion"],
    status: 'past' as const,
    details: `Event Structure & Rounds:
• Preliminary Rounds: Teams are divided into groups for initial debates.
• Qualifiers: Top teams advance based on performance.
• Final Round: A 20-minute debate with a side swap after 10 minutes.
• Judging: Based on argument strength, clarity, technical knowledge, and stage presence.`,
    teamSize: "3-4 members per team",
    registrationFee: "Free",
    venue: "CSE Department",
    prizes: ["Winner: ₹1111 + Certificate", "Best Speaker Award: ₹111"],
    contact: {"Prajwal":"8660450708", 
      "Souravi":"9663639694"},
    registrationLink: "https://forms.gle/tech-debate-registration"
  },
  {
    id: "photography-contest",
    name: "Photography Contest",
    description: "Capture a unique photograph based on a given theme.",
    image: "photograph.jpeg",
    categories: ["Photography", "Creative"],
    status: 'past' as const,
    details: `Showcase your photography skills by capturing event moments and getting the
most votes! The participant with the highest number of votes wins.`,
    teamSize: "Individual",
    registrationFee: "Free",
    venue: "CSE Department",
    prizes: ["₹300"],
    contact: {"Souravi":"9663639694"},
    registrationLink: "https://forms.gle/photography-registration"
  },
  {
    id: "squid-games",
    name: "SQUID GAMES",
    description: "A high-stakes challenge inspired by Squid Game, where teams compete in fast-paced games while navigating obstacles with their legs tied together. The fastest team or the one with the most points wins.",
    image: "squid_game.jpeg",
    categories: ["Adventure", "Team"],
    status: 'past' as const,
    details: `Rules & Event Structure:
• Teams must complete a series of physical and strategic challenges while staying tied together.
• Each round presents a unique obstacle testing aim, balance, coordination, and teamwork.
• Failing a challenge may result in a penalty or restart.
• The final round introduces a surprise challenge that determines the ultimate winner.
• Registrations are subject to availability. Limited slots only.`,
    teamSize: "3 members",
    registrationFee: "Free",
    venue: "Basketball Court",
    date: "April 9, 2025",
    time: "10:00 AM - 11:00 AM",
    prizes: ["1st: Rs.700", "2nd: Rs.300"],
    contact: {
      "Kushi": "9808851818",
      "Ayush": "8088936082"
    },
    registrationLink: "https://forms.gle/squid-games-registration"
  },
  {
    id: "binge-watch-trivia",
    name: "BINGE WATCH TRIVIA",
    description: "A fun and competitive trivia event where teams showcase their knowledge of Netflix shows and movies through a mix of questions, visual challenges, and interactive tasks. The teams with the highest scores will win exciting prizes.",
    image: "trivia.jpeg",
    categories: ["Entertainment", "Quiz"],
    status: 'past' as const,
    details: `Rules & Event Structure:
• Participants will be tested on their familiarity with Netflix content.
• The competition will involve different formats, including Q&A and interactive elements.
• The top teams will be awarded based on their performance.
• Registrations are subject to availability. Limited slots only.`,
    teamSize: "2 members",
    registrationFee: "Free",
    venue: "CSE Department",
    prizes: ["Winner: Rs.500"],
    contact: {
      "Sanjana": "7483817998",
      "Kushi": "9808851818"
    },
    registrationLink: "https://forms.gle/binge-watch-registration"
  },
  {
    id: "bgmi",
    name: "BGMI",
    description: "An action-packed Battlegrounds Mobile India (BGMI) tournament where teams compete in intense Classic Mode qualifiers, with the Top 5 advancing to the TDM Finals to battle for the championship.",
    image: "bgmi.jpeg",
    categories: ["Gaming", "Esports"],
    status: 'past' as const,
    details: `Rules & Event Structure:
• Teams will compete in Classic Mode qualifiers, where performance is based on placement and eliminations.
• The Top 5 teams will advance to the Finals, which will be played in TDM Mode.
• In case of tie, ranking will be determined by total kills and final match placement.
• The team with the most TDM wins in the Finals will be crowned the champion.
• iPads are not allowed.
• No emulators. PC players are strictly prohibited.
• No hacks, cheats, or third-party software. Fair play only.
• Registrations are subject to availability. Limited slots only.`,
    teamSize: "4 members per team",
    registrationFee: "Free",
    venue: "CSE Department",
    prizes: ["1st Place: ₹1000", "2nd Place: ₹600", "3rd Place: ₹400"],
    contact: {
      "Shashidhar": "7349850584",
      "Aryan": "9610937743"
    },
    registrationLink: "https://forms.gle/bgmi-registration"
  },
  {
    id: "hackignite",
    name: "HackIgnite",
    description: "A fast-paced hackathon where teams tackle a real-world problem, develop a solution within three hours, and pitch their ideas to a panel of judges.",
    image: "hackathon.jpeg",
    categories: ["Coding", "Hackathon"],
    status: 'past' as const,
    details: `Rules & Event Structure:
• Teams will receive a problem statement at the start of the event.
• They must brainstorm, design, and prototype a solution within the given time.
• At the end of the event, each team will present their idea to the judges.
• Judging criteria include innovation, feasibility, technical implementation, clarity, and impact.
• In case of a tie, technical implementation and clarity of pitch will determine the winner.
• Registrations are subject to availability. Limited slots only.`,
    teamSize: "3 members",
    registrationFee: "Free",
    venue: "CSE Department",
    prizes: ["Winner: ₹1500"],
    contact: {
      "Aryan": "9610937743",
      "Deeta": "8431932905"
    },
    registrationLink: "https://forms.gle/hackignite-registration"
  },
  {
    id: "blog-writing",
    name: "BLOG WRITING",
    description: "Express your thoughts, creativity, and analytical skills in the Blog Writing Competition! Participants will be given a topic on the spot and will have a set time to craft a well-structured and engaging blog.",
    image: "blog.jpeg",
    categories: ["Writing", "Creative"],
    status: 'past' as const,
    details: `Rules & Event Structure:
• Duration: 3 to 10 minutes.
• Categories: Fiction, Sci-Fi, Thriller, Animation, Social Message, Documentary, Experimental, Tech-related.
• Content must be appropriate; unethical content leads to disqualification.
• Judging criteria: Story, creativity, technical execution, acting, direction, sound, theme relevance.
• Team size: Individual or group (max 5 members).
• Registrations are subject to availability. Limited slots only.`,
    teamSize: "Individual or group(max 5)",
    registrationFee: "Free",
    venue: "CSE Department",
    prizes: ["Rs.350"],
    contact: {
      "Vismaya": "9902109551",
      "Aastha": "9669900098",
      "Anurag":"7011228018"
    },
    registrationLink: "https://forms.gle/blog-writing-registration"
  },
  {
    id: "short-film",
    name: "Short Film Competition",
    description: "A platform for aspiring filmmakers to showcase their storytelling skills through short films across various genres.",
    image: "short_film.jpg",
    categories: ["Creative", "Competition"],
    status: 'past' as const,
    details: `Rules:
• Films must be between 3 to 10 minutes long.
• Accepted categories: Fiction, Sci-Fi, Thriller, Animation, Social Message, Documentary, Experimental, and Tech-related.
• Content must be appropriate and non-controversial. Inappropriate or unethical content will lead to disqualification.
• Films will be judged based on story, creativity, technical execution, acting, direction, sound, and relevance to the theme.
• Registrations are subject to availability. Limited slots only.`,
    teamSize: "Individual or Group (Max 5 members)",
    registrationFee: "Free",
    venue: "CSE Department",
    prizes: ["Rs.400"],
    contact: {
      "Vismaya": "9902109551",
      "Aastha": "9669900098"
    },
    registrationLink: "https://forms.gle/short-film-registration"
  },
  {
    id: "valorant",
    name: "VALORANT",
    description: "Get ready to play the most heated among students which makes you give your full individual potential being a team. Every game is a knockout game.",
    image: "valo.jpeg",
    categories: ["Gaming", "Esports"],
    status: 'past' as const,
    details: `Rules:
• Full Unrated Mode Games.
• Bring your own systems.
• We will be providing monitors, WiFi and LAN cables will be provided if necessary.
• No hacks, cheats, or third-party software. Fair play only.
• All resolutions are allowed.
• Registrations are subject to availability. Limited slots only.`,
    teamSize: "5 members",
    registrationFee: "Free",
    venue: "CSE Department",
    prizes: ["1st Place: ₹1250", "2nd Place: ₹750"],
    contact: {
      "Shashidhar": "7349850584",
      "Aryan": "9610937743"
    },
    registrationLink: "https://forms.gle/valorant-registration"
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
                  src={getAssetPath("cyberis.jpeg")} 
                  alt="Cyberis" 
                  className="w-full h-60 md:h-80 object-cover object-center rounded-t-xl hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/1200x600/111/333?text=Cyberis`;
                  }}
                />
                <div className="p-6 md:p-8">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">
                    Cyberis
                  </h1>
                  <div className="flex flex-wrap gap-2 my-4">
                    <span className="px-3 py-1 text-sm rounded-full bg-red-900/30 text-red-200">
                      April 7-9, 2025
                    </span>
                    <span className="px-3 py-1 text-sm rounded-full bg-red-900/30 text-red-200">
                      RNSIT Campus
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    EvolveX presents our inaugural Cyberis – a three-day celebration of innovation, technology, and creativity.
                  </p>
                  <div className="space-y-6 mb-8">
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-3">Event Details</h2>
                      <ul className="list-disc pl-5 text-gray-400 space-y-2">
                        <li>Date: April 7-9, 2025</li>
                        <li>Time: 9:00 AM - 6:00 PM</li>
                        <li>Venue: RNSIT Campus</li>
                        <li>Participation: Open to all RNSIT students</li>
                      </ul>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-3">All Events</h2>
                      <p className="text-gray-400 mb-4">
                        Explore our exciting lineup of events below. Click on any event to learn more!
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
                      <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
                      <p className="text-gray-400">
                        For more information, please contact:<br />
                        <a href="mailto:evolvex@rnsit.ac.in" className="text-red-400 hover:underline">evolvex@rnsit.ac.in</a> or call +91 9610937743
                      </p>
                    </div>
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
                      <div className="glass-card bg-gradient-to-r from-red-900/20 to-red-800/20 p-6 rounded-lg border border-red-500/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-600/10 rounded-full blur-2xl"></div>
                        
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                              <span className="text-xl">📱</span>
                            </div>
                            <h3 className="text-xl text-red-400 font-bold tracking-wide">Registration Process</h3>
                          </div>
                          
                          <div className="space-y-4 ml-11">
                            <div className="relative">
                              <div className="h-full w-0.5 bg-gradient-to-b from-red-500 to-transparent absolute left-0 top-0"></div>
                              <div className="pl-4">
                                <p className="text-gray-200 font-medium mb-1 text-lg">Scan & Register</p>
                                <p className="text-gray-400 leading-relaxed">
                                  Find QR codes displayed on Cyberis posters across campus
                                </p>
                              </div>
                            </div>
                            
                            <div className="relative">
                              <div className="h-full w-0.5 bg-gradient-to-b from-red-500 to-transparent absolute left-0 top-0"></div>
                              <div className="pl-4">
                                <p className="text-gray-200 font-medium mb-1 text-lg">Brochure Access</p>
                                <p className="text-gray-400 leading-relaxed">
                                  Check your Cyberis brochure for exclusive registration QR codes
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-6 bg-gradient-to-r from-red-500/10 to-red-900/10 p-4 rounded-lg border border-red-500/10">
                            <div className="flex items-center gap-2">
                              <span className="text-red-400 animate-pulse">⚡</span>
                              <p className="text-red-300 font-medium">
                                Limited slots available! Secure your spot early.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
                      <div className="glass-card bg-gradient-to-r from-red-900/20 to-red-800/20 p-6 rounded-lg border border-red-500/20">
                        <div className="space-y-3">
                          {Object.entries(selectedEvent.contact).map(([name, phone]: [string, string], index: number) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-500/20 to-red-700/20 flex items-center justify-center">
                                <span className="text-xl">👤</span>
                              </div>
                              <div>
                                <p className="text-gray-200 font-medium">{name}</p>
                                <a 
                                  href={`tel:${phone}`} 
                                  className="text-red-400 hover:text-red-300 transition-colors"
                                >
                                  +91 {phone}
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
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
