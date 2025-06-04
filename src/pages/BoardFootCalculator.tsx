
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import BoardFootCalculator from '@/components/calculator/BoardFootCalculator';
import BoardFootEducation from '@/components/calculator/BoardFootEducation';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const BoardFootCalculatorPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Free Board Foot Calculator - Accurate Lumber Volume Calculator"
        description="Calculate board feet instantly with our free, easy-to-use lumber calculator. Multiple pieces, price estimates, and educational content included. Perfect for woodworkers and contractors."
        keywords="board foot calculator, lumber calculator, wood calculator, board feet, lumber volume, woodworking calculator, lumber pricing"
      />
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-sawmill-dark-brown to-sawmill-medium-brown text-white py-20">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Board Foot Calculator
              </h1>
              <p className="text-xl mb-8 text-sawmill-light-brown">
                Calculate lumber volume and pricing instantly with our professional-grade board foot calculator. 
                Perfect for contractors, woodworkers, and lumber buyers.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-sawmill-orange hover:bg-sawmill-auburn text-white"
                >
                  <Link to="#calculator" className="flex items-center gap-2">
                    Start Calculating
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white hover:text-sawmill-dark-brown"
                >
                  <Link to="/contact">Need Custom Lumber?</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section id="calculator" className="py-20 bg-gray-50">
          <div className="container-wide">
            <BoardFootCalculator />
          </div>
        </section>

        {/* Education Section */}
        <section className="py-20">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-sawmill-dark-brown mb-4">
                Learn About Board Feet
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Understanding board feet is essential for accurate lumber purchasing and project planning
              </p>
            </div>
            <BoardFootEducation />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-sawmill-dark-brown text-white">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Need Quality Lumber for Your Project?
              </h2>
              <p className="text-xl mb-8 text-sawmill-light-brown">
                MilledRight Sawmill provides premium lumber and custom milling services in the 
                Whitchurch-Stouffville area. From live edge slabs to dimensional lumber, we've got you covered.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-sawmill-orange hover:bg-sawmill-auburn text-white"
                >
                  <Link to="/products">Browse Our Lumber</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white hover:text-sawmill-dark-brown"
                >
                  <Link to="/contact">Request a Quote</Link>
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
