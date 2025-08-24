import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AutoRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');

    if (token && userString) {
      try {
        const user = JSON.parse(userString);
        
        // Redirect based on user role
        if (user.role === 'photographer') {
          navigate('/photographer/dashboard', { replace: true });
        } else if (user.role === 'user') {
          navigate('/dashboard', { replace: true });
        } else {
          // If role is unknown, stay on landing page
          console.warn('Unknown user role:', user.role);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        // If user data is corrupted, clear it
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    // If not logged in, stay on the UserTypeSelector page
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default AutoRedirect;
