import ThresholdForm from '../components/ThresholdForm';
import BadgeManager from '../components/BadgeManager';
import { useSettings } from '../hooks/useSettings';
import ProfileForm from '../components/ProfileForm';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { SettingsUpdate } from '../types/Settings';
import { Thresholds } from '../types/Thresholds';
import { useParams } from 'react-router-dom';

const Settings = () => {
  const { user } = useAuth();
  const { greenhouseId } = useParams<{ greenhouseId: string }>();
  const { settings, updateSettings, badges, addBadge, removeBadge, loading, error } = useSettings(
    user?.id || '',
    greenhouseId || ""
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!settings) return <p className="text-gray-500">Aucun paramètre trouvé.</p>;

  const thresholds: Thresholds = {
    temperature: { min: settings.temperature_min || 0, max: settings.temperature_max || 0 },
    humidity: { min: settings.humidity_min || 0, max: settings.humidity_max || 0 },
    soil_moisture: { min: settings.soil_moisture_min || 0, max: settings.soil_moisture_max || 0 },
    light_level: { min: settings.light_level_min || 0, max: settings.light_level_max || 0 },
    ph_level: { min: settings.ph_level_min || 0, max: settings.ph_level_max || 0 },
  };

  const handleUpdateThresholds = (newThresholds: Partial<Thresholds>) => {
    const updatedSettings: SettingsUpdate = {};
    if (newThresholds.temperature) {
      updatedSettings.temperature_min = newThresholds.temperature.min;
      updatedSettings.temperature_max = newThresholds.temperature.max;
    }
    if (newThresholds.humidity) {
      updatedSettings.humidity_min = newThresholds.humidity.min;
      updatedSettings.humidity_max = newThresholds.humidity.max;
    }
    if (newThresholds.soil_moisture) {
      updatedSettings.soil_moisture_min = newThresholds.soil_moisture.min;
      updatedSettings.soil_moisture_max = newThresholds.soil_moisture.max;
    }
    if (newThresholds.light_level) {
      updatedSettings.light_level_min = newThresholds.light_level.min;
      updatedSettings.light_level_max = newThresholds.light_level.max;
    }
    if (newThresholds.ph_level) {
      updatedSettings.ph_level_min = newThresholds.ph_level.min;
      updatedSettings.ph_level_max = newThresholds.ph_level.max;
    }
    updateSettings(updatedSettings);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-600">Paramètres</h1>
      <ProfileForm />
      <ThresholdForm thresholds={thresholds} onUpdate={handleUpdateThresholds} />
      <BadgeManager
        badges={badges}
        onAddBadge={addBadge}
        onRemoveBadge={removeBadge}
        error={error}
      />
    </div>
  );
};

export default Settings;