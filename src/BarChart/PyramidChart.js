import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const PyramidChartComponent = () => {
  const [options, setOptions] = useState({
    series: [
      {
        name: "Commit Counts",
        data: [],
      },
    ],
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: true,
        distributed: true,
        barHeight: '80%',
        isFunnel: true,
      },
    },
    colors: [
      '#F44F5E',
      '#E55A89',
      '#D863B1',
      '#CA6CD8',
      '#B57BED',
      '#8D95EB',
      '#62ACEA',
      '#4BC3E6',
    ],
    dataLabels: {
      enabled: true,
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex]
      },
      dropShadow: {
        enabled: true,
      },
    },
    title: {
      text: 'Pyramid Chart',
      align: 'middle',
    },
    xaxis: {
      categories: [],
    },
    legend: {
      show: false,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/get-top-files-data');
        const data = response.data;
        console.log("RESPONSE")
        console.log(response)

        setOptions((prevOptions) => ({
          ...prevOptions,
          series: [
            {
              ...prevOptions.series[0],
              data: data.datapoints,
            },
          ],
          xaxis: {
            categories: data.labels,
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
      <Chart options={options} series={options.series} type="bar" height={350} width={1000} />
    </div>
  );
};

export default PyramidChartComponent;