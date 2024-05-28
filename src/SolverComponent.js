import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

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
    maxWidth: '6000px',
    minHeight: '400px',
    maxHeight: '400px', // Adjust height to make it smaller
    maxWidth: '800px', // Adjust width to make it smaller
    width: '100%',
    border: '1px solid #C4C4C4',
    borderRadius: '0.375rem',
    padding: '1rem',
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

  return (
    <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>
      <h2>Developer Solvers</h2>
      <div>
        <label>
          Threshold:
          <input type="number" value={threshold} onChange={handleThresholdChange} style={{ marginLeft: '10px' }} />
        </label>
        <button onClick={handleFetchSolvers} style={{ marginLeft: '10px' }}>Fetch Solvers</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {solvers && Object.keys(solvers).length > 0 && (
        <>
          <table style={{ margin: '0 auto', marginTop: '20px', borderCollapse: 'collapse', width: '50%' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid white' }}>
                <th style={{ padding: '8px', color: 'white', fontSize: '18px' }}>Developer Name</th>
                <th style={{ padding: '8px', color: 'white', fontSize: '18px' }}>Closed Issues</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(solvers).map(([developer, closedIssues], index) => (
                <tr key={index} style={{ borderBottom: '1px solid gray' }}>
                  <td style={{ padding: '8px', color: 'white', fontSize: '16px' }}>{developer}</td>
                  <td style={{ padding: '8px', color: 'white', fontSize: '16px' }}>{closedIssues}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={graphStyle}>
            <Pie data={data} options={options(title)} />
          </div>
        </>
      )}
    </div>
  );
};

export default SolverComponent;
