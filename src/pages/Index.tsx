
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plane, 
  Shield, 
  CreditCard, 
  Clock, 
  MapPin, 
  Star,
  Map,
  LocateFixed,
  TicketCheck,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import { useInView, getSlideAnimation } from '@/lib/animations';
import { cn } from '@/lib/utils';

const popularDestinations = [
  {
    id: 1,
    city: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop',
    price: 499,
  },
  {
    id: 2,
    city: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1000&auto=format&fit=crop',
    price: 899,
  },
  {
    id: 3,
    city: 'New York',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000&auto=format&fit=crop',
    price: 399,
  },
  {
    id: 4,
    city: 'Sydney',
    country: 'Australia',
    image: 'https://images.unsplash.com/photo-1547201240-a794fa3fbe3c?q=80&w=1000&auto=format&fit=crop',
    price: 799,
  },
];

const features = [
  {
    id: 1,
    icon: <Shield className="h-8 w-8 text-airline-blue" />,
    title: 'Secure Booking',
    description: 'Your payment and personal information are always protected',
  },
  {
    id: 2,
    icon: <CreditCard className="h-8 w-8 text-airline-blue" />,
    title: 'Flexible Payment',
    description: 'Choose from multiple payment options with no hidden fees',
  },
  {
    id: 3,
    icon: <Clock className="h-8 w-8 text-airline-blue" />,
    title: '24/7 Support',
    description: 'Our customer service team is available around the clock',
  },
  {
    id: 4,
    icon: <MapPin className="h-8 w-8 text-airline-blue" />,
    title: 'Global Coverage',
    description: 'Book flights to over 120 countries across the world',
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Frequent Traveler',
    quote: 'AirBookWizz has completely transformed how I book my flights. The interface is intuitive and I always find the best deals!',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Business Traveler',
    quote: 'As someone who travels frequently for work, this platform saves me countless hours. The filters help me find exactly what I need.',
    avatar: 'https://randomuser.me/api/portraits/men/82.jpg',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emma Williams',
    role: 'Travel Blogger',
    quote: 'I recommend AirBookWizz to all my followers. Their price alerts have saved me hundreds on international flights!',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 4,
  },
];

