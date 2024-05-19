import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  SvgIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { Button } from "@mui/material";
import RiskManagementIcon from "@mui/icons-material/NotificationsActiveOutlined";
import WatchlistIcon from "@mui/icons-material/Visibility";
import BlogIcon from "@mui/icons-material/Article";
import ComingSoonIcon from "@mui/icons-material/InsertChart";
import Ledgers from "../containers/Ledgers";
import Analytics from "./Analytics";
import Posts from "./Posts";
import { supabase, userIdKey } from "../constants";

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
export default function TabBar(session) {
  const [select, setSelect] = useState("Ledger");
  const [isOpen, setIsOpen] = useState(false);
  const drawerWidth = 220;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    supabase.auth.signOut();
    localStorage.removeItem(userIdKey);
  };
  const data = {
    lineChartData: {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "Sales",
          data: [65, 59, 80, 81, 56],
          fill: true,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
    pieChartData: {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          width: { sm: isOpen ? `calc(100% - ${drawerWidth}px)` : "100%" },
          ml: { sm: isOpen ? `${drawerWidth}px` : 0 },
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
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            TradingJournal.ai
          </Typography>
          <Typography variant="body1" style={{ marginRight: theme.spacing(2) }}>
            <strong>Welcome: </strong>
            {session.sessionObj.user.email}
          </Typography>
          <button
            onClick={handleLogout}
            style={{ color: "white", background: "none", border: "none" }}
          >
            Sign out
          </button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={"temporary"}
        open={isOpen}
        onClose={toggleDrawer}
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
        <List>
          {[
            {
              text: "Home",
              icon: <HomeIcon />,
              action: () => setSelect("Ledger"),
            },
            {
              text: "Risk Management",
              icon: <RiskManagementIcon />,
              action: () => setSelect("Risk Management"),
            },
            {
              text: "Watchlist",
              icon: <WatchlistIcon />,
              action: () => setSelect("Watchlist"),
            },
            {
              text: "Analytics",
              icon: <ComingSoonIcon />,
              action: () => setSelect("Analytics"),
            },
            {
              text: "Blogs",
              icon: <BlogIcon />,
              action: () => setSelect("Blogs"),
            },
          ].map((item, index) => (
            <Button
              key={index}
              startIcon={item.icon}
              onClick={() => {
                item.action();
                toggleDrawer();
              }}
              sx={{
                justifyContent: "flex-start",
                color: "#fff",
                width: "100%",
                textTransform: "none",
                padding: "10px 20px",
                fontSize: "0.875rem", // Smaller base font size for better mobile adaptation
                fontWeight: "bold",
                borderRadius: "30px",
                border: "5px solid #56585c", // Adding a filled boundary
                backgroundColor: "#333333", // Button background color
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                },
                "& .MuiButton-startIcon": {
                  color: "#fff",
                  marginRight: "8px",
                  fontSize: "1.25em",
                },
                [theme.breakpoints.up("sm")]: {
                  fontSize: "1rem", // Larger font size for larger screens
                  padding: "12px 24px", // Larger padding for larger screens
                },
              }}
            >
              {item.text}
            </Button>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: isOpen ? `calc(100% - ${drawerWidth}px)` : "100%" },
          ml: { sm: `${isOpen ? drawerWidth : 0}px` },
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <div>
          {select === "Ledger" && <Ledgers />}
          {select === "Risk Management" && <h2>Risk Management</h2>}
          {select === "Watchlist" && <h2>Watchlist</h2>}
          {select === "Blogs" && <Posts />}
          {select === "Analytics" && <Analytics />}
        </div>
      </Box>
    </>
  );
}
