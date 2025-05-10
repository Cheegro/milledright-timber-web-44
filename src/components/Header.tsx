
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          <Button className="bg-sawmill-orange hover:bg-sawmill-auburn text-white">Get Quote</Button>
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
            <Button className="bg-sawmill-orange hover:bg-sawmill-auburn text-white w-full">Get Quote</Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
