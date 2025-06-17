
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-background/95 backdrop-blur-lg shadow-xl border-b border-border' 
        : 'bg-background/90 backdrop-blur-sm shadow-lg'
    }`}>
      <div className="container-wide">
        <div className="flex items-center justify-between h-16 lg:h-20 px-4 lg:px-0">
          {/* Modern Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 lg:gap-3 group touch-manipulation"
            onClick={() => trackNavigation(location.pathname, '/')}
          >
            <div className="relative">
              <div className="bg-primary text-primary-foreground p-2 lg:p-3 rounded-lg lg:rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="font-bold text-lg lg:text-xl tracking-tight">MR</span>
              </div>
              <div className="absolute -top-1 -right-1 w-2 lg:w-3 h-2 lg:h-3 bg-primary rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-bold text-foreground">
                MilledRight
              </h1>
              <p className="text-xs lg:text-sm text-muted-foreground font-medium tracking-wide">
                Sawmill Solutions
              </p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center">
            <div className="flex items-center space-x-1 bg-card/80 rounded-2xl p-2 mr-6 border border-border">
              {navigationItems.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.href} 
                  onClick={() => handleNavClick(item)}
                  className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm relative overflow-hidden group ${
                    isActiveRoute(item.href)
                      ? 'bg-primary text-primary-foreground shadow-lg' 
                      : 'text-foreground hover:bg-secondary hover:shadow-md'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {!isActiveRoute(item.href) && (
                    <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  )}
                </Link>
              ))}
            </div>
            
            {/* Action Button - Get Quote */}
            <div className="flex items-center gap-3">
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl font-medium px-8"
                onClick={handleGetQuote}
              >
                Get Quote
              </Button>
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="xl:hidden text-foreground p-2 lg:p-3 hover:bg-secondary rounded-lg lg:rounded-xl transition-all duration-300 touch-manipulation group" 
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
      
      {/* Mobile Navigation Full Screen */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 xl:hidden" onClick={() => setIsOpen(false)} />
          <div className="fixed inset-0 bg-background z-50 xl:hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-card">
              <div className="flex items-center gap-3">
                <div className="bg-primary text-primary-foreground p-2 rounded-lg shadow-lg">
                  <span className="font-bold text-lg tracking-tight">MR</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">MilledRight</h1>
                  <p className="text-xs text-muted-foreground">Sawmill Solutions</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 text-foreground hover:bg-secondary rounded-lg transition-all duration-300 touch-manipulation" 
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Navigation Items - Full Screen Layout */}
            <div className="flex-1 flex flex-col justify-center px-6 bg-background">
              <nav className="space-y-4">
                {navigationItems.map((item) => (
                  <Link 
                    key={item.name} 
                    to={item.href} 
                    className={`block text-2xl font-medium py-4 px-6 rounded-xl transition-all duration-300 touch-manipulation text-center ${
                      isActiveRoute(item.href)
                        ? 'bg-primary text-primary-foreground shadow-lg' 
                        : 'text-foreground hover:bg-secondary hover:shadow-md bg-card border border-border'
                    }`}
                    onClick={() => handleNavClick(item)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              {/* Get Quote Button */}
              <div className="mt-8 px-6">
                <Button 
                  className="bg-primary text-primary-foreground w-full h-16 text-xl font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" 
                  onClick={handleGetQuote}
                >
                  Get Quote
                </Button>
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-border text-center bg-card">
              <p className="text-sm text-muted-foreground">
                Premium lumber & custom milling services
              </p>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
