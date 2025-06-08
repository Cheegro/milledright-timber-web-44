
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck, Bell, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import NewsletterModal from './NewsletterModal';
import { useNewsletterModal } from '@/hooks/useNewsletterModal';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen: isNewsletterOpen, openModal: openNewsletter, setIsOpen: setNewsletterOpen } = useNewsletterModal();

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
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Projects', href: '/projects' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'Board Foot Calculator', href: '/board-foot-calculator' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const handleAdminAccess = () => {
    toast({
      title: "Admin Dashboard",
      description: "Redirecting to admin dashboard..."
    });
  };

  const handleGetQuote = () => {
    const isHomePage = location.pathname === '/';
    if (isHomePage) {
      const quoteSection = document.getElementById('quote-section');
      if (quoteSection) {
        quoteSection.scrollIntoView({
          behavior: 'smooth'
        });
      }
    } else {
      navigate('/#quote-section');
    }
    setIsOpen(false);
  };

  const isActiveRoute = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-sawmill-orange/20' 
          : 'bg-white/90 backdrop-blur-sm shadow-lg'
      }`}>
        <div className="container-wide">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Logo */}
            <Link to="/" className="flex items-center gap-3 group touch-manipulation">
              <div className="relative">
                <div className="bg-gradient-to-br from-sawmill-dark-brown to-sawmill-medium-brown text-white p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="font-bold text-xl tracking-tight">MR</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-sawmill-orange rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-sawmill-dark-brown to-sawmill-medium-brown bg-clip-text text-transparent">
                  MilledRight
                </h1>
                <p className="text-sm text-sawmill-medium-brown font-medium tracking-wide">
                  Sawmill Solutions
                </p>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center">
              <div className="flex items-center space-x-1 bg-gray-50/80 rounded-2xl p-2 mr-6">
                {navigationItems.slice(0, 6).map((item) => (
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
                
                {/* More dropdown for remaining items */}
                <div className="relative group">
                  <button className="px-4 py-2.5 rounded-xl font-medium text-sm text-sawmill-dark-brown hover:bg-white hover:shadow-md transition-all duration-300 flex items-center gap-1">
                    More
                    <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                  </button>
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="p-2">
                      {navigationItems.slice(6).map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="block px-4 py-3 text-sawmill-dark-brown hover:bg-sawmill-orange hover:text-white rounded-xl transition-all duration-200 font-medium text-sm"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={openNewsletter}
                  className="border-2 border-sawmill-orange/30 text-sawmill-orange hover:bg-sawmill-orange hover:text-white hover:border-sawmill-orange transition-all duration-300 rounded-xl font-medium shadow-sm hover:shadow-md"
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Subscribe
                </Button>
                
                <Button 
                  className="bg-gradient-to-r from-sawmill-orange to-sawmill-auburn text-white hover:from-sawmill-auburn hover:to-sawmill-orange shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl font-medium px-6"
                  onClick={handleGetQuote}
                >
                  Get Quote
                </Button>
                
                <Link to="/admin" onClick={handleAdminAccess}>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-2 border-sawmill-dark-brown/30 text-sawmill-dark-brown hover:bg-sawmill-dark-brown hover:text-white hover:border-sawmill-dark-brown transition-all duration-300 rounded-xl font-medium shadow-sm hover:shadow-md"
                  >
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Admin
                  </Button>
                </Link>
              </div>
            </nav>
            
            {/* Mobile menu button */}
            <button 
              className="xl:hidden text-sawmill-dark-brown p-3 hover:bg-sawmill-orange/10 rounded-xl transition-all duration-300 touch-manipulation group" 
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
        
        {/* Mobile Navigation Overlay */}
        {isOpen && (
          <>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 xl:hidden" onClick={() => setIsOpen(false)} />
            <div className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl z-50 xl:hidden transform transition-transform duration-300">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-sawmill-orange/10 to-sawmill-auburn/10">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xl text-sawmill-dark-brown">Navigation</span>
                  <button onClick={() => setIsOpen(false)} className="p-2 text-sawmill-dark-brown hover:bg-sawmill-orange/20 rounded-xl transition-all duration-300 touch-manipulation" aria-label="Close menu">
                    <X size={20} />
                  </button>
                </div>
              </div>
              <nav className="flex flex-col p-4 space-y-2 overflow-y-auto h-full">
                {navigationItems.map((item) => (
                  <Link 
                    key={item.name} 
                    to={item.href} 
                    className={`text-sawmill-dark-brown font-medium py-4 px-6 rounded-xl transition-all duration-300 touch-manipulation text-lg ${
                      isActiveRoute(item.href)
                        ? 'bg-sawmill-orange text-white shadow-lg' 
                        : 'hover:bg-sawmill-orange/10 hover:text-sawmill-orange'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="pt-6 space-y-4 border-t border-gray-100 mt-6">
                  <Button 
                    variant="outline" 
                    className="border-2 border-sawmill-orange text-sawmill-orange hover:bg-sawmill-orange hover:text-white w-full h-14 text-base font-medium rounded-xl transition-all duration-300"
                    onClick={() => {
                      openNewsletter();
                      setIsOpen(false);
                    }}
                  >
                    <Bell className="mr-2 h-5 w-5" />
                    Subscribe to Updates
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-sawmill-orange to-sawmill-auburn text-white w-full h-14 text-base font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" 
                    onClick={handleGetQuote}
                  >
                    Get Quote
                  </Button>
                  <Link to="/admin" onClick={() => {
                    handleAdminAccess();
                    setIsOpen(false);
                  }}>
                    <Button 
                      variant="outline" 
                      className="border-2 border-sawmill-dark-brown text-sawmill-dark-brown hover:bg-sawmill-dark-brown hover:text-white w-full h-14 text-base font-medium rounded-xl transition-all duration-300"
                    >
                      <ShieldCheck className="mr-2 h-5 w-5" />
                      Admin Dashboard
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          </>
        )}
      </header>

      <NewsletterModal 
        open={isNewsletterOpen} 
        onOpenChange={setNewsletterOpen}
      />
    </>
  );
};

export default Header;
