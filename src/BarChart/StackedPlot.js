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
        categories: [],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy',
        },
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/get-stacked-plot-data');
        const data = response.data;

        const categories = data.dates || [];
        const seriesData = Object.keys(data.data || {}).map((year) => ({
          name: year,
          data: data.data[year],
        }));
        console.log("datalar:", seriesData);

        setChartData((prevState) => ({
          ...prevState,
          series: seriesData,
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              categories: categories,
            },
          },
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={350} width={600} />
    </div>
  );
};

export default StackedPlot;
