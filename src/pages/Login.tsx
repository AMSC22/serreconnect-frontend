import React from 'react';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { greenhouseService } from '../services/greenhouse_service';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      console.log('Login: tentative de connexion', data.email);
      const response = await login(data.email, data.password);
      console.log('Login: connexion réussie', response.user);

      // Vérifier si l'utilisateur a des serres
      const greenhouses = await greenhouseService.getGreenhousesByUserId(response.user.id);
      const redirectPath = response.user.is_admin ? '/admin' : '/';
      console.log('Login: redirection vers', redirectPath);
      navigate(redirectPath, { replace: true });
      return true;
    } catch (error) {
      console.error('Login: erreur lors de la connexion', error);
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