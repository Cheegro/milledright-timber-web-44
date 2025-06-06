
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, TreePine, Hammer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const sawmillNavItems = [
    { name: 'HOME', path: '/', icon: '🏠' },
    { name: 'LUMBER', path: '/products', icon: '🌲' },
    { name: 'GALLERY', path: '/gallery', icon: '📸' },
    { name: 'ABOUT US', path: '/about', icon: '🔨' },
    { name: 'CONTACT', path: '/contact', icon: '📞' },
    { name: 'CALCULATOR', path: '/board-foot-calculator', icon: '🧮' },
  ];

  const isActivePath = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-gradient-to-r from-sawmill-dark-brown via-black to-sawmill-dark-gray text-white sticky top-0 z-50 border-b-2 border-sawmill-orange shadow-2xl">
      {/* Animated top accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-sawmill-bark via-sawmill-orange to-sawmill-amber animate-industrial-pulse"></div>
      
      <div className="container-wide">
        <div className="flex items-center justify-between py-4">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="p-3 bg-gradient-to-r from-sawmill-bark to-sawmill-orange rounded-lg transform group-hover:scale-110 transition-all duration-300 animate-sawmill-glow">
                <TreePine className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-sawmill-amber rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-wider">
                <span className="bg-gradient-to-r from-sawmill-light-brown via-sawmill-orange to-sawmill-amber bg-clip-text text-transparent">
                  MILLEDRIGHT
                </span>
              </h1>
              <p className="text-xs text-gray-400 font-bold tracking-widest">PREMIUM SAWMILL</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {sawmillNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-bold text-sm tracking-wide transition-all duration-300 relative group ${
                  isActivePath(item.path)
                    ? 'bg-gradient-to-r from-sawmill-bark to-sawmill-orange text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-sawmill-dark-gray'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
                {isActivePath(item.path) && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-sawmill-amber to-sawmill-orange"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-3 bg-gradient-to-r from-sawmill-bark to-sawmill-orange rounded-lg hover:scale-110 transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-gradient-to-br from-sawmill-dark-brown to-black border-t border-sawmill-steel overflow-hidden"
          >
            <div className="container-wide py-6">
              <nav className="space-y-3">
                {sawmillNavItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center px-6 py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
                        isActivePath(item.path)
                          ? 'bg-gradient-to-r from-sawmill-bark to-sawmill-orange text-white shadow-lg'
                          : 'text-gray-300 hover:text-white hover:bg-sawmill-dark-gray'
                      }`}
                    >
                      <span className="mr-3 text-xl">{item.icon}</span>
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="pt-6 border-t border-sawmill-steel"
                >
                  <Button 
                    className="w-full sawmill-button text-lg py-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to="/contact" className="flex items-center justify-center gap-2">
                      <Hammer className="h-5 w-5" />
                      START YOUR PROJECT
                    </Link>
                  </Button>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
