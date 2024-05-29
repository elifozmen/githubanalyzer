import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar.js';
import './styles.css';
import "./Template/assets/css/black-dashboard-react.css";
import "./Template/assets/css/black-dashboard-react.css.map";
import "./Template/assets/css/nucleo-icons.css";
import { SimpleTableView } from "./Template/backedComponents/SimpleTable/SimpleTableView.js";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

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
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import PyramidChartComponent from './BarChart/PyramidChart.js';


const DeveloperCompatibilities = ({ showCompatibilities, developerInfo5, selectedDeveloperID, selectedDeveloperName, handleDeveloperIDChange, handleDeveloperNameChange, showAll, handleShowAll }) => {
  if (!showCompatibilities || !developerInfo5 || !developerInfo5.developerIDs || !developerInfo5.developerNames || !developerInfo5.Similarity) {
    return null;
  }

  const tableData = developerInfo5.developerIDs.map((id, index) => {
    if (showAll || id === selectedDeveloperID || developerInfo5.developerNames[index] === selectedDeveloperName) {
      return {
        "Developer ID": id,
        "Developer Name": developerInfo5.developerNames[index],
        "Similar Developers": (
          <ul style={{ listStyle: 'none', padding: '2px', margin: '2px' }}>
            {Object.entries(developerInfo5.Similarity[id]).map(([similarDev, similarity], simIndex) => (
              <li key={simIndex}>
                Developer ID: {similarDev}, Developer Name: {developerInfo5.developerNames[developerInfo5.developerIDs.indexOf(similarDev)]}, Similarity: {similarity.toFixed(3)}
              </li>
            ))}
          </ul>
        )
      };
    }
    return null;
  }).filter(row => row !== null);

  return (
    <>
     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 className="font-midnights" style={{ color: "#ecf2f8", textAlign: 'center', marginTop: '50px', fontSize: '30px' }}>
        Developer Compatibilities:
      </h2>
      <div style={{ alignItems: "center", alignContent: "center", padding: '10px', borderRadius: '10px', maxWidth: '1000px', margin: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <label style={{ marginRight: '15px', fontSize:'15px' }}>Select Developer Name:</label>
          <select
            value={selectedDeveloperName}
            onChange={handleDeveloperNameChange}
            style={{ padding: '5px', fontSize: '15px', borderRadius: '5px', border: '1px solid #ccc', textAlign: 'center'}}
          >
            <option value="">Select Name</option>
            {developerInfo5.developerNames.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <Button
          className="btn-fill"
          color="primary"
          style={{ marginBottom: '20px', width: '200px', height: '40px', fontSize: '15px' }}
          onClick={() => handleShowAll(!showAll)}
        >
          {showAll ? 'Show Selected' : 'Show All'}
        </Button>
        <SimpleTableView
          dataHeaders={["Developer ID", "Developer Name", "Similar Developers"]}
          data={tableData}
        />
      </div>
    </div>
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

  if (!developerCommitDetails || !developerCommitDetails.commit_times || !developerCommitDetails.commit_frequency) {
    return null;
  }

  const tableData = Object.keys(developerCommitDetails.commit_times).map((developer, index) => ({
    "Developer Name": developer,
    "First Commit": parseDate(developerCommitDetails.commit_times[developer].first_commit),
    "Last Commit": parseDate(developerCommitDetails.commit_times[developer].last_commit),
    "Commit Frequency": developerCommitDetails.commit_frequency[developer]
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h2 className="font-midnights" style={{ color: "#ecf2f8", textAlign: 'center', marginTop: '20px', fontSize: '30px' }}>
        Developer Commit Details:
      </h2>
      <div style={{ alignItems: "center", alignContent: "center", padding: '10px', borderRadius: '10px', maxWidth: '1000px', margin: 'auto' }}>
        <SimpleTableView
          dataHeaders={["Developer Name", "First Commit", "Last Commit", "Commit Frequency"]}
          data={tableData}
        />
      </div>
    </div>
  );
};



const DeveloperCategories = ({ showCategories, developerInfo }) => {
  if (!showCategories || !developerInfo || !developerInfo.developerIDs || !developerInfo.developerNames) {
    return null;
  }

  const JackRatios = developerInfo.JackRatios || {};
  const MavenRatios = developerInfo.Maven || {};

  const totalJackRatios = developerInfo.developerIDs.reduce((sum, id) => {
    return sum + (JackRatios[id] || 0);
  }, 0);

  const totalMavenRatios = developerInfo.developerIDs.reduce((sum, id) => {
    return sum + (MavenRatios[id] || 0);
  }, 0);

  const averageJackRatio = (totalJackRatios / developerInfo.developerIDs.length).toFixed(3);
  const averageMavenRatio = (totalMavenRatios / developerInfo.developerIDs.length).toFixed(3);

  const dataFileCoverage = {
    labels: developerInfo.developerNames,
    datasets: [
      {
        label: 'File Coverage Rate (%)',
        data: developerInfo.developerIDs.map(id => JackRatios[id] || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        textColor: 'rgba(250, 250, 250, 250)',
      },
    ],
  };

  const dataRareFileCoverage = {
    labels: developerInfo.developerNames,
    datasets: [
      {
        label: 'Rare File Coverage Rate (%)',
        data: developerInfo.developerIDs.map(id => MavenRatios[id] || 0),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = (title) => ({
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        color: '#ffffff', // Set the title color to white
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Developers',
          color: '#ffffff', // Set the x-axis title color to white
        },
        ticks: {
          color: '#ffffff', // Set the x-axis tick color to white
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Percentage',
          color: '#ffffff', // Set the y-axis title color to white
        },
        ticks: {
          beginAtZero: true,
          color: '#ffffff', // Set the y-axis tick color to white
        },
      },
    },
  });
  

  return (
    <div>
      <h2 className="font-midnights" style={{ color: "#ecf2f8", textAlign: 'center', marginTop: '50px', fontSize: '30px' }}>Developer Categories:</h2>
      <div style={{ padding: '5px', borderRadius: '10px', maxWidth: '600px', margin: 'auto', marginTop: '5px' }}>
        <SimpleTableView
          dataHeaders={["Developer ID", "Developer Name", "File Coverage Rate (%)", "Rare File Coverage Rate (%)"]}
          data={developerInfo.developerIDs.map((id, index) => ({
            "Developer ID": id,
            "Developer Name": developerInfo.developerNames[index],
            "File Coverage Rate (%)": JackRatios[id] ? JackRatios[id].toFixed(3) : '-',
            "Rare File Coverage Rate (%)": MavenRatios[id] ? MavenRatios[id].toFixed(3) : '-',
          }))}
        />
      </div>
      <div style={{ marginTop: '50px' }}>
        <h2 className="font-midnights" style={{ color: "#ecf2f8", textAlign: 'center', fontSize: '30px' }}>File Coverage Rate (%)</h2>
        <div style={{ padding: '5px', borderRadius: '10px', maxWidth: '1000px', margin: 'auto' }}>
          <Bar data={dataFileCoverage} options={options('File Coverage Rate (%)')} />
        </div>
      </div>
      <div style={{ marginTop: '50px' }}>
        <h2 className="font-midnights" style={{ color: "#ecf2f8", textAlign: 'center', fontSize: '30px' }}>Rare File Coverage Rate (%)</h2>
        <div style={{ padding: '5px', borderRadius: '10px', maxWidth: '1000px', margin: 'auto' }}>
          <Bar data={dataRareFileCoverage} options={options('Rare File Coverage Rate (%)')} />
        </div>
      </div>
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
        setDataUpdated(false);  // Reset the update trigger after fetching data
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
        total_issues: response.data.total_issues,
        closed_issues: response.data.closed_issues,
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
      <div className="repo-link" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'top', marginBottom: '100px', marginTop: '80px' }}>
        <div className="content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Row style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <Col md="8" style={{ maxWidth: '800px' }}>
                        <Card style={{ width: '100%' }}>
                            <CardBody style={{ width: '100%' }}>
                                <Form style={{ width: '100%', textAlign: 'center' }}>
                                    <div className="github-img" style={{ textAlign: 'center', marginBottom: '20px' }}>
                                        <img src={logo2} width={300} height={300} alt="GitHub Logo" />
                                    </div>
                                    <FormGroup style={{ width: '100%' }}>
                                        <Input
                                            cols="80"
                                            placeholder="Paste your Github repository link here"
                                            rows="4"
                                            type="textarea"
                                            style={{ width: '100%', fontSize: '20px', textAlign: 'center' }}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                </Form>
                            </CardBody>
                            <CardFooter style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button className="btn-fill" color="primary" style={{ width: '100%', maxWidth: '700px', height: '60px', fontSize: '20px' }} onClick={handleClick}>
                                    Submit
                                </Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
          {showMessage && (
            <TypeAnimation sequence={['We are gathering information...', 2000, 'Thank you for your patience...', 2000, 'Please wait...', 2000, 'Thank you for using GitHub Analyzer...', 2000, ]} wrapper="span" speed={70} style={{ color: 'primary', fontFamily: 'Midnights', fontSize: '40px', display: 'inline-block', paddingTop: '50px' }} repeat={Infinity} />
          )}
          <div className="buttonSection">
  <div className="anadiv">
    <div className="button-section" id="infoButton" onClick={handleInfoButtonClick}>
      <Button className="btn-fill" color="primary" style={{ width: '250px', height: '80px', fontSize: '20px' }}>General Information</Button>
    </div>
    <div className="button-section" id="categoryButton" onClick={handleCategoriesButtonClick}>
      <Button className="btn-fill" color="primary" style={{ width: '250px', height: '80px', fontSize: '20px' }}>Developer Categories</Button>
    </div>
    <div className="button-section" id="similarButton" onClick={handleCompatibilitiesButtonClick}>
      <Button className="btn-fill" color="primary" style={{ width: '250px', height: '80px', fontSize: '20px' }}>Compatibilities</Button>
    </div>
    <div className="button-section" id="workloadButton" onClick={handleWorkloadButtonClick}>
      <Button className="btn-fill" color="primary" style={{ width: '250px', height: '80px', fontSize: '20px' }}>Workload Distribution</Button>
    </div>
    <div className="button-section" id="issueButton" onClick={handleIssueButtonClick}>
      <Button className="btn-fill" color="primary" style={{ width: '250px', height: '80px', fontSize: '20px' }}>Issue Distribution</Button>
    </div>
  </div>
</div>
          </div>
        
      </div>
      {showInfo && developerInfo4 && (
        <div className="content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <h2 className="font-midnights" style={{ color: "#ecf2f8", textAlign: 'center', marginTop: '20px', fontSize: '30px' }}>General Information:</h2>
          <div style={{ padding: '5px', borderRadius: '10px', maxWidth: '600px', margin: 'auto', color: 'white' }}>
      <SimpleTableView
        dataHeaders={["Developer Names", "Total Commit Count", "Total File Count", "Total Developer Count", "Total Issue Count", "Total Closed Issue Count"]}
        data={[{
          "Developer Names": developerInfo4.developer_names.join(', '),
          "Total Commit Count": developerInfo4.total_commit_count,
          "Total File Count": developerInfo4.total_file_count,
          "Total Developer Count": developerInfo4.total_developer_count,
          "Total Issue Count": developerInfo4.total_issues,
          "Total Closed Issue Count": developerInfo4.closed_issues
        }]}
      />
    </div>
          <DeveloperCommitDetails developerCommitDetails={developerCommitDetails} />
          <h1>Monthly Lines of Coded Stack Plot</h1>
          <div style={{ border: '1px solid #C4C4C4', borderRadius: "0.375rem", margin: "20px 0px 60px 0px" }}>
            <StackedPlot />
          </div>
         
          <div style={{ border: '1px solid #C4C4C4', borderRadius: "0.375rem", margin: "20px 0px 60px 0px" }}>
              <PyramidChartComponent />
            </div>
        </div>
      )}
      {showCategories && <DeveloperCategories showCategories={showCategories} developerInfo={developerInfo} />}
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
          <h2 className="font-midnights" style={{ color: "#ecf2f8", textAlign: 'center', marginTop: '10px', fontSize: '30px' }}>Developer Compatibility Matrix</h2>
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
            <div className="grid-item" style={{ border: '1px solid #C4C4C4', borderRadius: "0.375rem" }}>
              <BoxPlotComponent title={"Box Plot Files"} apiUrl={apiUrl1} />
            </div>
            <div className="grid-item" style={{ border: '1px solid #C4C4C4', borderRadius: "0.375rem" }}>
              <BoxPlotComponent title={"Box Plot Lines"} apiUrl={apiUrl2} />
            </div>
          </div>
        </div>
      )}
      {showIssue && (
        <div>
          <SolverComponent title={"Solvers"} />
        </div>
      )}
    </div>
  );
}

export default Home;
