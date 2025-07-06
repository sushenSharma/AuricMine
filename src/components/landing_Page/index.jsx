import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Container, Fade } from "@mui/material";
import _ from "lodash";

import Header from "../header";
import Footer from "./footer";
import SectionHome from "./section-home";
import AuthModal from "../../containers/AuthWrapper/AuthModal";
import AboutUs from "../../pages/AboutUs";
import Services from "../../pages/Services";

import "../../assets/styles/landingPage.css"; // Import the CSS file for styling
import "./styles.css";
import Pricing from "../../pages/Pricing";
import WhyIronOreSection from "./whyIronOreSection";
import OurProjectsSection from "./ourProjectsSection";
import ReturnsSection from "./resultsSection";
import TestimonialsSection from "./testimonialSection";
import InvestorCTASection from "./investorCtaSection";

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
    const homeContent = (
      <Fragment>
        <SectionHome handleLogin={handleLogin} />
        <WhyIronOreSection />
        <OurProjectsSection />
        <ReturnsSection />
        <TestimonialsSection />
        <InvestorCTASection />
      </Fragment>
    );

    switch (selectedTab) {
      case "home":
        return (
          <Fade in={true} timeout={600}>
            <Box>{homeContent}</Box>
          </Fade>
        );
      case "about":
        return (
          <Fade in={true} timeout={600}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
              <AboutUs />
            </Container>
          </Fade>
        );
      case "services":
        return (
          <Fade in={true} timeout={600}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
              <Services />
            </Container>
          </Fade>
        );
      case "pricing":
        return (
          <Fade in={true} timeout={600}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
              <Pricing />
            </Container>
          </Fade>
        );
      default:
        return (
          <Fade in={true} timeout={600}>
            <Box>{homeContent}</Box>
          </Fade>
        );
    }
  };

  return (
    <Box className="landing-page-container">
      <Header 
        handleLogin={handleLogin} 
        setSelectedTab={setSelectedTab} 
        selectedTab={selectedTab}
      />
      <Box sx={{ minHeight: 'calc(100vh - 160px)' }}>
        {renderComponent(selectedTab)}
      </Box>
      <Footer />
    </Box>
  );
};

export default LandingPage;
