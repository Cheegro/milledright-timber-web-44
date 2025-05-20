
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAdminAuth = (requireAuth: boolean = true) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('adminAuthenticated') === 'true';
      setIsAuthenticated(auth);
      
      if (requireAuth && !auth) {
        // Redirect to login if not authenticated and auth is required
        navigate('/admin/login');
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate, requireAuth]);

  const logout = () => {
    localStorage.removeItem('adminAuthenticated');
    setIsAuthenticated(false);
    navigate('/admin/login');
  };

  return { isAuthenticated, isLoading, logout };
};
