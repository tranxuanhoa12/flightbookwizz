
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Users, 
  Plane, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Luggage 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate, formatTime } from '@/lib/mockData';
import { Flight } from '@/lib/types';
import { cn } from '@/lib/utils';

interface FlightCardProps {
  flight: Flight;
  className?: string;
}

const FlightCard = ({ flight, className }: FlightCardProps) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  
  const departureDate = formatDate(flight.departureTime);
  const departureTime = formatTime(flight.departureTime);
  const arrivalTime = formatTime(flight.arrivalTime);
  
  const handleSelect = () => {
    // Navigate to booking page with selected flight
    navigate(`/booking/${flight.id}`);
  };
  
  return (
    <div 
      className={cn(
        "flight-card bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition-all duration-300",
        className
      )}
    >
      <div className="p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Airline */}
          <div className="flex items-center">
            <div className="mr-4 h-14 w-14 overflow-hidden flex-shrink-0">
              <img 
                src={flight.airline.logo} 
                alt={flight.airline.name}
                className="h-full w-full object-contain rounded-md"
                loading="lazy"
              />
            </div>
            <div>
              <h3 className="font-medium text-slate-900">{flight.airline.name}</h3>
              <p className="text-sm text-slate-500">{flight.flightNumber}</p>
            </div>
          </div>
          
          {/* Flight details */}
          <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Departure */}
            <div className="text-center">
              <div className="text-xl font-bold">{departureTime}</div>
              <div className="text-sm text-slate-500">{flight.departureAirport.code}</div>
            </div>
            
            {/* Duration */}
            <div className="flex flex-col items-center flex-1 px-4">
              <div className="text-xs text-slate-500 mb-1">{flight.duration}</div>
              <div className="relative w-full flex items-center">
                <div className="h-0.5 w-full bg-slate-200"></div>
                <Plane className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-airline-blue rotate-90" />
              </div>
              <div className="text-xs text-slate-500 mt-1">Direct</div>
            </div>
            
            {/* Arrival */}
            <div className="text-center">
              <div className="text-xl font-bold">{arrivalTime}</div>
              <div className="text-sm text-slate-500">{flight.arrivalAirport.code}</div>
            </div>
          </div>
          
          {/* Price and booking button */}
          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <div className="text-2xl font-bold text-airline-blue">${flight.price}</div>
              <div className="text-xs text-slate-500">per person</div>
            </div>
            <Button 
              onClick={handleSelect}
              className="bg-airline-blue hover:bg-airline-blue/90 text-white rounded-xl transition-transform hover:-translate-y-0.5"
            >
              Select
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Expandable details */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-center gap-1 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            {expanded ? (
              <>
                <span>Hide details</span>
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                <span>Show details</span>
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
        
        {expanded && (
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm animate-fade-in">
            <div>
              <h4 className="font-medium text-slate-900 mb-2 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Flight Details
              </h4>
              <ul className="space-y-2 text-slate-600">
                <li className="flex justify-between">
                  <span>Aircraft</span>
                  <span className="font-medium">{flight.aircraft}</span>
                </li>
                <li className="flex justify-between">
                  <span>Date</span>
                  <span className="font-medium">{departureDate}</span>
                </li>
                <li className="flex justify-between">
                  <span>Flight Number</span>
                  <span className="font-medium">{flight.flightNumber}</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-slate-900 mb-2 flex items-center">
                <Luggage className="h-4 w-4 mr-2" />
                Baggage Allowance
              </h4>
              <ul className="space-y-2 text-slate-600">
                <li className="flex justify-between">
                  <span>Carry-on</span>
                  <span className="font-medium">7 kg</span>
                </li>
                <li className="flex justify-between">
                  <span>Checked Bag</span>
                  <span className="font-medium">23 kg</span>
                </li>
                <li className="flex items-center">
                  <Badge variant="outline" className="text-xs">
                    Included in price
                  </Badge>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-slate-900 mb-2 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Availability
              </h4>
              <ul className="space-y-2 text-slate-600">
                <li className="flex justify-between">
                  <span>Available Seats</span>
                  <span className="font-medium">{flight.seatsAvailable}</span>
                </li>
                <li className="flex items-center">
                  <Badge variant={flight.seatsAvailable < 10 ? "destructive" : "default"} className="text-xs">
                    {flight.seatsAvailable < 10 ? "Limited seats" : "Good availability"}
                  </Badge>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightCard;
