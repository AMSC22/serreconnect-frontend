import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { greenhouseService } from '../services/greenhouse_service';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string>('');

  const handleLogin = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    setServerError('');
    try {
      const response = await login(data.email, data.password);
      
      // Vérifier si l'utilisateur a des serres
      const greenhouses = await greenhouseService.getGreenhousesByUserId(response.user.id);
      const redirectPath = response.user.is_admin ? '/admin' : '/';
      navigate(redirectPath, { replace: true });
      return true;
    } catch (error: any) {
      let errorMessage = 'Une erreur est survenue lors de la connexion';
      
      if (error.response) {
        // Erreur HTTP avec réponse
        switch (error.response.status) {
          case 401:
            errorMessage = 'Email ou mot de passe incorrect';
            break;
          case 403:
            errorMessage = 'Compte non activé. Vérifiez vos emails.';
            break;
          case 500:
            errorMessage = 'Problème serveur. Veuillez réessayer plus tard.';
            break;
          default:
            errorMessage = `Erreur ${error.response.status}: ${error.response.data?.message || errorMessage}`;
        }
      } else if (error.request) {
        // La requête a été faite mais aucune réponse n'a été reçue
        errorMessage = 'Serveur injoignable. Vérifiez votre connexion internet.';
      } else {
        // Erreur lors de la configuration de la requête
        errorMessage = 'Erreur de configuration: ' + error.message;
      }
      
      setServerError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthForm 
        mode="login" 
        onSubmit={handleLogin} 
        isLoading={isLoading}
        serverError={serverError}
      />
    </div>
  );
};

export default Login;