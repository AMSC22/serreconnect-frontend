import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { badgeService } from '../services/badge_service';
import { Badge } from '../types/Badge';

const BadgesPage = () => {
  const { user } = useAuth();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await badgeService.getBadgesByUserId(user?.id || "");
        setBadges(response);
      } catch (err: any) {
        setError(err.message || 'Erreur lors de la récupération des badges');
      }
    };
    if (user?.id) {
      fetchBadges();
    }
  }, [user]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Gestion des Badges</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {badges.map((badge) => (
          <li key={badge.id} className="p-2 border-b">
            {badge.name} (Utilisateur: {badge.user_id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BadgesPage;