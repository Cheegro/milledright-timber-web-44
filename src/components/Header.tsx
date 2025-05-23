
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAdminAccess = () => {
    toast({
      title: "Admin Dashboard",
      description: "Redirecting to admin dashboard...",
    });
  };

  const handleGetQuote = () => {
    const isHomePage = location.pathname === '/';
    
    if (isHomePage) {
      // If already on home page, just scroll to the section
      const quoteSection = document.getElementById('quote-section');
      if (quoteSection) {
        quoteSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on another page, navigate to home with hash
      navigate('/#quote-section');
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container-wide py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-sawmill-dark-brown text-white p-2 rounded">
            <span className="font-bold text-xl">MR</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-sawmill-dark-brown">MilledRight</h1>
            <p className="text-sm text-sawmill-medium-brown">Sawmill Solutions</p>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sawmill-dark-brown hover:text-sawmill-orange font-medium">Home</Link>
          <Link to="/products" className="text-sawmill-dark-brown hover:text-sawmill-orange font-medium">Products</Link>
          <Link to="/gallery" className="text-sawmill-dark-brown hover:text-sawmill-orange font-medium">Gallery</Link>
          <Link to="/blog" className="text-sawmill-dark-brown hover:text-sawmill-orange font-medium">Blog</Link>
          <Link to="/about" className="text-sawmill-dark-brown hover:text-sawmill-orange font-medium">About Us</Link>
          <Link to="/contact" className="text-sawmill-dark-brown hover:text-sawmill-orange font-medium">Contact</Link>
          <Button className="bg-sawmill-orange hover:bg-sawmill-auburn text-white" onClick={handleGetQuote}>Get Quote</Button>
          <Link to="/admin" onClick={handleAdminAccess}>
            <Button 
              variant="outline" 
              className="border-sawmill-dark-brown text-sawmill-dark-brown hover:bg-sawmill-dark-brown hover:text-white"
            >
              <ShieldCheck className="mr-2 h-4 w-4" />
              Admin
            </Button>
          </Link>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-sawmill-dark-brown"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white p-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-sawmill-dark-brown hover:text-sawmill-orange font-medium py-2 px-4 rounded hover:bg-gray-100" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/products" className="text-sawmill-dark-brown hover:text-sawmill-orange font-medium py-2 px-4 rounded hover:bg-gray-100" onClick={() => setIsOpen(false)}>Products</Link>
            <Link to="/gallery" className="text-sawmill-dark-brown hover:text-sawmill-orange font-medium py-2 px-4 rounded hover:bg-gray-100" onClick={() => setIsOpen(false)}>Gallery</Link>
            <Link to="/blog" className="text-sawmill-dark-brown hover:text-sawmill-orange font-medium py-2 px-4 rounded hover:bg-gray-100" onClick={() => setIsOpen(false)}>Blog</Link>
            <Link to="/about" className="text-sawmill-dark-brown hover:text-sawmill-orange font-medium py-2 px-4 rounded hover:bg-gray-100" onClick={() => setIsOpen(false)}>About Us</Link>
            <Link to="/contact" className="text-sawmill-dark-brown hover:text-sawmill-orange font-medium py-2 px-4 rounded hover:bg-gray-100" onClick={() => setIsOpen(false)}>Contact</Link>
            <Button className="bg-sawmill-orange hover:bg-sawmill-auburn text-white w-full" onClick={() => {handleGetQuote(); setIsOpen(false);}}>Get Quote</Button>
            <Link to="/admin" onClick={() => {handleAdminAccess(); setIsOpen(false);}}>
              <Button 
                variant="outline" 
                className="border-sawmill-dark-brown text-sawmill-dark-brown hover:bg-sawmill-dark-brown hover:text-white w-full"
              >
                <ShieldCheck className="mr-2 h-4 w-4" />
                Admin
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
