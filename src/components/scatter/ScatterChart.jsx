import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

function ScatterChart({rawData}) {
  ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

  const quadrants = {
    id: 'quadrants',
    beforeDraw(chart, args, options) {
      const {ctx, chartArea: {left, top, right, bottom}, scales: {x, y}} = chart;
      const midX = x.getPixelForValue(0);
      const midY = y.getPixelForValue(0);
      ctx.save();
      ctx.fillStyle = options.topLeft;
      ctx.fillRect(left, top, midX - left, midY - top);
      ctx.fillStyle = options.topRight;
      ctx.fillRect(midX, top, right - midX, midY - top);
      ctx.fillStyle = options.bottomRight;
      ctx.fillRect(midX, midY, right - midX, bottom - midY);
      ctx.fillStyle = options.bottomLeft;
      ctx.fillRect(left, midY, midX - left, bottom - midY);
      ctx.restore();
    }
  };

  const options = {
    scales: {
      y: {
        scaleLabel: {
          display: true,
          labelString: "Valence"
        },
        beginAtZero: false,
      },
    },
    plugins: {
      quadrants: {
        topLeft: 'rgb(255, 99, 132)',
        topRight: 'rgb(54, 162, 235)',
        bottomRight: 'rgb(75, 192, 192)',
        bottomLeft: 'rgb(255, 205, 86)',
      }
    },
    plugins: [quadrants]
  };

  

  const data = {
    datasets: [
      {
        label: 'AV',
        data: rawData.AV.map((a) => {
          return {
            x: a[0],
            y: a[1]
          }
        }),
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  return (
    <Scatter options={options} data={data} plugins={quadrants}/>
  );
}

export default ScatterChart;
