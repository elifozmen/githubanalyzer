import './styles.css';
import logo2 from './/github_icon.png'
import Navbar from './Navbar';


function App() {
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>

      <div className="RepoLink"> 
        <div className="GitHubImg" 
        style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}>
        <img
                src={logo2}
                width={200}
                height={200}
            />
        </div>
        <div className="LinkForm"> </div>
      </div>
      

    </div>

    
  );
}

export default App;
