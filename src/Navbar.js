import { Link } from 'react-router-dom'; // Link componentini import ediyoruz
import logo1 from './logo.png'; // Logo resmini import ediyoruz

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="nav-list">
                <div className="logo">
                    <img
                        src={logo1}
                        width={70}
                        height={70}
                        alt="logo"
                    />
                </div>
                <div className="nav-item">
                    {/* GitHub Analyzer için Link componentini kullanıyoruz */}
                    <Link to="/">GitHub Analyzer</Link>
                </div>
                <div className="nav-item">
                    {/* Developer Categories için Link componentini kullanıyoruz */}
                    <Link to="/categories">Developer Categories</Link>
                </div>
                <div className="nav-item">
                    {/* Compatibility için Link componentini kullanıyoruz */}
                    <Link to="/compatibility">Compatibility</Link>
                </div>
                <div className="nav-item">
                    {/* Workload Distribution için Link componentini kullanıyoruz */}
                    <Link to="/workload">Workload Distribution</Link>
                </div>
                <div className="nav-item">
                    {/* Info için Link componentini kullanıyoruz */}
                    <Link to="/info">Info</Link>
                </div>
            </div>
        </div>
    );
}
