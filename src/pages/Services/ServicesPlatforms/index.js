import React from "react";
import {
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { BsFillClockFill, BsGraphUp } from "react-icons/bs";
import { RiMap2Line } from "react-icons/ri";
import { HiLockClosed } from "react-icons/hi";

import "../../../assets/styles/landingPage.css"

const ServicesPlatforms = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
      name: "Journaling Made Easy",
      content:
        "Log your trades with user friendly interface and review your history anytime.",
    },
    {
      icon: HiLockClosed,
      name: "Secure and Private",
      content: "Your data is encrypted and kept private at all times.",
    },
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Divider
          sx={{
            height: "2px",
            width: isMobile ? "25%" : "37%",
            backgroundColor: "#ffffff",
          }}
        />
        <Typography
          sx={{
            width: isMobile ? "50%" : "26%",
            textAlign: "center",
            color: "white",
            fontSize: isMobile ? "22px" : "48px",
            fontFamily: "Jura",
          }}
        >
          Platform Features
        </Typography>
        <Divider
          sx={{
            height: "2px",
            width: isMobile ? "25%" : "37%",
            backgroundColor: "#ffffff",
          }}
        />
      </Box>
      <Box sx={{ padding: isMobile ? "1rem 2rem" : "2rem 8rem" }}>
        {dataArray.map((item, index) => {
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: isMobile ? "column" : "row",
                marginBottom: "2rem",
              }}
              key={index}
            >
              <Box
                sx={{
                  background: "white",
                  width: "max-content",
                  padding: "1rem",
                  borderRadius: "10px",
                  marginBottom: isMobile ? "1rem" : "0",
                }}
              >
                <item.icon fontSize={isMobile ? "2rem" : "3rem"} />
              </Box>
              <Box
                sx={{
                  fontFamily: "Jura",
                  marginLeft: isMobile ? "0" : "20px",
                  marginBottom: "10px",
                  color: "white",
                  textAlign: isMobile ? "center" : "left",
                }}
              >
                <Typography
                  sx={{
                    fontSize: isMobile ? "24px" : "24px",
                    fontWeight: "600",
                  }}
                >
                  {item.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: isMobile ? "16px" : "16px",
                    fontWeight: "400",
                  }}
                >
                  {item.content}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ServicesPlatforms;
