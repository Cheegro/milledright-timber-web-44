
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewsletterSubscription from './NewsletterSubscription';
import SocialMediaLinks from './SocialMediaLinks';
import { fetchProductCategories } from '@/api/productApi';
import { fetchRecentBlogPosts } from '@/api/blogApi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [productCategories, setProductCategories] = useState<any[]>([]);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await fetchProductCategories();
        setProductCategories(categories);
      } catch (error) {
        console.error('Error loading product categories:', error);
      }
    };
    
    const loadRecentPosts = async () => {
      try {
        const posts = await fetchRecentBlogPosts(3);
        setRecentPosts(posts);
      } catch (error) {
        console.error('Error loading recent blog posts:', error);
      }
    };
    
    loadCategories();
    loadRecentPosts();
  }, []);
  
  return (
    <footer className="bg-sawmill-dark-brown text-white relative z-10">
      <div className="container-wide py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4 border-b border-sawmill-medium-brown pb-2">MilledRight Sawmill</h3>
            <p className="mb-4">Premium quality lumber and custom milling services for professional and hobbyist woodworkers.</p>
            <div className="space-y-2">
              <p className="flex items-center">
                <span className="font-bold mr-2">Call Us:</span> 
                <a href="tel:4378980642" className="hover:text-sawmill-light-brown transition-colors cursor-pointer">
                  (437) 898-0642
                </a>
              </p>
              <p className="flex items-center">
                <span className="font-bold mr-2">Alternative:</span> 
                <a href="tel:9057173474" className="hover:text-sawmill-light-brown transition-colors cursor-pointer">
                  (905) 717-3474
                </a>
              </p>
              <p className="flex items-center">
                <span className="font-bold mr-2">Email:</span> 
                <a href="mailto:Lucas@Flamingfirewood.ca" className="hover:text-sawmill-light-brown transition-colors cursor-pointer">
                  Lucas@Flamingfirewood.ca
                </a>
              </p>
              <p className="flex items-center">
                <span className="font-bold mr-2">Address:</span> 16720 Hwy 48, Whitchurch-Stouffville, ON
              </p>
            </div>
            
            {/* Social Media Links */}
            <div className="mt-4">
              <SocialMediaLinks showLabels />
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-sawmill-medium-brown pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="hover:text-sawmill-light-brown transition-colors cursor-pointer block py-1"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="hover:text-sawmill-light-brown transition-colors cursor-pointer block py-1"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/gallery" 
                  className="hover:text-sawmill-light-brown transition-colors cursor-pointer block py-1"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="hover:text-sawmill-light-brown transition-colors cursor-pointer block py-1"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="hover:text-sawmill-light-brown transition-colors cursor-pointer block py-1"
                >
                  About Us
                </Link>
              </li>
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
                    className="hover:text-sawmill-light-brown transition-colors cursor-pointer block py-1"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Recent Blog Posts */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-sawmill-medium-brown pb-2">Latest Blog Posts</h3>
            <ul className="space-y-3">
              {recentPosts.map((post) => (
                <li key={post.id}>
                  <Link 
                    to={`/blog/${post.id}`} 
                    className="hover:text-sawmill-light-brown transition-colors block cursor-pointer py-1"
                  >
                    <h4 className="text-sm font-medium line-clamp-2">{post.title}</h4>
                    <p className="text-xs text-sawmill-light-brown mt-1">
                      {new Date(post.published_at).toLocaleDateString()}
                    </p>
                  </Link>
                </li>
              ))}
              {recentPosts.length === 0 && (
                <li className="text-sm text-sawmill-light-brown">No recent posts</li>
              )}
            </ul>
            <Link 
              to="/blog" 
              className="inline-block mt-3 text-sm text-sawmill-orange hover:text-sawmill-light-brown transition-colors cursor-pointer py-1"
            >
              View All Posts →
            </Link>
          </div>
        </div>
        
        {/* Newsletter Subscription */}
        <div className="mt-8 pt-6 border-t border-sawmill-medium-brown">
          <NewsletterSubscription variant="footer" />
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-sawmill-medium-brown text-center md:flex md:justify-between">
          <p>© {currentYear} MilledRight Sawmill. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link 
              to="/terms" 
              className="hover:text-sawmill-light-brown transition-colors cursor-pointer"
            >
              Terms of Service
            </Link>
            <Link 
              to="/privacy" 
              className="hover:text-sawmill-light-brown transition-colors cursor-pointer"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
