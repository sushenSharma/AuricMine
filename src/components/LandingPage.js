import React from "react";
import "../assets/styles/landingPage.css"; // Import the CSS file for styling
import TradingImage from "../assets/resources/tradingBanner.png"; // Path to your image
import Logo from "../assets/resources/nav_image.png"; // Path to your logo image
import Clienttestimonials from "./Clienttestimonials";
const LandingPage = ({ onLogin }) => {
  return (
    <div className="wrapper">
      <nav className="nav-bar" id="head">
        <img src={Logo} alt="logo" class="logo"></img>
        <ul className="nav-items">
          <li className="nav-item">
            <a href="" className="nav-link">
              Home
            </a>
            <div className="nav-underline"></div>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              About
            </a>
            <div className="nav-underline"></div>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Services
            </a>
            <div className="nav-underline"></div>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Contact Us
            </a>
            <div className="nav-underline"></div>
          </li>
        </ul>
        <div className="auth-buttons">
          <button onClick={onLogin} className="auth-button" id="redbutton">
            Log In
          </button>
          <button
            onClick={onLogin}
            className="auth-button auth-button-right"
            id="greenbutton"
          >
            Sign Up
          </button>
        </div>
      </nav>

      <div className="main-section" id="second">
        <section className="banner">
          <div className="left-content">
            <div className="content-space">
              <h1 className="main-heading">
                Trading Made Easy,
                <br />
                with <span className="text-highlight-red">Trading</span>{" "}
                <span className="text-highlight-green">Journal</span>.
              </h1>
              <div className="divider"></div>
              <p className="description">
                Revolutionize your trades with our AI-driven journal app. Gain
                insights and track performance effortlessly on our cloud-based
                platform.
                <strong>Welcome to a Smarter Way to Trade</strong>
              </p>
              <button className="signup-button" id="signup" onClick={onLogin}>
                Sign Up Now
              </button>
            </div>
            <img
              src={TradingImage}
              alt="Trading Office Scene"
              className="hero-banner"
            />
          </div>
        </section>
      </div>

      <div className="feature" id="features">
        <section className="feature-section">
          <h2 className="feature-title">Why You Should Choose Us?</h2>
          <div className="divider-gradient"></div>
          <div className="cards-container">
            <div className="card-row">
              {/* CARD 1 */}
              <div className="feature-card" id="card1">
                <i className="fa-solid fa-chart-line "></i>
                <h3 className="card-title">Smart Analytics</h3>
                <p className="card-description">
                  Uncover hidden patterns in your data with AI-driven insights,
                  enhancing your trading strategy.
                </p>
              </div>
              {/* CARD 2 */}
              <div className="feature-card card-background" id="card2">
                <i className="fa-regular fa-clock "></i>
                <h3 className="card-title">Enhanced Performance Analytics</h3>
                <p className="card-description">
                  Unlock detailed insights into your trades with key performance
                  metrics.
                </p>
              </div>
            </div>
            <div className="card-row">
              {/* CARD 3 */}
              <div className="feature-card" id="card3">
                <i className="fa-solid fa-book"></i>
                <h3 className="card-title">Journaling Made Easy</h3>
                <p className="card-description">
                  Log your trades with a user-friendly interface and review your
                  history anytime.
                </p>
              </div>
              {/* CARD 4 */}
              <div className="feature-card card-background" id="card4">
                <i className="fa-solid fa-mobile "></i>
                <h3 className="card-title">Secure & Private</h3>
                <p className="card-description">
                  Your data is encrypted and kept private at all times.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="testimonials">
        <div className="heading">
          <h2 className="testimonial-title">Client Testimonials</h2>
          <div className="slit">
            <div className="gradient-bar"></div>
          </div>
        </div>
      </div>
      <div>
        <Clienttestimonials></Clienttestimonials>
      </div>

      <footer className="footer">
        <div className="info-section main-info">
          <h3 className="section-title">Trading Journal</h3>
          <p className="section-description">
            At Trading Ledger, our mission is to empower our clients with the
            most accurate and up-to-date information on their stock portfolio.
            We are committed to providing the best possible service to our
            clients, and our AI-powered platform enables us to achieve this
            goal.
          </p>
        </div>

        <div className="info-section quick-links">
          <h3 className="section-title">Quick Links</h3>
          <ul className="link-list">
            <li>
              <a className="link-item" href="">
                About
              </a>
            </li>
            <li>
              <a className="link-item" href="">
                Services
              </a>
            </li>
            <li>
              <a className="link-item" href="">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <div className="info-section contact-info">
          <span className="contact-title">Contact Us</span>
          <a className="email-link" href="mailto:tradingjournal@gmail.com">
            tradingjournal@gmail.com
          </a>
          <div className="social-icons">
            <i className="fa-brands fa-facebook-square"></i>
            <i className="fa-brands fa-twitter-square"></i>
            <i className="fa-brands fa-linkedin"></i>
            <i className="fa-brands fa-instagram-square"></i>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
