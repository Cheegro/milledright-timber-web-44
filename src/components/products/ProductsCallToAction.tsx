
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ProductsCallToAction = () => {
  return (
    <div className="bg-sawmill-light-brown/20 py-12">
      <div className="container-wide text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Looking for Custom Lumber?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          We offer custom milling services for unique projects. Tell us your specifications and we'll create the perfect piece for your needs.
        </p>
        <Button size="lg" className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown">
          <Link to="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  );
};

export default ProductsCallToAction;
