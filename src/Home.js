import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar.js';
import logo2 from './github_icon.png';
import './styles.css';

function Home() {
  const [val, setVal] = useState("Paste your GitHub repository link here.");
  const [developerInfo, setDeveloperInfo] = useState(null);

  const sendGitHubLinkToFlask = (githubLink) => {
    axios.post('http://localhost:5001/submit-github-link', { github_link: githubLink })
      .then(response => {
        // Handle the response here
        console.log(response.data);
        // After receiving response, get developer info
        getDeveloperInfo();
      })
      .catch(error => {
        console.error('Error sending GitHub link to Flask:', error);
      });
  };

  const getDeveloperInfo = () => {
    axios.get('http://localhost:5001/get-developer-info')
      .then(response => {
        // Handle the response here
        console.log(response.data);
        setDeveloperInfo(response.data);
      })
      .catch(error => {
        console.error('Error getting developer info:', error);
      });
  };

  const handleClick = () => {
    sendGitHubLinkToFlask(val);
  }

  const handleChange = event => {
    setVal(event.target.value);
  }
  
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="RepoLink" 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '60vh',
        }}> 
        <div className="GitHubImg" >
          <img
            src={logo2}
            width={200}
            height={200}
            alt="GitHub Logo"
          />
        </div>
        <div className="LinkForm" 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: '40px', // Adjust the font size here
            width: '80vh',
          }}>
          <input type="text"
            placeholder={val}
            onChange={handleChange}
            style={{ width: '100%',
              marginBottom: '10px',
            }} // Adjust input width and spacing
          />
          <button style={{ width: '100px' }} 
            onClick={handleClick}> Submit </button> {/* Adjust button width */}
        </div>
      </div>

      {/* Display developer info */}
      {developerInfo && (
  <div>
    <h2>Developer Information:</h2>
    <div>
      {developerInfo.developerIDs.map((id, index) => (
        <div key={index}>
          Developer ID: {id}, Developer Name: {developerInfo.developerNames[index]}
        </div>
      ))}
    </div>
  </div>
)}

    </div>
  );
}

export default Home;
