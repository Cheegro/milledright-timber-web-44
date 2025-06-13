
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BottomCTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-background to-card text-foreground">
      <div className="container-wide text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Ready to Start Your Wood Project?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto text-muted-foreground">
          Visit our sawmill to browse our selection of quality lumber or discuss your custom milling needs.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/products">Browse Products</Link>
          </Button>
          <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BottomCTASection;
