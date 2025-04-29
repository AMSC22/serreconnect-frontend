import React, { useState } from 'react';
import { User, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfileForm = () => {
  const { user, updateProfile } = useAuth();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    const success = await updateProfile(username, email);
    if (success) {
      setMessage('Profil mis à jour avec succès.');
    } else {
      setError('Échec de la mise à jour du profil.');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Modifier le profil</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-green-600" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nom d’utilisateur"
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>
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
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;