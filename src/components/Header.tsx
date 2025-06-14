
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { trackButtonClick, trackNavigation } from '@/utils/analytics';

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
    { name: 'Projects', href: '/projects' },
    { name: 'About Us', href: '/about' }
  ];

  const handleGetQuote = () => {
    trackButtonClick('Get Quote', 'Header');
    navigate('/contact');
    setIsOpen(false);
  };

  const handleNavClick = (item: any) => {
    trackNavigation(location.pathname, item.href);
    setIsOpen(false);
  };

  const isActiveRoute = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'premium-header shadow-modern-xl border-b-2 border-sawmill-orange/30' 
        : 'bg-white/90 backdrop-blur-sm shadow-modern-lg'
    }`}>
      <div className="container-wide">
        <div className="flex items-center justify-between h-16 lg:h-20 px-4 lg:px-0">
          {/* Enhanced Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 lg:gap-3 group touch-manipulation"
            onClick={() => trackNavigation(location.pathname, '/')}
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-sawmill-orange to-sawmill-orange-dark text-white p-3 lg:p-4 rounded-2xl shadow-modern-lg group-hover:shadow-glow transition-all duration-500 group-hover:scale-110">
                <span className="font-bold text-lg lg:text-xl tracking-tight">MR</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 lg:w-4 h-3 lg:h-4 bg-sawmill-orange rounded-full animate-glow-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-bold text-sawmill-dark-brown group-hover:text-sawmill-orange transition-colors duration-300">
                MilledRight
              </h1>
              <p className="text-xs lg:text-sm text-sawmill-medium-brown font-semibold tracking-wide">
                Sawmill Solutions
              </p>
            </div>
          </Link>
          
          {/* Enhanced Desktop Navigation */}
          <nav className="hidden xl:flex items-center">
            <div className="flex items-center space-x-1 bg-white/80 backdrop-blur-sm rounded-3xl p-2 mr-6 border-2 border-sawmill-orange/20 shadow-modern-lg">
              {navigationItems.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.href} 
                  onClick={() => handleNavClick(item)}
                  className={`px-5 py-3 rounded-2xl font-semibold transition-all duration-500 text-sm relative overflow-hidden group ${
                    isActiveRoute(item.href)
                      ? 'bg-gradient-to-r from-sawmill-orange to-sawmill-orange-dark text-white shadow-modern-lg' 
                      : 'text-sawmill-dark-brown hover:bg-sawmill-cream hover:text-sawmill-orange hover:shadow-modern'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {!isActiveRoute(item.href) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-sawmill-orange/10 to-sawmill-orange-light/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </Link>
              ))}
            </div>
            
            {/* Enhanced Action Button */}
            <div className="flex items-center gap-3">
              <Button 
                className="modern-button-primary group"
                onClick={handleGetQuote}
              >
                Get Quote
                <div className="ml-2 w-0 group-hover:w-4 transition-all duration-300 overflow-hidden">
                  →
                </div>
              </Button>
            </div>
          </nav>
          
          {/* Enhanced Mobile menu button */}
          <button 
            className="xl:hidden text-sawmill-dark-brown p-3 hover:bg-sawmill-cream rounded-2xl transition-all duration-300 touch-manipulation group border-2 border-sawmill-orange/20 hover:border-sawmill-orange/40" 
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
      
      {/* Enhanced Mobile Navigation Overlay */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-sawmill-dark-brown/50 backdrop-blur-sm z-40 xl:hidden" onClick={() => setIsOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-modern-xl z-50 xl:hidden transform transition-transform duration-500 border-l-4 border-sawmill-orange">
            <div className="p-6 border-b-2 border-sawmill-orange/20 bg-gradient-to-r from-sawmill-cream to-sawmill-warm-white">
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg text-sawmill-dark-brown">Navigation</span>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-2 text-sawmill-dark-brown hover:bg-white rounded-xl transition-all duration-300 touch-manipulation" 
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            {/* Enhanced Navigation Items */}
            <div className="h-full overflow-y-auto pb-32 scrollbar-custom">
              <nav className="flex flex-col p-6 space-y-3">
                {navigationItems.map((item) => (
                  <Link 
                    key={item.name} 
                    to={item.href} 
                    className={`text-sawmill-dark-brown font-semibold py-4 px-6 rounded-2xl transition-all duration-300 touch-manipulation text-base min-h-[56px] flex items-center border-2 ${
                      isActiveRoute(item.href)
                        ? 'bg-gradient-to-r from-sawmill-orange to-sawmill-orange-dark text-white shadow-modern-lg border-transparent' 
                        : 'hover:bg-sawmill-cream border-sawmill-orange/20 hover:border-sawmill-orange/40'
                    }`}
                    onClick={() => handleNavClick(item)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="pt-8 space-y-4 border-t-2 border-sawmill-orange/20 mt-8">
                  <Button 
                    className="modern-button-primary w-full h-16 text-base font-semibold" 
                    onClick={handleGetQuote}
                  >
                    Get Quote
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
