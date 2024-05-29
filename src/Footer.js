import React from 'react';
import { Link } from 'react-router-dom'; // Assuming internal routing is required for some links

export default function Footer() {
    return (
<footer class="footer">
    <div class="footer-container">
        <div class="left-content">
            <h6 class="footer-heading">GitHub Analyzer</h6>
            <p>Explore, Analyze, Innovate – Make Your Repos Speak!</p>
        </div>
        
        <div class="rigth-content">
            <h6 class="footer-heading">CONTACT</h6>
            <p><i class="fas fa-home"></i> Çekmeköy, Istanbul, Turkey</p>
            <p><i class="fas fa-envelope"></i> info@gmail.com</p>
            <p><i class="fas fa-phone"></i> + 01 234 567 88</p>
            
        </div>
    </div>
    
</footer>
    /*<div class="footer-bottom">
        © 2024 Copyright :
        <a href="https://www.instagram.com/tugceozgirginn/">tugceozgirgin</a>
    </div>*/ 

    );
}
