// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { HistoricalData } from '../types/History';

// // Enregistrer les composants Chart.js nécessaires
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// interface ChartProps {
//   data: HistoricalData[];
//   sensor: keyof Omit<HistoricalData, 'timestamp'>;
//   label: string;
//   unit: string;
//   color: string;
// }

// const Chart = ({ data, sensor, label, unit, color }: ChartProps) => {
//   const chartData = {
//     labels: data.map((d) => new Date(d.recorded_at).toLocaleTimeString()),
//     datasets: [
//       {
//         label: `${label} (${unit})`,
//         data: data.map((d) => d[sensor]),
//         borderColor: color,
//         backgroundColor: `${color}33`, // Couleur avec opacité
//         fill: true,
//         tension: 0.4, // Courbe lissée
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: 'top' as const },
//       title: { display: true, text: label },
//     },
//     scales: {
//       x: { title: { display: true, text: 'Heure' } },
//       y: { title: { display: true, text: unit } },
//     },
//   };

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md h-64">
//       <Line data={chartData} options={options} />
//     </div>
//   );
// };

// export default Chart;

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { HistoricalData } from '../types/History';

interface ChartProps {
  data: HistoricalData[];
  sensor: 'temperature' | 'humidity' | 'light_level' | 'soil_moisture' | 'ph_level' | 'co2_level';
  label: string;
  unit: string;
  color: string;
}

const Chart = ({ data, sensor, label, unit, color }: ChartProps) => {
  // Transformer les données pour Recharts
  const chartData = data.map((item) => ({
    time: new Date(item.recorded_at).toLocaleTimeString(),
    value: item[sensor] ?? null,
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{label}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis unit={unit} />
          <Tooltip formatter={(value: number) => `${value} ${unit}`} />
          <Line type="monotone" dataKey="value" stroke={color} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;