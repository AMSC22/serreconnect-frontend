import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
    console.log('AdminRoute: composant invoqué');
  const { user } = useAuth();
  console.log('AdminRoute: vérification de l’accès admin, user =', user);

  if (!user) {
    console.log('Utilisateur non connecté, redirection vers /login');
    return <Navigate to="/login" replace />;
  }

  if (!user.isAdmin) {
    console.log('Utilisateur non admin, redirection vers /');
    return <Navigate to="/" replace />;
  }
  console.log('AdminRoute: utilisateur admin, rendu de', children);
  return <>{children}</>;
};

export default AdminRoute;