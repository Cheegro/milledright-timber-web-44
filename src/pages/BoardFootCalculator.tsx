
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import BoardFootCalculator from '@/components/calculator/BoardFootCalculator';
import BoardFootEducation from '@/components/calculator/BoardFootEducation';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BoardFootCalculatorPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Industrial background pattern */}
      <div className="absolute inset-0 industrial-grid opacity-20"></div>
      <div className="absolute inset-0 renegade-texture"></div>
      
      <SEOHead 
        title="Free Board Foot Calculator - Accurate Lumber Volume Calculator"
        description="Calculate board feet instantly with our free, easy-to-use lumber calculator. Multiple pieces, price estimates, and educational content included. Perfect for woodworkers and contractors."
        keywords="board foot calculator, lumber calculator, wood calculator, board feet, lumber volume, woodworking calculator, lumber pricing"
      />
      
      <Header />
      
      <main className="flex-1 relative z-10">
        {/* Main Calculator Section */}
        <section className="py-8 md:py-12">
          <div className="container-wide">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-5xl font-black text-gray-100 mb-4 tracking-wide">
                <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  BOARD FOOT CALCULATOR
                </span>
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-red-600 to-orange-600 mx-auto mb-6 rounded-full"></div>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                The most <span className="text-red-400 font-bold">advanced</span> and feature-rich lumber calculator available. 
                Calculate board feet, estimate costs, and manage multiple pieces with <span className="text-orange-400 font-bold">precision</span>.
              </p>
            </div>
            <BoardFootCalculator />
          </div>
        </section>

        {/* Education Section */}
        <section className="py-16 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-orange-900/10"></div>
          <div className="container-wide relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-100 mb-4 tracking-wide">
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  MASTER BOARD FOOT CALCULATIONS
                </span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-orange-600 to-red-600 mx-auto mb-6 rounded-full"></div>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Understanding board feet is <span className="text-orange-400 font-bold">essential</span> for accurate lumber purchasing and project planning
              </p>
            </div>
            <BoardFootEducation />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 animate-industrial-pulse"></div>
            <div className="absolute bottom-0 right-0 w-full h-2 bg-gradient-to-l from-red-600 via-orange-500 to-yellow-500 animate-industrial-pulse"></div>
          </div>
          
          <div className="container-wide relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-wide">
                <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent renegade-text-shadow">
                  NEED QUALITY LUMBER FOR YOUR PROJECT?
                </span>
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-red-600 to-orange-600 mx-auto mb-8 rounded-full"></div>
              <p className="text-xl mb-8 text-gray-300 leading-relaxed">
                <span className="text-orange-400 font-bold">MilledRight Sawmill</span> provides premium lumber and custom milling services in the 
                <span className="text-red-400 font-bold"> Whitchurch-Stouffville</span> area. From live edge slabs to dimensional lumber, 
                <span className="text-yellow-400 font-bold"> we've got you covered</span>.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Button 
                  size="lg" 
                  className="renegade-button text-lg px-8 py-4"
                >
                  <Link to="/products" className="flex items-center gap-2">
                    BROWSE OUR LUMBER
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-2 border-red-500 text-red-400 hover:bg-red-500 hover:text-white font-bold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Link to="/contact" className="flex items-center gap-2">
                    REQUEST A QUOTE
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BoardFootCalculatorPage;
