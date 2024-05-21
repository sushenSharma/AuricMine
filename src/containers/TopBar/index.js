import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

import { supabase } from "../../constants";
import { removeStorageItem } from "../../utils/common-utils";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

const TopBar = ({ open, openDrawer, drawerWidth, theme }) => {
  const handleLogout = () => {
    supabase.auth.signOut();

    removeStorageItem(["userId", "userSession", "subscription"]);
  };

  return (
    <AppBar
      position="static"
      sx={{
        width: { sm: open ? `calc(100% - ${drawerWidth}px)` : "100%" },
        ml: { sm: open ? `${drawerWidth}px` : 0 },
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "#000000",
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={openDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          TradingJournal.ai
        </Typography>
        <Typography variant="body1" style={{ marginRight: theme.spacing(2) }}>
          <strong>Welcome: </strong>
          {/*sessionObj.user.email*/}
          test@test.com
        </Typography>
        <button
          onClick={handleLogout}
          style={{ color: "white", background: "none", border: "none" }}
        >
          Sign out
        </button>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
