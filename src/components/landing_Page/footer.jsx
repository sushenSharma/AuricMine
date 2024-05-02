import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
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
          paddingRight: "10rem",
          paddingBottom: "1rem",
          border:"1px solid red",

        }}
      >
        <Typography
          fontSize={"20px"}
          fontFamily={"Jura"}
          fontWeight={400}
          color={"white"}
        >
          Contact Us
        </Typography>
        <Box
          sx={{ display: "flex", width: "5%", justifyContent: "space-between" }}
        >
          <FaInstagram color="white" />
          <FaLinkedinIn color="white" />
          <FaFacebookF color="white" />
        </Box>
        <Typography
          fontSize={"20px"}
          fontFamily={"Jura"}
          fontWeight={400}
          color={"white"}

        >
          tradingjournal@gmail.com
        </Typography>
      </Box>
    </Box>
  );
}
