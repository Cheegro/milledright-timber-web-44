
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const ProductsCallToAction = () => {
  return (
    <div className="relative bg-secondary/30 py-16">
      {/* Add wood grain pattern to background */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <pattern id="woodGrainPattern" patternUnits="userSpaceOnUse" width="200" height="200">
            <path d="M0 0 Q50 25 100 0 T200 0" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <path d="M0 10 Q50 35 100 10 T200 10" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <path d="M0 20 Q50 45 100 20 T200 20" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <path d="M0 30 Q50 55 100 30 T200 30" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <path d="M0 40 Q50 65 100 40 T200 40" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <path d="M0 50 Q50 75 100 50 T200 50" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <path d="M0 60 Q50 85 100 60 T200 60" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <path d="M0 70 Q50 95 100 70 T200 70" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <path d="M0 80 Q50 105 100 80 T200 80" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <path d="M0 90 Q50 115 100 90 T200 90" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <path d="M0 100 Q50 125 100 100 T200 100" stroke="currentColor" strokeWidth="0.5" fill="none" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#woodGrainPattern)" />
        </svg>
      </div>

      <div className="container-wide relative z-10">
        <div className="bg-card rounded-xl shadow-lg overflow-hidden border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <motion.div 
              className="p-8 lg:p-12"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Looking for Custom Lumber?</h2>
              <p className="mb-6 text-muted-foreground">
                We offer custom milling services for unique projects. Our experienced team can create the perfect piece for your needs, from precise dimensions to specialized finishes.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Custom Dimensions</h3>
                    <p className="text-sm text-muted-foreground">Precise cutting to your exact specifications</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Expert Selection</h3>
                    <p className="text-sm text-muted-foreground">Help choosing the perfect wood for your project</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Mill Your Own Logs</h3>
                    <p className="text-sm text-muted-foreground">Turn your trees into usable lumber</p>
                  </div>
                </div>
              </div>
              
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to="/contact" className="flex items-center">
                  Contact For Custom Milling
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </Link>
              </Button>
            </motion.div>
            
            <motion.div 
              className="bg-cover bg-center h-full min-h-[300px]"
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/pw/AP1GczMF-UwqDS0mzQhvKlZMMUqQjKwTeLsMs_9Y8SwdIC6a9h2vDZKec37odDn28R83IKXkMt7gvRsUIDIF0q6QJIrum2GSCsSeGQQjbUZVMcRypTv_=w2400')` }}
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            ></motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCallToAction;
