import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar.js'; // Import Navbar component
import './styles.css';
import RingLoader from "react-spinners/RingLoader";
import logo2 from './github_icon.png';
import BarGraph4 from './BarChart/BarChart4';
import BarGraph from './BarChart/BarChart';
import BarGraph2 from './BarChart/BarChart2';
import BarGraph3 from './BarChart/BarChart3';
import BarGraph5 from './BarChart/BarChart5';
import { TypeAnimation } from 'react-type-animation';
import "swiftie/midnights.css"




function Home() {
  const [val, setVal] = useState("Paste your GitHub repository link here.");
  const [developerInfo, setDeveloperInfo] = useState(null);
  const [developerInfo4, setDeveloperInfo4] = useState(null);
  const [developerInfo5, setDeveloperInfo5] = useState(null);
  const [showMessage, setShowMessage] = useState(false);




  useEffect(() => {
    // No need to call sendGitHubLinkToFlask here since it's invoked on button click
    getDeveloperInfo4();
    getDeveloperInfo();

    const fetchDeveloperSimilarity = async () => {
      try {
        const response = await axios.get('http://localhost:5001/get-similarity');
        setDeveloperInfo5(response.data);
      } catch (error) {
        console.error('Error fetching developer similarity:', error);
      }
    };

    // Call the function to fetch data when component mounts
    fetchDeveloperSimilarity();
  }, []);

  const sendGitHubLinkToFlask = (githubLink) => {
    axios.post('http://localhost:5001/submit-github-link', { github_link: githubLink })
      .then(response => {
        console.log(response.data);
        setDeveloperInfo(response.data);

      })
      .catch(error => {
        console.error('Error sending GitHub link to Flask:', error);
      });
  };


  const getDeveloperInfo4 = () => {
    axios.get('http://localhost:5001/get-developer-info4')
      .then(response => {
        console.log(response.data);
        setDeveloperInfo4({
          total_commit_count: response.data.total_commit_count,
          total_file_count: response.data.total_file_count,
          total_developer_count: response.data.total_developer_count,
          developer_names: response.data.developer_names,
        });
      })
      .catch(error => {
        console.error('Error getting developer info4:', error);
      });
  };


  const getDeveloperInfo = () => {
    axios.get('http://localhost:5001/get-developer-info')
      .then(response => {
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
          JackRatios: response.data.JackRatios
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
    setShowMessage(true); // showMessage state'ini true yaparak mesajı göster
  };


  const handleChange = event => {
    setVal(event.target.value);
  };

  return (
    <div style={{ color: 'white' }}>
      <Navbar />

      <div className="repo-link"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'top',
          height: '60vh',
        }}>
        {/*  */}
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
          <input className="linkInput" type="text"
            placeholder={val}

            onChange={handleChange}
    
          />
          {/* Button with loading indicator */}
          <button className="dir-control" style={{ fontFamily:'Midnights', width: '400px', height: '40px' }}
            onClick={handleClick}> Submit
          </button> {/* Adjust button width */}
        </div>
        {showMessage && (
          <TypeAnimation
            sequence={[
              'We are gathering information...',
              2000,
              'Thank you for your patience...',
              2000,
              'Please wait...',
              2000,
              'Thank you for using GitHub Analyzer....',
              2000
            ]}
            wrapper="span"
            speed={70}
            style={{color:'#a8c1f5f8' , fontFamily:'Midnights', fontSize: '25px', display: 'inline-block', padding:'10px' }}
            repeat={Infinity}
          />
        )}

      </div>


      {/* Developer Information */}
      {developerInfo4 && (
        <div>
          <h2 className="font-midnights" style={{ textAlign: 'center', marginTop: '20px' }}>General Information:</h2>
          <div style={{padding: '10px', borderRadius: '10px', maxWidth: '600px', margin: 'auto', color: 'white' }}>
            <table style={{ margin: 'auto', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th className="font-midnights" style={{ border: '1px solid white', padding: '8px' }}>Developer Names</th>
                  <th className="font-midnights" style={{ border: '1px solid white', padding: '8px' }}>Total Commit Count</th>
                  <th className="font-midnights" style={{ border: '1px solid white', padding: '8px' }}>Total File Count</th>
                  <th className="font-midnights" style={{ border: '1px solid white', padding: '8px' }}>Total Developer Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-midnights" style={{ border: '1px solid white', padding: '8px' }}>{developerInfo4.developer_names.join(', ')}</td>
                  <td className="font-midnights" style={{ border: '1px solid white', padding: '8px' }}>{developerInfo4.total_commit_count}</td>
                  <td className="font-midnights" style={{ border: '1px solid white', padding: '8px' }}>{developerInfo4.total_file_count}</td>
                  <td className="font-midnights" style={{ border: '1px solid white', padding: '8px' }}>{developerInfo4.total_developer_count}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Developer Categories */}

      {developerInfo ? (
        <div>
          <h2 className="font-midnights" style={{ textAlign: 'center', marginTop: '20px' }}>Developer Information:</h2>
          <div style={{padding: '10px', borderRadius: '10px', maxWidth: '600px', margin: 'auto' }}>
            <table style={{ margin: 'auto', borderCollapse: 'collapse' }}>
              <thead>
                <tr className="font-midnights">
                  <th className="font-midnights" style={{ border: '1px solid white', padding: '8px' }}>Developer ID</th>
                  <th className="font-midnights" style={{ border: '1px solid white', padding: '8px' }}>Developer Name</th>
                  <th className="font-midnights" style={{ border: '1px solid white', padding: '8px' }}>Jack (%)</th>
                  <th className="font-midnights" style={{ border: '1px solid white', padding: '8px' }}>Maven (%)</th> {/* Updated header */}
                </tr>
              </thead>
              <tbody>
                {developerInfo.developerIDs.map((id, index) => (
                  <tr key={index}>
                    <td className="font-midnights" style={{ border: '1px solid white', padding: '8px' }}>{id}</td>
                    <td className="font-midnights" style={{ border: '1px solid white', padding: '8px' }}>{developerInfo.developerNames[index]}</td>
                    <td className="font-midnights" style={{ border: '1px solid white', padding: '8px' }}>
                      {developerInfo.JackRatios && developerInfo.JackRatios[id] ? `${developerInfo.JackRatios[id].toFixed(3)}%` : '-'}
                    </td>
                    <td className="font-midnights" style={{ border: '1px solid white', padding: '8px' }}>
                      {developerInfo.Maven && developerInfo.Maven[id] ? `${developerInfo.Maven[id].toFixed(3)}%` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="font-midnights" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>

        </div>
      )}


      {/* Developer Compatibilities */}

      {/* Display developer similarity data */}

      {developerInfo5 && (
        <div >
          <h2 className="font-midnights" style={{ textAlign: 'center', marginTop: '20px' }}>Developer Similarity: </h2>
          <div className="grid-container_similarity" style={{ fontFamily:'Midnights', padding: '40px', borderRadius: '10px', maxWidth: '1000px', margin: 'auto' }}>

            <div  >
              <div>

                <div className="nav-list2" >
                  {developerInfo5.developerIDs.map((id, index) => (
                    <div className="nav-item2" key={index}>
                      Developer ID: {id}, Developer Name: {developerInfo5.developerNames[index]}
                      <div>
                        Similar Developers:
                        <ul>
                          {Object.entries(developerInfo5.Similarity[id]).map(([similarDev, similarity], index) => (
                            <li key={index}>
                              Developer ID: {similarDev}, Similarity: {similarity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                  <div className="nav-item2">
                    <BarGraph4 title="Matrix" />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}



      {/* Project Workload */}
      <div>
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
            <BarGraph5 title="Balance" />
          </div>

        </div>
      </div>



    </div>
  );
}

export default Home;