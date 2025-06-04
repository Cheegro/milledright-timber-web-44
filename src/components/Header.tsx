import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import NewsletterModal from './NewsletterModal';
import { useNewsletterModal } from '@/hooks/useNewsletterModal';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen: isNewsletterOpen, openModal: openNewsletter, setIsOpen: setNewsletterOpen } = useNewsletterModal();

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
      // If already on home page, just scroll to the section
      const quoteSection = document.getElementById('quote-section');
      if (quoteSection) {
        quoteSection.scrollIntoView({
          behavior: 'smooth'
        });
      }
    } else {
      // If on another page, navigate to home with hash
      navigate('/#quote-section');
    }
    setIsOpen(false); // Close mobile menu
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container-wide py-3 md:py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 touch-manipulation">
            {/* Text Logo for all screen sizes */}
            <div className="flex items-center gap-2">
              <div className="bg-sawmill-dark-brown text-white p-2 rounded">
                <span className="font-bold text-lg">MR</span>
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-sawmill-dark-brown">MilledRight</h1>
                <p className="text-xs md:text-sm text-sawmill-medium-brown">Sawmill Solutions</p>
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link key={item.name} to={item.href} className="text-sawmill-dark-brown hover:text-sawmill-orange font-medium transition-colors">{item.name}</Link>
            ))}
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={openNewsletter}
              className="border-sawmill-orange text-sawmill-orange hover:bg-sawmill-orange hover:text-white"
            >
              <Bell className="mr-2 h-4 w-4" />
              Subscribe
            </Button>
            
            <Button className="bg-sawmill-orange hover:bg-sawmill-auburn text-white" onClick={handleGetQuote}>Get Quote</Button>
            <Link to="/admin" onClick={handleAdminAccess}>
              <Button variant="outline" className="border-sawmill-dark-brown text-sawmill-dark-brown hover:bg-sawmill-dark-brown hover:text-white">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Admin
              </Button>
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <button className="lg:hidden text-sawmill-dark-brown p-2 touch-manipulation" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation Overlay */}
        {isOpen && (
          <>
            <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
            <div className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-xl z-50 lg:hidden transform transition-transform duration-300">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sawmill-dark-brown">Menu</span>
                  <button onClick={() => setIsOpen(false)} className="p-2 text-sawmill-dark-brown touch-manipulation" aria-label="Close menu">
                    <X size={20} />
                  </button>
                </div>
              </div>
              <nav className="flex flex-col p-4">
                {navigationItems.map((item) => (
                  <Link key={item.name} to={item.href} className="text-sawmill-dark-brown hover:text-sawmill-orange font-medium py-4 px-4 rounded hover:bg-gray-50 touch-manipulation" onClick={() => setIsOpen(false)}>{item.name}</Link>
                ))}
                
                <div className="mt-6 space-y-3">
                  <Button 
                    variant="outline" 
                    className="border-sawmill-orange text-sawmill-orange hover:bg-sawmill-orange hover:text-white w-full h-12 text-base"
                    onClick={() => {
                      openNewsletter();
                      setIsOpen(false);
                    }}
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Subscribe to Updates
                  </Button>
                  <Button className="bg-sawmill-orange hover:bg-sawmill-auburn text-white w-full h-12 text-base" onClick={handleGetQuote}>Get Quote</Button>
                  <Link to="/admin" onClick={() => {
                    handleAdminAccess();
                    setIsOpen(false);
                  }}>
                    <Button variant="outline" className="border-sawmill-dark-brown text-sawmill-dark-brown hover:bg-sawmill-dark-brown hover:text-white w-full h-12 text-base">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Admin
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
