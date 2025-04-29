import { useState } from 'react';
import { HistoricalData } from '../types/HistoricalData';

interface UseHistoryResult {
  data: HistoricalData[];
  period: '24h' | '7d' | '30d';
  setPeriod: (period: '24h' | '7d' | '30d') => void;
}

const mockData: HistoricalData[] = [
  // Données mockées pour 24h (exemple)
  { timestamp: '2025-04-24T00:00:00', temperature: 22.5, humidity_air: 60, humidity_soil: 40, luminosity: 1000, fertility: 7.5 },
  { timestamp: '2025-04-24T01:00:00', temperature: 23.0, humidity_air: 62, humidity_soil: 41, luminosity: 1100, fertility: 7.6 },
  { timestamp: '2025-04-24T02:00:00', temperature: 23.5, humidity_air: 64, humidity_soil: 42, luminosity: 1200, fertility: 7.7 },
  // ... ajouter plus de points pour 7j et 30j si nécessaire
];

export const useHistory = (): UseHistoryResult => {
  const [period, setPeriod] = useState<'24h' | '7d' | '30d'>('24h');
  // Pour l’instant, renvoie les mêmes données mockées
  // Plus tard, fetch les données selon la période via l’API
  const data = mockData;

  return { data, period, setPeriod };
};