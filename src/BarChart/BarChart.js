import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { options } from './BarChartOptions'; // Bar grafiği için özel seçenekler
import axios from 'axios';

Chart.register(...registerables);

const BarGraph = ({ title }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch chart data when component mounts
    getChartData();
  }, []);

  const getChartData = () => {
    axios.get('http://localhost:5001/get-chart-data')
      .then(response => {
        console.log(response.data);
        const { labels, datapoints } = response.data;
        const months = labels;
        const graphData = datapoints;
        const updatedData = {
          labels: months,
          datasets: [
            {
              backgroundColor: '#5052ff',
              data: graphData,
              barPercentage: 1,
              borderRadius: 100,
              borderSkipped: true,
            },
          ],
        };
        setChartData(updatedData);
      })
      .catch(error => {
        console.error('Error getting chart data:', error);
      });
  };

  // Grafik stilini tanımla
  const graphStyle = {
    minHeight: '10rem',
    maxWidth: '6000px',
    minHeight: '400px',
    width: '100%',
    border: '1px solid #C4C4C4',
    borderRadius: '0.375rem',
    padding: '1rem',
    textColor: 'white',
  };

  return (
    <div style={graphStyle}>
      {/* Bar grafiği bileşeni */}
      {chartData && <Bar data={chartData} options={options(title)} />}
    </div>
  );
};

export default BarGraph;
