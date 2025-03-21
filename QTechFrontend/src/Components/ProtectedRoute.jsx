import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './AuthContext';

const ProtectedRoute = ({ roles }) => {
  const { isLogged, role, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  // Uncomment this if you want to restrict access based on roles
  if (roles && !roles.includes(role)) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
