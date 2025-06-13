
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const MiddleCTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
      <div className="container-wide text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Custom Milling Services Available</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
          Have logs that need milling? Bring them to us and we'll transform them into beautiful, usable lumber to your specifications.
        </p>
        <Button size="lg" className="bg-background text-foreground hover:bg-secondary">
          <Link to="/contact">Request Custom Milling Quote</Link>
        </Button>
      </div>
    </section>
  );
};

export default MiddleCTASection;
