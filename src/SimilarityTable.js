import React from 'react';

function SimilarityTable({ developerIDs, developerNames, similarityMatrix }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th></th>
            {developerNames.map((name, index) => (
              <th key={index}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {developerIDs.map((id, index) => (
            <tr key={index}>
              <td>{developerNames[index]}</td>
              {developerIDs.map((compareID, compareIndex) => (
                <td key={compareIndex}>
                  {similarityMatrix[id][compareID] !== undefined
                    ? similarityMatrix[id][compareID].toFixed(2)
                    : '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SimilarityTable;
