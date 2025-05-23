import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { getAssetPath } from '../../utils/path-utils';

interface EventProps {
  id: string;
  name: string;
  description: string;
  image: string;
  categories?: string[];
  date?: string;
  status: 'upcoming' | 'past';
  showDetails?: boolean;
}

const EventCard = ({ id, name, description, image, categories, date, status, showDetails = false }: EventProps) => {
  const isTechFest = id === "techfest-2025";
  const [imageError, setImageError] = useState(false);
  
  return (
    <Link to={`/events/${id}`} className="block">
      <div className="relative group cursor-pointer overflow-hidden">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-900 rounded-xl blur opacity-50 group-hover:opacity-75 transition-all duration-300"></div>
        <div className={`glass-card rounded-xl p-1 relative overflow-hidden ${isTechFest ? 'border-2 border-red-500' : ''}`}>
          <div className={`${isTechFest ? 'h-64 md:h-72' : 'h-48 md:h-56'} bg-gray-900/80 rounded-t-lg overflow-hidden relative`}>
            {!imageError ? (
              <img 
                src={getAssetPath(image)}  
                alt={name} 
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  console.log("Image failed to load:", image);
                  setImageError(true);
                  e.currentTarget.src = `https://via.placeholder.com/400x300/111/333?text=${name.split(' ').join('+')}`;
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <span className="text-red-400 font-bold text-xl">{name}</span>
              </div>
            )}
            
            {status === 'past' && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white bg-red-600/80 px-4 py-2 rounded-full text-sm font-semibold">
                  Past Event
                </span>
              </div>
            )}
            {isTechFest && (
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse-glow">
                Main Event
              </div>
            )}
            
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
              <div className="text-white px-4 py-2 rounded-full text-sm font-semibold bg-red-600/90 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                View Details
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className="flex flex-wrap gap-2 mb-3">
              {date && (
                <span className="px-2 py-1 text-xs rounded-full bg-red-900/30 text-red-200">
                  {date}
                </span>
              )}
              {categories?.map((category, index) => (
                <span key={index} className="px-2 py-1 text-xs rounded-full bg-red-900/30 text-red-200">
                  {category}
                </span>
              ))}
              <span className="px-2 py-1 text-xs rounded-full bg-red-900/30 text-red-200">
                {status === 'upcoming' ? 'Upcoming' : 'Past'}
              </span>
            </div>
            <h3 className={`font-bold ${isTechFest ? 'text-2xl' : 'text-xl'} text-white mb-2 group-hover:text-gradient transition-all duration-300`}>{name}</h3>
            <p className="text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">{description}</p>
            
            {showDetails && (
              <div className="mt-4 pt-4 border-t border-gray-800">
                <p className="text-gray-300">Click to see full details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
