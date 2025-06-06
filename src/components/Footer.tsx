
import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Zap, Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import SocialMediaLinks from './SocialMediaLinks';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const renegadeLinks = [
    { name: 'Rebel Lumber', path: '/products' },
    { name: 'Our Rebellion', path: '/about' },
    { name: 'Renegade Gallery', path: '/gallery' },
    { name: 'Contact Outlaws', path: '/contact' },
    { name: 'Lumber Calculator', path: '/board-foot-calculator' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* Industrial background elements */}
      <div className="absolute inset-0 industrial-grid opacity-20"></div>
      <div className="absolute inset-0 renegade-texture"></div>
      
      {/* Animated top accent line */}
      <div className="h-2 w-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 animate-industrial-pulse"></div>
      
      <div className="container-wide py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg animate-renegade-glow">
                <Flame className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-wider">
                  <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                    MILLEDRIGHT SAWMILL
                  </span>
                </h3>
                <p className="text-sm text-gray-400 font-bold tracking-widest">RENEGADE LUMBER REBELLION</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              <span className="text-red-400 font-bold">Defying mediocrity</span> since day one. 
              We're the renegades who betrayed ordinary lumber to forge a path of 
              <span className="text-orange-400 font-bold"> uncompromising quality</span> 
              in Whitchurch-Stouffville.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="h-5 w-5 text-red-500 flex-shrink-0" />
                <span>16720 Hwy 48, Whitchurch-Stouffville, ON</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <span>(905) 555-MILL</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                <span>rebels@milledright.ca</span>
              </div>
            </div>
          </div>

          {/* Renegade Navigation */}
          <div>
            <h4 className="text-xl font-black mb-6 tracking-wide">
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                REBEL NAVIGATION
              </span>
            </h4>
            <ul className="space-y-3">
              {renegadeLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-red-400 transition-colors duration-300 font-medium flex items-center gap-2 group"
                  >
                    <Zap className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Renegade Social */}
          <div>
            <h4 className="text-xl font-black mb-6 tracking-wide">
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                JOIN THE REBELLION
              </span>
            </h4>
            
            <p className="text-gray-300 mb-6 text-sm">
              Follow our renegade journey and see the lumber revolution in action.
            </p>
            
            <div className="flex gap-4 mb-6">
              <a 
                href="#" 
                className="p-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg hover:scale-110 transition-all duration-300 group"
              >
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a 
                href="#" 
                className="p-3 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-lg hover:scale-110 transition-all duration-300 group"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
            </div>
            
            <div className="renegade-card p-4">
              <p className="text-sm font-bold text-red-400 mb-2">REBEL HOURS:</p>
              <p className="text-xs text-gray-300">Mon-Fri: 7AM-5PM</p>
              <p className="text-xs text-gray-300">Sat: 8AM-3PM</p>
              <p className="text-xs text-gray-300">Sun: By appointment only</p>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} <span className="font-bold text-red-400">MilledRight Sawmill</span> 
              - All rights reserved to the lumber rebellion
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-red-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-orange-400 transition-colors">
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
