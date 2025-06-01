import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

import { supabase } from "../../constants";
import { removeStorageItem } from "../../utils/common-utils";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getLabel } from "../../hooks/use-labels";

const TopBar = ({ open, openDrawer, drawerWidth, theme }) => {
  const { userSession } = useSelector((state) => state.public);

  const handleLogout = () => {
    supabase.auth.signOut();
    sessionStorage.clear();
    localStorage.clear();
    userSession.clear();

    removeStorageItem([
      "userId",
      "userSession",
      "subscription",
      "ledgerData",
      "token",
      "features",
    ]);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: open ? `calc(100% - ${drawerWidth}px)` : "100%" },
        ml: { sm: open ? `${drawerWidth}px` : 0 },
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "#38B88D",
        zIndex: 1201,
      }}
    >
      <Toolbar>
        {!open && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={openDrawer}
            edge="start"
            sx={{
              marginRight: 5,
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          {getLabel("brandName")}
        </Typography>
        <Typography variant="body1" style={{ marginRight: theme.spacing(2) }}>
          <strong>{getLabel("welcomeLabel")} </strong>
          {userSession.user.email}
        </Typography>
        <button
          onClick={handleLogout}
          style={{ color: "white", background: "none", border: "none" }}
        >
          {getLabel("signOutLabel")}
        </button>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
