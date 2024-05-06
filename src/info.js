import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './styles.css';

function Workload() {
  const [developerInfo, setDeveloperInfo] = useState(null);

  useEffect(() => {
    // Fetch developer info when component mounts
    getDeveloperInfo4();
  }, []);

  const getDeveloperInfo4 = () => {
    axios.get('http://localhost:5001/get-developer-info4')
      .then(response => {
        console.log(response.data);
        setDeveloperInfo({
          total_commit_count: response.data.total_commit_count,
          total_file_count: response.data.total_file_count,
          total_developer_count: response.data.total_developer_count,
          developer_names: response.data.developer_names,
        });
      })
      .catch(error => {
        console.error('Error getting developer info4:', error);
      });
  };

  return (
    <div style={{ color: 'white' }}>
      <Navbar />
      {developerInfo && (
        <div>
          <h2 style={{ textAlign: 'center', marginTop: '20px' }}>General Information:</h2>
          <div style={{ border: '1px solid white', padding: '10px', borderRadius: '10px', maxWidth: '600px', margin: 'auto', color: 'white' }}>
            <table style={{ margin: 'auto', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid white', padding: '8px' }}>Developer Names</th>
                  <th style={{ border: '1px solid white', padding: '8px' }}>Total Commit Count</th>
                  <th style={{ border: '1px solid white', padding: '8px' }}>Total File Count</th>
                  <th style={{ border: '1px solid white', padding: '8px' }}>Total Developer Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid white', padding: '8px' }}>{developerInfo.developer_names.join(', ')}</td>
                  <td style={{ border: '1px solid white', padding: '8px' }}>{developerInfo.total_commit_count}</td>
                  <td style={{ border: '1px solid white', padding: '8px' }}>{developerInfo.total_file_count}</td>
                  <td style={{ border: '1px solid white', padding: '8px' }}>{developerInfo.total_developer_count}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Workload;
