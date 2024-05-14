import React from "react";
import {  Box } from "@mui/material";
import "../../assets/styles/landingPage.css"; // Import the CSS file for styling
import SectionHome from "./section-home";
import SectionPlatform from "./section-platform";
import Footer from "./footer";
import Header from "../header";
export default function LandingPage({onLogin}) {

  return (
    <Box sx={{ backgroundColor: "#000000", height: "auto" }}>
      {/* Header */}
      <Header handleLogin={onLogin}/>
      <SectionHome/>
      <SectionPlatform />
      <Footer />
    </Box>
  );
}
