import _ from "lodash";
import { Fragment, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { getStorageItem } from "../../utils/common-utils";

import SideBar from "../Sidebar";
import TopBar from "../TopBar";

const Main = ({ children }) => {
  const theme = useTheme();
  const drawerWidth = 225;
  const userSession = getStorageItem("userSession");
  const isActive = !_.isEmpty(userSession);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  const layoutComponents = isActive ? (
    <Fragment>
      <Box sx={{ display: "flex" }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pl: 10,
            width: { sm: isOpen ? `calc(100% - ${drawerWidth}px)` : "100%" },
            mt: { sm: `64px` },
            transition: theme.transitions.create("margin", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <TopBar
            openDrawer={toggleDrawer}
            open={isOpen}
            drawerWidth={drawerWidth}
            theme={theme}
          />
          <SideBar
            closeDrawer={toggleDrawer}
            open={isOpen}
            theme={theme}
            drawerWidth={drawerWidth}
          />
          {children}
        </Box>
      </Box>
    </Fragment>
  ) : (
    children
  );

  return <div className="main-layout-container">{layoutComponents}</div>;
};

export default Main;
