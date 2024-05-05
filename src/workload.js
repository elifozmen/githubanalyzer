import React from 'react';
import Navbar from './Navbar';
import './styles.css';
import BarGraph from './BarChart/BarChart';
import BarGraph2 from './BarChart/BarChart2';
import BarGraph3 from './BarChart/BarChart3';
import BarGraph4 from './BarChart/BarChart4';


function Workload() {
  return (
    <div>
      <Navbar />
      <div className="grid-container">
        <div className="grid-item">
          <BarGraph title="Commits per Developer" />
        </div>
        <div className="grid-item">
          <BarGraph2 title="Files per Developer" />
        </div>
        <div className="grid-item">
          <BarGraph3 title="Lines per Developer" />
        </div>
        <div className="grid-item">
          <BarGraph4 title="Matrix" />
        </div>
      </div>
    </div>
  );
}

export default Workload;
