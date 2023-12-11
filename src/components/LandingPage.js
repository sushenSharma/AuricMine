import React from 'react';
import '../style/landingPage.css'; // Import the CSS file for styling
import TradingImage from './TradingJournal.png'; // Path to your image

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
      <h1 className="h1">Welcome to the Next Gen Trading Journal</h1>
        <button className="auth-button" onClick={onLogin}>Login / Sign Up</button>
      </nav>
      <div className="split-layout">
     
        <div className="text-content">
       
          <h2>Track and analyze your trades efficiently with the power of AI.</h2>
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