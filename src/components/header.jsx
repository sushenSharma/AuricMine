import React, { Fragment, useState, useEffect } from "react";
import { Tab, Box, Tabs, useMediaQuery, useTheme, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, AppBar, Toolbar } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import Logo from "../assets/resources/nav_image.png"; // Path to your logo image
import "../assets/styles/landingPage.css"; // Import the CSS file for styling

export default function Header({ handleLogin, setSelectedTab, selectedTab }) {
  const [activeTab, setActiveTab] = useState(selectedTab || "home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (selectedTab) {
      setActiveTab(selectedTab);
    }
  }, [selectedTab]);

  const handleTabChange = (event, selectedTab) => {
    setSelectedTab(selectedTab);
    setActiveTab(selectedTab);
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const tabLabels = [
    { value: "home", label: "Home" },
    { value: "about", label: "About" },
    { value: "services", label: "Services" },
    { value: "pricing", label: "Pricing" }
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', bgcolor: '#000', height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <img src={Logo} alt="logo" style={{ width: '60px', height: 'auto' }} />
        <IconButton color="inherit" onClick={handleDrawerToggle}>
          <CloseIcon sx={{ color: '#fff' }} />
        </IconButton>
      </Box>
      <List>
        {tabLabels.map((tab) => (
          <ListItem key={tab.value} disablePadding>
            <ListItemButton 
              onClick={() => handleTabChange(null, tab.value)}
              sx={{ 
                textAlign: 'center',
                bgcolor: activeTab === tab.value ? 'rgba(255, 77, 76, 0.1)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(255, 77, 76, 0.2)' }
              }}
            >
              <ListItemText 
                primary={tab.label} 
                sx={{ 
                  color: activeTab === tab.value ? '#FF4D4C' : '#fff',
                  '& .MuiListItemText-primary': { fontSize: '1.2rem', fontWeight: 600 }
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding sx={{ mt: 2 }}>
          <ListItemButton onClick={handleLogin} sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                backgroundColor: "#ffffff",
                padding: "12px 24px",
                color: "black",
                fontSize: "1rem",
                borderRadius: "8px",
                fontFamily: "Jura",
                fontWeight: 600,
                width: '100%',
                textAlign: 'center'
              }}
            >
              Login/Sign up
            </Box>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <Fragment>
      <AppBar 
        position="static" 
        sx={{ 
          bgcolor: 'transparent', 
          boxShadow: 'none',
          borderBottom: '2px solid #FFFFFF'
        }}
      >
        <Toolbar sx={{ minHeight: '80px !important', px: { xs: 2, md: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img 
              src={Logo} 
              alt="logo" 
              style={{ 
                width: isSmallMobile ? '50px' : '80px', 
                height: 'auto',
                marginRight: '20px',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            />
            
            {!isMobile && (
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                TabIndicatorProps={{
                  style: { 
                    backgroundColor: "#FF4D4C", 
                    height: "4px",
                    borderRadius: "2px"
                  },
                }}
                textColor="inherit"
                sx={{ 
                  color: "white", 
                  marginLeft: 4,
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    minWidth: 'auto',
                    px: 3,
                    py: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#FF4D4C',
                      transform: 'translateY(-2px)'
                    },
                    '&.Mui-selected': {
                      color: '#FF4D4C'
                    }
                  }
                }}
              >
                {tabLabels.map((tab) => (
                  <Tab
                    key={tab.value}
                    value={tab.value}
                    label={tab.label}
                  />
                ))}
              </Tabs>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {!isMobile && (
              <Box 
                className="loginStyle" 
                onClick={handleLogin}
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(255, 255, 255, 0.3)'
                  }
                }}
              >
                Login/Sign up
              </Box>
            )}
            
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: '#fff' }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280, bgcolor: '#000' },
        }}
      >
        {drawer}
      </Drawer>
    </Fragment>
  );
}
