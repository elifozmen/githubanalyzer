import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BarGraph4 = () => {
  const [similarityMatrix, setSimilarityMatrix] = useState([]);
  const [developerIds, setDeveloperIds] = useState([]);

  useEffect(() => {
    // Fetch similarity matrix data and developer IDs when component mounts
    getSimilarityMatrixData();
  }, []);

  const getSimilarityMatrixData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/get-chart-data4');
      const similarityMatrix = response.data;
      const developerIds = Object.keys(similarityMatrix[0]); // Extract IDs from the first row

      setSimilarityMatrix(similarityMatrix);
      setDeveloperIds(developerIds);
    } catch (error) {
      console.error('Error getting similarity matrix data:', error);
    }
  };

  // Define a color scale for the similarity values
  const getColor = (value) => {
    // Adjust the color scale as needed
    if (value >= 0.8) return '#8a0d00'; // High similarity
    if (value >= 0.6) return '#cc804e'; // Medium similarity
    if (value >= 0.4) return '#ffb381'; // Low similarity
    if (value >= 0.2) return '#ffc6a0'; // very Low similarity
    return '#ffe2cf'; // Very low similarity
  };

  const cellStyle = {
    width: '50px',
    height: '50px',
    border: '1px solid #000',
    textAlign: 'center',
    lineHeight: '50px',
    fontSize: '16px',
    fontWeight: 'bold',
  };

  const containerStyle = {
    border: '1px solid black', // Border around the outside of the matrix
    display: 'inline-block', // Ensures the container size is adjusted to the content
  };

  const renderCell = (value, rowIndex, colIndex) => (
    <div
      key={`${rowIndex}-${colIndex}`}
      style={{
        ...cellStyle,
        backgroundColor: getColor(value)
      }}
    >
      {value.toFixed(2)}
    </div>
  );

  return (
    <div style={containerStyle}>
      <div style={{ display: 'grid', gridTemplateColumns: `1fr repeat(${developerIds.length}, 1fr)`, gridTemplateRows: `repeat(${developerIds.length}, 1fr)`, gap: '1px' }}>
        {/* Render developer IDs for the X-axis (top of the matrix) */}
        {developerIds.map((devId, index) => (
          <div key={index} style={{ gridColumn: index + 2, textAlign: 'center', ...cellStyle }}>
            {devId}
          </div>
        ))}
  
        {/* Render developer IDs for the Y-axis (left side of the matrix) */}
        {developerIds.map((devId, index) => (
          <div key={index} style={{ gridRow: index + 1, ...cellStyle, textAlign: 'center' }}>
            {devId}
          </div>
        ))}
  
        {/* Render similarity values with proper alignment */}
        {similarityMatrix.map((row, rowIndex) => (
          row.map((value, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} style={{ gridRow: rowIndex + 1, gridColumn: colIndex + 2 }}>
              {renderCell(value, rowIndex, colIndex)}
            </div>
          ))
        ))}
      </div>
    </div>
  );
  
};

export default BarGraph4;
