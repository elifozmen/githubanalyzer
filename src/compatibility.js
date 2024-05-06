import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './styles.css';
import BarGraph4 from './BarChart/BarChart4';

function Compatibility() {
  const [developerInfo, setDeveloperInfo] = useState(null);

  useEffect(() => {
    // Function to fetch developer similarity data from backend
    const fetchDeveloperSimilarity = async () => {
      try {
        const response = await axios.get('http://localhost:5001/get-similarity');
        setDeveloperInfo(response.data);
      } catch (error) {
        console.error('Error fetching developer similarity:', error);
      }
    };

    // Call the function to fetch data when component mounts
    fetchDeveloperSimilarity();
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <div style={{ color: 'white' }}>
      <Navbar />

      <div className="grid-container_similarity">
        <div className="grid-item_similarity">
          {/* Display developer similarity data */}
          {developerInfo && (
            <div>
              <h2>Developer Similarity:</h2>
              <div>
                {developerInfo.developerIDs.map((id, index) => (
                  <div key={index}>
                    Developer ID: {id}, Developer Name: {developerInfo.developerNames[index]}
                    <div>
                      Similar Developers:
                      <ul>
                        {Object.entries(developerInfo.Similarity[id]).map(([similarDev, similarity], index) => (
                          <li key={index}>
                            Developer ID: {similarDev}, Similarity: {similarity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="grid-item_similarity">
          <BarGraph4 title="Matrix" />
        </div>
      </div>
    </div>
  );
}

export default Compatibility;
