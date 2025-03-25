import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/events/EventCard';
import { getAssetPath } from '../utils/path-utils';

// All events with individual details
const techFestEvents = [
  {
    id: "trade-quest",
    name: "Trade Quest",
    description: "Test your financial knowledge in this quiz covering stocks, fintech, and investments. Make dummy investments and compete for the highest returns!",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f",
    categories: ["Quiz", "Finance"],
    status: 'upcoming' as const,
    whatToExpect:"Participants will dive into an exciting blend of finance and strategy, testing their analytical skills through quizzes, market simulations, and real-world investment challenges. This event offers a unique opportunity to sharpen financial acumen, compete in high-stakes scenarios, and network with like-minded enthusiasts, all while showcasing your expertise in the world of finance.",
    details: "Participants will test their financial knowledge through a series of challenging questions and scenarios. You'll analyze market trends, make investment decisions through simulated stocks and compete to achieve the highest returns on your virtual portfolio.",
    date: "April 12-13, 2025",
    time: "9:00 AM - 6:00 PM",
    venue: "Edusat Hall",
    teamSize: "1-2 members",
    registrationFee: "30 per team",
    prizes: ["1st Place: tbd", "2nd Place: tbd", "3rd Place: tbd"],
    contact: { email: "tradequest@rnsit.ac.in", phone: "+91 98765 43210" }
  },
  {
    id: "pitching",
    name: "Pitching",
    description: "Present your innovative ideas to our panel of judges in this Shark Tank-style competition.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    categories: ["Presentation", "Innovation"],
    status: 'upcoming' as const,
    whatToExpect:"Participants will step into the shoes of entrepreneurs, pitching their groundbreaking ideas to a panel of expert judges. Expect a high-energy environment where creativity meets strategy, as you defend your concepts, tackle critical questions, and refine your business vision. This event offers a platform to gain valuable feedback, network with industry professionals, and compete for potential funding and mentorship opportunities.",
    details: "Channel your inner entrepreneur in this Shark Tank-style competition. Present your innovative ideas to our panel of judges, answer tough questions, and compete for potential funding and mentorship opportunities.",
    date: "April 12-13, 2025",
    time: "10:00 AM - 5:00 PM",
    venue: "RNSIT Campus, Conference Hall",
    teamSize: "3-4 members",
    registrationFee: "40 per team",
    prizes: ["1st Place: 500", "2nd Place: 250"],
    contact: { email: "pitching@rnsit.ac.in", phone: "+91 98765 43211" }
  },
  {
    id: "valorant",
    name: "Valorant",
    description: "Test your tactical skills and teamwork in this high-intensity Valorant tournament.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    categories: ["Gaming", "Esports", "Competition"],
    status: 'upcoming' as const,
    details: "Gather your squad and compete in an adrenaline-fueled Valorant tournament. Showcase your strategic gameplay, precise aiming, and coordination as you battle against other skilled teams for glory and exciting prizes.(SWIFT PLAY)",
    date: "April 12-13, 2025",
    whatToExpect: "Participants will engage in intense, strategic 5v5 battles, showcasing their teamwork, reflexes, and tactical prowess. The tournament will feature a group-stage format followed by knockout rounds, ensuring an action-packed experience for players and spectators alike. Expect thrilling clutches, strategic outplays, and an electrifying competitive atmosphere.",
    time: "11:00 AM - 6:00 PM",
    venue: "CSE 201",
    teamSize: "5 members(OWN DEVICES)",
    registrationFee: "150",
    prizes: ["1st Place: 1000", "2nd Place: 500", "3rd Place: 300"],
    contact: { email: "gaming@rnsit.ac.in", phone: "+91 98765 43212" }
  },
  {
    id: "BGMI",
    name: "BGMI Tournament",
    description: "Battle it out in an intense BGMI tournament and prove your skills in the ultimate survival challenge.",
    image: "https://images.unsplash.com/photo-1552168324-d612d77725e3",
    categories: ["Creative", "Social Media"],
    status: 'upcoming' as const,
    details: "Drop into the battleground, loot, strategize, and survive till the end in this high-stakes BGMI tournament. Compete against the best players and squads, showcasing your reflexes, tactics, and game sense to claim victory.",
    date: "April 12-13, 2025",
    whatToExpect: "Participants will engage in intense battle royale matches where strategic positioning, teamwork, and fast-paced gunfights will decide the victors. The tournament will feature multiple rounds, including qualifiers, semi-finals, and a grand finale, ensuring high-stakes action throughout. Expect nail-biting clutches, calculated rotations, and the thrill of securing the 'Winner Winner Chicken Dinner!'",
    time: "9:30 AM - 5:30 PM",
    venue: "CSE 202",
    teamSize: "4 members",
    registrationFee: "100",
    prizes: ["1st Place: 1000", "2nd Place: 500", "3rd Place: 300"],
    contact: { email: "bgmi@rnsit.ac.in", phone: "+91 98765 43213" }
  },
  {
    id: "crime-scene",
    name: "Murder Mystery:The Final Lecture",
    description: "Put on your detective hat and solve a simulated crime scene filled with technical clues.",
    image: "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8",
    categories: ["Investigation", "Problem Solving"],
    status: 'upcoming' as const,
    details: "Analyze evidence, interview witnesses, and piece together clues to solve a complex technical mystery. This immersive experience will test your analytical thinking, attention to detail, and teamwork skills.",
    date: "April 12-13, 2025",
    whatToExpect: "Participants will step into the shoes of detectives as they work to unravel a gripping murder mystery. The event will feature a realistic crime scene with forensic evidence, suspect interviews, and cryptic clues. Teams will need to analyze fingerprints, decode hidden messages, and use logical deduction to crack the case before time runs out. Expect thrilling twists, unexpected red herrings, and an immersive investigative experience that will challenge your problem-solving and teamwork skills.",
    time: "10:00 AM - 6:00 PM",
    venue: "CSE Block(Classroom/Office Setup)",
    teamSize: "Teams of 4",
    registrationFee: "120 per team",
    prizes: ["1st Place: 500", "2nd Place: 300"],
    contact: { email: "crimescene@rnsit.ac.in", phone: "+91 98765 43214" }
  },
  {
    id: "typing-contest",
    name: "Typing Championship",
    description: "Test your typing speed and accuracy, including a challenging reverse typing round!",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    categories: ["Speed", "Skill"],
    status: 'upcoming' as const,
    details: "Compete for the title of fastest typist through multiple rounds of increasing difficulty. Test your WPM, accuracy, and adaptability with standard, code, and even reverse typing challenges.",
    date: "April 12-13, 2025",
    time: "9:30 AM - 4:30 PM",
    venue: "RNSIT Campus, Computer Lab",
    teamSize: "Individual",
    registrationFee: "Free",
    prizes: ["Winner: 2000", "Runner-up: 1000"],
    contact: { email: "typing@rnsit.ac.in", phone: "+91 98765 43215" }
  },
  {
    id: "programming-relay",
    name: "Programming Relay",
    description: "A unique coding challenge where participants continue each other's code without direct communication.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    categories: ["Coding", "Team Event"],
    status: 'upcoming' as const,
    details: "Work as a team to solve complex programming challenges in relay format. Each member will have limited time to understand, modify, and extend code before passing it to the next teammate without direct communication.",
    date: "April 12-13, 2025",
    whatToExpect: "Participants will engage in a high-intensity coding challenge where teamwork and adaptability are key. Each team member will take turns working on a shared codebase, building upon their teammates' logic without any direct communication. Expect unexpected twists, time constraints, and evolving problems that require quick thinking and efficient coding skills. This event will test your ability to understand and extend existing code while maintaining clarity and precision under pressure.",
    time: "10:00 AM - 6:00 PM",
    venue: "Edusat Hall",
    teamSize: "Teams of 2-4",
    registrationFee: "100 per team",
    prizes: ["1st Place: 800", "2nd Place: 500", "3rd Place: 300"],
    contact: { email: "relay@rnsit.ac.in", phone: "+91 98765 43216" }
  },
  {
    id: "bounty-bug",
    name: "Bounty on Bug",
    description: "Find security vulnerabilities in given software and compete for the highest bounty.",
    image: "https://images.unsplash.com/photo-1563207153-f403bf289096",
    categories: ["Security", "Debug"],
    status: 'upcoming' as const,
    details: "Channel your inner cybersecurity expert as you identify and exploit vulnerabilities in provided software. Earn bounties based on the severity and creativity of your discoveries.",
    date: "April 12-13, 2025",
    time: "11:00 AM - 5:00 PM",
    venue: "RNSIT Campus, Cyber Lab",
    teamSize: "Individual or Teams",
    registrationFee: "300 per team",
    prizes: ["Highest Bounty: 5000", "Runner-up: 2500"],
    contact: { email: "bountybug@rnsit.ac.in", phone: "+91 98765 43217" }
  },
  {
    id: "tech-debate",
    name: "Tech Debate",
    description: "Debate on controversial tech topics like AI ethics, OS wars, and digital privacy.",
    image: "https://images.unsplash.com/photo-1521798552670-3130579c8c86",
    categories: ["Debate", "Discussion"],
    status: 'upcoming' as const,
    details: "Present compelling arguments on divisive technology topics such as AI ethics, cryptocurrency adoption, digital privacy, and more. Develop your public speaking skills while engaging with current tech controversies.",
    date: "April 12-13, 2025",
    time: "2:00 PM - 4:00 PM",
    venue: "RNSIT Campus, Auditorium",
    teamSize: "3-4 members",
    registrationFee: "100 per team",
    prizes: ["Winner: 1000", "Runner-up: 500"],
    contact: { email: "debate@rnsit.ac.in", phone: "+91 98765 43218" }
  },
  {
    id: "capture-flag",
    name: "Capture the Flag",
    description: "Solve technical puzzles, quizzes, and pictionary challenges to capture the flag!",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    categories: ["Puzzle", "Challenge"],
    status: 'upcoming' as const,
    details: "Navigate through a series of technical puzzles, cryptography challenges, and hidden clues to capture the virtual flag before your opponents. Test your problem-solving skills in this timed competition.",
    date: "April 12-13, 2025",
    time: "12:00 PM - 6:00 PM",
    venue: "RNSIT Campus, Puzzle Zone",
    teamSize: "Teams of 2-4",
    registrationFee: "150 per team",
    prizes: ["1st Place: 2000", "2nd Place: 1000", "3rd Place: 500"],
    contact: { email: "captureflag@rnsit.ac.in", phone: "+91 98765 43219" }
  },
  {
    id: "vr-challenge",
    name: "VR Gaming Challenge",
    description: "Experience cutting-edge virtual reality games and compete for the highest scores.",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac",
    categories: ["Gaming", "VR"],
    status: 'upcoming' as const,
    details: "Immerse yourself in stunning virtual worlds and compete in various VR games testing your reflexes, spatial awareness, and adaptability. No prior VR experience required!",
    date: "April 12-13, 2025",
    time: "1:00 PM - 6:00 PM",
    venue: "RNSIT Campus, VR Zone",
    teamSize: "Individual",
    registrationFee: "200 per participant",
    prizes: ["Winner: 2500", "Runner-up: 1250"],
    contact: { email: "vrchallenge@rnsit.ac.in", phone: "+91 98765 43220" }
  },
  {
    id: "esports-tournament",
    name: "eSports Tournament",
    description: "Compete in popular eSports titles including Valorant, CS:GO, and League of Legends.",
    image: "https://images.unsplash.com/photo-1542751110-97427bbecf20",
    categories: ["Gaming", "eSports"],
    status: 'upcoming' as const,
    details: "Join our collegiate eSports tournament featuring popular competitive games. Form your team and battle for glory, prizes, and the chance to represent RNSIT in inter-college competitions.",
    date: "April 12-13, 2025",
    time: "2:00 PM - 7:00 PM",
    venue: "RNSIT Campus, eSports Arena",
    teamSize: "Teams of 5",
    registrationFee: "300 per team",
    prizes: ["1st Place: 4000", "2nd Place: 2000", "3rd Place: 1000"],
    contact: { email: "esports@rnsit.ac.in", phone: "+91 98765 43221" }
  },
  {
    id: "retro-gaming",
    name: "Retro Gaming Marathon",
    description: "Relive the golden age of gaming with classic titles from the 80s and 90s.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
    categories: ["Gaming", "Retro"],
    status: 'upcoming' as const,
    details: "Travel back in time with classics like Pac-Man, Space Invaders, and Super Mario Bros. Compete for high scores on original hardware and experience the games that started it all.",
    date: "April 12-13, 2025",
    time: "10:00 AM - 5:00 PM",
    venue: "RNSIT Campus, Retro Arcade",
    teamSize: "Individual or Teams",
    registrationFee: "100 per participant",
    prizes: ["Winner: 2000", "Runner-up: 1000"],
    contact: { email: "retro@rnsit.ac.in", phone: "+91 98765 43222" }
  },
  {
    id: "game-development",
    name: "48-Hour Game Jam",
    description: "Design and build a playable game from scratch in just 48 hours.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766",
    categories: ["Gaming", "Development"],
    status: 'upcoming' as const,
    details: "Put your game development skills to the test in this intense 48-hour challenge. Create a game based on a surprise theme using any engine or framework of your choice. Both beginners and experienced developers welcome!",
    date: "April 12-13, 2025",
    time: "All Day",
    venue: "RNSIT Campus, Innovation Lab",
    teamSize: "Teams of 2-4",
    registrationFee: "350 per team",
    prizes: ["1st Place: 5000", "2nd Place: 2500", "3rd Place: 1200"],
    contact: { email: "gamedev@rnsit.ac.in", phone: "+91 98765 43223" }
  },
  {
    id: "mobile-gaming",
    name: "Mobile Gaming Tournament",
    description: "Compete in popular mobile games like PUBG Mobile, Clash Royale, and more.",
    image: "https://images.unsplash.com/photo-1609146568317-95261927f5c3",
    categories: ["Gaming", "Mobile"],
    status: 'upcoming' as const,
    details: "Showcase your skills in a variety of mobile games across different genres. Bring your own device and compete in 1v1 and team-based competitions for exciting prizes.",
    date: "April 12-13, 2025",
    time: "3:00 PM - 7:00 PM",
    venue: "RNSIT Campus, Mobile Zone",
    teamSize: "Individual or Teams",
    registrationFee: "150 per participant",
    prizes: ["1st Place: 3000", "2nd Place: 1500", "3rd Place: 800"],
    contact: { email: "mobilegaming@rnsit.ac.in", phone: "+91 98765 43224" }
  },
  // New Events (21 to 25)
  {
    id: "vr-coding",
    name: "VR Coding Challenge",
    description: "Dive into the world of virtual reality by coding interactive VR experiences.",
    image: "https://images.unsplash.com/photo-1581092334440-0c19a78742a8",
    categories: ["VR", "Coding"],
    status: 'upcoming' as const,
    details: "Join our VR Coding Challenge where you'll create immersive VR environments with interactive elements using cutting-edge technology and frameworks.",
    whatToExpect: "Expect hands-on coding sessions, interactive demos, and mentorship from VR experts as you build your very own VR experience.",
    date: "April 12-13, 2025",
    time: "10:00 AM - 6:00 PM",
    venue: "RNSIT Campus, VR Lab",
    teamSize: "Individual or Teams",
    registrationFee: "250 per participant",
    prizes: ["Winner: 3000", "Runner-up: 1500"],
    contact: { email: "vrcoding@rnsit.ac.in", phone: "+91 98765 43230" }
  },
  {
    id: "ai-workshop",
    name: "AI Workshop: From Concept to Creation",
    description: "Learn the fundamentals of AI, machine learning, and deep learning through interactive sessions.",
    image: "https://images.unsplash.com/photo-1581091012184-0e7fa1d57a4b",
    categories: ["Workshop", "AI"],
    status: 'upcoming' as const,
    details: "This workshop will guide you through the process of building AI models, from understanding basic concepts to implementing advanced algorithms.",
    whatToExpect: "Expect a mix of theoretical insights and practical exercises, with opportunities to build and test your own AI models under expert guidance.",
    date: "April 12-13, 2025",
    time: "9:00 AM - 5:00 PM",
    venue: "RNSIT Campus, Innovation Hall",
    teamSize: "Individual",
    registrationFee: "Free",
    prizes: ["Certificate of Participation"],
    contact: { email: "aiworkshop@rnsit.ac.in", phone: "+91 98765 43231" }
  },
  {
    id: "drone-racing",
    name: "Drone Racing Extravaganza",
    description: "Race drones through challenging obstacle courses and prove your piloting skills.",
    image: "https://images.unsplash.com/photo-1573497019416-1cba68f375b1",
    categories: ["Racing", "Drone"],
    status: 'upcoming' as const,
    details: "Take control of high-speed drones in an adrenaline-fueled race across intricate obstacle courses designed to test your precision and speed.",
    whatToExpect: "Expect an adrenaline rush with hands-on drone piloting sessions, practice runs, and competitive races with prizes for top pilots.",
    date: "April 12-13, 2025",
    time: "11:00 AM - 6:00 PM",
    venue: "RNSIT Campus, Drone Arena",
    teamSize: "Individual",
    registrationFee: "200 per participant",
    prizes: ["Winner: 3500", "Runner-up: 1750"],
    contact: { email: "droneracing@rnsit.ac.in", phone: "+91 98765 43232" }
  },
  {
    id: "robotics-challenge",
    name: "Robotics Design & Challenge",
    description: "Design and program your own robots to complete creative tasks and challenges.",
    image: "https://images.unsplash.com/photo-1581093588401-7d3b90bd3f1b",
    categories: ["Robotics", "Design"],
    status: 'upcoming' as const,
    details: "In this challenge, you'll build and program robots to perform specific tasks in a competitive environment, encouraging creativity and technical prowess.",
    whatToExpect: "Expect a collaborative environment with workshops, design sprints, and live demonstrations as you compete to create the most innovative robotic solution.",
    date: "April 12-13, 2025",
    time: "10:00 AM - 6:00 PM",
    venue: "RNSIT Campus, Robotics Lab",
    teamSize: "Teams of 3-4",
    registrationFee: "300 per team",
    prizes: ["1st Place: 4000", "2nd Place: 2000"],
    contact: { email: "robotics@rnsit.ac.in", phone: "+91 98765 43233" }
  },
  {
    id: "cyber-escape",
    name: "Cybersecurity Escape Room",
    description: "Solve puzzles and hack your way out of a simulated cyber crisis.",
    image: "https://images.unsplash.com/photo-1601758173927-34f2690e2eb4",
    categories: ["Cybersecurity", "Puzzle"],
    status: 'upcoming' as const,
    details: "Experience the tension of a cybersecurity crisis in this escape room challenge where you'll use your hacking skills and logic to escape in time.",
    whatToExpect: "Expect an immersive challenge with high-stakes puzzles, teamwork, and real-world cybersecurity scenarios that test your problem-solving abilities.",
    date: "April 12-13, 2025",
    time: "12:00 PM - 6:00 PM",
    venue: "RNSIT Campus, Cyber Lab",
    teamSize: "Teams of 2-4",
    registrationFee: "250 per team",
    prizes: ["Winner: 4000", "Runner-up: 2000"],
    contact: { email: "cyberescape@rnsit.ac.in", phone: "+91 98765 43234" }
  },
  // Additional New Events (IDs 21 to 25)
  {
    id: "blockchain-boom",
    name: "Blockchain Hackathon",
    description: "Innovate with blockchain technology by developing decentralized applications and smart contracts.",
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
    categories: ["Blockchain", "Hackathon"],
    status: 'upcoming' as const,
    details: "Join our Blockchain Hackathon where you'll learn the basics of decentralized systems, create smart contracts, and build innovative blockchain solutions.",
    whatToExpect: "Expect intensive coding sessions, workshops on blockchain fundamentals, and opportunities to pitch your decentralized ideas.",
    date: "April 12-13, 2025",
    time: "9:00 AM - 7:00 PM",
    venue: "RNSIT Campus, Tech Lab",
    teamSize: "Teams of 3-5",
    registrationFee: "350 per team",
    prizes: ["1st Place: 5000", "2nd Place: 2500", "3rd Place: 1500"],
    contact: { email: "blockchain@rnsit.ac.in", phone: "+91 98765 43235" }
  },
  {
    id: "iot-innovation",
    name: "IoT Innovation Challenge",
    description: "Develop smart solutions using Internet of Things (IoT) technology for real-world problems.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    categories: ["IoT", "Innovation"],
    status: 'upcoming' as const,
    details: "In the IoT Innovation Challenge, participants will design and prototype IoT devices or applications that address current societal and industrial challenges.",
    whatToExpect: "Expect hands-on prototyping, mentorship on IoT technologies, and demonstrations of innovative solutions that bridge the physical and digital worlds.",
    date: "April 12-13, 2025",
    time: "10:00 AM - 6:00 PM",
    venue: "RNSIT Campus, IoT Lab",
    teamSize: "Teams of 2-4",
    registrationFee: "300 per team",
    prizes: ["Winner: 4500", "Runner-up: 2250"],
    contact: { email: "iot@rnsit.ac.in", phone: "+91 98765 43236" }
  },
  {
    id: "cloud-computing",
    name: "Cloud Computing Challenge",
    description: "Showcase your skills by designing scalable solutions on cloud platforms.",
    image: "https://images.unsplash.com/photo-1556155092-8707de31f9c4",
    categories: ["Cloud", "Coding"],
    status: 'upcoming' as const,
    details: "Participants will develop cloud-based applications or solutions utilizing popular cloud services. The challenge will test your ability to build scalable, efficient, and secure systems in the cloud.",
    whatToExpect: "Expect in-depth sessions on cloud architecture, hands-on labs, and guidance from industry experts to help you architect your cloud solution.",
    date: "April 12-13, 2025",
    time: "10:00 AM - 6:00 PM",
    venue: "RNSIT Campus, Cloud Lab",
    teamSize: "Individual or Teams",
    registrationFee: "250 per participant",
    prizes: ["Winner: 4000", "Runner-up: 2000"],
    contact: { email: "cloud@rnsit.ac.in", phone: "+91 98765 43237" }
  },
  {
    id: "quantum-leap",
    name: "Quantum Computing Workshop",
    description: "Dive into the future of computing with hands-on quantum programming sessions.",
    image: "https://images.unsplash.com/photo-1573497019416-9e1a1b8a2e6b",
    categories: ["Quantum", "Workshop"],
    status: 'upcoming' as const,
    details: "Explore the basics of quantum computing and learn how to program quantum algorithms using industry-standard frameworks.",
    whatToExpect: "Expect interactive lectures, live coding sessions, and experiments with quantum simulators that give you a glimpse into next-generation computing.",
    date: "April 12-13, 2025",
    time: "9:00 AM - 5:00 PM",
    venue: "RNSIT Campus, Quantum Lab",
    teamSize: "Individual",
    registrationFee: "Free",
    prizes: ["Certificate of Completion"],
    contact: { email: "quantum@rnsit.ac.in", phone: "+91 98765 43238" }
  },
  {
    id: "data-dive",
    name: "Data Science Challenge",
    description: "Uncover insights from complex datasets and present your findings in a competitive setting.",
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
    categories: ["Data Science", "Analytics"],
    status: 'upcoming' as const,
    details: "Dive deep into data analytics and machine learning in our Data Science Challenge. Participants will work with real-world datasets to extract meaningful insights and create impactful visualizations.",
    whatToExpect: "Expect rigorous data analysis sessions, mentorship from data science experts, and a competitive environment to showcase your analytical skills.",
    date: "April 12-13, 2025",
    time: "11:00 AM - 7:00 PM",
    venue: "RNSIT Campus, Data Lab",
    teamSize: "Teams of 2-3",
    registrationFee: "300 per team",
    prizes: ["Winner: 5000", "Runner-up: 2500"],
    contact: { email: "datascience@rnsit.ac.in", phone: "+91 98765 43239" }
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
                      {selectedEvent.date}
                    </span>
                    <span className="px-3 py-1 text-sm rounded-full bg-red-900/30 text-red-200">
                      {selectedEvent.venue}
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
                        <li>Date: {selectedEvent.date}</li>
                        <li>Time: {selectedEvent.time}</li>
                        <li>Venue: {selectedEvent.venue}</li>
                        <li>Participation: Open to all</li>
                        <li>Team Size: {selectedEvent.teamSize}</li>
                        <li>Registration Fee: {selectedEvent.registrationFee}</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-3">What to Expect</h2>
                      <p className="text-gray-400">
                        {selectedEvent.whatToExpect || `Participants will engage in challenging activities designed to test their skills and creativity. This event provides an excellent opportunity to learn, network, and showcase your talents in the ${selectedEvent.categories?.join(' and ')} domains.`}
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
                      <a href={`mailto:${selectedEvent.contact.email}`} className="text-red-400 hover:underline">{selectedEvent.contact.email}</a> or call {selectedEvent.contact.phone}
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
