
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import NewsletterSubscription from './NewsletterSubscription';
import SocialMediaLinks from './SocialMediaLinks';
import { fetchProductCategories } from '@/api/productApi';
import { fetchRecentBlogPosts } from '@/api/blogApi';
import { toast } from "@/hooks/use-toast";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [productCategories, setProductCategories] = useState<any[]>([]);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await fetchProductCategories();
        setProductCategories(categories.slice(0, 5)); // Limit to 5 categories
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

  const handleAdminAccess = () => {
    toast({
      title: "Admin Dashboard",
      description: "Redirecting to admin dashboard..."
    });
  };
  
  return (
    <footer className="bg-gradient-to-br from-sawmill-dark-brown to-sawmill-medium-brown text-white relative z-10">
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-sawmill-orange to-sawmill-auburn text-white p-3 rounded-xl shadow-lg">
                <span className="font-bold text-xl tracking-tight">MR</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">MilledRight</h3>
                <p className="text-sawmill-light-brown text-sm">Sawmill Solutions</p>
              </div>
            </div>
            
            <p className="mb-6 text-gray-200 leading-relaxed">
              Premium quality lumber and custom milling services for professional and hobbyist woodworkers. From custom structures to live edge slabs, we handle all your wood needs.
            </p>
            
            <div className="bg-sawmill-orange/20 p-4 rounded-xl mb-6 border border-sawmill-orange/30">
              <h4 className="font-bold text-sawmill-orange mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Free Services Available
              </h4>
              <p className="text-sm mb-2 text-gray-200">We accept free lumber if you're getting rid of it!</p>
              <p className="text-sm text-gray-200">Have logs? We can work out a deal to mill some for you - no money transaction required.</p>
            </div>
            
            <SocialMediaLinks showLabels />
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white border-b border-sawmill-orange/30 pb-2">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-sawmill-orange mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Primary</p>
                  <a href="tel:4378980642" className="text-gray-200 hover:text-sawmill-orange transition-colors">
                    (437) 898-0642
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-sawmill-orange mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Alternative</p>
                  <a href="tel:9057173474" className="text-gray-200 hover:text-sawmill-orange transition-colors">
                    (905) 717-3474
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-sawmill-orange mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Email</p>
                  <a href="mailto:Lucas@Flamingfirewood.ca" className="text-gray-200 hover:text-sawmill-orange transition-colors">
                    Lucas@Flamingfirewood.ca
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sawmill-orange mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Location</p>
                  <p className="text-gray-200">16720 Hwy 48<br />Whitchurch-Stouffville, ON</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white border-b border-sawmill-orange/30 pb-2">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/products?category=Live%20Edge%20Slabs" 
                  className="text-gray-200 hover:text-sawmill-orange transition-colors block py-1 hover:translate-x-1 transform duration-200"
                >
                  Live Edge Slabs
                </Link>
              </li>
              <li>
                <Link 
                  to="/products?category=Dimensional%20Lumber" 
                  className="text-gray-200 hover:text-sawmill-orange transition-colors block py-1 hover:translate-x-1 transform duration-200"
                >
                  Dimensional Lumber
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="text-gray-200 hover:text-sawmill-orange transition-colors block py-1 hover:translate-x-1 transform duration-200"
                >
                  Custom Milling
                </Link>
              </li>
              <li>
                <Link 
                  to="/projects" 
                  className="text-gray-200 hover:text-sawmill-orange transition-colors block py-1 hover:translate-x-1 transform duration-200"
                >
                  Custom Structures
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-200 hover:text-sawmill-orange transition-colors block py-1 hover:translate-x-1 transform duration-200"
                >
                  Firewood Sales
                </Link>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-semibold text-white mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/gallery" className="text-gray-200 hover:text-sawmill-orange transition-colors text-sm">
                    Project Gallery
                  </Link>
                </li>
                <li>
                  <Link to="/board-foot-calculator" className="text-gray-200 hover:text-sawmill-orange transition-colors text-sm">
                    Board Foot Calculator
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-200 hover:text-sawmill-orange transition-colors text-sm">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Recent Blog Posts */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white border-b border-sawmill-orange/30 pb-2">Latest Updates</h3>
            <ul className="space-y-4">
              {recentPosts.map((post) => (
                <li key={post.id}>
                  <Link 
                    to={`/blog/${post.id}`} 
                    className="block group"
                  >
                    <h4 className="text-sm font-medium line-clamp-2 text-white group-hover:text-sawmill-orange transition-colors mb-1">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-300">
                      {new Date(post.published_at).toLocaleDateString()}
                    </p>
                  </Link>
                </li>
              ))}
              {recentPosts.length === 0 && (
                <li className="text-sm text-gray-300">No recent posts</li>
              )}
            </ul>
            <Link 
              to="/blog" 
              className="inline-flex items-center mt-4 text-sm text-sawmill-orange hover:text-white transition-colors group"
            >
              <span>View All Posts</span>
              <span className="ml-1 group-hover:translate-x-1 transform transition-transform">→</span>
            </Link>
          </div>
        </div>
        
        {/* Newsletter Subscription */}
        <div className="mt-10 pt-8 border-t border-sawmill-orange/30">
          <NewsletterSubscription variant="footer" />
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-10 pt-8 border-t border-sawmill-orange/30 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-gray-200">© {currentYear} MilledRight Sawmill. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link 
                to="/terms" 
                className="text-gray-300 hover:text-sawmill-orange transition-colors text-sm"
              >
                Terms of Service
              </Link>
              <Link 
                to="/privacy" 
                className="text-gray-300 hover:text-sawmill-orange transition-colors text-sm"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
          
          {/* Admin Access */}
          <div className="mt-4 md:mt-0">
            <Link to="/admin" onClick={handleAdminAccess}>
              <Button 
                variant="outline" 
                size="sm"
                className="border border-sawmill-orange/50 text-sawmill-orange hover:bg-sawmill-orange hover:text-white transition-all duration-300 rounded-lg font-medium bg-transparent"
              >
                <ShieldCheck className="mr-2 h-4 w-4" />
                Admin Access
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
