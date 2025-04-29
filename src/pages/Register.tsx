import React from 'react';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (data: {
    username?: string;
    email: string;
    password: string;
  }) => {
    const success = await register(data.username || "", data.email, data.password);
    if (success) {
      navigate('/');
    }
    return success;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthForm mode="register" onSubmit={handleRegister} />
    </div>
  );
};

export default Register;