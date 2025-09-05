import React, { Fragment, useState, useEffect } from "react";
import { Tab, Box, Tabs, useMediaQuery, useTheme, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, AppBar, Toolbar } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import "../assets/styles/landingPage.css"; // Import the CSS file for styling

// Modern AuricMine Logo Component
const AuricMineLogo = ({ width = 80, height = 60, className = "" }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    {/* Mining Icon */}
    <Box sx={{
      width: height,
      height: height,
      background: 'linear-gradient(135deg, #FFA500 0%, #FF4D4C 50%, #FFD700 100%)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 15px rgba(255, 165, 0, 0.3)',
      border: '2px solid rgba(255, 255, 255, 0.2)'
    }}>
      <Box sx={{
        fontSize: height * 0.5,
        color: '#fff',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      }}>
        ⛏️
      </Box>
    </Box>
    
    {/* Brand Text */}
    <Box>
      <Box sx={{
        fontSize: width > 60 ? '1.8rem' : '1.4rem',
        fontWeight: 800,
        color: '#FFA500',
        fontFamily: '"Inter", sans-serif',
        lineHeight: 1,
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        background: 'linear-gradient(45deg, #FFA500 0%, #FFD700 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        AuricMine
      </Box>
      <Box sx={{
        fontSize: width > 60 ? '0.7rem' : '0.6rem',
        color: '#e0e0e0',
        fontFamily: '"Inter", sans-serif',
        fontWeight: 500,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        mt: -0.5
      }}>
        MINING BONDS
      </Box>
    </Box>
  </Box>
);

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
        <AuricMineLogo width={50} height={40} />
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
            <Box sx={{ 
              marginRight: '20px',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.05)' }
            }}>
              <AuricMineLogo 
                width={isSmallMobile ? 50 : 80} 
                height={isSmallMobile ? 40 : 60} 
              />
            </Box>
            
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
