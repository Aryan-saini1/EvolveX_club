
import React from 'react';
import { Link } from 'react-router-dom';

interface EventProps {
  id: string;
  name: string;
  description: string;
  image: string;
  categories?: string[];
  date?: string;
  status: 'upcoming' | 'past';
}

const EventCard = ({ id, name, description, image, categories, date, status }: EventProps) => {
  const isTechFest = id === "techfest-2025";
  
  return (
    <Link to={`/events/${id}`} className="block">
      <div className="relative group cursor-pointer">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-900 rounded-xl blur opacity-50 group-hover:opacity-70 transition-all duration-300"></div>
        <div className={`glass-card rounded-xl p-1 relative overflow-hidden ${isTechFest ? 'border-2 border-red-500' : ''}`}>
          <div className={`${isTechFest ? 'h-64 md:h-72' : 'h-48 md:h-56'} bg-gray-900/80 rounded-t-lg overflow-hidden relative`}>
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.src = `https://via.placeholder.com/400x300/111/333?text=${name.split(' ').join('+')}`;
              }}
            />
            {status === 'past' && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white bg-red-600/80 px-4 py-2 rounded-full text-sm font-semibold">
                  Past Event
                </span>
              </div>
            )}
            {isTechFest && (
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                Main Event
              </div>
            )}
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
            <h3 className={`font-bold ${isTechFest ? 'text-2xl' : 'text-xl'} text-white mb-2`}>{name}</h3>
            <p className="text-gray-400 line-clamp-2">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
