import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

interface AuthFormProps {
  mode: 'login' | 'register';
  onSubmit: (data: LoginFormData | RegisterFormData) => Promise<boolean>;
  isLoading?: boolean;
  serverError?: string;
}

const AuthForm = ({ mode, onSubmit, isLoading = false, serverError = '' }: AuthFormProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!acceptTerms) {
      setError("Vous devez accepter les conditions d'utilisation.");
      return;
    }
    try {
      const data = mode === 'login' ? { email, password } : { username, email, password };
      const success = await onSubmit(data);
      
      if (!success) {
        setError(
          mode === 'login' 
            ? 'Identifiants incorrects ou compte inexistant' 
            : 'Inscription échouée (email peut-être déjà utilisé)'
        );
      }
    } catch (err) {
      setError('Une erreur technique est survenue. Veuillez réessayer plus tard.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        {mode === 'login' ? 'Connexion' : 'Inscription'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'register' && (
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-green-600" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nom d'utilisateur"
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Mail className="w-5 h-5 text-green-600" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Adresse e-mail"
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <Lock className="w-5 h-5 text-green-600" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={acceptTerms}
            placeholder='M'
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="h-4 w-4 text-green-600 focus:ring-green-600 border-gray-300 rounded"
            required
          />
          <label className="text-sm text-gray-700">
            J'accepte les{' '}
            <Link to="/terms" className="text-green-600 hover:underline">
              conditions d'utilisation
            </Link>{' '}
            et la{' '}
            <Link to="/privacy" className="text-green-600 hover:underline">
              politique de confidentialité
            </Link>
          </label>
        </div>
        {(error || serverError) && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error || serverError}
          </div>
        )}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          disabled={isLoading}
        >
          {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {mode === 'login' ? 'Connexion...' : 'Inscription...'}
          </span>
        ) : (
          mode === 'login' ? 'Se connecter' : "S'inscrire"
        )}
        </button>
      </form>
      <div className="mt-4 text-center text-sm text-gray-700">
        {mode === 'login' ? (
          <>
            <p>
              <Link to="/forgot-password" className="text-green-600 hover:underline">
                Mot de passe oublié ?
              </Link>
            </p>
            <p className="mt-2">
              Pas de compte ?{' '}
              <Link to="/register" className="text-green-600 hover:underline">
                Créer un compte
              </Link>
            </p>
          </>
        ) : (
          <p>
            Déjà un compte ?{' '}
            <Link to="/login" className="text-green-600 hover:underline">
              Se connecter
            </Link>
          </p>
        )}
      </div>
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>
          <Link to="/terms" className="text-green-600 hover:underline">
            Conditions d'utilisation
          </Link>{' '}
          |{' '}
          <Link to="/privacy" className="text-green-600 hover:underline">
            Politique de confidentialité
          </Link>{' '}
          |{' '}
          <Link to="/faq" className="text-green-600 hover:underline">
            FAQ
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;