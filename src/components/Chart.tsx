import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { HistoricalData } from '../types/HistoricalData';

// Enregistrer les composants Chart.js nécessaires
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartProps {
  data: HistoricalData[];
  sensor: keyof Omit<HistoricalData, 'timestamp'>;
  label: string;
  unit: string;
  color: string;
}

const Chart = ({ data, sensor, label, unit, color }: ChartProps) => {
  const chartData = {
    labels: data.map((d) => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: `${label} (${unit})`,
        data: data.map((d) => d[sensor]),
        borderColor: color,
        backgroundColor: `${color}33`, // Couleur avec opacité
        fill: true,
        tension: 0.4, // Courbe lissée
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: label },
    },
    scales: {
      x: { title: { display: true, text: 'Heure' } },
      y: { title: { display: true, text: unit } },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-64">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Chart;