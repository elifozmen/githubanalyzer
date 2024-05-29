import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Button, Input } from "reactstrap";
import 'chart.js/auto';
import "./Template/assets/css/black-dashboard-react.css";
import "./Template/assets/css/black-dashboard-react.css.map";
import "./Template/assets/css/nucleo-icons.css";
import { SimpleTableView } from "./Template/backedComponents/SimpleTable/SimpleTableView.js";
// Function to generate dynamic colors
const generateColors = (numColors) => {
  const colors = [];
  const letters = '0123456789ABCDEF';
  for (let i = 0; i < numColors; i++) {
    let color = '#';
    for (let j = 0; j < 6; j++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    colors.push(color);
  }
  return colors;
};

const SolverComponent = ({ title = 'Closed Issues by Developer' }) => {
  const [solvers, setSolvers] = useState({});
  const [threshold, setThreshold] = useState(0); // Default threshold to 0
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSolvers = async (threshold) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5001/get-solvers?threshold=${threshold}`);
      setSolvers(response.data);
    } catch (err) {
      setError('Error fetching solvers');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSolvers(threshold);
  }, [threshold]);

  const handleThresholdChange = (event) => {
    setThreshold(event.target.value);
  };

  const handleFetchSolvers = () => {
    fetchSolvers(threshold);
  };

  const numDevelopers = Object.keys(solvers).length;
  const colors = generateColors(numDevelopers);

  const data = {
    labels: Object.keys(solvers),
    datasets: [
      {
        label: 'Closed Issues',
        data: Object.values(solvers),
        backgroundColor: colors,
        borderColor: colors.map(color => color.replace('0.6', '1')),
        borderWidth: 1,
      },
    ],
  };

  const graphStyle = {
    minHeight: '10rem',
    minHeight: '400px',
    maxHeight: '400px', // Adjust height to make it smaller
    maxWidth: '800px', // Adjust width to make it smaller
    width: '100%',
    border: '1px solid #C4C4C4',
    borderRadius: '0.375rem',
    padding: '1rem',
    margin: 'auto', // Center the graph horizontally
  };

  const options = (title) => ({
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          color: '#fff',
        },
      },
      title: {
        display: true,
        text: title,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed;
            }
            return label;
          },
        },
        backgroundColor: '#fff',
        titleColor: '#000',
        bodyColor: '#000',
      },
    },
  });


  const tableData = Object.entries(solvers).map(([developer, closedIssues]) => ({
    "Developer Name": developer,
    "Closed Issues": closedIssues
  }));

  return (
    <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>
      <h2>Developer Solvers</h2>
      <div>
        <label style={{ marginRight: '10px' }}>
          Threshold:
          <Input
            type="number"
            value={threshold}
            onChange={handleThresholdChange}
            style={{ marginLeft: '10px', display: 'inline-block', width: 'auto',height:'60px', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </label>
        <Button
          className="btn-fill"
          color="primary"
          style={{ marginLeft: '10px', width: '150px', height: '60px', fontSize: '15px', textAlign:'center'}}
          onClick={handleFetchSolvers}
        >Fetch Solvers
        </Button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {solvers && Object.keys(solvers).length > 0 && (
        <>
          <div style={{ padding: '5px', borderRadius: '10px', maxWidth: '600px', margin: 'auto', marginTop: '20px', marginBottom: '40px' }}>
            <SimpleTableView
              dataHeaders={["Developer Name", "Closed Issues"]}
              data={tableData}
            />
          </div>
          <div style={graphStyle}>
            <Pie data={data} options={options(title)} />
          </div>
        </>
      )}
    </div>
  );
};

export default SolverComponent;
