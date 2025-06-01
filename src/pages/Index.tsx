
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Immediately redirect to /home
    navigate('/home', { replace: true });
  }, [navigate]);

  // Show a simple loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sawmill-dark-brown"></div>
    </div>
  );
};

export default Index;
