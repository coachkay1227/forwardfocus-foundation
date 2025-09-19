import React from 'react';
import { Star } from 'lucide-react';

type Props = {
  className?: string;
  currentState?: string;
};

const USMap = ({ className = "", currentState = "Ohio" }: Props) => {
  // State coordinates for positioning markers (approximate percentages from top-left)
  const statePositions = {
    'Alabama': { top: '73%', left: '67%' },
    'Alaska': { top: '85%', left: '10%' },
    'Arizona': { top: '68%', left: '23%' },
    'Arkansas': { top: '68%', left: '58%' },
    'California': { top: '60%', left: '8%' },
    'Colorado': { top: '55%', left: '35%' },
    'Connecticut': { top: '48%', left: '83%' },
    'Delaware': { top: '54%', left: '81%' },
    'Florida': { top: '82%', left: '75%' },
    'Georgia': { top: '73%', left: '72%' },
    'Hawaii': { top: '88%', left: '25%' },
    'Idaho': { top: '35%', left: '25%' },
    'Illinois': { top: '52%', left: '62%' },
    'Indiana': { top: '52%', left: '67%' },
    'Iowa': { top: '50%', left: '55%' },
    'Kansas': { top: '58%', left: '48%' },
    'Kentucky': { top: '58%', left: '70%' },
    'Louisiana': { top: '78%', left: '58%' },
    'Maine': { top: '35%', left: '87%' },
    'Maryland': { top: '54%', left: '78%' },
    'Massachusetts': { top: '45%', left: '83%' },
    'Michigan': { top: '45%', left: '68%' },
    'Minnesota': { top: '40%', left: '55%' },
    'Mississippi': { top: '73%', left: '62%' },
    'Missouri': { top: '58%', left: '58%' },
    'Montana': { top: '35%', left: '35%' },
    'Nebraska': { top: '50%', left: '45%' },
    'Nevada': { top: '55%', left: '18%' },
    'New Hampshire': { top: '40%', left: '83%' },
    'New Jersey': { top: '50%', left: '80%' },
    'New Mexico': { top: '65%', left: '35%' },
    'New York': { top: '42%', left: '78%' },
    'North Carolina': { top: '63%', left: '75%' },
    'North Dakota': { top: '40%', left: '45%' },
    'Ohio': { top: '50%', left: '72%' },
    'Oklahoma': { top: '63%', left: '48%' },
    'Oregon': { top: '35%', left: '15%' },
    'Pennsylvania': { top: '48%', left: '78%' },
    'Rhode Island': { top: '48%', left: '85%' },
    'South Carolina': { top: '68%', left: '75%' },
    'South Dakota': { top: '45%', left: '45%' },
    'Tennessee': { top: '63%', left: '67%' },
    'Texas': { top: '73%', left: '45%' },
    'Utah': { top: '55%', left: '28%' },
    'Vermont': { top: '40%', left: '82%' },
    'Virginia': { top: '58%', left: '78%' },
    'Washington': { top: '25%', left: '18%' },
    'West Virginia': { top: '55%', left: '75%' },
    'Wisconsin': { top: '42%', left: '62%' },
    'Wyoming': { top: '45%', left: '35%' }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Base US Map using Google Maps iframe */}
      <div className="relative w-full" style={{ paddingTop: "60%" }}>
        <iframe
          title="United States Map"
          src="https://www.google.com/maps?hl=en&q=United+States&z=4&output=embed"
          className="absolute inset-0 h-full w-full border-0 rounded-lg"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        
        {/* Custom markers overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {Object.entries(statePositions).map(([state, position]) => {
            const isCurrentState = state === currentState;
            
            return (
              <div
                key={state}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ top: position.top, left: position.left }}
              >
                {isCurrentState ? (
                  <div className="relative">
                    <Star 
                      className="h-6 w-6 text-red-600 fill-red-600 animate-pulse drop-shadow-lg" 
                      aria-label={`Currently serving ${state}`}
                    />
                  </div>
                ) : (
                  <div 
                    className="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-md opacity-80"
                    aria-label={`Coming soon to ${state}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-red-600 fill-red-600" aria-hidden />
          <span>Currently Serving</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full border border-white" aria-hidden />
          <span>Coming Soon</span>
        </div>
      </div>
    </div>
  );
};

export default USMap;