import React from "react";
import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Navigation from "../../components/Navigation";
import MenuIcon from "@mui/icons-material/Menu";

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

const SideBar = ({ open, drawerWidth, theme, closeDrawer }) => {
  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(9)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(9)} + 1px)`,
    },
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
        },
      }}
    >
      <DrawerHeader>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={closeDrawer}
          edge="start"
          sx={{
            marginLeft: "0",
            color: "#ffffff",
            paddingLeft: "0",
          }}
        >
          <MenuIcon />
        </IconButton>
      </DrawerHeader>
      {open && (
        <LogoIcon
          style={{
            color: theme.palette.secondary.main,
            marginBottom: 1,
            opacity: open ? 1 : 0,
          }}
          open={open}
        />
      )}

      <Navigation open={open} />
    </Drawer>
  );
};

export default SideBar;
