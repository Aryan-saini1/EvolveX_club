
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // This would normally fetch event details from an API
  // For now, we'll use placeholder content
  
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