const Index = () => {
  // References for scrolling animations
  const featuresSectionRef = useRef<HTMLDivElement>(null);
  const destinationsSectionRef = useRef<HTMLDivElement>(null);
  const testimonialsSectionRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);
  
  // Check if sections are in view
  const featuresInView = useInView(featuresSectionRef, { threshold: 0.1 });
  const destinationsInView = useInView(destinationsSectionRef, { threshold: 0.1 });
  const testimonialsInView = useInView(testimonialsSectionRef, { threshold: 0.1 });
  const ctaInView = useInView(ctaSectionRef, { threshold: 0.1 });
  
  // Load images with fade-in effect
  useEffect(() => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.classList.add('lazy-load');
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const image = entry.target as HTMLImageElement;
            image.onload = () => {
              image.classList.remove('lazy-load');
              image.classList.add('lazy-loaded');
              observer.unobserve(image);
            };
            if (image.complete) {
              image.classList.remove('lazy-load');
              image.classList.add('lazy-loaded');
              observer.unobserve(image);
            }
          }
        });
      });
      observer.observe(img);
    });
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Features Section */}
        <section 
          ref={featuresSectionRef}
          className="py-24 bg-white"
        >
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <motion.h2 
                {...getSlideAnimation('up')}
                animate={{ opacity: featuresInView ? 1 : 0, y: featuresInView ? 0 : 20 }}
                className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4"
              >
                Why Choose AirBookWizz
              </motion.h2>
              <motion.p 
                {...getSlideAnimation('up', 0.6)}
                animate={{ opacity: featuresInView ? 1 : 0, y: featuresInView ? 0 : 20 }}
                className="max-w-2xl mx-auto text-lg text-slate-600"
              >
                We make booking flights simple, transparent, and enjoyable.
              </motion.p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: featuresInView ? 1 : 0, y: featuresInView ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl hover:bg-slate-100/80 transition-colors"
                >
                  <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Popular Destinations */}
        <section 
          ref={destinationsSectionRef}
          className="py-24 bg-slate-50"
        >
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <motion.h2 
                {...getSlideAnimation('up')}
                animate={{ opacity: destinationsInView ? 1 : 0, y: destinationsInView ? 0 : 20 }}
                className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4"
              >
                Popular Destinations
              </motion.h2>
              <motion.p 
                {...getSlideAnimation('up', 0.6)}
                animate={{ opacity: destinationsInView ? 1 : 0, y: destinationsInView ? 0 : 20 }}
                className="max-w-2xl mx-auto text-lg text-slate-600"
              >
                Explore trending destinations with great flight deals
              </motion.p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularDestinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: destinationsInView ? 1 : 0, y: destinationsInView ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="group relative rounded-2xl overflow-hidden hover-lift"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={destination.image}
                      alt={`${destination.city}, ${destination.country}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col items-start">
                    <h3 className="text-lg font-semibold text-white mb-1">{destination.city}</h3>
                    <p className="text-sm text-white/90 mb-3">{destination.country}</p>
                    <div className="flex items-center justify-between w-full">
                      <span className="text-sm font-medium text-white bg-airline-blue/80 px-3 py-1 rounded-full">
                        From ${destination.price}
                      </span>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-white border-white/40 hover:bg-white/10 hover:border-white"
                      >
                        Explore
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Download App Section */}
        <section className="py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-airline-blue text-white px-5 py-2 rounded-full inline-flex items-center mb-6"
                >
                  <LocateFixed className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Mobile App Available</span>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6"
                >
                  Manage your travel plans on the go
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg text-slate-600 mb-8"
                >
                  Download our mobile app to access exclusive deals, receive real-time flight updates, 
                  and manage all your bookings from anywhere in the world.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-wrap gap-4"
                >
                  <Button className="flex items-center gap-2 rounded-xl h-14 px-6 bg-slate-900 hover:bg-slate-800">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.5227 7.39604C17.0441 7.83504 12.9359 11.9072 12.4623 12.3777C12.2819 12.558 12.0469 12.6628 11.7935 12.6628C11.54 12.6628 11.305 12.558 11.1246 12.3726C10.6511 11.9021 6.54586 7.83504 6.06731 7.39604C5.88691 7.22154 5.88691 6.94654 6.06731 6.77654C6.24771 6.60205 6.52271 6.60654 6.69862 6.78105C6.69862 6.78105 10.8524 10.7973 11.0907 11.0238C11.3389 11.2648 12.2431 11.2648 12.4913 11.0238C12.7296 10.7973 16.8834 6.78105 16.8834 6.78105C17.0638 6.60654 17.3388 6.60205 17.5192 6.77654C17.7041 6.94654 17.7041 7.22154 17.5227 7.39604Z" fill="currentColor" />
                      <path d="M21.2007 5.04754C20.5607 4.26404 19.5606 3.75304 18.4205 3.75304H5.18046C4.04046 3.75304 3.04032 4.26404 2.40032 5.04754C1.74032 5.85154 1.38965 6.91954 1.44015 8.03904L2.25467 18.439C2.36117 20.391 4.00566 21.891 6.02617 21.891H17.5693C19.5898 21.891 21.2342 20.391 21.3407 18.458L22.1553 8.05804C22.2058 6.91954 21.8607 5.85154 21.2007 5.04754ZM20.6792 7.97204L19.8647 18.373C19.8067 19.423 18.7561 20.273 17.5648 20.273H6.02167C4.83467 20.273 3.78404 19.423 3.72154 18.354L2.91156 7.95304C2.87656 7.16954 3.12158 6.42104 3.60013 5.85154C4.06117 5.30054 4.72116 4.98804 5.18221 4.98804H18.4223C18.8878 4.98804 19.5477 5.30054 20.0043 5.85154C20.4738 6.42104 20.7142 7.17404 20.6792 7.97204Z" fill="currentColor" />
                    </svg>
                    <div className="flex flex-col items-start">
                      <span className="text-xs">Download on the</span>
                      <span className="text-base font-medium">App Store</span>
                    </div>
                  </Button>
                  <Button className="flex items-center gap-2 rounded-xl h-14 px-6 bg-slate-900 hover:bg-slate-800">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.2437 9.19989L12.2437 9.19989L5.30255 2.29361C5.06338 2.05034 4.67735 2.03321 4.41551 2.24518C4.15368 2.45714 4.10268 2.83283 4.29766 3.09965L4.29766 3.09965L4.29863 3.10107C4.32211 3.13516 4.3493 3.16765 4.38008 3.19836L12.2437 9.19989ZM12.2437 9.19989L19.1849 2.29455C19.4247 2.05603 19.8092 2.04358 20.0682 2.25875C20.3272 2.47392 20.3735 2.84708 20.178 3.11078L20.178 3.11078L20.1771 3.11193C20.1536 3.14638 20.1262 3.17917 20.0952 3.21013L12.2437 9.19989ZM12.2437 9.19989L2.78913 14.6237C2.55335 14.7647 2.42661 15.0346 2.47345 15.3013C2.5203 15.5681 2.72816 15.7759 2.99496 15.8228L2.99496 15.8228L2.99649 15.8232C3.0338 15.83 3.07167 15.8333 3.10995 15.8333H21.3783C21.4166 15.8333 21.4544 15.83 21.4917 15.8232L21.4917 15.8232L21.4933 15.8229C21.7617 15.7771 21.9713 15.5693 22.0186 15.3018C22.066 15.0342 21.9386 14.7631 21.7015 14.6221L12.2437 9.19989Z" fill="currentColor" stroke="white" strokeWidth="0.5" />
                      <path d="M4.02148 17.0832V21.7499C4.02148 21.9059 4.14764 22.0397 4.30564 22.0397C4.36331 22.0397 4.41831 22.0247 4.46698 21.9968L9.45048 19.0825C9.60298 18.9912 9.6863 18.8075 9.6863 18.6147V17.0832H4.02148Z" fill="currentColor" />
                      <path d="M11.5215 17.0832V18.6147C11.5215 18.8075 11.6049 18.9912 11.7573 19.0825L16.7408 21.9968C16.7895 22.0247 16.8445 22.0397 16.9022 22.0397C17.0602 22.0397 17.1863 21.9059 17.1863 21.7499V17.0832H11.5215Z" fill="currentColor" />
                    </svg>
                    <div className="flex flex-col items-start">
                      <span className="text-xs">GET IT ON</span>
                      <span className="text-base font-medium">Google Play</span>
                    </div>
                  </Button>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="relative h-[500px] w-full flex justify-center"
              >
                <div className="absolute -top-12 -left-12 w-64 h-64 bg-airline-blue/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-airline-blue/10 rounded-full blur-3xl" />
                
                <div className="relative z-10 w-72 h-[500px] border-8 border-slate-800 rounded-[40px] overflow-hidden shadow-xl">
                  <div className="absolute top-0 left-0 right-0 h-6 bg-slate-800 flex justify-center items-center">
                    <div className="w-20 h-1 bg-slate-600 rounded-full"></div>
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?q=80&w=1000&auto=format&fit=crop" 
                    alt="Flight booking app" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="absolute bottom-10 left-0 right-0 px-6">
                      <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl">
                        <h4 className="text-sm font-semibold text-airline-blue mb-1">Flight to Paris</h4>
                        <p className="text-xs text-slate-600 mb-3">May 15, 2023 - Economy</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold">$499</span>
                          <Button size="sm" className="h-8 bg-airline-blue text-white rounded-lg px-3">Book Now</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section 
          ref={testimonialsSectionRef}
          className="py-24 bg-slate-50"
        >
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <motion.h2 
                {...getSlideAnimation('up')}
                animate={{ opacity: testimonialsInView ? 1 : 0, y: testimonialsInView ? 0 : 20 }}
                className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4"
              >
                What Our Customers Say
              </motion.h2>
              <motion.p 
                {...getSlideAnimation('up', 0.6)}
                animate={{ opacity: testimonialsInView ? 1 : 0, y: testimonialsInView ? 0 : 20 }}
                className="max-w-2xl mx-auto text-lg text-slate-600"
              >
                Don't just take our word for it — hear from our satisfied travelers
              </motion.p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: testimonialsInView ? 1 : 0, y: testimonialsInView ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">{testimonial.name}</h4>
                        <p className="text-sm text-slate-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 italic">"{testimonial.quote}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section 
          ref={ctaSectionRef}
          className="py-24 bg-airline-blue text-white"
        >
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 
                {...getSlideAnimation('up')}
                animate={{ opacity: ctaInView ? 1 : 0, y: ctaInView ? 0 : 20 }}
                className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
              >
                Ready to take flight?
              </motion.h2>
              <motion.p 
                {...getSlideAnimation('up', 0.6)}
                animate={{ opacity: ctaInView ? 1 : 0, y: ctaInView ? 0 : 20 }}
                className="text-xl text-white/90 mb-8"
              >
                Join thousands of happy travelers who book with AirBookWizz every day.
              </motion.p>
              <motion.div 
                {...getSlideAnimation('up', 0.7)}
                animate={{ opacity: ctaInView ? 1 : 0, y: ctaInView ? 0 : 20 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button size="lg" className="bg-white text-airline-blue hover:bg-white/90 rounded-xl px-8 py-6 text-lg shadow-lg">
                  <TicketCheck className="mr-2 h-5 w-5" />
                  Book a Flight
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 rounded-xl px-8 py-6 text-lg">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Contact Support
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-16 pb-8">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Plane className="h-6 w-6 text-airline-blue" />
                <span className="text-xl font-medium">AirBookWizz</span>
              </div>
              <p className="text-slate-400 mb-6">Making air travel accessible, affordable, and enjoyable for everyone.</p>
              <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Feedback</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Legal</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Accessibility</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8">
            <p className="text-center text-slate-500">
              &copy; {new Date().getFullYear()} AirBookWizz. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
