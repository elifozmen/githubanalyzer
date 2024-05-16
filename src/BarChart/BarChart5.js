import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { options as chartOptions } from './BarChartOptions'; // Rename the imported options object to avoid conflicts

const BarGraph5 = ({ title }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch chart data when component mounts
    getChartData();
  }, []);

  const getChartData = () => {
    axios.get('http://localhost:5001/get_balanced')
      .then(response => {
        console.log(response.data);
        const { developerNames, lines_modified_values, average_lines_modified, bins } = response.data;

        // Create labels for each bin on the x-axis
        const labels = bins.map((bin, index) => {
          const nextBin = bins[index + 1];
          return `${Math.floor(bin)} - ${Math.floor(nextBin)}`;
        }).slice(0, -1); // Exclude the last bin as it is not needed for labeling

        // Calculate the count of developers in each bin
        const developerCount = Array(bins.length - 1).fill(0); // Initialize an array to hold developer count for each bin
        lines_modified_values.forEach(value => {
          const binIndex = Math.floor((value - bins[0]) / (bins[1] - bins[0])); // Calculate the bin index for the current value
          developerCount[binIndex]++; // Increment the developer count for the corresponding bin
        });

        // Create chart data object
        const updatedData = {
          labels: labels,
          datasets: [
            {
              label: 'Developer Count',
              backgroundColor: '#5052ff',
              data: developerCount,
            },
          ],
        };

        // Set the chart data state
        setChartData(updatedData);
      })
      .catch(error => {
        console.error('Error getting chart data:', error);
        setChartData(null); // Reset chart data if there's an error
      });
  };

  const graphStyle = {
    minHeight: '10rem',
    maxWidth: '6000px',
    minHeight: '400px',
    width: '100%',
    border: '1px solid #C4C4C4',
    borderRadius: '0.375rem',
    padding: '1rem',
  };

  return (
    <div style={graphStyle}>
      {/* Bar graph component */}
      {chartData && <Bar data={chartData} options={chartOptions(title)} />} {/* Use the imported options object */}
    </div>
  );
};

export default BarGraph5;
