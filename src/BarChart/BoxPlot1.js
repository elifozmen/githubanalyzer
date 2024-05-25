import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const BoxPlotComponent = ({ title , apiUrl}) => {
  const [datasets, setDatasets] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        console.log("Data fetched: ", response.data); // Debugging: log fetched data
        const { labels, datapoints } = response.data;

        // Ensure datapoints are mapped correctly
        const formattedData = labels.map((label, index) => ({
          y: datapoints[index],
          type: 'box',
          name: `Developer ${label}`,  // Label each box plot
          boxpoints: 'all',
          jitter: 0.5,
          pointpos: -1.8
        }));
        console.log("Formatted Data: ", formattedData); // Debugging: log formatted data
        setDatasets(formattedData);
      } catch (error) {
        console.error('Error fetching data for box plot:', error);
      }
    };

    fetchData();
  }, [apiUrl]);  // Dependency on apiUrl ensures fetchData runs if apiUrl changes

  return (
    <Plot
      data={datasets}
      layout={{
        width: 800,
        height: 800,
        title: title,  // Direct string assignment
        xaxis: {
          type: 'category'  // Ensures that each box plot is treated as a separate category
        },
        paper_bgcolor: '#f8f9fa00',
        plot_bgcolor: '#f8f9fa00',
        bordercolor:"white",
        borderwidth: "4px",
        font: {
          family: "Arial, sans-serif",
          color: "white"
        },
        legend: {
          bordercolor: "white",

        }
      }}
    />
  );
};

export default BoxPlotComponent;
