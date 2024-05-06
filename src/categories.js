import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; // Import Navbar component
import RingLoader from "react-spinners/RingLoader";

function Categories() {
  const [developerInfo, setDeveloperInfo] = useState(null);

  useEffect(() => {
    // Fetch developer info when component mounts
    getDeveloperInfo();
  }, []);

  const getDeveloperInfo = () => {
    axios.get('http://localhost:5001/get-developer-info')
      .then(response => {
        console.log(response.data);
        setDeveloperInfo(response.data);
        getDeveloperInfo2();
        getDeveloperInfo3();
      })
      .catch(error => {
        console.error('Error getting developer info:', error);
      });
  };

  const getDeveloperInfo2 = () => {
    axios.get('http://localhost:5001/get-developer-info2')
      .then(response => {
        console.log(response.data);
        setDeveloperInfo(prevState => ({
          ...prevState,
          JackRatios: response.data.JackRatios
        }));
      })
      .catch(error => {
        console.error('Error getting developer info2:', error);
      });
  };

  const getDeveloperInfo3 = () => {
    axios.get('http://localhost:5001/get-developer-info3')
      .then(response => {
        console.log(response.data);
        setDeveloperInfo(prevState => ({
          ...prevState,
          Maven: response.data.Maven
        }));
      })
      .catch(error => {
        console.error('Error getting developer info3:', error);
      });
  };

  return (
    <div style={{ color: 'white' }}>
      <Navbar />

      {developerInfo ? (
        <div>
          <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Developer Information:</h2>
          <div style={{ border: '1px solid white', padding: '10px', borderRadius: '10px', maxWidth: '600px', margin: 'auto' }}>
            <table style={{ margin: 'auto', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid white', padding: '8px' }}>Developer ID</th>
                  <th style={{ border: '1px solid white', padding: '8px' }}>Developer Name</th>
                  <th style={{ border: '1px solid white', padding: '8px' }}>Jack (%)</th>
                  <th style={{ border: '1px solid white', padding: '8px' }}>Maven (%)</th> {/* Updated header */}
                </tr>
              </thead>
              <tbody>
                {developerInfo.developerIDs.map((id, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid white', padding: '8px' }}>{id}</td>
                    <td style={{ border: '1px solid white', padding: '8px' }}>{developerInfo.developerNames[index]}</td>
                    <td style={{ border: '1px solid white', padding: '8px' }}>
                      {developerInfo.JackRatios && developerInfo.JackRatios[id] ? `${developerInfo.JackRatios[id].toFixed(3)}%` : '-'}
                    </td>
                    <td style={{ border: '1px solid white', padding: '8px' }}>
                      {developerInfo.Maven && developerInfo.Maven[id] ? `${developerInfo.Maven[id].toFixed(3)}%` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <RingLoader color="#61dafb" size={150} />
        </div>
      )}
    </div>
  );
}

export default Categories;
