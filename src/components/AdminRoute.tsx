import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.is_admin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;