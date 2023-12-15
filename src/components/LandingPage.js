import React from 'react';
import '../style/landingPage.css'; // Import the CSS file for styling
import TradingImage from './TradingJournal.jpg'; // Path to your image
import Logo from './Logo.png'

const features = [
  "Smart Analytics: Dive into your trading performance with charts and metrics powered by AI.",
  "Real-Time Data: Get up-to-the-minute market data to stay ahead of the curve.",
  "Journaling Made Easy: Log your trades with a user-friendly interface and review your history anytime.",
  "Mobile Access: Monitor your portfolio on the go with our fully integrated mobile app.",
  "Secure & Private: Your data is encrypted and kept private at all times."
];

const LandingPage = ({ onLogin }) => {
  return (
    <div className="landing-page">
      <nav className="top-nav">
        <img src={Logo} alt="Logo" className="logo" /> {/* Logo added here */}
        <a href="#services" className="nav-link">Services</a> {/* Tab for Services */}
        <a href="#about" className="nav-link">About</a>     {/* Tab for About */}
        <a href="#contact" className="nav-link">Contact</a> {/* Tab for Contact */}
        <button className="auth-button" onClick={onLogin}>Login / Sign Up</button>
      </nav>
      <div className="split-layout">
     
        <div className="text-content">
        <h1 className="h1">Trading Made Easy with Trading Ledger</h1>
          <ul className="features-list">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <button className="cta-button" onClick={onLogin}>Get Started</button>
        </div>
        <div className="image-content">
          <img src={TradingImage} alt="Trading Office" className="trading-image" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;