
import React from 'react';
import { Link } from 'react-router-dom';

interface EventProps {
  id: string;
  name: string;
  description: string;
  image: string;
  categories?: string[];
}

const EventCard = ({ id, name, description, image, categories }: EventProps) => {
  return (
    <Link to={`/events/${id}`} className="block">
      <div className="relative group cursor-pointer">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-900 rounded-xl blur opacity-50 group-hover:opacity-70 transition-all duration-300"></div>
        <div className="glass-card rounded-xl p-1 relative overflow-hidden">
          <div className="h-48 md:h-56 bg-gray-900/80 rounded-t-lg overflow-hidden">
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.src = `https://via.placeholder.com/400x300/111/333?text=${name.split(' ').join('+')}`;
              }}
            />
          </div>
          <div className="p-5">
            {categories && (
              <div className="flex gap-2 mb-3 flex-wrap">
                {categories.map((category, index) => (
                  <span key={index} className="px-2 py-1 text-xs rounded-full bg-red-900/30 text-red-200">
                    {category}
                  </span>
                ))}
              </div>
            )}
            <h3 className="font-bold text-xl text-white mb-2">{name}</h3>
            <p className="text-gray-400 line-clamp-2">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
