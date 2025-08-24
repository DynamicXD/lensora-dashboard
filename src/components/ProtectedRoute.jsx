import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  
  // Check if user is logged in
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token && token !== 'undefined' && token !== 'null';
  };

  // Get user role from localStorage
  const getUserRole = () => {
    try {
      const userString = localStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        return user.role;
      }
      return null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  };

  if (!isAuthenticated()) {
    // Redirect to user type selector if not logged in
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  const userRole = getUserRole();
  
  // If specific roles are required and user doesn't have permission
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redirect based on user role
    const defaultRoute = userRole === 'photographer' ? '/photographer/dashboard' : '/dashboard';
    return <Navigate to={defaultRoute} replace />;
  }

  return children;
};

export default ProtectedRoute;
