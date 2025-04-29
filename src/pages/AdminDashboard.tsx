import React, { useState } from 'react';
import { Users, BarChart } from 'lucide-react';

const AdminDashboard = () => {
  // Données mockées pour les utilisateurs
  const [users, setUsers] = useState([
    { id: '1', username: 'admin', email: 'admin@example.com', isAdmin: true },
    { id: '2', username: 'user1', email: 'user1@example.com', isAdmin: false },
    { id: '3', username: 'user2', email: 'user2@example.com', isAdmin: false },
  ]);

  // Données mockées pour les statistiques
  const stats = {
    totalUsers: users.length,
    totalGreenhouses: 5,
    alertsLast24h: 10,
  };

  const handleDeleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-600">Tableau de bord administrateur</h1>
      {/* Statistiques */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
          <BarChart className="w-6 h-6 text-green-600 mr-2" />
          Statistiques
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-gray-700 font-semibold">Utilisateurs</p>
            <p className="text-2xl text-green-600">{stats.totalUsers}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-gray-700 font-semibold">Serres</p>
            <p className="text-2xl text-green-600">{stats.totalGreenhouses}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-gray-700 font-semibold">Alertes (24h)</p>
            <p className="text-2xl text-green-600">{stats.alertsLast24h}</p>
          </div>
        </div>
      </div>
      {/* Gestion des utilisateurs */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
          <Users className="w-6 h-6 text-green-600 mr-2" />
          Gestion des utilisateurs
        </h2>
        <div className="space-y-4">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                className="flex justify-between items-center p-2 bg-gray-50 rounded-md"
              >
                <div>
                  <p className="text-gray-700">{user.username}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-sm text-gray-500">
                    {user.isAdmin ? 'Administrateur' : 'Utilisateur'}
                  </p>
                </div>
                {!user.isAdmin && (
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                  >
                    Supprimer
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">Aucun utilisateur.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;