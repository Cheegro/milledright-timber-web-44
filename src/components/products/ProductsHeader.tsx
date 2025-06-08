
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductsHeaderProps {
  totalProducts: number;
}

const ProductsHeader = ({ totalProducts }: ProductsHeaderProps) => {
  return (
    <section className="relative bg-gradient-to-br from-sawmill-dark-brown via-sawmill-medium-brown to-sawmill-auburn text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-sawmill-orange rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-sawmill-light-brown rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-wide py-20 md:py-28 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Premium Lumber Products
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed max-w-3xl mx-auto">
            Discover our carefully selected collection of premium lumber, from live edge slabs to dimensional lumber, all milled with precision and care.
          </p>
          
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-sm font-medium">{totalProducts} Products Available</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsHeader;
