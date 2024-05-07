import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './styles.css';
import BarGraph4 from './BarChart/BarChart4';

function Compatibility() {
  const [developerInfo, setDeveloperInfo] = useState(null);

  useEffect(() => {
    // Function to fetch developer similarity data from backend

    
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <div style={{ color: 'white' }}>
      <Navbar />

    
    </div>
  );
}

export default Compatibility;
