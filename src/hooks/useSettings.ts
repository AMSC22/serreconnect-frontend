import { useState, useEffect } from 'react';
import { settingsService } from '../services/settings_service';
import { badgeService } from '../services/badge_service';
import { Settings, SettingsUpdate } from '../types/Settings';
import { Badge } from '../types/Badge';

export const useSettings = (userId: string, greenhouseId: string) => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettingsAndBadges = async () => {
      if (!userId) {
        setError('Utilisateur non spécifié');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const settingsData = await settingsService.getSettingsByGreenhouseId(userId, greenhouseId);
        const badgesData = await badgeService.getBadgesByGreenhouseId(userId, greenhouseId);
        setSettings(settingsData);
        setBadges(badgesData);
        setError(null);
      } catch (err: any) {
        console.error('useSettings: erreur lors de la récupération des données', err);
        setError(err.message || 'Erreur lors de la récupération des paramètres et badges');
      } finally {
        setLoading(false);
      }
    };

    fetchSettingsAndBadges();
  }, [userId, greenhouseId]);

  const updateSettings = async (newSettings: SettingsUpdate) => {
    if (!settings) return;
    try {
      const updatedSettings = await settingsService.updateSettingsUser(settings.id, newSettings);
      setSettings(updatedSettings);
    } catch (err: any) {
      console.error('useSettings: erreur lors de la mise à jour des paramètres', err);
      setError(err.message || 'Erreur lors de la mise à jour des paramètres');
    }
  };

  const addBadge = async (name: string) => {
    try {
      const newBadge = await badgeService.createBadge({ name, user_id: userId, greenhouse_id: greenhouseId });
      setBadges((prev) => [...prev, newBadge]);
    } catch (err: any) {
      console.error('useSettings: erreur lors de l’ajout du badge', err);
      setError(err.message || 'Erreur lors de l’ajout du badge');
    }
  };

  const removeBadge = async (id: string) => {
    try {
      await badgeService.deleteBadge(id);
      setBadges((prev) => prev.filter((badge) => badge.id !== id));
    } catch (err: any) {
      console.error('useSettings: erreur lors de la suppression du badge', err);
      setError(err.message || 'Erreur lors de la suppression du badge');
    }
  };

  return { settings, updateSettings, badges, addBadge, removeBadge, loading, error };
};