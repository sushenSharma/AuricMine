import React from "react";
import { useNavigate } from "react-router-dom";
import { useLabels } from "../../hooks/use-labels";
import { navigationMenus } from "./navigation-utils";
import {
  useTheme,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const Navigation = ({ open }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const navigationLabels = useLabels([
    "homeLabel",
    "riskManagementLabel",
    "watchListLabel",
    "analyticsLabel",
    "blogsLabel",
  ]);

  const handleNavigate = ({ path, title }) => {
    if (path) {
      navigate(`${path}`, { state: { title } });
    }
  };

  const menuList = navigationMenus(navigationLabels).map((item) => {
    const { key, iconLabel, label } = item;

    return (
      <ListItem
        key={key}
        disablePadding={true}
        sx={{
          display: "block",
          [theme.breakpoints.up("sm")]: {
            fontSize: "1em",
             margin: "0"
          },
          "& .MuiSvgIcon-root": {
            color: "#fff",
            marginRight: open ? "8px" : 0,
            fontSize: "1.25em",
          },
          border: "5px solid #56585c",
          backgroundColor: "#56585c",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
        onClick={() => handleNavigate(item)}
      >
        <ListItemButton
          sx={{
            display: "flex",
            flexDirection: open ? "row" : "column",
            alignItems: "center",
            justifyContent: "center",
            px: 0,
            ...(open ? { padding: "12px 5px" } : {}),
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              borderRadius: "8px",
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              justifyContent: "center",
            }}
          >
            {iconLabel}
          </ListItemIcon>
          <ListItemText
            primary={label}
            sx={{
              display: "flex",

              alignItems: "center",
              opacity: 1,
              color: "white",
              textAlign: "center",
              ...(!open
                ? {
                    justifyContent: "center",
                    width: "60px",
                    "& .MuiTypography-root": {
                      fontSize: "14px",
                      display: "block",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                  }
                : {
                    justifyContent: "flex-start",
                  }),
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  });

  return <List>{menuList}</List>;
};

export default Navigation;
