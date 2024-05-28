import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar.js';
import './styles.css';
import logo2 from './github_iconn.png';
import BarGraph4 from './BarChart/BarChart4';
import BarGraph from './BarChart/BarChart';
import BarGraph2 from './BarChart/BarChart2';
import BarGraph3 from './BarChart/BarChart3';
import BarGraph5 from './BarChart/BarChart5';
import BoxPlotComponent from './BarChart/BoxPlot1.js';
import { TypeAnimation } from 'react-type-animation';
import Footer from './Footer.js';
import "swiftie/midnights.css";
import StackedPlot from './BarChart/StackedPlot.js';
import SolverComponent from './SolverComponent';

const DeveloperCompatibilities = ({ showCompatibilities, developerInfo5, selectedDeveloperID, selectedDeveloperName, handleDeveloperIDChange, handleDeveloperNameChange, showAll, handleShowAll }) => {
  return (
    <>
      {showCompatibilities && developerInfo5 && developerInfo5.developerIDs && developerInfo5.developerNames && developerInfo5.Similarity && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 className="font-midnights" style={{ color: "#ecf2f8", textAlign: 'center', marginTop: '50px', fontSize: '30px' }}>
            Developer Compatibilities:
          </h2>
          <div style={{ alignItems: "center", alignContent: "center", padding: '10px', borderRadius: '10px', maxWidth: '1000px', margin: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <label style={{ marginRight: '10px' }}>Select Developer Name:</label>
              <select value={selectedDeveloperName} onChange={handleDeveloperNameChange}>
                <option value="">Select Name</option>
                {developerInfo5.developerNames.map((name, index) => (
                  <option key={index} value={name}>{name}</option>
                ))}
              </select>
            </div>
            <button onClick={() => handleShowAll(!showAll)} style={{ marginBottom: '20px' }}>
              {showAll ? 'Show Selected' : 'Show All'}
            </button>
            {developerInfo5.developerIDs.map((id, index) => (
              (showAll || id === selectedDeveloperID || developerInfo5.developerNames[index] === selectedDeveloperName) && (
                <div className="nav-item2" key={index} style={{ marginBottom: '40px' }}>
                  <table className="generalInfoSim" style={{ margin: '0 auto', width: '1000px' }}>
                    <thead className="tableHeadSim">
                      <tr className="tableColumnsSim">
                        <th className="tableHeadCellsSim" style={{ padding: '8px' }}>Developer ID</th>
                        <th className="tableHeadCellsSim" style={{ padding: '8px' }}>Developer Name</th>
                        <th className="tableHeadCellsSim" style={{ padding: '8px' }}>Similar Developers</th>
                      </tr>
                    </thead>
                    <tbody key={index}>
                      <tr>
                        <td className="tableCellsSim" style={{ border: '1px solid gray', padding: '8px', textAlign: 'center' }}>{id}</td>
                        <td className="tableCellsSim" style={{ border: '1px solid gray', padding: '8px', textAlign: 'center' }}>{developerInfo5.developerNames[index]}</td>
                        <td className="tableCellsSim" style={{ border: '1px solid gray', padding: '8px', textAlign: 'center' }}>
                          <ul style={{ listStyle: 'none', padding: '2px', margin: '2px' }}>
                            {Object.entries(developerInfo5.Similarity[id]).map(([similarDev, similarity], simIndex) => (
                              <li key={simIndex}>
                                Developer ID: {similarDev}, Developer Name: {developerInfo5.developerNames[developerInfo5.developerIDs.indexOf(similarDev)]}, Similarity: {similarity.toFixed(3)}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const DeveloperCommitDetails = ({ developerCommitDetails }) => {
  const parseDate = (dateString) => {
    if (dateString && typeof dateString === 'string') {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString();
      } else {
        const [year, month, day] = dateString.split(' ')[0].split('-');
        return new Date(year, month - 1, day).toLocaleDateString();
      }
    }
    return '';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h2 className="font-midnights" style={{ color: "#ecf2f8", textAlign: 'center', marginTop: '20px', fontSize: '30px' }}>
        Developer Commit Details:
      </h2>
      {developerCommitDetails && developerCommitDetails.commit_times && developerCommitDetails.commit_frequency && (
        <div style={{ alignItems: "center", alignContent: "center", padding: '10px', borderRadius: '10px', maxWidth: '1000px', margin: 'auto' }}>
          <table className="generalInfoSim" style={{ margin: '0 auto', width: '1000px' }}>
            <thead className="tableHeadSim">
              <tr className="tableColumnsSim">
                <th className="tableHeadCellsSim" style={{ padding: '8px' }}>Developer Name</th>
                <th className="tableHeadCellsSim" style={{ padding: '8px' }}>First Commit</th>
                <th className="tableHeadCellsSim" style={{ padding: '8px' }}>Last Commit</th>
                <th className="tableHeadCellsSim" style={{ padding: '8px' }}>Commit Frequency</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(developerCommitDetails.commit_times).map((developer, index) => (
                <tr key={index}>
                  <td className="tableCellsSim" style={{ border: '1px solid gray', padding: '8px', textAlign: 'center' }}>
                    {developer}
                  </td>
                  <td className="tableCellsSim" style={{ border: '1px solid gray', padding: '8px', textAlign: 'center' }}>
                    {parseDate(developerCommitDetails.commit_times[developer].first_commit)}
                  </td>
                  <td className="tableCellsSim" style={{ border: '1px solid gray', padding: '8px', textAlign: 'center' }}>
                    {parseDate(developerCommitDetails.commit_times[developer].last_commit)}
                  </td>
                  <td className="tableCellsSim" style={{ border: '1px solid gray', padding: '8px', textAlign: 'center' }}>
                    {developerCommitDetails.commit_frequency[developer]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

function Home() {
  const [val, setVal] = useState("Paste your GitHub repository link here.");
  const [developerInfo, setDeveloperInfo] = useState(null);
  const [developerInfo4, setDeveloperInfo4] = useState(null);
  const [developerInfo5, setDeveloperInfo5] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);

  const [showInfo, setShowInfo] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showCompatibilities, setShowCompatibilities] = useState(false);
  const [showWorkload, setShowWorkload] = useState(false);
  const [showIssue, setShowIssue] = useState(false);

  

  const [selectedDeveloperID, setSelectedDeveloperID] = useState('');
  const [selectedDeveloperName, setSelectedDeveloperName] = useState('');
  const [showAllDevelopers, setShowAllDevelopers] = useState(false);

  const [developerCommitDetails, setDeveloperCommitDetails] = useState(null);

  const getDeveloperCommitDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5001/get-developer-commit-details');
      setDeveloperCommitDetails(response.data);
    } catch (error) {
      console.error('Error getting developer commit details:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (dataUpdated) {
        await getDeveloperInfo4();
        await getDeveloperInfo();
        await fetchDeveloperSimilarity();
        await getDeveloperCommitDetails(); 
        await // Fetch commit details

        setDataUpdated(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [dataUpdated]);

  const sendGitHubLinkToFlask = (githubLink) => {
    axios.post('http://localhost:5001/submit-github-link', { github_link: githubLink })
      .then(response => {
        setShowMessage(true);
        setDataUpdated(true);
      })
      .catch(error => {
        console.error('Error sending GitHub link to Flask:', error);
      });
  };

  const getDeveloperInfo4 = async () => {
    try {
      const response = await axios.get('http://localhost:5001/get-developer-info4');
      setDeveloperInfo4({
        total_commit_count: response.data.total_commit_count,
        total_file_count: response.data.total_file_count,
        total_developer_count: response.data.total_developer_count,
        developer_names: response.data.developer_names,
        developer_issues: response.data.developer_issues,
      });
      setShowMessage(false);
    } catch (error) {
      console.error('Error getting developer info4:', error);
    }
  };

  const getDeveloperInfo = async () => {
    try {
      const response = await axios.get('http://localhost:5001/get-developer-info');
      setDeveloperInfo(response.data);
      await getDeveloperInfo2();
      await getDeveloperInfo3();
    } catch (error) {
      console.error('Error getting developer info:', error);
    }
  };

  const getDeveloperInfo2 = async () => {
    try {
      const response = await axios.get('http://localhost:5001/get-developer-info2');
      setDeveloperInfo(prevState => ({
        ...prevState,
        JackRatios: response.data.JackRatios
      }));
    } catch (error) {
      console.error('Error getting developer info2:', error);
    }
  };

  const getDeveloperInfo3 = async () => {
    try {
      const response = await axios.get('http://localhost:5001/get-developer-info3');
      setDeveloperInfo(prevState => ({
        ...prevState,
        Maven: response.data.Maven
      }));
    } catch (error) {
      console.error('Error getting developer info3:', error);
    }
  };

  const fetchDeveloperSimilarity = async () => {
    try {
      const response = await axios.get('http://localhost:5001/get-similarity');
      setDeveloperInfo5(response.data);
    } catch (error) {
      console.error('Error fetching developer similarity:', error);
    }
  };

  const handleClick = () => {
    sendGitHubLinkToFlask(val);
    setShowMessage(true);
  };

  const handleChange = event => {
    setVal(event.target.value);
  };

  const handleInfoButtonClick = () => {
    setShowInfo(true);
    setShowCategories(false);
    setShowCompatibilities(false);
    setShowWorkload(false);
    setShowIssue(false);

  };

  const handleCategoriesButtonClick = () => {
    setShowInfo(false);
    setShowCategories(true);
    setShowCompatibilities(false);
    setShowWorkload(false);
    setShowIssue(false);

  };

  const handleCompatibilitiesButtonClick = () => {
    setShowInfo(false);
    setShowCategories(false);
    setShowCompatibilities(true);
    setShowWorkload(false);
    setShowIssue(false);

  };

  const handleWorkloadButtonClick = () => {
    setShowInfo(false);
    setShowCategories(false);
    setShowCompatibilities(false);
    setShowWorkload(true);
    setShowIssue(false);
  };

  const handleIssueButtonClick = () => {
    setShowInfo(false);
    setShowCategories(false);
    setShowCompatibilities(false);
    setShowWorkload(false);
    setShowIssue(true);
  };

  const handleDeveloperIDChange = (event) => {
    setSelectedDeveloperID(event.target.value);
  };

  const handleDeveloperNameChange = (event) => {
    setSelectedDeveloperName(event.target.value);
  };

  const handleShowAll = (show) => {
    setShowAllDevelopers(show);
  };

  const apiUrl1 = 'http://localhost:5001/get-box-plot-1-data';
  const apiUrl2 = 'http://localhost:5001/get-box-plot-2-data';


  return (
    <div style={{ color: 'white' }}>
      <Navbar />
      <div className="repo-link" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'top', marginBottom: '100px' }}>
        <div className="github-img">
          <img src={logo2} width={500} height={500} alt="GitHub Logo" />
        </div>
        <div className="link-form" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '50px', width: '800px' }}>
          <input className="linkInput" type="text" placeholder={val} onChange={handleChange} />
          <button className="dir-control" style={{ color: "#4894fc", textColor: '#4894fc', fontFamily: 'Midnights', width: '800px', height: '60px', fontSize:'40px'}} onClick={handleClick}> Submit </button>
          {showMessage && (
            <TypeAnimation sequence={['We are gathering information...', 2000, 'Thank you for your patience...', 2000, 'Please wait...', 2000, 'Thank you for using GitHub Analyzer...', 2000, ]} wrapper="span" speed={70} style={{ color: '#4894fc', fontFamily: 'Midnights', fontSize: '50px', display: 'inline-block', paddingTop: '50px' }} repeat={Infinity} />
          )}
          <div className="buttonSection" style={{fontFamily:'Midnights', border: '0px solid white', borderRadius:'10px'}}>
            <div className="aa">
              <div className="anadiv">
                <div className="button-section" style={{paddingLeft:'10px'}} id="infoButton" onClick={handleInfoButtonClick}>
                  <button className="buttoncont">General Information</button>
                </div>
                <div className="button-section" style={{alignContent:"center"}} id="categoryButton" onClick={handleCategoriesButtonClick}>
                  <button className="buttoncont">Categories</button>
                </div>
                <div className="button-section" style={{alignContent:"center"}} id="similarButton" onClick={handleCompatibilitiesButtonClick}>
                  <button className="buttoncont">Compatibilities</button>
                </div>
                <div className="button-section" style={{paddingLeft:"120px"}} id="workloadButton" onClick={handleWorkloadButtonClick}>
                  <button className="buttoncont">Workload Distribution</button>
                </div>
                <div className="button-section" style={{paddingLeft:"120px"}} id="workloadButton" onClick={handleIssueButtonClick}>
                  <button className="buttoncont">Issue Distribution</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showInfo && developerInfo4 && (
        <div className="generalInformationDiv" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 className="font-midnights" style={{ color: "#ecf2f8", textAlign: 'center', marginTop: '20px', fontSize:'30px'}}>General Information:</h2>
          <div style={{ padding: '5px', borderRadius: '10px', maxWidth: '600px', margin: 'auto', color: 'white' }}>
            <table className="generalInfo" style={{ margin: '0 auto' }}>
              <thead className="tableHead">
                <tr className="tableColumns" style={{ borderColor: '#282c34' }}>
                  <th className="tableHeadCells" style={{ padding: '8px' }}>Developer Names</th>
                  <th className="tableHeadCells" style={{ padding: '8px' }}>Total Commit Count</th>
                  <th className="tableHeadCells" style={{ padding: '8px' }}>Total File Count</th>
                  <th className="tableHeadCells" style={{ padding: '8px' }}>Total Developer Count</th>
                  <th className="tableHeadCells" style={{ padding: '8px' }}>Total Issue Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="tableCells" style={{ border: '1px solid gray', padding: '8px' }}>{developerInfo4.developer_names.join(', ')}</td>
                  <td className="tableCells" style={{ border: '1px solid gray', padding: '8px' }}>{developerInfo4.total_commit_count}</td>
                  <td className="tableCells" style={{ border: '1px solid gray', padding: '8px' }}>{developerInfo4.total_file_count}</td>
                  <td className="tableCells" style={{ border: '1px solid gray', padding: '8px' }}>{developerInfo4.total_developer_count}</td>
                  <td className="tableCells" style={{ border: '1px solid gray', padding: '8px' }}>{developerInfo4.closed_issues}</td>

                </tr>
              </tbody>
            </table>
          </div>
          <DeveloperCommitDetails developerCommitDetails={developerCommitDetails} />
          <h1 > Monthly Lines of Coded Stack Plot</h1>
          <div style={{border: '1px solid #C4C4C4', borderRadius: "0.375rem", margin: "20px 0px 60px 0px"}}>
              <StackedPlot/>
            </div>
        </div>
      )}
      {showCategories && developerInfo && developerInfo.developerIDs && developerInfo.developerNames && (
        <div>
          <h2 className="font-midnights" style={{ color: "#ecf2f8", textAlign: 'center', marginTop: '50px', fontSize:'30px' }}>Developer Categories:</h2>
          <div style={{ padding: '5px', borderRadius: '10px', maxWidth: '600px', margin: 'auto', marginTop: '5px', marginLeft:'500px'}}>
            <table className="generalInfo">
              <thead className="tableHead">
                <tr className="tableColumns">
                  <th className="tableHeadCells" style={{ padding: '8px' }}>Developer ID</th>
                  <th className="tableHeadCells" style={{ padding: '8px' }}>Developer Name</th>
                  <th className="tableHeadCells" style={{ padding: '8px' }}>File Coverage Rate (%)</th>
                  <th className="tableHeadCells" style={{ padding: '8px' }}>Rare File Coverage Rate (%)</th>
                </tr>
              </thead>
              <tbody>
                {developerInfo.developerIDs.map((id, index) => (
                  <tr key={index}>
                    <td className="tableCells" style={{ border: '1px solid gray', padding: '8px' }}>{id}</td>
                    <td className="tableCells" style={{ border: '1px solid gray', padding: '8px' }}>{developerInfo.developerNames[index]}</td>
                    <td className="tableCells" style={{ border: '1px solid gray', padding: '8px' }}>
                      {developerInfo.JackRatios && developerInfo.JackRatios[id] ? `${developerInfo.JackRatios[id].toFixed(3)}%` : '-'}
                    </td>
                    <td className="tableCells" style={{ border: '1px solid gray', padding: '8px' }}>
                      {developerInfo.Maven && developerInfo.Maven[id] ? `${developerInfo.Maven[id].toFixed(3)}%` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <DeveloperCompatibilities
        showCompatibilities={showCompatibilities}
        developerInfo5={developerInfo5}
        selectedDeveloperID={selectedDeveloperID}
        selectedDeveloperName={selectedDeveloperName}
        handleDeveloperIDChange={handleDeveloperIDChange}
        handleDeveloperNameChange={handleDeveloperNameChange}
        showAll={showAllDevelopers}
        handleShowAll={handleShowAll}
      />
      {showCompatibilities && developerInfo5 && developerInfo5.developerIDs && developerInfo5.developerNames && developerInfo5.Similarity && (
        <div className="simMatrix">
          <h2 className="font-midnights" style={{ color: "#ecf2f8", textAlign: 'center', marginTop: '10px', fontSize:'30px' }}>Developer Compatibility Matrix</h2>
          <BarGraph4 title="Matrix" />
        </div>
      )}
      {showWorkload && developerInfo4 && (
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
            <div className="grid-item" style={{border: '1px solid #C4C4C4', borderRadius: "0.375rem"}}>
              <BoxPlotComponent title={"Box Plot Files"} apiUrl={apiUrl1} />
            </div>
            <div className="grid-item" style={{border: '1px solid #C4C4C4', borderRadius: "0.375rem"}}>
              <BoxPlotComponent title={"Box Plot Lines"} apiUrl={apiUrl2} />
            </div>
          </div>
        </div>
      )}


{showIssue &&  (
        <div >
            <SolverComponent title={"Solvers"} />  
        </div>
      )}



      
      <Footer/>
    </div>
  );
}

export default Home;
