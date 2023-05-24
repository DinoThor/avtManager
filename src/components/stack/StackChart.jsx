import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

export function StackChart({ rawData, feedBack }) {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        ticks: {
          stepSize: 1
        }
      },
    },
  };

  // Contextos
  const labels = rawData.context.map((a) => { return a.name });

  // Diccionario contador
  const moodCounter = {}; labels.forEach(context => moodCounter[context] = {});
  rawData.mood.forEach(mood => {
    labels.forEach(context => {
      moodCounter[context][mood.name] = 0;
      moodCounter[context][mood.name] = 0;
    })
  })

  // Contador valores
  rawData.sesiones.filter(s => s.mood_inicial > 0 && s.mood_final > 0).forEach(s => {
    let contextLabel = (rawData.context[s.id_contexto - 1]).name;
    let moodLabel = (
      feedBack
        ? (rawData.mood[s.mood_inicial - 1]).name
        : (rawData.mood[s.mood_final - 1]).name
    );

    moodCounter[contextLabel][moodLabel] += 1;
  })

  const prevDatasets = [];
  rawData.mood.forEach(m => {
    prevDatasets.push({
      label: m.name,
      data: labels.map((l) => (moodCounter[l][m.name])),
      backgroundColor: color(m.name),
    })
  })

  const data = {
    labels,
    datasets: prevDatasets
  };

  return <Bar options={options} data={data} />;
}


function color(value) {
  const val = {
    Sorpresa: 'rgb(60, 175, 175)',
    Tristeza: 'rgb(64, 106, 173)',
    Desprecio: 'rgb(183, 108, 81)',
    Miedo: 'rgb(91, 57, 136)',
    Ira: 'rgb(160, 61, 62)',
    Alegría: 'rgb(234, 175, 36)',
    Asco: 'rgb(100, 153, 65)',
    Neutral: 'rgb(0, 0, 0)'
  }; return val[value];
}



export default StackChart;