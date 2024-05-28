import React from 'react';
import { Link } from 'react-router-dom'; // Assuming internal routing is required for some links

export default function Footer() {
    return (
<footer class="footer">
    <div class="footer-container">
        <div class="footer-section">
            <h6 class="footer-heading">GitHub Analyzer</h6>
            <p>Explore, Analyze, Innovate – Make Your Repos Speak!.</p>
        </div>
        <div class="footer-section">
            <h6 class="footer-heading">PRODUCTS</h6>
            <ul>
                <li><a href="#" class="footer-link">Repo Analyzer</a></li>
                <li><a href="#" class="footer-link ">Manage Tool</a></li>
                <li><a href="#" class="footer-link">Company Manager</a></li>
            </ul>
        </div>
        <div class="footer-section">
            <h6 class="footer-heading">USEFUL LINKS</h6>
            <ul>
                <li><a href="#" class="footer-link">Your Account</a></li>
                <li><a href="#" class="footer-link">Become an Affiliate</a></li>
                <li><a href="#" class="footer-link">Help</a></li>
            </ul>
        </div>
        <div class="footer-section">
            <h6 class="footer-heading">CONTACT</h6>
            <p><i class="fas fa-home"></i> Çekmeköy, Istanbul, Turkey</p>
            <p><i class="fas fa-envelope"></i> info@gmail.com</p>
            <p><i class="fas fa-phone"></i> + 01 234 567 88</p>
            
        </div>
    </div>
    <div class="footer-bottom">
        © 2024 Copyright :
        <a href="https://www.instagram.com/tugceozgirginn/">tugceozgirgin</a>
    </div>
</footer>

    );
}
