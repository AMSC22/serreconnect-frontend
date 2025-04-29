import React from 'react';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      console.log('Tentative de connexion avec:', data);
      const user = await login(data.email, data.password);
      if (user) {
        console.log('Connexion réussie, user =', user);
        // Rediriger vers /admin si l'utilisateur est admin, sinon vers /
        const redirectPath = user.isAdmin ? '/admin' : '/';
        console.log('Redirection vers', redirectPath);
        navigate(redirectPath, { replace: true });
        return true;
      } else {
        console.log('Échec de la connexion');
        return false;
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      return false;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthForm mode="login" onSubmit={handleLogin} />
    </div>
  );
};

export default Login;