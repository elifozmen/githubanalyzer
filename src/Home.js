import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar.js'; // Import Navbar component
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
    // No need to call sendGitHubLinkToFlask here since it's invoked on button click
  }, []);

  const sendGitHubLinkToFlask = (githubLink) => {
    setLoading(true); // Start loading when request starts
    setShowLoader(true); // Show the loader when the button is clicked
    axios.post('http://localhost:5001/submit-github-link', { github_link: githubLink })
      .then(response => {
        console.log(response.data);
        setDeveloperInfo(response.data);
        setShowLoader(false); // Hide loader after receiving response
        setShowData(true); // Show data after receiving response
      })
      .catch(error => {
        console.error('Error sending GitHub link to Flask:', error);
        setLoading(false); // Stop loading on error
        setShowLoader(false); // Hide loader on error
        setShowData(false); // Hide data on error
      });
  };

  const handleClick = () => {
    sendGitHubLinkToFlask(val);
  };

  const handleChange = event => {
    setVal(event.target.value);
  };

  return (
    <div style={{ color: 'white' }}>
      <Navbar />

      {showLoader && (
        <div className="loader">
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

      {!showLoader && !showData && (
        <div className="repo-link"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '60vh',
          }}>
          {/* GitHub logo */}
          <div className="github-img" >
            <img
              src={logo2}
              width={200}
              height={200}
              alt="GitHub Logo"
            />
          </div>
          {/* Form */}
          <div className="link-form"
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
              style={{
                width: '100%',
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

      {/* Show loading state if no data but request is made */}
      {!developerInfo && showLoader && (
        <div className="loader">
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
    </div>
  );
}

export default Home;
