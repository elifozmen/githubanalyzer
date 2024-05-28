import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { options } from './BarChart/BarChartOptions';

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

  const data = {
    labels: Object.keys(solvers),
    datasets: [
      {
        label: 'Closed Issues',
        data: Object.values(solvers),
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Use color from options
        borderColor: 'rgba(75, 192, 192, 1)',
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
  };

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
                <th style={{ padding: '8px' }}>Developer Name</th>
                <th style={{ padding: '8px' }}>Closed Issues</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(solvers).map(([developer, closedIssues], index) => (
                <tr key={index} style={{ borderBottom: '1px solid gray' }}>
                  <td style={{ padding: '8px' }}>{developer}</td>
                  <td style={{ padding: '8px' }}>{closedIssues}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={graphStyle}>
            <Bar data={data} options={options(title)} />
          </div>
        </>
      )}
    </div>
  );
};

export default SolverComponent;
