import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import "../../assets/styles/landingPage.css"; // Import the CSS file for styling
import { BsFillClockFill, BsGraphUp } from "react-icons/bs";
import { RiMap2Line } from "react-icons/ri";
import { HiLockClosed } from "react-icons/hi";

export default function SectionPlatform() {
  const dataArray = [
    {
      icon: BsGraphUp,
      name: "Smart Analytics",
      content:
        "Uncover hidden pattern in your code with AI-driven insights, enchacing our trading strategy.",
    },
    {
      icon: BsFillClockFill,
      name: "Enhance Performance Analytics",
      content:
        "Unclock detailed insights into your tradeswith key perfromance metrics.",
    },
    {
      icon: RiMap2Line,
      name: "Jounarling Made Easy",
      content:
        "Log your trades with user friendly interface and review your history anytime.",
    },
    {
      icon: HiLockClosed,
      name: "Secure and Private",
      content:
        "Your data is encrypted and kept private at all time.",
    },
  ];
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Divider
          sx={{ height: "2px", width: "37%", backgroundColor: "#ffffff" }}
        />
        <Typography
          sx={{
            width: "26%",
            textAlign: "center",
            color: "white",
            fontSize: "48px",
            fontFamily: "Jura",
          }}
        >
          Platform Features
        </Typography>
        <Divider
          sx={{ height: "2px", width: "37%", backgroundColor: "#ffffff" }}
        />
      </Box>
      <Box sx={{ padding: "2rem 8rem" }}>
        {dataArray.map((item, index) => {
          return (
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: "2rem" }} key={index}>
              <Box
                sx={{
                  background: "white",
                  width: "max-content",
                  padding: "1rem",
                  borderRadius: "10px",
                }}
              >
                <item.icon fontSize={"3rem"}/>
              </Box>
              <Box
                sx={{
                  fontFamily: "Jura",
                  marginLeft: "20px",
                  marginBottom: "10px",
                  color: "white",
                }}
              >
                <Typography sx={{ fontSize: "24px", fontWeight: "600" }}>
                  {item.name}
                </Typography>
                <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
                  {item.content}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
