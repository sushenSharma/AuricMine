import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import {
  ExpandMore,
  TrendingUp,
  Security,
  Assessment,
  Terrain,
  CheckCircle,
  Engineering,
  MonetizationOn,
  Shield
} from "@mui/icons-material";
import "./styles.css";

const Services = () => {
  const investmentServices = [
    {
      icon: <TrendingUp sx={{ fontSize: '3rem', color: '#FFA500' }} />,
      title: "Direct Iron Ore Investment",
      description: "Invest directly in premium iron ore mining operations with transparent returns and asset backing.",
      features: [
        "Minimum investment starting at $10,000",
        "6-10% annual returns",
        "Real asset backing with proven reserves",
        "Quarterly dividend distributions"
      ]
    },
    {
      icon: <Terrain sx={{ fontSize: '3rem', color: '#FFA500' }} />,
      title: "Mining Portfolio Management",
      description: "Diversified portfolio across multiple mining sites to minimize risk and maximize returns.",
      features: [
        "Multi-region diversification",
        "Professional risk assessment",
        "Regular portfolio rebalancing",
        "Performance monitoring and reporting"
      ]
    },
    {
      icon: <Assessment sx={{ fontSize: '3rem', color: '#FFA500' }} />,
      title: "Market Intelligence & Analytics",
      description: "Access to comprehensive market data, price forecasts, and investment insights.",
      features: [
        "Real-time commodity pricing",
        "Market trend analysis",
        "Supply chain intelligence",
        "Investment opportunity alerts"
      ]
    },
    {
      icon: <Security sx={{ fontSize: '3rem', color: '#FFA500' }} />,
      title: "Secure Asset Custody",
      description: "Bank-grade security and compliance for your iron ore investment holdings.",
      features: [
        "Institutional-grade security",
        "Regulated custody solutions",
        "Insurance coverage",
        "24/7 monitoring and support"
      ]
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Account Setup",
      description: "Complete our streamlined onboarding process with KYC verification and risk assessment."
    },
    {
      step: "02",
      title: "Investment Selection",
      description: "Choose from our curated selection of iron ore mining projects based on your risk profile."
    },
    {
      step: "03",
      title: "Capital Deployment",
      description: "Secure fund transfer with immediate allocation to your selected mining investments."
    },
    {
      step: "04",
      title: "Ongoing Management",
      description: "Monitor your investments through our platform with regular updates and performance reports."
    }
  ];

  const additionalServices = [
    {
      title: "Iron Ore Market Research",
      description: "Comprehensive market analysis and forecasting services for institutional clients."
    },
    {
      title: "Custom Investment Solutions",
      description: "Tailored investment strategies for high-net-worth individuals and institutional investors."
    },
    {
      title: "ESG Compliance Reporting",
      description: "Environmental, Social, and Governance reporting for sustainable mining investments."
    },
    {
      title: "Tax Optimization Services",
      description: "Strategic tax planning and optimization for commodity investment portfolios."
    },
    {
      title: "Exit Strategy Planning",
      description: "Flexible exit options including secondary market trading and direct asset sales."
    }
  ];

  return (
    <Box className="services-page-container" sx={{ bgcolor: '#000', color: '#fff', py: 6 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 3,
              background: 'linear-gradient(45deg, #FF4D4C, #FFA500)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            Iron Ore Investment Services
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#e0e0e0',
              maxWidth: '800px',
              margin: '0 auto',
              fontSize: '1.3rem',
              lineHeight: 1.6
            }}
          >
            Comprehensive iron ore investment solutions designed to maximize returns while minimizing risk through professional management and market expertise
          </Typography>
        </Box>

        {/* Core Investment Services */}
        <Box mb={8}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              mb: 4,
              textAlign: 'center',
              color: '#FFA500'
            }}
          >
            Core Investment Services
          </Typography>
          <Grid container spacing={4}>
            {investmentServices.map((service, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    p: 3,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)'
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      {service.icon}
                      <Typography
                        variant="h6"
                        sx={{ ml: 2, color: '#FFA500', fontWeight: 600 }}
                      >
                        {service.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{ color: '#e0e0e0', mb: 3, lineHeight: 1.6 }}
                    >
                      {service.description}
                    </Typography>
                    <List dense>
                      {service.features.map((feature, idx) => (
                        <ListItem key={idx} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckCircle sx={{ color: '#FFA500', fontSize: '1.2rem' }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={feature}
                            sx={{ '& .MuiListItemText-primary': { color: '#e0e0e0' } }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Investment Process */}
        <Box mb={8}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              mb: 4,
              textAlign: 'center',
              color: '#FFA500'
            }}
          >
            Investment Process
          </Typography>
          <Grid container spacing={3}>
            {processSteps.map((step, index) => (
              <Grid item xs={12} md={3} key={index}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 2,
                    height: '100%'
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      color: '#FF4D4C',
                      fontWeight: 'bold',
                      mb: 2,
                      opacity: 0.8
                    }}
                  >
                    {step.step}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: '#FFA500', mb: 2, fontWeight: 600 }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#e0e0e0', lineHeight: 1.6 }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Additional Services */}
        <Box mb={8}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              mb: 4,
              textAlign: 'center',
              color: '#FFA500'
            }}
          >
            Additional Services
          </Typography>
          {additionalServices.map((service, index) => (
            <Accordion
              key={index}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                mb: 2,
                '&:before': { display: 'none' }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: '#FFA500' }} />}
                sx={{
                  '& .MuiAccordionSummary-content': {
                    margin: '12px 0'
                  }
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: '#FFA500', fontWeight: 600 }}
                >
                  {service.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: '#e0e0e0', lineHeight: 1.6 }}>
                  {service.description}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Service Highlights */}
        <Box
          sx={{
            textAlign: 'center',
            p: 4,
            bgcolor: 'rgba(255, 165, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 165, 0, 0.2)',
            borderRadius: 3
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: '#FFA500', mb: 3, fontWeight: 600 }}
          >
            Why Choose Our Services?
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Chip
                icon={<Engineering />}
                label="Expert Management"
                sx={{
                  bgcolor: 'rgba(255, 77, 76, 0.2)',
                  color: '#FF4D4C',
                  fontSize: '1rem',
                  p: 2,
                  mb: 1
                }}
              />
              <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                Industry veterans with 50+ years combined experience
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Chip
                icon={<Shield />}
                label="Asset Security"
                sx={{
                  bgcolor: 'rgba(255, 77, 76, 0.2)',
                  color: '#FF4D4C',
                  fontSize: '1rem',
                  p: 2,
                  mb: 1
                }}
              />
              <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                Bank-grade security with comprehensive insurance coverage
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Chip
                icon={<MonetizationOn />}
                label="Transparent Returns"
                sx={{
                  bgcolor: 'rgba(255, 77, 76, 0.2)',
                  color: '#FF4D4C',
                  fontSize: '1rem',
                  p: 2,
                  mb: 1
                }}
              />
              <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                Clear fee structure with no hidden costs
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Services;
