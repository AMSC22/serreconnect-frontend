import React from 'react';
import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    // Simulation d’envoi d’e-mail (mocké)
    if (email) {
      setMessage('Un e-mail de réinitialisation a été envoyé (simulation).');
    } else {
      setError('Veuillez entrer une adresse e-mail.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Réinitialiser le mot de passe
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-600 text-sm">{message}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Envoyer l’e-mail de réinitialisation
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-700">
          <p>
            Retour à la{' '}
            <Link to="/login" className="text-green-600 hover:underline">
              connexion
            </Link>
          </p>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>
            <Link to="/terms" className="text-green-600 hover:underline">
              Conditions d’utilisation
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
    </div>
  );
};

export default ForgotPassword;