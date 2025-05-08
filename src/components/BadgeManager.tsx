import React from 'react';
import { Key } from 'lucide-react';
import { Badge } from '../types/Badge';
import { useState } from 'react';

interface BadgeManagerProps {
  badges: Badge[];
  onAddBadge: (name: string) => Promise<void>;
  onRemoveBadge: (id: string) => Promise<void>;
  error?: string | null;
}

const BadgeManager = ({ badges, onAddBadge, onRemoveBadge, error }: BadgeManagerProps) => {
  const [badgeName, setBadgeName] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (badgeName.trim()) {
      await onAddBadge(badgeName);
      setBadgeName('');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
        <Key className="w-6 h-6 text-green-600 mr-2" />
        Gestion des badges RFID
      </h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {/* Formulaire pour ajouter un badge */}
      <form onSubmit={handleAdd} className="mb-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={badgeName}
            onChange={(e) => setBadgeName(e.target.value)}
            placeholder="Nom du badge (ex. Employé 1)"
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Ajouter
          </button>
        </div>
      </form>
      {/* Liste des badges */}
      <div className="space-y-2">
        {badges.length > 0 ? (
          badges.map((badge) => (
            <div
              key={badge.id}
              className="flex justify-between items-center p-2 bg-gray-50 rounded-md"
            >
              <div>
                <p className="text-gray-700">{badge.name}</p>
                <p className="text-sm text-gray-500">
                  Ajouté le {new Date(badge.created_at).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => onRemoveBadge(badge.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
              >
                Supprimer
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Aucun badge enregistré.</p>
        )}
      </div>
    </div>
  );
};

export default BadgeManager;