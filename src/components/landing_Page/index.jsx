import _ from "lodash";
import React, { Fragment, useEffect, useState } from "react";
import { Box } from "@mui/material";
import "./styles.css";

import Header from "../header";
import Footer from "./footer";
import SectionHome from "./section-home";
import SectionPlatform from "./section-platform";
import AuthModal from "../../containers/AuthWrapper/AuthModal";

import "../../assets/styles/landingPage.css"; // Import the CSS file for styling
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AboutUs from "../../pages/AboutUs";
import Services from "../../pages/Services";

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
            <SectionHome />
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
            <SectionHome />
            <SectionPlatform />
          </Fragment>
        );
    }
  };

  return (
    <Box sx={{ backgroundColor: "#000000", height: "auto" }}>
      <Header handleLogin={handleLogin} setSelectedTab={setSelectedTab} />
      {renderComponent(selectedTab)}
      <Footer />
    </Box>
  );
};

export default LandingPage;
