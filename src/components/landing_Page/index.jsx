import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getStorageItem } from "../../utils/common-utils";

import Header from "../header";
import Footer from "./footer";
import SectionHome from "./section-home";
import SectionPlatform from "./section-platform";
import AuthModal from "../../containers/AuthWrapper/AuthModal";

import "../../assets/styles/landingPage.css"; // Import the CSS file for styling
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

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

  return (
    <Box sx={{ backgroundColor: "#000000", height: "auto" }}>
      <Header handleLogin={handleLogin} />
      <SectionHome />
      <SectionPlatform />
      <Footer />
    </Box>
  );
};

export default LandingPage;
