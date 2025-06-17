
import React from 'react';
import SEOHead from '@/components/SEOHead';
import BoardFootCalculator from '@/components/calculator/BoardFootCalculator';
import BoardFootEducation from '@/components/calculator/BoardFootEducation';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BoardFootCalculatorPage = () => {
  return (
    <>
      <SEOHead 
        title="Free Board Foot Calculator - Accurate Lumber Volume Calculator"
        description="Calculate board feet instantly with our free, easy-to-use lumber calculator. Multiple pieces, price estimates, and educational content included. Perfect for woodworkers and contractors."
        keywords="board foot calculator, lumber calculator, wood calculator, board feet, lumber volume, woodworking calculator, lumber pricing"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        {/* Industrial background pattern */}
        <div className="absolute inset-0 industrial-grid opacity-20"></div>
        <div className="absolute inset-0 renegade-texture"></div>
        
        <main className="relative z-10">
          {/* Main Calculator Section - Fixed Header */}
          <section className="py-8 md:py-12 pt-24 md:pt-28">
            <div className="container-wide">
              <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-100 mb-4 tracking-wide px-4">
                  <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                    BOARD FOOT CALCULATOR
                  </span>
                </h1>
                <div className="h-1 w-32 bg-gradient-to-r from-red-600 to-orange-600 mx-auto mb-6 rounded-full"></div>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
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
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-100 mb-4 tracking-wide px-4">
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    MASTER BOARD FOOT CALCULATIONS
                  </span>
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-orange-600 to-red-600 mx-auto mb-6 rounded-full"></div>
                <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-4">
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
              <div className="max-w-3xl mx-auto text-center px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 tracking-wide">
                  <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent renegade-text-shadow">
                    NEED QUALITY LUMBER FOR YOUR PROJECT?
                  </span>
                </h2>
                <div className="h-1 w-32 bg-gradient-to-r from-red-600 to-orange-600 mx-auto mb-8 rounded-full"></div>
                <p className="text-lg sm:text-xl mb-8 text-gray-300 leading-relaxed">
                  <span className="text-orange-400 font-bold">MilledRight Sawmill</span> provides premium lumber and custom milling services in the 
                  <span className="text-red-400 font-bold"> Whitchurch-Stouffville</span> area. From live edge slabs to dimensional lumber, 
                  <span className="text-yellow-400 font-bold"> we've got you covered</span>.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                  <Button 
                    size="lg" 
                    className="renegade-button text-lg px-8 py-4 w-full sm:w-auto"
                  >
                    <Link to="/products" className="flex items-center justify-center gap-2 w-full">
                      BROWSE OUR LUMBER
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-transparent border-2 border-red-500 text-red-400 hover:bg-red-500 hover:text-white font-bold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                  >
                    <Link to="/contact" className="flex items-center justify-center gap-2 w-full">
                      REQUEST A QUOTE
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default BoardFootCalculatorPage;
