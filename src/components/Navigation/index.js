import React from "react";
import { useNavigate } from "react-router-dom";
import { useLabels } from "../../hooks/use-labels";
import { navigationMenus } from "./navigation-utils";

import { Button, useTheme, List } from "@mui/material";

const Navigation = ({ className, collapsed }) => {
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
    const { key, icon, label } = item;
    return (
      <Button
        key={key}
        startIcon={icon}
        onClick={() => {
          handleNavigate(item);
        }}
        sx={{
          justifyContent: "flex-start",
          color: "#fff",
          width: "100%",
          textTransform: "none",
          padding: "10px 20px",
          fontSize: "0.875rem",
          fontWeight: "bold",
          borderRadius: "0px",
          border: "5px solid #56585c",
          backgroundColor: "#56585c",
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
            fontSize: "1rem",
            padding: "12px 24px",
          },
        }}
      >
        {label}
      </Button>
    );
  });

  return <List>{menuList}</List>;
};

export default Navigation;
