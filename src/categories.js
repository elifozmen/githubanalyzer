import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

function Categories() {
  const [reachableFiles, setReachableFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Flask API'sine istek yap
        const response = await axios.get('http://localhost:5000/get-reachable-files');

        // Gelen verileri al
        const { data } = response.data;

        // Reachable files bilgisini al
        const reachableFilesData = data;

        // Reachable files bilgisini state'e kaydet
        setReachableFiles(reachableFilesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <h1>Number of Reachable Files for Each Developer</h1>
      <ul>
        {Object.keys(reachableFiles).map((developerId, index) => (
          <li key={index}>
            Developer {developerId}: {reachableFiles[developerId].length} files
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
