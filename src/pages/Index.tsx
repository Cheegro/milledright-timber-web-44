
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from './Home';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to /home to show the proper homepage content
    navigate('/home', { replace: true });
  }, [navigate]);

  // Show the full home page content while redirecting
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Home />
      <Footer />
    </div>
  );
};

export default Index;
