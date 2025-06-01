
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewsletterSubscription from './NewsletterSubscription';
import SocialMediaLinks from './SocialMediaLinks';
import { fetchProductCategories } from '@/api/productApi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [productCategories, setProductCategories] = useState<any[]>([]);
  
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await fetchProductCategories();
        setProductCategories(categories);
      } catch (error) {
        console.error('Error loading product categories:', error);
      }
    };
    
    loadCategories();
  }, []);
  
  return (
    <footer className="bg-sawmill-dark-brown text-white">
      <div className="container-wide py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-sawmill-medium-brown pb-2">MilledRight Sawmill</h3>
            <p className="mb-4">Premium quality lumber and custom milling services for professional and hobbyist woodworkers.</p>
            <p className="flex items-center">
              <span className="font-bold mr-2">Call Us:</span> (437) 898-0642
            </p>
            <p className="flex items-center mt-2">
              <span className="font-bold mr-2">Alternative:</span> (905) 717-3474
            </p>
            <p className="flex items-center mt-2">
              <span className="font-bold mr-2">Email:</span> Lucas@Flamingfirewood.ca
            </p>
            <p className="flex items-center mt-2">
              <span className="font-bold mr-2">Address:</span> 16720 Hwy 48, Whitchurch-Stouffville, ON
            </p>
            
            {/* Social Media Links */}
            <div className="mt-4">
              <SocialMediaLinks showLabels />
            </div>
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
          
          {/* Product Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-sawmill-medium-brown pb-2">Product Categories</h3>
            <ul className="space-y-2">
              {productCategories.map((category) => (
                <li key={category.id}>
                  <Link 
                    to={`/products?category=${encodeURIComponent(category.name)}`} 
                    className="hover:text-sawmill-light-brown transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <NewsletterSubscription variant="footer" />
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
