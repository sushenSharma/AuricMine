import React, { useEffect, useState } from "react";
import { Tab, Box, Tabs } from "@mui/material";
import Logo from "../assets/resources/nav_image.png"; // Path to your logo image
import "../assets/styles/landingPage.css"; // Import the CSS file for styling
import LandingPage from "./landing_Page";

export default function Header({ onLogin }) {
  const [value, setValue] = useState("home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNavigation = () => {
    if (value === "home") return <LandingPage />;
  };

  useEffect(() => {
    handleNavigation();
  }, [value]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          paddingTop: "20px",
          height: "40px",
        }}
      >
        <img src={Logo} alt="logo" className="logo" />

        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: { backgroundColor: "#FF4D4C", height: "5px" },
          }}
          textColor="white"
          sx={{ color: "white", marginLeft: "5rem" }}
        >
          <Tab value="home" label="Home" sx={{ fontSize: "25px" }} />
          <Tab value="about" label="About" sx={{ fontSize: "25px" }} />
          <Tab value="services" label="Services" sx={{ fontSize: "25px" }} />
        </Tabs>

        <Box style={{ marginLeft: "auto", width: "auto", marginRight: "60px" }}>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-around",
              color: "#ffffff",
            }}
          >
            <Box
              className="loginStyle"
              onClick={() => {
                setValue("login");
                onLogin();
              }}
            >
              Login
            </Box>
            <Box
              className="signUpStyle"
              onClick={() => {
                setValue("login");
                onLogin();
              }}
            >
              Sign up
            </Box>
          </Box>
        </Box>
      </Box>

      <hr
        style={{
          color: "#FFFFFF",
          height: "2px",
        }}
      />
    </>
  );
}
