import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { greenhouseService } from '../services/greenhouse_service';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const response = await login(data.email, data.password);
      
      // Vérifier si l'utilisateur a des serres
      const greenhouses = await greenhouseService.getGreenhousesByUserId(response.user.id);
      const redirectPath = response.user.is_admin ? '/admin' : '/';
      navigate(redirectPath, { replace: true });
      return true;
    } catch (error) {
      setError('Login: erreur lors de la connexion : ' + error);
      return false;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {error && <p className="text-red-500">{error}</p>}
      <AuthForm mode="login" onSubmit={handleLogin} />
    </div>
  );
};

export default Login;