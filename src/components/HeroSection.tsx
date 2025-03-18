
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/lib/animations';
import SearchForm from './SearchForm';

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });

  return (
    <section 
      ref={ref}
      className="relative min-h-screen pt-24 pb-16 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-slate-100 z-0" />
      
      {/* Animated decorative elements */}
      <div className="absolute top-1/4 right-1/5 w-64 h-64 bg-airline-blue/5 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-1/4 left-1/5 w-80 h-80 bg-airline-light-blue/10 rounded-full blur-3xl animate-pulse-soft animation-delay-1000" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-12 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center rounded-full border px-4 py-1.5 bg-white shadow-sm mb-4"
          >
            <span className="text-xs font-medium text-airline-blue">The easiest way to book your next trip</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 max-w-4xl leading-tight"
          >
            Discover the world with <span className="text-airline-blue">AirBookWizz</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-3xl text-lg md:text-xl text-slate-600 mt-4"
          >
            Book flights with ease and enjoy a seamless travel experience from start to finish. 
            Find the best fares across multiple airlines in seconds.
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-4xl mx-auto w-full z-10 relative"
        >
          <SearchForm />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 flex flex-col md:flex-row justify-center items-center gap-8 text-center"
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-airline-blue">500+</span>
            <span className="text-slate-600 mt-1">Airlines</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-airline-blue">15,000+</span>
            <span className="text-slate-600 mt-1">Daily Flights</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-airline-blue">120+</span>
            <span className="text-slate-600 mt-1">Countries</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-airline-blue">5M+</span>
            <span className="text-slate-600 mt-1">Happy Customers</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
