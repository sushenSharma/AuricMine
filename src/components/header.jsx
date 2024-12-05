import React, { Fragment, useState } from "react";
import { Tab, Box, Tabs, useMediaQuery, useTheme } from "@mui/material";
import Logo from "../assets/resources/nav_image.png"; // Path to your logo image
import "../assets/styles/landingPage.css"; // Import the CSS file for styling

export default function Header({ handleLogin, setSelectedTab }) {
  const [activeTab, setActiveTab] = useState("home");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTabChange = (event, selectedTab) => {
    setSelectedTab(selectedTab);
    setActiveTab(selectedTab);
  };
  return (
    <Fragment>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          paddingTop: "20px",
          height: "80px",
          flexDirection: "row", // Stack items vertically on mobile
        }}
      >
        <img src={Logo} alt="logo" className="logo" />

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          TabIndicatorProps={{
            style: { backgroundColor: "#FF4D4C", height: "5px" },
          }}
          textColor="inherit"
          sx={{ color: "white", marginLeft: isMobile ? "0" : "5rem" }} // Adjust margin for mobile
          orientation={"horizontal"} // Change orientation on mobile
        >
          <Tab
            value="home"
            label="Home"
            sx={{ fontSize: isMobile ? "10px" : "25px" }}
          />
          <Tab
            value="about"
            label="About"
            sx={{ fontSize: isMobile ? "10px" : "25px" }}
          />
          <Tab
            value="services"
            label="Services"
            sx={{ fontSize: isMobile ? "10px" : "25px" }}
          />
          <Tab
            value="pricing"
            label="Pricing"
            sx={{ fontSize: isMobile ? "10px" : "25px" }}
          />
        </Tabs>
        <a 
            href="https://www.producthunt.com/posts/tradingjournal-ai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tradingjournal&#0045;ai" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ marginRight: "45px" }}
          >
            <img 
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=595438&theme=light" 
              alt="TradingJournal.ai - Track, Analyze, and Improve Your Trades with TradingJournal.ai | Product Hunt" 
              style={{ width: "250px", height: "52px" }}
            />
          </a>

        <Box
          style={{
            marginLeft: "auto",
            width: "auto",
            marginRight: isMobile ? "0px" : "60px",
            display: "flex",
            justifyContent: "space-around",
            color: "#ffffff",
          }}
        >
        
          
          <Box className="loginStyle" onClick={handleLogin}>
            Login/Sign up
          </Box>
        </Box>
      </Box>

      <hr
        style={{
          color: "#FFFFFF",
          height: "2px",
        }}
      />
    </Fragment>
  );
}
