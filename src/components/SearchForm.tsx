
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  PlaneTakeoff, 
  PlaneLanding, 
  Calendar, 
  Users, 
  ChevronDown,
  ArrowRightLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/DatePicker';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { airports } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { type SearchParams } from '@/lib/types';

const SearchForm = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    origin: '',
    destination: '',
    departureDate: null,
    returnDate: null,
    passengers: 1,
    cabinClass: 'economy'
  });
  
  const [originOpen, setOriginOpen] = useState(false);
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [passengersOpen, setPassengersOpen] = useState(false);
  const [tripType, setTripType] = useState<'oneway' | 'roundtrip'>('roundtrip');
  
  // Handle swapping origin and destination
  const handleSwapLocations = () => {
    setSearchParams(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }));
  };
  
  // Handle search submission
  const handleSearch = () => {
    // Validate required fields
    if (!searchParams.origin || !searchParams.destination || !searchParams.departureDate) {
      return; // Don't submit if required fields are missing
    }
    
    // Navigate to search results with query params
    navigate(`/search?origin=${searchParams.origin}&destination=${searchParams.destination}&departureDate=${searchParams.departureDate.toISOString()}&passengers=${searchParams.passengers}&class=${searchParams.cabinClass}${searchParams.returnDate ? `&returnDate=${searchParams.returnDate.toISOString()}` : ''}`);
  };
  
  // Get airport name by code
  const getAirportByCode = (code: string) => {
    return airports.find(airport => airport.code === code);
  };
  
  // Get display name for airport
  const getAirportDisplayName = (code: string) => {
    const airport = getAirportByCode(code);
    return airport ? `${airport.city} (${airport.code})` : '';
  };
  
  return (
    <div className="w-full max-w-4xl glass rounded-3xl shadow-lg border border-slate-200/70 overflow-hidden transition-all duration-300 hover:shadow-xl">
      <Tabs defaultValue="flights" className="w-full">
        <div className="p-5">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="flights" className="rounded-lg">
              <PlaneTakeoff className="mr-2 h-4 w-4" />
              Flights
            </TabsTrigger>
            <TabsTrigger value="hotels" className="rounded-lg">
              <Calendar className="mr-2 h-4 w-4" />
              Hotels
            </TabsTrigger>
            <TabsTrigger value="packages" className="rounded-lg">
              <Users className="mr-2 h-4 w-4" />
              Packages
            </TabsTrigger>
          </TabsList>
        </div>
          
        <TabsContent value="flights" className="p-0 m-0">
          <div className="px-6 pb-6">
            <div className="flex gap-4 mb-6">
              <Button 
                variant={tripType === 'roundtrip' ? 'default' : 'outline'} 
                onClick={() => setTripType('roundtrip')}
                className="rounded-full flex-1"
              >
                Round Trip
              </Button>
              <Button 
                variant={tripType === 'oneway' ? 'default' : 'outline'} 
                onClick={() => setTripType('oneway')}
                className="rounded-full flex-1"
              >
                One Way
              </Button>
            </div>
            
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative">
                {/* Origin */}
                <Popover open={originOpen} onOpenChange={setOriginOpen}>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">From</label>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={originOpen}
                        className="w-full justify-start text-left font-normal border-2 h-12 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors duration-200"
                      >
                        <PlaneTakeoff className="mr-3 h-4 w-4 text-muted-foreground" />
                        {searchParams.origin ? (
                          <span className="flex-1">{getAirportDisplayName(searchParams.origin)}</span>
                        ) : (
                          <span className="text-muted-foreground flex-1">Select departure city</span>
                        )}
                        <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                  </div>
                  <PopoverContent className="w-full p-0 shadow-xl" align="start">
                    <Command>
                      <CommandInput placeholder="Search airports..." className="h-12" />
                      <CommandList>
                        <CommandEmpty>No airports found.</CommandEmpty>
                        <CommandGroup heading="Popular Airports">
                          {airports.map((airport) => (
                            <CommandItem
                              key={airport.code}
                              value={airport.code}
                              onSelect={(value) => {
                                setSearchParams(prev => ({ ...prev, origin: value }));
                                setOriginOpen(false);
                              }}
                            >
                              <span className="font-medium">{airport.city}</span>
                              <span className="ml-2 text-sm text-muted-foreground">{airport.code}</span>
                              <span className="ml-2 text-xs text-muted-foreground">- {airport.name}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                
                {/* Swap button */}
                <button 
                  onClick={handleSwapLocations}
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 md:block hidden bg-white rounded-full p-2 shadow-md border border-slate-100 z-10 transition-transform hover:rotate-180 duration-300"
                  aria-label="Swap locations"
                >
                  <ArrowRightLeft className="h-4 w-4 text-airline-blue" />
                </button>
                
                {/* Destination */}
                <Popover open={destinationOpen} onOpenChange={setDestinationOpen}>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">To</label>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={destinationOpen}
                        className="w-full justify-start text-left font-normal border-2 h-12 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors duration-200"
                      >
                        <PlaneLanding className="mr-3 h-4 w-4 text-muted-foreground" />
                        {searchParams.destination ? (
                          <span className="flex-1">{getAirportDisplayName(searchParams.destination)}</span>
                        ) : (
                          <span className="text-muted-foreground flex-1">Select arrival city</span>
                        )}
                        <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                  </div>
                  <PopoverContent className="w-full p-0 shadow-xl" align="start">
                    <Command>
                      <CommandInput placeholder="Search airports..." className="h-12" />
                      <CommandList>
                        <CommandEmpty>No airports found.</CommandEmpty>
                        <CommandGroup heading="Popular Airports">
                          {airports.map((airport) => (
                            <CommandItem
                              key={airport.code}
                              value={airport.code}
                              onSelect={(value) => {
                                setSearchParams(prev => ({ ...prev, destination: value }));
                                setDestinationOpen(false);
                              }}
                            >
                              <span className="font-medium">{airport.city}</span>
                              <span className="ml-2 text-sm text-muted-foreground">{airport.code}</span>
                              <span className="ml-2 text-xs text-muted-foreground">- {airport.name}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Departure Date */}
                <DatePicker 
                  date={searchParams.departureDate} 
                  onDateChange={(date) => setSearchParams(prev => ({ ...prev, departureDate: date }))} 
                  label="Departure Date"
                  placeholder="When do you depart?"
                />
                
                {/* Return Date - only shown for round trip */}
                {tripType === 'roundtrip' && (
                  <DatePicker 
                    date={searchParams.returnDate} 
                    onDateChange={(date) => setSearchParams(prev => ({ ...prev, returnDate: date }))} 
                    label="Return Date"
                    placeholder="When do you return?"
                  />
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Passengers */}
                <Popover open={passengersOpen} onOpenChange={setPassengersOpen}>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Passengers</label>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={passengersOpen}
                        className="w-full justify-start text-left font-normal border-2 h-12 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors duration-200"
                      >
                        <Users className="mr-3 h-4 w-4 text-muted-foreground" />
                        <span>{searchParams.passengers} Passenger{searchParams.passengers !== 1 ? 's' : ''}</span>
                      </Button>
                    </PopoverTrigger>
                  </div>
                  <PopoverContent className="w-64 p-4" align="start">
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm text-slate-900">Passengers</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-700">Adults</span>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 rounded-full"
                            onClick={() => setSearchParams(prev => ({ 
                              ...prev, 
                              passengers: Math.max(1, prev.passengers - 1) 
                            }))}
                            disabled={searchParams.passengers <= 1}
                          >
                            -
                          </Button>
                          <span className="w-6 text-center">{searchParams.passengers}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 rounded-full"
                            onClick={() => setSearchParams(prev => ({ 
                              ...prev, 
                              passengers: Math.min(9, prev.passengers + 1) 
                            }))}
                            disabled={searchParams.passengers >= 9}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      
                      <div className="pt-4 flex justify-end">
                        <Button 
                          className="text-sm"
                          onClick={() => setPassengersOpen(false)}
                        >
                          Done
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                
                {/* Class */}
                <div className="space-y-1.5">
                  <label htmlFor="class" className="text-sm font-medium text-gray-700">
                    Cabin Class
                  </label>
                  <select
                    id="class"
                    value={searchParams.cabinClass}
                    onChange={(e) => setSearchParams(prev => ({ 
                      ...prev, 
                      cabinClass: e.target.value as 'economy' | 'business' | 'first'
                    }))}
                    className="w-full border-2 border-input h-12 rounded-xl px-4 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-airline-blue focus:border-airline-blue transition-colors hover:bg-slate-50"
                  >
                    <option value="economy">Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First Class</option>
                  </select>
                </div>
              </div>
              
              <Button 
                className="w-full md:w-auto md:px-8 py-6 bg-airline-blue hover:bg-airline-blue/90 text-white rounded-xl text-base mt-4 transition-transform hover:-translate-y-1"
                onClick={handleSearch}
              >
                <Search className="mr-2 h-5 w-5" />
                Search Flights
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="hotels" className="px-6 pb-6">
          <div className="h-40 flex items-center justify-center">
            <p className="text-muted-foreground">Hotel booking coming soon</p>
          </div>
        </TabsContent>
        
        <TabsContent value="packages" className="px-6 pb-6">
          <div className="h-40 flex items-center justify-center">
            <p className="text-muted-foreground">Package booking coming soon</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchForm;
