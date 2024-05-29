import "C:/Users/Elif/githubanalyzer/src/styles.css";
import logo2 from "C:/Users/Elif/githubanalyzer/src/github_iconn.png";
import "./assets/css/black-dashboard-react.css";
import "./assets/css/black-dashboard-react.css.map";
import "./assets/css/nucleo-icons.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TypeAnimation } from 'react-type-animation';

// reactstrap components
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

function HomePage() {
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

  const [selectedDeveloperID, setSelectedDeveloperID] = useState('');
  const [selectedDeveloperName, setSelectedDeveloperName] = useState('');
  const [showAllDevelopers, setShowAllDevelopers] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (dataUpdated) {
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
    const handleClick = () => {
        sendGitHubLinkToFlask(val);
        setShowMessage(true);
      };

    return (
        <div>
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
            </div>

            {showMessage && (
            <TypeAnimation sequence={['We are gathering information...', 2000, 'Thank you for your patience...', 2000, 'Please wait...', 2000, 'Thank you for using GitHub Analyzer...', 2000, 'You may need to refresh the page...', 2000]} wrapper="span" speed={70} style={{ color: '#4894fc', fontFamily: 'Midnights', fontSize: '50px', display: 'inline-block', paddingTop: '50px' }} repeat={Infinity} />
          )}

        </div>

    );
}

export default HomePage;
