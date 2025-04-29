import React from 'react';
import ThresholdForm from '../components/ThresholdForm';
import BadgeManager from '../components/BadgeManager';
import { useSettings } from '../hooks/useSettings';
import ProfileForm from '../components/ProfileForm';

const Settings = () => {
  const { thresholds, updateThresholds, badges, addBadge, removeBadge } = useSettings();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-600">Paramètres</h1>
      <ProfileForm />
      <ThresholdForm thresholds={thresholds} onUpdate={updateThresholds} />
      <BadgeManager
        badges={badges}
        onAddBadge={addBadge}
        onRemoveBadge={removeBadge}
      />
    </div>
  );
};

export default Settings;