import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PlaceIcon from '@mui/icons-material/Place';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ImageA from "../../../src/assets/resources/a.jpg"
import ImageB from "../../../src/assets/resources/b.jpg"
import ImageC from "../../../src/assets/resources/c.jpeg"
import ImageD from "../../../src/assets/resources/d.jpeg"

export default function WhyIronOreSection() {
  return (
    <Box sx={{ py: 8, px: 3, background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)', textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{
        color: '#FFA500',
        fontFamily: '"Inter", sans-serif',
        background: 'linear-gradient(45deg, #FFA500 0%, #FFD700 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontSize: { xs: '2rem', md: '2.5rem' },
        mb: 2
      }}>
        💎 Why Iron Ore?
      </Typography>
      <Typography variant="subtitle1" maxWidth={700} mx="auto" mb={6} sx={{
        color: '#e0e0e0',
        fontFamily: '"Inter", sans-serif',
        fontSize: { xs: '1.1rem', md: '1.3rem' },
        fontWeight: 500,
        lineHeight: 1.5
      }}>
        🚀 Iron ore drives global infrastructure growth and remains the backbone of modern civilization - <span style={{ color: '#4CAF50', fontWeight: 700 }}>securing guaranteed 400% returns!</span>
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* Data Cards */}
        <Grid item xs={12} md={6} lg={4}>
          <Card elevation={8} sx={{ 
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(255, 165, 0, 0.1) 0%, rgba(255, 77, 76, 0.1) 100%)',
            border: '2px solid rgba(255, 165, 0, 0.3)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 20px 40px rgba(255, 165, 0, 0.3)'
            }
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{
                color: '#FFA500',
                fontWeight: 700,
                fontFamily: '"Inter", sans-serif'
              }}>
                🔥 Global Steel Demand
              </Typography>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h5" fontWeight={700} sx={{ color: '#4CAF50', fontSize: '2rem' }}>
                    1.9B 🚀
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#e0e0e0', fontWeight: 600 }}>Tonnes Annually</Typography>
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={600} sx={{ color: '#FFA500', fontSize: '1.5rem' }}>
                    +3.2% 📈
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#e0e0e0', fontWeight: 600 }}>Annual Growth</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card elevation={8} sx={{ 
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(255, 77, 76, 0.1) 100%)',
            border: '2px solid rgba(76, 175, 80, 0.3)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 20px 40px rgba(76, 175, 80, 0.3)'
            }
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{
                color: '#4CAF50',
                fontWeight: 700,
                fontFamily: '"Inter", sans-serif'
              }}>
                🇨🇳 China's Import Dependence
              </Typography>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h5" fontWeight={700} sx={{ color: '#FF4D4C', fontSize: '2rem' }}>
                    70% 🔥
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#e0e0e0', fontWeight: 600 }}>Import Dependency</Typography>
                </Box>
                <Avatar sx={{ 
                  bgcolor: 'linear-gradient(135deg, #FF4D4C 0%, #FFA500 100%)', 
                  width: 48, 
                  height: 48,
                  color: '#fff',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 15px rgba(255, 77, 76, 0.4)'
                }}>CN</Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Image Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Avatar
            variant="rounded"
            src={ImageA}
            alt="data-stats"
            sx={{ 
              width: "100%", 
              height: 140, 
              borderRadius: 3,
              border: '3px solid rgba(255, 165, 0, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                border: '3px solid rgba(255, 165, 0, 0.6)',
                boxShadow: '0 15px 30px rgba(255, 165, 0, 0.3)'
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Avatar
            variant="rounded"
            src={ImageB}
            alt="map"
            sx={{ 
              width: "100%", 
              height: 140, 
              borderRadius: 3,
              border: '3px solid rgba(255, 165, 0, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                border: '3px solid rgba(255, 165, 0, 0.6)',
                boxShadow: '0 15px 30px rgba(255, 165, 0, 0.3)'
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Avatar
            variant="rounded"
            src={ImageC}
            alt="earth"
            sx={{ 
              width: "100%", 
              height: 140, 
              borderRadius: 3,
              border: '3px solid rgba(255, 165, 0, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                border: '3px solid rgba(255, 165, 0, 0.6)',
                boxShadow: '0 15px 30px rgba(255, 165, 0, 0.3)'
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Avatar
            variant="rounded"
            src={ImageD}
            alt="globe"
            sx={{ 
              width: "100%", 
              height: 140, 
              borderRadius: 3,
              border: '3px solid rgba(255, 165, 0, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                border: '3px solid rgba(255, 165, 0, 0.6)',
                boxShadow: '0 15px 30px rgba(255, 165, 0, 0.3)'
              }
            }}
          />
        </Grid>
      </Grid>

      {/* Feature Cards */}
      <Grid container spacing={3} justifyContent="center" mt={5}>
        <Grid item xs={12} md={4}>
          <Card elevation={8} sx={{ 
            borderRadius: 3, 
            height: "100%",
            background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(255, 165, 0, 0.1) 100%)',
            border: '2px solid rgba(76, 175, 80, 0.3)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 20px 40px rgba(76, 175, 80, 0.3)'
            }
          }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <Avatar sx={{ 
                  bgcolor: 'linear-gradient(135deg, #4CAF50 0%, #FFA500 100%)', 
                  color: '#fff',
                  width: 56,
                  height: 56,
                  boxShadow: '0 8px 20px rgba(76, 175, 80, 0.4)'
                }}>
                  <TrendingUpIcon sx={{ fontSize: '2rem' }} />
                </Avatar>
                <Typography fontWeight={700} sx={{ 
                  color: '#4CAF50', 
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1.1rem'
                }}>📈 Recession-Resilient Commodity</Typography>
              </Box>
              <Typography sx={{ 
                color: '#e0e0e0',
                fontFamily: '"Inter", sans-serif',
                fontSize: '1rem',
                lineHeight: 1.6,
                fontWeight: 500
              }}>
                💪 Iron ore maintains stable demand during economic downturns as infrastructure needs persist globally - <span style={{ color: '#FFA500', fontWeight: 700 }}>guaranteed profits!</span>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={8} sx={{ 
            borderRadius: 3, 
            height: "100%",
            background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(255, 165, 0, 0.1) 100%)',
            border: '2px solid rgba(76, 175, 80, 0.3)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 20px 40px rgba(76, 175, 80, 0.3)'
            }
          }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <Avatar sx={{ 
                  bgcolor: 'linear-gradient(135deg, #2196F3 0%, #FFA500 100%)', 
                  color: '#fff',
                  width: 56,
                  height: 56,
                  boxShadow: '0 8px 20px rgba(33, 150, 243, 0.4)'
                }}>
                  <PlaceIcon sx={{ fontSize: '2rem' }} />
                </Avatar>
                <Typography fontWeight={700} sx={{ 
                  color: '#2196F3', 
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1.1rem'
                }}>🌍 High-Volume Exports</Typography>
              </Box>
              <Typography sx={{ 
                color: '#e0e0e0',
                fontFamily: '"Inter", sans-serif',
                fontSize: '1rem',
                lineHeight: 1.6,
                fontWeight: 500
              }}>
                🚢 Brazil & Australia dominate global iron ore exports with established shipping infrastructure - <span style={{ color: '#FFA500', fontWeight: 700 }}>ensuring steady returns!</span>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={8} sx={{ 
            borderRadius: 3, 
            height: "100%",
            background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(255, 165, 0, 0.1) 100%)',
            border: '2px solid rgba(76, 175, 80, 0.3)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 20px 40px rgba(76, 175, 80, 0.3)'
            }
          }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <Avatar sx={{ 
                  bgcolor: 'linear-gradient(135deg, #FFA500 0%, #FFD700 100%)', 
                  color: '#fff',
                  width: 56,
                  height: 56,
                  boxShadow: '0 8px 20px rgba(255, 165, 0, 0.4)'
                }}>
                  <VerifiedUserIcon sx={{ fontSize: '2rem' }} />
                </Avatar>
                <Typography fontWeight={700} sx={{ 
                  color: '#FFA500', 
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1.1rem'
                }}>🏛️ Government-Backed Leases</Typography>
              </Box>
              <Typography sx={{ 
                color: '#e0e0e0',
                fontFamily: '"Inter", sans-serif',
                fontSize: '1rem',
                lineHeight: 1.6,
                fontWeight: 500
              }}>
                🏅 Our mining operations are secured by government-approved leases with long-term extraction rights - <span style={{ color: '#FFA500', fontWeight: 700 }}>your investment is protected!</span>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}