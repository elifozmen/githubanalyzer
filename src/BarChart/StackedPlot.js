import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const StackedPlot = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'area',
        stacked: true,
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'category',
        categories: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        labels: {
          style: {
            colors: '#fff',
          },
        },
      },
      legend: {
        labels: {
          colors: '#fff',
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#fff',
          },
        },
      },
      
      tooltip: {
        theme: 'dark',
        style: {
          fontSize: '12px',
          fontFamily: undefined,
          background: '#fff',
          color: '#000000',
        },
        x: {
          format: 'MM/yyyy',
        },
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/get-stacked-plot-data');
        const data = response.data;


        const seriesData = data.series.map((item) => ({
          name: item.name,
          data: item.data,
        }));

       

        setChartData((prevState) => ({
          ...prevState,
          series: seriesData,
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

 
  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={500} width={1000} />
    </div>
  );
};

export default StackedPlot;
