import React from "react";
import { Box, Drawer } from "@mui/material";

import Navigation from "../../components/Navigation";

function LogoIcon(props) {
  return (
    <Box
      sx={{
        height: 130,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 2,
        overflow: "hidden",
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
