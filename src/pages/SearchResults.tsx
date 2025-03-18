
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter, ChevronDown, ChevronUp, SlidersHorizontal, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from '@/components/Navbar';
import FlightCard from '@/components/FlightCard';
import { Flight } from '@/lib/types';
import { searchFlights, getAirport, airlines } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState('price-asc');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  
  // Parse search params from URL
  const searchParams = new URLSearchParams(location.search);
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');
  const departureDateStr = searchParams.get('departureDate');
  const returnDateStr = searchParams.get('returnDate');
  const passengers = Number(searchParams.get('passengers') || 1);
  const cabinClass = searchParams.get('class') || 'economy';
  
  // Parse dates
  const departureDate = departureDateStr ? new Date(departureDateStr) : null;
  const returnDate = returnDateStr ? new Date(returnDateStr) : null;
  
  // Get formatted airport names for display
  const originAirport = origin ? getAirport(origin) : null;
  const destinationAirport = destination ? getAirport(destination) : null;
  
  // Format date for display
  const formatDateDisplay = (dateStr: string | null) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Fetch flights on component mount
  useEffect(() => {
    // Simulate API request
    setLoading(true);
    setTimeout(() => {
      const searchResults = searchFlights(origin || '', destination || '', departureDate);
      setFlights(searchResults);
      setFilteredFlights(searchResults);
      setLoading(false);
    }, 1500);
  }, [origin, destination, departureDate]);
  
  // Apply filters and sorting
  useEffect(() => {
    let results = [...flights];
    
    // Filter by price range
    results = results.filter(flight => flight.price >= priceRange[0] && flight.price <= priceRange[1]);
    
    // Filter by selected airlines
    if (selectedAirlines.length > 0) {
      results = results.filter(flight => selectedAirlines.includes(flight.airline.code));
    }
    
    // Apply sorting
    if (sortOption === 'price-asc') {
      results.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      results.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'duration-asc') {
      results.sort((a, b) => {
        const durationA = a.duration.split('h')[0];
        const durationB = b.duration.split('h')[0];
        return parseInt(durationA) - parseInt(durationB);
      });
    } else if (sortOption === 'departure-asc') {
      results.sort((a, b) => new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime());
    } else if (sortOption === 'arrival-asc') {
      results.sort((a, b) => new Date(a.arrivalTime).getTime() - new Date(b.arrivalTime).getTime());
    }
    
    setFilteredFlights(results);
  }, [flights, sortOption, priceRange, selectedAirlines]);
  
  // Handle airline checkbox change
  const handleAirlineChange = (airlineCode: string, checked: boolean) => {
    if (checked) {
      setSelectedAirlines(prev => [...prev, airlineCode]);
    } else {
      setSelectedAirlines(prev => prev.filter(code => code !== airlineCode));
    }
  };
  
  // Find min and max prices in the flights array
  const minPrice = Math.min(...flights.map(flight => flight.price));
  const maxPrice = Math.max(...flights.map(flight => flight.price));
  
  // Handle back button
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container px-4 md:px-6">
          {/* Search Summary */}
          <div className="mb-6 flex items-start justify-between">
            <div>
              <button 
                onClick={handleBack}
                className="flex items-center text-slate-600 hover:text-slate-900 mb-4 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>Back to search</span>
              </button>
              
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                {originAirport?.city} to {destinationAirport?.city}
              </h1>
              
              <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                <div className="flex items-center">
                  <span>{formatDateDisplay(departureDateStr)}</span>
                  {returnDateStr && (
                    <>
                      <span className="mx-2">-</span>
                      <span>{formatDateDisplay(returnDateStr)}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="mx-2">•</span>
                  <span>{passengers} Passenger{passengers !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center">
                  <span className="mx-2">•</span>
                  <span>{cabinClass.charAt(0).toUpperCase() + cabinClass.slice(1)}</span>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="text-right">
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="duration-asc">Duration: Shortest</SelectItem>
                    <SelectItem value="departure-asc">Departure: Earliest</SelectItem>
                    <SelectItem value="arrival-asc">Arrival: Earliest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Mobile filter toggle */}
            <div className="md:hidden">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters sidebar - desktop */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-slate-900 flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </h2>
                  {selectedAirlines.length > 0 || priceRange[0] > minPrice || priceRange[1] < maxPrice ? (
                    <button
                      onClick={() => {
                        setSelectedAirlines([]);
                        setPriceRange([minPrice, maxPrice]);
                      }}
                      className="text-sm text-airline-blue hover:underline"
                    >
                      Reset
                    </button>
                  ) : null}
                </div>
                
                <Accordion type="single" collapsible defaultValue="price">
                  <AccordionItem value="price" className="border-b border-slate-200">
                    <AccordionTrigger className="py-3 text-sm font-medium text-slate-900 hover:no-underline">
                      Price Range
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="px-1 pt-2 pb-4">
                        <Slider
                          value={priceRange}
                          min={minPrice}
                          max={maxPrice}
                          step={10}
                          onValueChange={setPriceRange}
                          className="mb-6"
                        />
                        <div className="flex items-center justify-between">
                          <span className="bg-slate-100 text-slate-800 px-2 py-1 rounded text-sm">
                            ${priceRange[0]}
                          </span>
                          <span className="bg-slate-100 text-slate-800 px-2 py-1 rounded text-sm">
                            ${priceRange[1]}
                          </span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="airlines" className="border-b border-slate-200">
                    <AccordionTrigger className="py-3 text-sm font-medium text-slate-900 hover:no-underline">
                      Airlines
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="px-1 pt-2 pb-4 space-y-3">
                        {airlines.map(airline => (
                          <div key={airline.code} className="flex items-center space-x-2">
                            <Checkbox
                              id={`airline-${airline.code}`}
                              checked={selectedAirlines.includes(airline.code)}
                              onCheckedChange={(checked) => 
                                handleAirlineChange(airline.code, checked as boolean)
                              }
                            />
                            <label 
                              htmlFor={`airline-${airline.code}`} 
                              className="text-sm text-slate-700 cursor-pointer flex-1"
                            >
                              {airline.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            
            {/* Mobile filters drawer */}
            {showFilters && (
              <div className="fixed inset-0 z-50 bg-black/50 md:hidden">
                <div className="absolute right-0 top-0 bottom-0 w-80 bg-white animate-slide-in-right">
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-semibold text-slate-900 flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                      </h2>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="text-slate-400 hover:text-slate-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Sort By
                      </label>
                      <Select value={sortOption} onValueChange={setSortOption}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="price-asc">Price: Low to High</SelectItem>
                          <SelectItem value="price-desc">Price: High to Low</SelectItem>
                          <SelectItem value="duration-asc">Duration: Shortest</SelectItem>
                          <SelectItem value="departure-asc">Departure: Earliest</SelectItem>
                          <SelectItem value="arrival-asc">Arrival: Earliest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-slate-900 mb-3">Price Range</h3>
                      <Slider
                        value={priceRange}
                        min={minPrice}
                        max={maxPrice}
                        step={10}
                        onValueChange={setPriceRange}
                        className="mb-6"
                      />
                      <div className="flex items-center justify-between">
                        <span className="bg-slate-100 text-slate-800 px-2 py-1 rounded text-sm">
                          ${priceRange[0]}
                        </span>
                        <span className="bg-slate-100 text-slate-800 px-2 py-1 rounded text-sm">
                          ${priceRange[1]}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-slate-900 mb-3">Airlines</h3>
                      <div className="space-y-3">
                        {airlines.map(airline => (
                          <div key={airline.code} className="flex items-center space-x-2">
                            <Checkbox
                              id={`mobile-airline-${airline.code}`}
                              checked={selectedAirlines.includes(airline.code)}
                              onCheckedChange={(checked) => 
                                handleAirlineChange(airline.code, checked as boolean)
                              }
                            />
                            <label 
                              htmlFor={`mobile-airline-${airline.code}`} 
                              className="text-sm text-slate-700 cursor-pointer flex-1"
                            >
                              {airline.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setSelectedAirlines([]);
                          setPriceRange([minPrice, maxPrice]);
                        }}
                      >
                        Reset
                      </Button>
                      <Button 
                        className="flex-1 bg-airline-blue hover:bg-airline-blue/90"
                        onClick={() => setShowFilters(false)}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Results */}
            <div className="flex-1">
              {loading ? (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-airline-blue mb-4"></div>
                  <p className="text-slate-600">Searching for flights...</p>
                </div>
              ) : filteredFlights.length > 0 ? (
                <div className="space-y-5">
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-center justify-between">
                    <p className="text-slate-600 text-sm">
                      <span className="font-medium text-slate-900">{filteredFlights.length}</span> flights found
                    </p>
                    <p className="text-sm text-slate-600">
                      Prices shown are for <span className="font-medium text-slate-900">1 adult</span>
                    </p>
                  </div>
                  
                  {filteredFlights.map((flight, index) => (
                    <FlightCard
                      key={flight.id}
                      flight={flight}
                      className={cn(
                        index % 2 === 0 ? "shadow-sm" : "shadow-sm",
                        "animate-fade-in"
                      )}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
                  <div className="mb-4">
                    <X className="h-12 w-12 text-slate-400 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">No flights found</h3>
                  <p className="text-slate-600 mb-6">
                    We couldn't find any flights matching your search criteria.
                  </p>
                  <Button onClick={handleBack}>Modify search</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchResults;
