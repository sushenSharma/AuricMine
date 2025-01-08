import {
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Divider
        sx={{ height: "2px", backgroundColor: "#ffffff", width: "100%" }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
          paddingRight: isMobile ? "1rem" : "10rem",
          paddingBottom: "1rem",
        }}
      >
        <Typography
          fontSize={isMobile ? "16px" : "20px"}
          fontFamily={"Jura"}
          fontWeight={400}
          color={"white"}
          textAlign={isMobile ? "center" : "right"}
          mb={isMobile ? "1rem" : "0"}
        >
          Contact Us
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "5%",
            justifyContent: "space-between",
            marginRight: isMobile ? "0" : "1rem",
          }}
        >
        </Box>
        <Typography
          fontSize={isMobile ? "16px" : "20px"}
          fontFamily={"Jura"}
          fontWeight={400}
          color={"white"}
          textAlign={isMobile ? "center" : "right"}
        >
          tradingjournal@gmail.com
        </Typography>
      </Box>
    </Box>
  );
}
