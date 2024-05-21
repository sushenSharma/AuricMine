import React from "react";
import { Box, Drawer } from "@mui/material";

import Navigation from "../../components/Navigation";

function LogoIcon(props) {
  return (
    <Box
      sx={{
        height: 130, // Ensures the container height is fixed
        // Optional: you might set a width if the logo is not square
        display: "flex",
        alignItems: "center", // Vertically centers the logo
        justifyContent: "center", // Horizontally centers the logo
        marginBottom: 2, // Adds bottom margin
        overflow: "hidden", // Ensures nothing extends outside the box
      }}
    >
      <img
        src="favicon.ico"
        alt="Logo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        {...props}
      />
    </Box>
  );
}

const SideBar = ({ open, closeDrawer, drawerWidth, theme }) => {
  return (
    <Drawer
      variant={"temporary"}
      open={open}
      onClose={closeDrawer}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#56585c",
        },
      }}
    >
      <LogoIcon
        style={{
          color: theme.palette.secondary.main,
          marginBottom: 1,
        }}
      />
      <Navigation />
    </Drawer>
  );
};

export default SideBar;
