
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plane, Menu, X, Home, Search, CreditCard, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Check if the current path matches the given route
  const isActive = (route: string) => {
    return location.pathname === route;
  };

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-12',
        isScrolled ? 'glass border-b border-slate-200 backdrop-blur-md' : 'bg-transparent'
      )}
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-lg font-medium text-airline-black transition-opacity hover:opacity-80"
        >
          <Plane className="h-6 w-6 text-airline-blue" />
          <span className="hidden sm:inline-block animate-fade-in">AirBookWizz</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink to="/" active={isActive('/')}>
            <Home className="w-4 h-4 mr-2" />
            Home
          </NavLink>
          <NavLink to="/search" active={isActive('/search')}>
            <Search className="w-4 h-4 mr-2" />
            Flights
          </NavLink>
          <NavLink to="/bookings" active={isActive('/bookings')}>
            <CreditCard className="w-4 h-4 mr-2" />
            My Bookings
          </NavLink>
        </nav>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" size="sm" className="px-4 hover-lift rounded-full">
            Sign In
          </Button>
          <Button size="sm" className="px-4 bg-airline-blue hover:bg-airline-blue/90 hover-lift rounded-full">
            Sign Up
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-700 hover:text-slate-900 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 glass border-b border-slate-200 animate-fade-in-up md:hidden">
            <div className="flex flex-col p-5 space-y-4">
              <MobileNavLink to="/" active={isActive('/')} onClick={() => setMobileMenuOpen(false)}>
                <Home className="w-5 h-5 mr-3" />
                Home
              </MobileNavLink>
              <MobileNavLink to="/search" active={isActive('/search')} onClick={() => setMobileMenuOpen(false)}>
                <Search className="w-5 h-5 mr-3" />
                Flights
              </MobileNavLink>
              <MobileNavLink to="/bookings" active={isActive('/bookings')} onClick={() => setMobileMenuOpen(false)}>
                <CreditCard className="w-5 h-5 mr-3" />
                My Bookings
              </MobileNavLink>
              <MobileNavLink to="/profile" active={isActive('/profile')} onClick={() => setMobileMenuOpen(false)}>
                <User className="w-5 h-5 mr-3" />
                Profile
              </MobileNavLink>
              <div className="pt-2 flex flex-col gap-3">
                <Button variant="outline" className="w-full justify-center">
                  Sign In
                </Button>
                <Button className="w-full justify-center bg-airline-blue hover:bg-airline-blue/90">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink = ({ to, active, children }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        'relative py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 flex items-center',
        active 
          ? 'text-airline-blue bg-airline-blue/10' 
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
      )}
    >
      {children}
    </Link>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink = ({ to, active, onClick, children }: MobileNavLinkProps) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        'flex items-center py-3 px-4 rounded-lg text-base font-medium transition-all duration-300',
        active 
          ? 'text-airline-blue bg-airline-blue/10' 
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
      )}
    >
      {children}
    </Link>
  );
};

export default Navbar;
