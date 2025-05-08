import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  console.log('AdminRoute: composant invoqué');
  const { user, loading } = useAuth();
  console.log('AdminRoute: vérification de l’accès admin, user =', user, 'loading =', loading);

  if (loading) {
    console.log('AdminRoute: en attente de la vérification de l’utilisateur');
    return <div>Chargement...</div>;
  }

  if (!user) {
    console.log('AdminRoute: utilisateur non connecté, redirection vers /login');
    return <Navigate to="/login" replace />;
  }

  if (!user.is_admin) {
    console.log('AdminRoute: utilisateur non admin, redirection vers /');
    return <Navigate to="/" replace />;
  }

  console.log('AdminRoute: utilisateur admin, rendu de', children);
  return <>{children}</>;
};

export default AdminRoute;