import React from 'react';
import { Bell } from 'lucide-react';
import { Alert } from '../types/Alert';

interface AlertCardProps {
  alert: Alert;
  onMarkAsRead?: (id: string) => void;
}

const AlertCard = ({ alert, onMarkAsRead }: AlertCardProps) => {
  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-md flex items-center justify-between ${
        alert.read ? 'opacity-75' : 'border-l-4 border-red-500'
      }`}
    >
      <div className="flex items-center space-x-4">
        <Bell className="w-6 h-6 text-red-500" />
        <div>
          <p className="text-gray-700">{alert.message}</p>
          <p className="text-sm text-gray-500">
            {new Date(alert.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
      {!alert.read && onMarkAsRead && (
        <button
          onClick={() => onMarkAsRead(alert.id)}
          className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
        >
          Marquer comme lue
        </button>
      )}
    </div>
  );
};

export default AlertCard;