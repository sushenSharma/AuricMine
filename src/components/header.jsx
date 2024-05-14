import React, { useState } from "react";
import { Tab, Box, Tabs, useMediaQuery, useTheme } from "@mui/material";
import Logo from "../assets/resources/nav_image.png"; // Path to your logo image
import "../assets/styles/landingPage.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";
import { PATHS } from "../constants/routerConstant";

export default function Header({handleLogin}) {
  const [value, setValue] = useState("home");
  const theme = useTheme();
  const navigator=useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
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
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: { backgroundColor: "#FF4D4C", height: "5px" },
          }}
          textColor="white"
          sx={{ color: "white", marginLeft: isMobile ? "0" : "5rem" }} // Adjust margin for mobile
          orientation={ "horizontal" } // Change orientation on mobile
        >
          <Tab value="home" label="Home" sx={{ fontSize: isMobile ?"10px":"25px" }} />
          <Tab value="about" label="About" sx={{ fontSize: isMobile ?"10px":"25px" }} />
          <Tab value="services" label="Services" sx={{ fontSize: isMobile ?"10px":"25px" }} />
        </Tabs>

          <Box
            style={{
              marginLeft: "auto",
              width: "auto",
              marginRight: isMobile ? "0px":"60px",
              display: "flex",
              justifyContent: "space-around",
              color: "#ffffff",
            }}
          >
            <Box
              className="loginStyle"
              onClick={handleLogin}
            >
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
    </>
  );
}
