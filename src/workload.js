import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './styles.css';

function Workload() {
  const [distributionImage, setDistributionImage] = useState(null);

  useEffect(() => {
    // Fetch the distribution image when the component mounts
    fetch('/get-distribution')
      .then(response => response.text())
      .then(data => {
        // Set the image data to state
        setDistributionImage(data);
      })
      .catch(error => console.error('Error fetching distribution image:', error));
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      <Navbar />
      <div>
        {distributionImage ? (
          // Display the distribution image if available
          <img src={distributionImage} alt="Distribution" />
        ) : (
          // Display a loading message if the image is still loading
          <p>Loading distribution...</p>
        )}
      </div>
    </div>
  );
}

export default Workload;
