import _ from "lodash";
import React, { useState } from "react";
import { Box } from "@mui/material";
import { getStorageItem } from "../../utils/common-utils";

import Header from "../header";
import Footer from "./footer";
import SectionHome from "./section-home";
import SectionPlatform from "./section-platform";
import AuthModal from "../../containers/AuthWrapper/AuthModal";

import "../../assets/styles/landingPage.css"; // Import the CSS file for styling

const LandingPage = () => {
  const userSession = getStorageItem("userSession");

  const [showAuth, setShowAuth] = useState(false);
  const isActive = !_.isEmpty(userSession);

  const handleLogin = () => {
    setShowAuth(true);
  };
  console.log({ isActive });
  
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
