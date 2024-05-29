// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home.js'; 
import Navbar from './Navbar.js'; 
import Categories from './categories.js'; 
import Compatibility from './compatibility.js';
import Workload from './workload.js';
import Info from './info.js';
import HomePage from './Template/HomePage.js'

function App() {
    return (
      <div>
        <Router>
            <div>
                <Routes>
                    <Route exact path="/" element={<Home />} /> {/* Ana sayfa rotası */}
                    <Route path="/categories" element={<Categories/>} />
                    <Route path="/compatibility" element={<Compatibility/>} />
                    <Route path="/workload" element={<Workload/>} />
                    <Route path="/info" element={<Info/>} />
                    <Route path="/homepage" element={<HomePage/>} />
                    {/* Diğer sayfa rotalarını da buraya ekleyin */}
                </Routes>
            </div>
        </Router>
      </div>
        
    );
}

export default App;
