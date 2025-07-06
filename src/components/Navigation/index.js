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
import { getStorageItem } from "../../utils/common-utils";
import { featuresKey, paymentStatusKey } from "../../constants";

const Navigation = ({ open }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const navigationLabels = useLabels([
    "homeLabel",
    "fullDashboardLabel",
    "watchListLabel",
    "feedbackLabel",
  ]);

  const freeFeature = ["home", "feedback", "fullDashboard"];

  const features = getStorageItem(featuresKey);
  const handleNavigate = ({ key, path, title }) => {
    if (
      path &&
      (freeFeature.includes(key) ||
        (features && features.p_status == paymentStatusKey))
    ) {
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
            margin: "0",
          },
          "& .MuiSvgIcon-root": {
            color: "#535454", // Change icon color to black for visibility
            marginRight: open ? "8px" : 0,
            fontSize: "1.25em",
          },
          backgroundColor: "#535454", // Uniform white background
          "&:hover": {
            backgroundColor: "#535454", // Light gray on hover for subtle effect
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
              backgroundColor: "#535454", // Ensure hover effect matches
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)", // Subtle shadow for hover
              borderRadius: "3px",
            },
          }}
          disabled={
            !freeFeature.includes(key) &&
            features &&
            features.p_status != paymentStatusKey
          }
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
              color: "white", // Change text color to black
              fontWeight: "bold",
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
