
import React from 'react';
import { Link } from 'react-router-dom';
import { TreePine, Hammer, Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import SocialMediaLinks from './SocialMediaLinks';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const sawmillLinks = [
    { name: 'Premium Lumber', path: '/products' },
    { name: 'About Our Sawmill', path: '/about' },
    { name: 'Project Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Lumber Calculator', path: '/board-foot-calculator' },
  ];

  return (
    <footer className="bg-gradient-to-br from-sawmill-dark-brown via-black to-sawmill-dark-gray text-white relative overflow-hidden">
      {/* Industrial background elements */}
      <div className="absolute inset-0 industrial-grid opacity-20"></div>
      <div className="absolute inset-0 sawmill-texture"></div>
      
      {/* Animated top accent line */}
      <div className="h-2 w-full bg-gradient-to-r from-sawmill-bark via-sawmill-orange to-sawmill-amber animate-industrial-pulse"></div>
      
      <div className="container-wide py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-sawmill-bark to-sawmill-orange rounded-lg animate-sawmill-glow">
                <TreePine className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-wider">
                  <span className="bg-gradient-to-r from-sawmill-light-brown via-sawmill-orange to-sawmill-amber bg-clip-text text-transparent">
                    MILLEDRIGHT SAWMILL
                  </span>
                </h3>
                <p className="text-sm text-gray-400 font-bold tracking-widest">PREMIUM LUMBER EXCELLENCE</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              <span className="text-sawmill-orange font-bold">Elevating craftsmanship</span> since day one. 
              We're the sawmill that chose <span className="text-sawmill-amber font-bold">quality over quantity</span> 
              to forge a path of uncompromising excellence in Whitchurch-Stouffville.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="h-5 w-5 text-sawmill-orange flex-shrink-0" />
                <span>16720 Hwy 48, Whitchurch-Stouffville, ON</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="h-5 w-5 text-sawmill-amber flex-shrink-0" />
                <span>(905) 555-MILL</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="h-5 w-5 text-sawmill-sage flex-shrink-0" />
                <span>info@milledright.ca</span>
              </div>
            </div>
          </div>

          {/* Sawmill Navigation */}
          <div>
            <h4 className="text-xl font-black mb-6 tracking-wide">
              <span className="bg-gradient-to-r from-sawmill-orange to-sawmill-amber bg-clip-text text-transparent">
                SAWMILL SERVICES
              </span>
            </h4>
            <ul className="space-y-3">
              {sawmillLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-sawmill-orange transition-colors duration-300 font-medium flex items-center gap-2 group"
                  >
                    <Hammer className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-xl font-black mb-6 tracking-wide">
              <span className="bg-gradient-to-r from-sawmill-amber to-sawmill-sage bg-clip-text text-transparent">
                VISIT OUR SAWMILL
              </span>
            </h4>
            
            <p className="text-gray-300 mb-6 text-sm">
              Experience premium lumber firsthand. See our sawmill operation and craftsmanship in action.
            </p>
            
            <div className="flex gap-4 mb-6">
              <a 
                href="#" 
                className="p-3 bg-gradient-to-r from-sawmill-bark to-sawmill-orange rounded-lg hover:scale-110 transition-all duration-300 group"
              >
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a 
                href="#" 
                className="p-3 bg-gradient-to-r from-sawmill-orange to-sawmill-amber rounded-lg hover:scale-110 transition-all duration-300 group"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
            </div>
            
            <div className="sawmill-card p-4">
              <p className="text-sm font-bold text-sawmill-orange mb-2">SAWMILL HOURS:</p>
              <p className="text-xs text-gray-300">Mon-Fri: 7AM-5PM</p>
              <p className="text-xs text-gray-300">Sat: 8AM-3PM</p>
              <p className="text-xs text-gray-300">Sun: By appointment only</p>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-sawmill-steel mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} <span className="font-bold text-sawmill-orange">MilledRight Sawmill</span> 
              - All rights reserved to premium lumber excellence
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-sawmill-orange transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-sawmill-amber transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
