import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Greenhouse } from '../types/Greenhouse';
import { greenhouseService } from '../services/greenhouse_service';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [greenhouses, setGreenhouses] = useState<Greenhouse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !localStorage.getItem('access_token')) {
        setError('Utilisateur non connecté');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const greenhouseData: Greenhouse[] = await greenhouseService.getGreenhousesByUserId(user.id);
        setGreenhouses(greenhouseData);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Erreur lors de la récupération des données');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAccessGreenhouse = (greenhouseId: string) => {
    navigate(`/greenhouse/${greenhouseId}`);
  };

  const handleCreateGreenhouse = () => {
    navigate('/greenhouse/create');
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-green-600">Bienvenue, {user?.username || 'Utilisateur'}</h1>
      {error && <p className="text-red-500">{error}</p>}

      {greenhouses.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Bienvenue sur votre tableau de bord !
          </h2>
          <p className="text-gray-500 mb-6">
            Vous n'avez pas encore de serre configurée. Créez votre première serre pour commencer à surveiller vos cultures.
          </p>
          <button
            onClick={handleCreateGreenhouse}
            className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Créez votre serre maintenant
          </button>
        </div>
      ) : (
        <section className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Vos serres</h2>
            <button
              onClick={handleCreateGreenhouse}
              className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Créez une nouvelle serre
            </button>
          </div>
          <ul className="space-y-4">
            {greenhouses.map((greenhouse) => (
              <li key={greenhouse.id} className="p-4 bg-gray-100 rounded-md flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">{greenhouse.name}</h3>
                  <p className="text-gray-500">{greenhouse.location || 'Sans localisation'}</p>
                </div>
                <button
                  onClick={() => handleAccessGreenhouse(greenhouse.id)}
                  className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Accédez à votre serre
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Home;