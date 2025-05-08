import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { greenhouseService } from '../services/greenhouse_service';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (data: LoginFormData | RegisterFormData): Promise<boolean> => {
    // Vérifier que data est un RegisterFormData
    if (!('username' in data)) {
      setError("Le nom d'utilisateur est requis pour l'inscription");
      return false;
    }

    try {
      const user = await register(data.username, data.email, data.password);
      // Vérifier si l'utilisateur a des serres
      const greenhouses = await greenhouseService.getGreenhousesByUserId(user.id);
      navigate('/', { replace: true });
      return true;
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'inscription");
      return false;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <AuthForm mode="register" onSubmit={handleRegister} />
    </div>
  );
};

export default Register;