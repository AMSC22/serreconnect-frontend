import { useState, useEffect } from 'react';
import { historyService } from '../services/history_service';
import { HistoricalData } from '../types/History';

interface UseHistoryResult {
  data: HistoricalData[];
  period: '24h' | '7d' | '30d';
  setPeriod: (period: '24h' | '7d' | '30d') => void;
  loading: boolean;
  error: string | null;
}

export const useHistory = (greenhouseId: string): UseHistoryResult => {
  const [data, setData] = useState<HistoricalData[]>([]);
  const [period, setPeriod] = useState<'24h' | '7d' | '30d'>('24h');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        let start_date: string | undefined;
        const end_date = new Date().toISOString();

        if (period === '24h') {
          start_date = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        } else if (period === '7d') {
          start_date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        } else if (period === '30d') {
          start_date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
        }

        const response = await historyService.searchHistory(greenhouseId, start_date, end_date);
        setData(response);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Erreur lors de la récupération de l’historique');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [greenhouseId, period]);

  return { data, period, setPeriod, loading, error };
};