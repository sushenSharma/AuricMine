import React from 'react';
import '../style/landingPage.css'; // Import the CSS file for styling
import TradingImage from './TradingImg.png'; // Path to your image

const LandingPage = ({ onLogin }) => {
    return (
      <div className="landing-page">
        <nav className="top-nav">
          <button className="auth-button" onClick={onLogin}>Login / Sign Up</button>
        </nav>
        <div className="split-layout">
          <div className="text-content">
            <h1>Welcome to the Trading Journal App</h1>
            <p>Track and analyze your trades efficiently with the power of AI.</p>
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
