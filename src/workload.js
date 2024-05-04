import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './styles.css';
import axios from 'axios';
import { Line } from 'react-chartjs-2'; // Import Chart.js Line component
import BarGraph from './BarChart/BarChart';

function Workload() {
  

  return (
    <div>
      <Navbar />
      <BarGraph/>
    </div>
  );
}

export default Workload;

*/