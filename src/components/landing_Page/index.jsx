import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import _ from "lodash";

import Header from "../header";
import Footer from "./footer";
import SectionHome from "./section-home";
import SectionPlatform from "./section-platform";
import AuthModal from "../../containers/AuthWrapper/AuthModal";
import AboutUs from "../../pages/AboutUs";
import Services from "../../pages/Services";

import "../../assets/styles/landingPage.css"; // Import the CSS file for styling
import "./styles.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [selectedTab, setSelectedTab] = useState("home");

  const { userSession } = useSelector((state) => state.public);

  useEffect(() => {
    if (!_.isEmpty(userSession)) {
      setIsActive(userSession);
      setShowAuth(false);
      navigate("/");
    }
  }, [userSession, navigate]);

  const handleLogin = () => {
    setShowAuth(true);
  };

  if (showAuth && !isActive) {
    return <AuthModal />;
  }

  const renderComponent = (selectedTab) => {
    switch (selectedTab) {
      case "home":
        return (
          <Fragment>
            <SectionHome handleLogin={handleLogin}/>
            <SectionPlatform />
          </Fragment>
        );
      case "about":
        return <AboutUs />;
      case "services":
        return <Services />;
      default:
        return (
          <Fragment>
            <SectionHome handleLogin={handleLogin}/>
            <SectionPlatform />
          </Fragment>
        );
    }
  };

  return (
    <Box className="landing-page-container">
      <Header handleLogin={handleLogin} setSelectedTab={setSelectedTab} />
      {renderComponent(selectedTab)}
      <Footer />
    </Box>
  );
};

export default LandingPage;
