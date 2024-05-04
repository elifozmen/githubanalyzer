import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar.js';
import './styles.css';
import RingLoader from "react-spinners/RingLoader";
import logo2 from './github_icon.png';

function Home() {
  const [val, setVal] = useState("Paste your GitHub repository link here.");
  const [developerInfo, setDeveloperInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#61dafb");
  const [showLoader, setShowLoader] = useState(false);
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    // Fetch developer info when component mounts
    getDeveloperInfo();
  }, []);

  const sendGitHubLinkToFlask = (githubLink) => {
    setLoading(true); // Start loading when request starts
    setShowLoader(true); // Show the loader when the button is clicked
    axios.post('http://localhost:5001/submit-github-link', { github_link: githubLink })
      .then(response => {
        console.log(response.data);
        setDeveloperInfo(response.data);
        setShowLoader(false); // Hide the loader after the request is completed
        setShowData(true); // Show the data after the request is completed
      })
      .catch(error => {
        console.error('Error sending GitHub link to Flask:', error);
      })
      .finally(() => {
        setLoading(false); // Stop loading when request completes (either success or failure)
      });
  };

  const getDeveloperInfo = () => {
    axios.get('http://localhost:5001/get-developer-info')
      .then(response => {
        setShowLoader(true);
        console.log(response.data);
        setDeveloperInfo(response.data);
        
        getDeveloperInfo2();
        getDeveloperInfo3();
      })
      .catch(error => {
        console.error('Error getting developer info:', error);
      });
  };

  const getDeveloperInfo2 = () => {
    axios.get('http://localhost:5001/get-developer-info2')
      .then(response => {
        console.log(response.data);
        setDeveloperInfo(prevState => ({
          ...prevState,
          isJack: response.data.isJack
        }));
      })
      .catch(error => {
        console.error('Error getting developer info2:', error);
      });
  };

  const getDeveloperInfo3 = () => {
    axios.get('http://localhost:5001/get-developer-info3')
      .then(response => {
        console.log(response.data);
        setDeveloperInfo(prevState => ({
          ...prevState,
          Maven: response.data.Maven
        }));
      })
      .catch(error => {
        console.error('Error getting developer info3:', error);
      });
  };

  const handleClick = () => {
    sendGitHubLinkToFlask(val);
  }

  const handleChange = event => {
    setVal(event.target.value);
  }

  return (
    <div style={{ color: 'white' }}>
      <Navbar />
      
      {showLoader && (
        <div className>              
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <RingLoader
            color={color}
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</h2>
        </div>
      )}


    {developerInfo && showData && (
  <div>
    <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Developer Information:</h2>
    <div>
      {Array.isArray(developerInfo.developerIDs) && Array.isArray(developerInfo.developerNames) && developerInfo.developerIDs.map((id, index) => (
        <div key={index}>
          Developer ID: {id}, Developer Name: {developerInfo.developerNames[index]}
                {developerInfo.isJack !== undefined && developerInfo.isJack[id] !== undefined && (
                  <span> Jack Status: {developerInfo.isJack[id] ? 'Yes' : 'No'}</span>
                )}
                {developerInfo.Maven !== undefined && developerInfo.Maven[id] !== undefined && (
                  <span> Maven: {developerInfo.Maven[id]}</span>
                )}
        </div>
      ))}
    </div>
  </div>
)}


      {!showLoader && !showData && (
        <div className="RepoLink"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '60vh',
          }}>

          {/* GitHub logo */}
          <div className="GitHubImg" >
          <img
              src={logo2}
              width={200}
              height={200}
              alt="GitHub Logo"
            />
          </div>
          {/* Form */}
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
            {/* Button with loading indicator */}
            <button style={{ width: '100px' }}
              onClick={handleClick}>
              {loading ? 'Loading...' : 'Submit'}
            </button> {/* Adjust button width */}
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;
