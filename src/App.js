import './styles.css';
import logo2 from './github_icon.png';
import Navbar from './Navbar';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [val, setVal] = useState("Paste your GitHub repository link here.")

  const sendGitHubLinkToFlask = (githubLink) => {
    axios.post('http://localhost:5000/submit-github-link', { github_link: githubLink })
      .then(response => {
        // Handle the response here
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error sending GitHub link to Flask:', error);
      });
  };

  const click = () => {
    sendGitHubLinkToFlask(val);
  }

  const change = event => {
    setVal(event.target.value)
  }
  
  return (
    <div>
      <div>
        <Navbar></Navbar>
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
            onChange={change}
            style={{ width: '100%',
              marginBottom: '10px',
            }} // Adjust input width and spacing
          />
          <button style={{ width: '100px' }} 
            onClick={click}> Submit </button> {/* Adjust button width */}
        </div>
      </div>
    </div>
  );
}

export default App;
