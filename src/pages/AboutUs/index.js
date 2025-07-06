import React from "react";
import { Box, Typography, Container, Grid, Card, CardContent, Avatar, Chip } from "@mui/material";
import { Terrain, TrendingUp, Security, Public, Psychology, Engineering } from "@mui/icons-material";
import ImageContentBox from "../../components/ImageContentBox";
import firstImage from "../../assets/resources/AustalianMine.png";
import secondImage from "../../assets/resources/brazlilian.png";
import "./styles.css";

const AboutUs = () => {
  const stats = [
    { icon: <Terrain />, value: "130M+", label: "Tonnes Reserve" },
    { icon: <TrendingUp />, value: "6-10%", label: "Annual Returns" },
    { icon: <Public />, value: "1,200+", label: "Global Investors" },
    { icon: <Security />, value: "100%", label: "Asset Backed" }
  ];

  const leadership = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Executive Officer",
      expertise: "20+ years in mining operations and strategic investments",
      background: "Former VP of Operations at Rio Tinto"
    },
    {
      name: "Michael Rodriguez",
      role: "Chief Financial Officer",
      expertise: "Mining finance and commodity trading specialist",
      background: "Ex-Goldman Sachs Mining Investment Division"
    },
    {
      name: "Dr. James Wilson",
      role: "Chief Technology Officer",
      expertise: "Mining technology and operational efficiency",
      background: "Former Head of Innovation at BHP Billiton"
    }
  ];

  return (
    <Box className="about-us-page" sx={{ bgcolor: '#000', color: '#fff', py: 6 }}>
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
            Leading Iron Ore Investment Platform
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
            Connecting global investors with premium iron ore mining opportunities across Australia, Brazil, India, and South Africa
          </Typography>
        </Box>

        {/* Stats Section */}
        <Grid container spacing={4} mb={8}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Card
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  textAlign: 'center',
                  p: 2,
                  height: '100%'
                }}
              >
                <CardContent>
                  <Box sx={{ color: '#FFA500', mb: 2 }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" sx={{ color: '#FFA500', fontWeight: 'bold', mb: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Mission Section */}
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
            Our Mission
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.2rem',
              lineHeight: 1.8,
              textAlign: 'center',
              maxWidth: '900px',
              margin: '0 auto',
              color: '#e0e0e0'
            }}
          >
            We democratize access to premium iron ore investments by providing transparent, secure, and profitable opportunities 
            backed by real mining assets. Our platform connects individual and institutional investors with high-quality iron ore 
            projects, delivering consistent returns while contributing to global infrastructure development.
          </Typography>
        </Box>

        {/* Mining Locations */}
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
            Our Mining Operations
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <ImageContentBox
                image={firstImage}
                content={`<h3>Australia - Pilbara Region</h3>
                <p>Our flagship operations in Western Australia's Pilbara region represent some of the world's highest-grade iron ore deposits. With over 45 million tonnes of proven reserves and direct access to Port Hedland export facilities, these mines deliver premium quality ore to global steel manufacturers.</p>
                <ul>
                  <li>High-grade hematite ore (62-65% Fe)</li>
                  <li>Established infrastructure and logistics</li>
                  <li>20-year mining lease agreements</li>
                  <li>Direct rail access to export ports</li>
                </ul>`}
                className="about-us-first-content"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ImageContentBox
                image={secondImage}
                content={`<h3>Brazil - Minas Gerais</h3>
                <p>Strategic partnerships with established mining operations in Brazil's iron ore heartland. Our Brazilian ventures focus on sustainable mining practices while maintaining the highest quality standards for international markets.</p>
                <ul>
                  <li>Premium itabirite ore formations</li>
                  <li>Sustainable mining practices</li>
                  <li>Strategic port access via Vitória</li>
                  <li>Joint ventures with local operators</li>
                </ul>`}
                className="about-us-second-content"
              />
            </Grid>
          </Grid>
        </Box>

        {/* Leadership Team */}
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
            Leadership Team
          </Typography>
          <Grid container spacing={4}>
            {leadership.map((leader, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    p: 3,
                    height: '100%',
                    textAlign: 'center'
                  }}
                >
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: '#FFA500',
                      fontSize: '2rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {leader.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Typography variant="h6" sx={{ color: '#FFA500', mb: 1 }}>
                    {leader.name}
                  </Typography>
                  <Chip
                    label={leader.role}
                    sx={{
                      bgcolor: 'rgba(255, 77, 76, 0.2)',
                      color: '#FF4D4C',
                      mb: 2
                    }}
                  />
                  <Typography variant="body2" sx={{ color: '#e0e0e0', mb: 1 }}>
                    {leader.expertise}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#bbb', fontStyle: 'italic' }}>
                    {leader.background}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Why Choose Us */}
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
            Why Choose Our Platform
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Engineering sx={{ fontSize: '3rem', color: '#FFA500', mb: 2 }} />
                <Typography variant="h6" sx={{ color: '#FFA500', mb: 2 }}>
                  Technical Expertise
                </Typography>
                <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                  Our team combines decades of mining engineering experience with cutting-edge technology to optimize extraction and maximize returns.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Security sx={{ fontSize: '3rem', color: '#FFA500', mb: 2 }} />
                <Typography variant="h6" sx={{ color: '#FFA500', mb: 2 }}>
                  Asset-Backed Security
                </Typography>
                <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                  Every investment is backed by real, tangible mining assets with proven reserves and established market demand.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Psychology sx={{ fontSize: '3rem', color: '#FFA500', mb: 2 }} />
                <Typography variant="h6" sx={{ color: '#FFA500', mb: 2 }}>
                  Transparent Operations
                </Typography>
                <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                  Real-time reporting, regular site visits, and comprehensive financial transparency ensure you always know how your investment is performing.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;
