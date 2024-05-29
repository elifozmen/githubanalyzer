import { Link } from 'react-router-dom'; // Link componentini import ediyoruz

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="left-content">  
            <img
                  src='/2.png' // Logo image
                  alt='Logo'
                  className='logo2'
                />
                <Link to="/" className='nav-link'>
                    <span className='brand-name'>GithubAnalyzer</span>
                </Link>
            </div>
            <div className="right-content"> 
                <img
                  src='/insta-icon.png' 
                  alt='Media Icon'
                  className='media'
                
                />
                
                <img
                  src='/tiktok-icon.png' 
                  alt='Media Icon'
                  className='media'
                />
            </div>
        </div>
    );
}
