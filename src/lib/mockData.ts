
import { Airport, Airline, Flight } from './types';

export const airlines: Airline[] = [
  {
    code: 'AA',
    name: 'American Airlines',
    logo: 'https://logos-world.net/wp-content/uploads/2020/10/American-Airlines-Logo-700x394.png',
  },
  {
    code: 'DL',
    name: 'Delta Air Lines',
    logo: 'https://logos-world.net/wp-content/uploads/2021/08/Delta-Logo-700x394.png',
  },
  {
    code: 'UA',
    name: 'United Airlines',
    logo: 'https://logos-world.net/wp-content/uploads/2021/08/United-Airlines-Logo-700x394.png',
  },
  {
    code: 'LH',
    name: 'Lufthansa',
    logo: 'https://logos-world.net/wp-content/uploads/2021/08/Lufthansa-Logo-700x394.png',
  },
  {
    code: 'BA',
    name: 'British Airways',
    logo: 'https://logos-world.net/wp-content/uploads/2021/08/British-Airways-Logo-700x394.png',
  },
];

export const airports: Airport[] = [
  {
    code: 'JFK',
    name: 'John F. Kennedy International Airport',
    city: 'New York',
    country: 'United States',
  },
  {
    code: 'LAX',
    name: 'Los Angeles International Airport',
    city: 'Los Angeles',
    country: 'United States',
  },
  {
    code: 'LHR',
    name: 'London Heathrow Airport',
    city: 'London',
    country: 'United Kingdom',
  },
  {
    code: 'CDG',
    name: 'Charles de Gaulle Airport',
    city: 'Paris',
    country: 'France',
  },
  {
    code: 'FRA',
    name: 'Frankfurt Airport',
    city: 'Frankfurt',
    country: 'Germany',
  },
  {
    code: 'SFO',
    name: 'San Francisco International Airport',
    city: 'San Francisco',
    country: 'United States',
  },
  {
    code: 'SIN',
    name: 'Singapore Changi Airport',
    city: 'Singapore',
    country: 'Singapore',
  },
  {
    code: 'DXB',
    name: 'Dubai International Airport',
    city: 'Dubai',
    country: 'United Arab Emirates',
  },
  {
    code: 'HND',
    name: 'Tokyo Haneda Airport',
    city: 'Tokyo',
    country: 'Japan',
  },
  {
    code: 'SYD',
    name: 'Sydney Airport',
    city: 'Sydney',
    country: 'Australia',
  },
];

export const getAirport = (code: string): Airport | undefined => {
  return airports.find(airport => airport.code === code);
};

export const generateFlights = (): Flight[] => {
  const flights: Flight[] = [];
  const today = new Date();
  
  for (let i = 0; i < 20; i++) {
    const departureAirport = airports[Math.floor(Math.random() * airports.length)];
    let arrivalAirport;
    do {
      arrivalAirport = airports[Math.floor(Math.random() * airports.length)];
    } while (arrivalAirport.code === departureAirport.code);
    
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const flightNumber = `${airline.code}${Math.floor(Math.random() * 1000) + 100}`;
    
    // Generate random departure time in the next 7 days
    const departureDate = new Date(today);
    departureDate.setDate(today.getDate() + Math.floor(Math.random() * 7) + 1);
    departureDate.setHours(Math.floor(Math.random() * 24));
    departureDate.setMinutes(Math.floor(Math.random() / 2) * 30); // Only 00 or 30 minutes
    
    // Duration between 2 and 12 hours
    const durationHours = Math.floor(Math.random() * 10) + 2;
    const durationMinutes = Math.floor(Math.random() / 2) * 30; // Only 00 or 30 minutes
    
    // Calculate arrival time
    const arrivalDate = new Date(departureDate);
    arrivalDate.setHours(arrivalDate.getHours() + durationHours);
    arrivalDate.setMinutes(arrivalDate.getMinutes() + durationMinutes);
    
    // Format dates
    const departureTime = departureDate.toISOString();
    const arrivalTime = arrivalDate.toISOString();
    
    // Format duration
    const duration = `${durationHours}h ${durationMinutes}m`;
    
    // Random price between $200 and $2000
    const price = Math.floor(Math.random() * 1800) + 200;
    
    // Random number of available seats
    const seatsAvailable = Math.floor(Math.random() * 50) + 1;
    
    // Aircraft types
    const aircraftTypes = ['Boeing 737', 'Boeing 777', 'Boeing 787', 'Airbus A320', 'Airbus A330', 'Airbus A350'];
    const aircraft = aircraftTypes[Math.floor(Math.random() * aircraftTypes.length)];
    
    flights.push({
      id: `flight-${i + 1}`,
      airline,
      flightNumber,
      departureAirport,
      arrivalAirport,
      departureTime,
      arrivalTime,
      duration,
      price,
      seatsAvailable,
      aircraft,
    });
  }
  
  return flights;
};

export const flights = generateFlights();

export const searchFlights = (origin: string, destination: string, departureDate: Date | null) => {
  // Filter flights based on search criteria
  return flights.filter(flight => {
    const matchesOrigin = origin ? flight.departureAirport.code === origin : true;
    const matchesDestination = destination ? flight.arrivalAirport.code === destination : true;
    
    let matchesDate = true;
    if (departureDate) {
      const flightDate = new Date(flight.departureTime);
      matchesDate = flightDate.toDateString() === departureDate.toDateString();
    }
    
    return matchesOrigin && matchesDestination && matchesDate;
  });
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};
