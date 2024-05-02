import React from "react";
import {  Box } from "@mui/material";
import "../../assets/styles/landingPage.css"; // Import the CSS file for styling
import SectionHome from "./section-home";
import SectionPlatform from "./section-platform";
import Footer from "./footer";
export default function LandingPage({onLogin}) {

  return (
    <Box sx={{ backgroundColor: "#121212", height: "auto" }}>
      {/* Header */}
      <SectionHome onLogin={onLogin}/>
      <SectionPlatform />
      <Footer />
    </Box>
  );
}
