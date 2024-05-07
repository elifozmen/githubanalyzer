import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; // Import Navbar component
import RingLoader from "react-spinners/RingLoader";

function Categories() {
  const [developerInfo, setDeveloperInfo] = useState(null);

  useEffect(() => {
    // Fetch developer info when component mounts
    
  }, []);

  
  

  return (
    <div style={{ color: 'white' }}>
      <Navbar />

    
    </div>
  );
 
}

export default Categories;
