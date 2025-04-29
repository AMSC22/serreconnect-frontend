import { useState } from 'react';
import { Thresholds } from '../types/Thresholds';
import { Badge } from '../types/Badge';

interface UseSettingsResult {
  thresholds: Thresholds;
  updateThresholds: (newThresholds: Partial<Thresholds>) => void;
  badges: Badge[];
  addBadge: (name: string) => void;
  removeBadge: (id: string) => void;
}

const mockThresholds: Thresholds = {
  temperature: { min: 15, max: 35 },
  humidity_air: { min: 50, max: 80 },
  humidity_soil: { min: 30, max: 60 },
  luminosity: { min: 500, max: 2000 },
  fertility: { min: 6, max: 9 },
};

const mockBadges: Badge[] = [
  { id: '1', name: 'Employé 1', createdAt: '2025-04-20T09:00:00' },
  { id: '2', name: 'Technicien', createdAt: '2025-04-21T14:30:00' },
];

export const useSettings = (): UseSettingsResult => {
  const [thresholds, setThresholds] = useState<Thresholds>(mockThresholds);
  const [badges, setBadges] = useState<Badge[]>(mockBadges);

  const updateThresholds = (newThresholds: Partial<Thresholds>) => {
    setThresholds((prev) => ({
      ...prev,
      ...newThresholds,
    }));
  };

  const addBadge = (name: string) => {
    const newBadge: Badge = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date().toISOString(),
    };
    setBadges((prev) => [...prev, newBadge]);
  };

  const removeBadge = (id: string) => {
    setBadges((prev) => prev.filter((badge) => badge.id !== id));
  };

  return { thresholds, updateThresholds, badges, addBadge, removeBadge };
};