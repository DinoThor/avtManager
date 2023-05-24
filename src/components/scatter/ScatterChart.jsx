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

function ScatterChart({ rawData }) {
  ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

  const options = {
    width: 100,
    height: 100,
    maintainAspectRatio: true,
    scales: {
      y: {
        min: -1,
        max: 1,
      },
      x: {
        min: -1,
        max: 1,
      }
    },
  };

  const plugins = [{
    beforeDraw: function(chart) {
      const {ctx, chartArea: {left, top, right, bottom}, scales: {x, y}} = chart;
      const midX = x.getPixelForValue(0);
      const midY = y.getPixelForValue(0);
      ctx.save();
      ctx.fillStyle = 'rgba(75, 192, 192, 1)';
      ctx.fillRect(left, top, midX - left, midY - top);
      ctx.fillStyle = 'rgba(54, 162, 235, 1)';
      ctx.fillRect(midX, top, right - midX, midY - top);
      ctx.fillStyle = 'rgba(75, 192, 192, 1)';
      ctx.fillRect(midX, midY, right - midX, bottom - midY);
      ctx.fillStyle = 'rgba(54, 162, 235, 1)';
      ctx.fillRect(left, midY, midX - left, bottom - midY);
      ctx.restore();
    }
  }]

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
        borderColor: 'rgba(0, 0, 0, 1)',
        pointRadius: 2,
      },
    ],
  };

  return (
    <Scatter options={options} data={data} plugins={plugins}/>
  );
}

export default ScatterChart;
