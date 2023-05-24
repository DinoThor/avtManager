import React from 'react';
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
import { Line } from 'react-chartjs-2';


function LineChart({ rawData }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    scale: {
      y: {
        min: -1,
        max: 1
      }
    }
  };

  const labels = rawData.labels.map((l) => { return l.label; });

  const data = {
    labels,
    datasets: [
      {
        label: 'Arousal',
        data: labels.map((label, index) => rawData.arousal[index].arousal),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Valence',
        data: labels.map((label, index) => rawData.valence[index].valence),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };


  return <Line options={options} data={data} />;
}

export default LineChart;