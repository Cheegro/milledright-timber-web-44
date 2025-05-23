
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-sawmill-dark-brown text-white">
      <div className="container-wide py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-sawmill-medium-brown pb-2">MilledRight Sawmill</h3>
            <p className="mb-4">Premium quality sawmill equipment and solutions for professional and hobbyist woodworkers.</p>
            <p className="flex items-center">
              <span className="font-bold mr-2">Call Us:</span> (437) 898-0642
            </p>
            <p className="flex items-center mt-2">
              <span className="font-bold mr-2">Alternative:</span> (905) 717-3474
            </p>
            <p className="flex items-center mt-2">
              <span className="font-bold mr-2">Address:</span> 16720 Hwy 48, Whitchurch-Stouffville, ON
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-sawmill-medium-brown pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-sawmill-light-brown transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-sawmill-light-brown transition-colors">Products</Link></li>
              <li><Link to="/gallery" className="hover:text-sawmill-light-brown transition-colors">Gallery</Link></li>
              <li><Link to="/blog" className="hover:text-sawmill-light-brown transition-colors">Blog</Link></li>
              <li><Link to="/about" className="hover:text-sawmill-light-brown transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          {/* Products */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-sawmill-medium-brown pb-2">Products</h3>
            <ul className="space-y-2">
              <li><Link to="/products/category/portable-sawmills" className="hover:text-sawmill-light-brown transition-colors">Portable Sawmills</Link></li>
              <li><Link to="/products/category/industrial-mills" className="hover:text-sawmill-light-brown transition-colors">Industrial Mills</Link></li>
              <li><Link to="/products/category/blades" className="hover:text-sawmill-light-brown transition-colors">Sawmill Blades</Link></li>
              <li><Link to="/products/category/accessories" className="hover:text-sawmill-light-brown transition-colors">Accessories</Link></li>
              <li><Link to="/products/category/parts" className="hover:text-sawmill-light-brown transition-colors">Parts & Maintenance</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-sawmill-medium-brown pb-2">Stay Updated</h3>
            <p className="mb-4">Subscribe to our newsletter for the latest products, tips, and promotions.</p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-sawmill-orange text-sawmill-dark-gray"
              />
              <button 
                type="submit" 
                className="bg-sawmill-orange hover:bg-sawmill-auburn transition-colors px-4 py-2 rounded font-bold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-sawmill-medium-brown text-center md:flex md:justify-between">
          <p>© {currentYear} MilledRight Sawmill. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-sawmill-light-brown mr-4">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-sawmill-light-brown">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
