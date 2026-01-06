import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isValid, setIsValid] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      setIsValid(false);
      setIsChecking(false);
      return;
    }
    
    // Decode JWT to check expiration
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      
      if (isExpired) {
        console.log('Token expired, logging out...');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } catch (error) {
      console.error('Invalid token:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setIsValid(false);
    }
    
    setIsChecking(false);
  }, []);
  
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sage"></div>
      </div>
    );
  }
  
  if (!isValid) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;