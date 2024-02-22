import './styles.css';
import logo2 from './/github_icon.png'
import Navbar from './Navbar';
import { useState } from 'react';



function App() {
  const [val, setVal] = useState("Paste your GitHub repository link here.")
  const click = () => {
    alert(val)
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
        alignItems: 'center',
        
      }}>
          <input type="text"
      placeholder={val}
      onChange={change}
      
    />
          <button onClick = {click}> Submit </button>
          
          
           </div>
      </div>
      

    </div>

    
  );
}

export default App;
