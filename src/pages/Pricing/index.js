import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";
import {
  CheckCircle,
  Star,
  ExpandMore,
  TrendingUp,
  Security,
  Assessment,
  Diamond
} from "@mui/icons-material";

import "./styles.css";
import PaymentForm from "./PaymentForm";
import SuccessScreen from "./PaymentForm/SuccessScreen";

const Pricing = () => {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [userData, setUserData] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);

  const toggleForm = (plan = null) => {
    setSelectedPlan(plan);
    setShowForm((prev) => !prev);
  };

  const onSubmit = (user) => {
    setSubmitted(true);
    setUserData(user);
    setShowForm(false);
  };

  const investmentPlans = [
    {
      id: 'starter',
      name: 'Starter Portfolio',
      price: '$10,000',
      period: 'minimum investment',
      returns: '6-7%',
      description: 'Perfect for first-time iron ore investors',
      popular: false,
      features: [
        'Single mining site exposure',
        'Quarterly performance reports',
        'Basic market insights',
        'Email support',
        'Minimum 12-month commitment',
        'Standard liquidity options'
      ],
      color: '#FF4D4C'
    },
    {
      id: 'growth',
      name: 'Growth Portfolio',
      price: '$50,000',
      period: 'minimum investment',
      returns: '7-9%',
      description: 'Diversified exposure across multiple mining operations',
      popular: true,
      features: [
        'Multi-site diversification',
        'Monthly performance reports',
        'Advanced market analytics',
        'Priority phone support',
        'Flexible commitment terms',
        'Enhanced liquidity options',
        'Quarterly investor calls',
        'ESG impact reporting'
      ],
      color: '#FFA500'
    },
    {
      id: 'premium',
      name: 'Premium Portfolio',
      price: '$250,000',
      period: 'minimum investment',
      returns: '8-10%',
      description: 'Institutional-grade investment with premium features',
      popular: false,
      features: [
        'Global portfolio diversification',
        'Weekly performance updates',
        'Custom market research',
        'Dedicated relationship manager',
        'No minimum commitment',
        'Premium liquidity options',
        'Monthly investor calls',
        'Site visit opportunities',
        'Priority deal access',
        'Tax optimization consulting'
      ],
      color: '#FFD700'
    }
  ];

  const faqs = [
    {
      question: "What makes iron ore a good investment?",
      answer: "Iron ore is a fundamental raw material for steel production, which is essential for global infrastructure development. With growing urbanization and infrastructure projects worldwide, demand for iron ore remains strong, providing stable returns for investors."
    },
    {
      question: "How are returns calculated and distributed?",
      answer: "Returns are based on mining revenue minus operational costs and management fees. Distributions are made quarterly for Starter and Growth portfolios, and monthly for Premium portfolios. All returns are backed by actual mining output and sales."
    },
    {
      question: "What are the risks involved?",
      answer: "Like all investments, iron ore investments carry risks including commodity price fluctuations, operational challenges, and regulatory changes. We mitigate these through diversification, professional management, and comprehensive insurance coverage."
    },
    {
      question: "Can I withdraw my investment early?",
      answer: "Withdrawal terms depend on your portfolio type. Starter portfolios have a 12-month minimum commitment, while Growth and Premium portfolios offer more flexible terms. Early withdrawal may be subject to fees and market conditions."
    },
    {
      question: "How do you ensure mining operations are sustainable?",
      answer: "All our mining partners adhere to strict environmental and social governance (ESG) standards. We regularly audit operations for compliance with international sustainability standards and provide ESG impact reporting to investors."
    },
    {
      question: "What fees are involved?",
      answer: "Management fees range from 1.5% to 2.5% annually depending on your portfolio type. There are no hidden fees, and all costs are transparently disclosed in your investment agreement."
    }
  ];

  if (showForm) return <PaymentForm onSubmit={onSubmit} selectedPlan={selectedPlan} />;

  if (isSubmitted) return <SuccessScreen user={userData} />;

  return (
    <Box className="pricing-page-container" sx={{ bgcolor: '#000', color: '#fff', py: 6 }}>
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
            Investment Portfolios
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
            Choose the iron ore investment portfolio that matches your financial goals and risk tolerance
          </Typography>
        </Box>

        {/* Investment Plans */}
        <Grid container spacing={4} mb={8}>
          {investmentPlans.map((plan, index) => (
            <Grid item xs={12} md={4} key={plan.id}>
              <Card
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: plan.popular ? `2px solid ${plan.color}` : '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 3,
                  position: 'relative',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 12px 40px rgba(${plan.color === '#FFA500' ? '255, 165, 0' : '255, 77, 76'}, 0.3)`
                  }
                }}
              >
                {plan.popular && (
                  <Chip
                    icon={<Star />}
                    label="Most Popular"
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      bgcolor: plan.color,
                      color: '#000',
                      fontWeight: 'bold'
                    }}
                  />
                )}
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography
                    variant="h5"
                    sx={{ color: plan.color, fontWeight: 600, mb: 2 }}
                  >
                    {plan.name}
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{ color: '#fff', fontWeight: 'bold', mb: 1 }}
                  >
                    {plan.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#bbb', mb: 2 }}
                  >
                    {plan.period}
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: `rgba(${plan.color === '#FFA500' ? '255, 165, 0' : plan.color === '#FFD700' ? '255, 215, 0' : '255, 77, 76'}, 0.2)`,
                      borderRadius: 2,
                      p: 2,
                      mb: 3
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{ color: plan.color, fontWeight: 'bold' }}
                    >
                      {plan.returns}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: '#e0e0e0' }}
                    >
                      Annual Returns
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{ color: '#e0e0e0', mb: 3, lineHeight: 1.6 }}
                  >
                    {plan.description}
                  </Typography>
                  <List dense sx={{ mb: 3 }}>
                    {plan.features.map((feature, idx) => (
                      <ListItem key={idx} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircle sx={{ color: plan.color, fontSize: '1.2rem' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          sx={{
                            '& .MuiListItemText-primary': {
                              color: '#e0e0e0',
                              fontSize: '0.9rem'
                            }
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    onClick={() => toggleForm(plan)}
                    sx={{
                      background: `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}dd 100%)`,
                      color: plan.color === '#FFD700' ? '#000' : '#fff',
                      fontWeight: 'bold',
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      width: '100%',
                      fontSize: '1.1rem',
                      '&:hover': {
                        background: `linear-gradient(135deg, ${plan.color}dd 0%, ${plan.color} 100%)`,
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

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
            Investment Features Comparison
          </Typography>
          <Box
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 3,
              p: 4
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Box textAlign="center">
                  <Security sx={{ fontSize: '3rem', color: '#FFA500', mb: 2 }} />
                  <Typography variant="h6" sx={{ color: '#FFA500', mb: 2 }}>
                    Asset-Backed Security
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                    All investments backed by real mining assets with proven reserves
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box textAlign="center">
                  <TrendingUp sx={{ fontSize: '3rem', color: '#FFA500', mb: 2 }} />
                  <Typography variant="h6" sx={{ color: '#FFA500', mb: 2 }}>
                    Consistent Returns
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                    Track record of delivering stable returns through market cycles
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box textAlign="center">
                  <Assessment sx={{ fontSize: '3rem', color: '#FFA500', mb: 2 }} />
                  <Typography variant="h6" sx={{ color: '#FFA500', mb: 2 }}>
                    Professional Management
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                    Expert team with decades of mining industry experience
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box textAlign="center">
                  <Diamond sx={{ fontSize: '3rem', color: '#FFA500', mb: 2 }} />
                  <Typography variant="h6" sx={{ color: '#FFA500', mb: 2 }}>
                    Transparent Operations
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                    Full transparency with regular reporting and site access
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* FAQs */}
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              mb: 4,
              textAlign: 'center',
              color: '#FFA500'
            }}
          >
            Frequently Asked Questions
          </Typography>
          {faqs.map((faq, index) => (
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
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: '#e0e0e0', lineHeight: 1.6 }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Pricing;
