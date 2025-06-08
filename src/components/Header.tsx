
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navigationItems = [
    { name: 'Products', href: '/products' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'Calculator', href: '/board-foot-calculator' },
    { name: 'Projects', href: '/projects' }
  ];

  const handleGetQuote = () => {
    navigate('/contact');
    setIsOpen(false);
  };

  const isActiveRoute = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-sawmill-orange/20' 
        : 'bg-white/90 backdrop-blur-sm shadow-lg'
    }`}>
      <div className="container-wide">
        <div className="flex items-center justify-between h-16 lg:h-20 px-4 lg:px-0">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center gap-2 lg:gap-3 group touch-manipulation">
            <div className="relative">
              <div className="bg-gradient-to-br from-sawmill-dark-brown to-sawmill-medium-brown text-white p-2 lg:p-3 rounded-lg lg:rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="font-bold text-lg lg:text-xl tracking-tight">MR</span>
              </div>
              <div className="absolute -top-1 -right-1 w-2 lg:w-3 h-2 lg:h-3 bg-sawmill-orange rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-sawmill-dark-brown to-sawmill-medium-brown bg-clip-text text-transparent">
                MilledRight
              </h1>
              <p className="text-xs lg:text-sm text-sawmill-medium-brown font-medium tracking-wide">
                Sawmill Solutions
              </p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center">
            <div className="flex items-center space-x-1 bg-gray-50/80 rounded-2xl p-2 mr-6">
              {navigationItems.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.href} 
                  className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm relative overflow-hidden group ${
                    isActiveRoute(item.href)
                      ? 'bg-sawmill-orange text-white shadow-lg' 
                      : 'text-sawmill-dark-brown hover:bg-white hover:shadow-md'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {!isActiveRoute(item.href) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-sawmill-orange to-sawmill-auburn opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  )}
                </Link>
              ))}
            </div>
            
            {/* Action Button - Get Quote */}
            <div className="flex items-center gap-3">
              <Button 
                className="bg-gradient-to-r from-sawmill-orange to-sawmill-auburn text-white hover:from-sawmill-auburn hover:to-sawmill-orange shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl font-medium px-8"
                onClick={handleGetQuote}
              >
                Get Quote
              </Button>
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="xl:hidden text-sawmill-dark-brown p-2 lg:p-3 hover:bg-sawmill-orange/10 rounded-lg lg:rounded-xl transition-all duration-300 touch-manipulation group" 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Toggle menu"
          >
            <div className="relative">
              {isOpen ? (
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              ) : (
                <Menu size={24} className="group-hover:scale-110 transition-transform duration-300" />
              )}
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Overlay - Optimized for mobile screens */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 xl:hidden" onClick={() => setIsOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 xl:hidden transform transition-transform duration-300 overflow-y-auto">
            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-sawmill-orange/10 to-sawmill-auburn/10">
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg text-sawmill-dark-brown">Navigation</span>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-2 text-sawmill-dark-brown hover:bg-sawmill-orange/20 rounded-lg transition-all duration-300 touch-manipulation" 
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <nav className="flex flex-col p-4 space-y-1 overflow-y-auto">
              {navigationItems.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.href} 
                  className={`text-sawmill-dark-brown font-medium py-4 px-4 rounded-xl transition-all duration-300 touch-manipulation text-base ${
                    isActiveRoute(item.href)
                      ? 'bg-sawmill-orange text-white shadow-lg' 
                      : 'hover:bg-sawmill-orange/10 hover:text-sawmill-orange'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 space-y-3 border-t border-gray-100 mt-4">
                <Button 
                  className="bg-gradient-to-r from-sawmill-orange to-sawmill-auburn text-white w-full h-12 text-base font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" 
                  onClick={handleGetQuote}
                >
                  Get Quote
                </Button>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
