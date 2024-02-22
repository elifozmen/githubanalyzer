import './styles.css';
import logo2 from './/github_icon.png'
import Navbar from './Navbar';
import { useState } from 'react';



function App() {
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
        alignItems: 'center',
        
      }}>
          <input value = "Paste your GitHub repository link here."/>
          
          
           </div>
      </div>
      

    </div>

    
  );
}

export default App;
