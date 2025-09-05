import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Chip,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  InputAdornment,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Close,
  Terrain,
  Security,
  TrendingUp,
  MonetizationOn,
  AccountBalance,
  Info,
  CheckCircle,
  PaymentOutlined
} from '@mui/icons-material';
// import { useRazorpay } from 'react-razorpay';
import { useSelector } from 'react-redux';
import { supabase } from '../../../config/index_supabase';
import Swal from 'sweetalert2';

const BondInvestmentModal = ({ open, onClose, onSuccess }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedBond, setSelectedBond] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investorDetails, setInvestorDetails] = useState({
    name: '',
    phone: '',
    panCard: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [clientSecret, setClientSecret] = useState('');
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { userSession } = useSelector(state => state.public);

  // Available bond types for investment
  const availableBonds = [
    {
      id: 'pilbara-premium',
      name: '🏆 Steady Income Champion',
      region: 'Australia',
      type: 'Safe & Steady',
      minInvestment: 300,
      expectedReturns: '15-20%',
      maturityPeriod: '18 months',
      riskLevel: 'Ultra Safe',
      description: '🛡️ The safest way to grow $300 into $360+ with Australia\'s most trusted mining operations. Get paid every 3 months!',
      features: [
        '💵 Quarterly cash payments directly to your account',
        '🔐 Full insurance coverage - Your money is 100% protected',
        '📱 Real-time mining progress on your phone',
        '🚪 Easy exit - Get your money back anytime after 1 year'
      ],
      color: '#4CAF50',
      icon: <Terrain />
    },
    {
      id: 'brazil-growth',
      name: '🌟 Wealth Builder Pro Bond',
      region: 'Brazil',
      type: 'Popular Choice',
      minInvestment: 200,
      expectedReturns: '20-25%',
      maturityPeriod: '12 months',
      riskLevel: 'Medium Risk, High Reward',
      description: '💎 Turn $200 into $250+ in just 1 year! Our most popular choice for serious wealth building. Limited spots available!',
      features: [
        '💰 25% annual returns - Beat inflation by 20%!',
        '📊 Monthly profit updates sent to your phone',
        '🎁 Bonus rewards for early investors',
        '🔄 Flexible exit options anytime after 6 months'
      ],
      color: '#FF9800',
      icon: <TrendingUp />
    },
    {
      id: 'india-starter',
      name: '💰 Quick Cash Starter Bond',
      region: 'India',
      type: 'Beginner-Friendly',
      minInvestment: 1,
      expectedReturns: '12-18%',
      maturityPeriod: '6 months',
      riskLevel: 'Safe & Secure',
      description: '🚀 Start with just $1! Double your money in 6 months with our safest investment. Perfect for beginners who want guaranteed returns!',
      features: [
        '💵 Start with just $1 - Anyone can afford it!',
        '📈 Up to 18% returns - Triple bank interest!',
        '🔒 100% Safe - Government backed security',
        '⚡ Quick 6-month returns - See profits fast!'
      ],
      color: '#2196F3',
      icon: <Security />
    },
    {
      id: 'safrica-premium',
      name: '🔥 Million Maker Platinum',
      region: 'South Africa',
      type: 'High Earner',
      minInvestment: 500,
      expectedReturns: '30-40%',
      maturityPeriod: '24 months',
      riskLevel: 'Higher Risk, Maximum Reward',
      description: '🚀 The ULTIMATE wealth multiplier! Turn $500 into $700+ in 2 years. For serious investors who want life-changing returns!',
      features: [
        '💎 Up to 40% annual returns - The highest we offer!',
        '🎯 Professional wealth managers handle everything',
        '👑 VIP investor status with exclusive perks',
        '📈 Advanced profit tracking and analytics dashboard'
      ],
      color: '#9C27B0',
      icon: <MonetizationOn />
    }
  ];

  const steps = ['Select Bond', 'Investment Amount', 'Investor Details', 'Payment'];

  useEffect(() => {
    if (userSession?.user?.email) {
      setInvestorDetails(prev => ({
        ...prev,
        name: userSession.user.user_metadata?.full_name || 
              userSession.user.user_metadata?.name || 
              userSession.user.email.split('@')[0]
      }));
    }
  }, [userSession]);

  const handleNext = () => {
    const currentStepValid = validateCurrentStep();
    if (currentStepValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validateCurrentStep = () => {
    const newErrors = {};

    switch (activeStep) {
      case 0:
        if (!selectedBond) {
          newErrors.bond = 'Please select a bond type';
        }
        break;
      case 1:
        if (!investmentAmount || investmentAmount < selectedBond?.minInvestment) {
          newErrors.amount = `Minimum investment is $${selectedBond?.minInvestment?.toLocaleString()}`;
        }
        break;
      case 2:
        if (!investorDetails.name) newErrors.name = 'Name is required';
        if (!investorDetails.phone) newErrors.phone = 'Phone number is required';
        if (!investorDetails.panCard) newErrors.panCard = 'PAN/Tax ID is required';
        if (!investorDetails.address) newErrors.address = 'Address is required';
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Create order in backend
      const orderData = await createPaymentOrder();
      
      if (!orderData) {
        throw new Error('Failed to create payment order');
      }

      // Store client secret for Stripe Elements
      setClientSecret(orderData.clientSecret);
      console.log('Payment Intent created:', orderData);
      setLoading(false);
    } catch (error) {
      console.error('Payment initialization failed:', error);
      setLoading(false);
      Swal.fire({
        title: 'Payment Error',
        text: 'Failed to initialize payment. Please try again.',
        icon: 'error',
        confirmButtonColor: '#FF4D4C'
      });
    }
  };

  const createPaymentOrder = async () => {
    try {
      // Call the real payments API
      const orderData = {
        amount: parseInt(investmentAmount) * 100, // Convert to paisa
        loc: 'IND' // Required parameter for the API
      };

      const response = await fetch(
        process.env.REACT_APP_BE_BASE_URL + "/super-action",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${process.env.REACT_APP_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            amount: parseInt(investmentAmount), // Amount in dollars
            currency: 'usd',
            metadata: {
              bond_id: selectedBond.id,
              bond_name: selectedBond.name,
              user_email: userSession?.user?.email || 'anonymous@example.com'
            }
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      let stripePaymentIntent;
      try {
        stripePaymentIntent = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error(`Invalid response from payment service: ${responseText}`);
      }

      console.log('Parsed payment intent:', stripePaymentIntent);

      // Store order in Supabase using stripe_payments table
      const { data, error } = await supabase
        .from('stripe_payments')
        .insert({
          payment_intent_id: stripePaymentIntent.paymentIntentId,
          amount: parseInt(investmentAmount) * 100, // Convert to cents for database
          currency: 'usd',
          status: 'pending',
          user_id: userSession?.user?.id || 'anonymous',
          user_email: userSession?.user?.email || 'anonymous@example.com',
          user_phone: investorDetails.phone,
          metadata: {
            bond_id: selectedBond.id,
            bond_name: selectedBond.name,
            investment_amount: investmentAmount,
            investor_details: investorDetails
          }
        })
        .select()
        .single();

      if (error) {
        console.warn('Failed to save to database:', error);
        // Continue anyway since payment intent was created
      }

      return {
        clientSecret: stripePaymentIntent.clientSecret,
        paymentIntentId: stripePaymentIntent.paymentIntentId,
        database_id: data?.id
      };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const handleStripePayment = async () => {
    if (!stripe || !elements || !clientSecret) {
      console.error('Missing required elements:', { stripe: !!stripe, elements: !!elements, clientSecret: !!clientSecret });
      return;
    }

    console.log('Attempting payment with client secret:', clientSecret);
    setLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: investorDetails.name || 'Test User',
            email: userSession?.user?.email || 'test@example.com',
            phone: investorDetails.phone || '+1234567890',
          },
        },
      });

      if (error) {
        console.error('Payment failed:', error);
        Swal.fire({
          title: 'Payment Failed',
          text: error.message,
          icon: 'error',
          confirmButtonColor: '#FF4D4C'
        });
      } else if (paymentIntent.status === 'succeeded') {
        await handlePaymentSuccess({ payment_method: paymentIntent.payment_method }, { paymentIntentId: paymentIntent.id });
      }
    } catch (err) {
      console.error('Payment error:', err);
      Swal.fire({
        title: 'Payment Error',
        text: 'An unexpected error occurred. Please try again.',
        icon: 'error',
        confirmButtonColor: '#FF4D4C'
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentResponse, orderData) => {
    console.log('Payment success handler called with:', { paymentResponse, orderData });
    
    try {
      // Update investment status in database
      const { error } = await supabase
        .from('stripe_payments')
        .update({
          status: 'succeeded',
          payment_method_id: paymentResponse.payment_method?.id || paymentResponse.payment_method,
          updated_at: new Date().toISOString()
        })
        .eq('payment_intent_id', orderData.paymentIntentId);

      if (error) {
        console.warn('Failed to update payment status:', error);
      } else {
        console.log('Payment status updated successfully');
      }

      setLoading(false);
      
      // Show success notification
      console.log('Showing success notification');
      setShowSuccessNotification(true);

      // Auto-close modal after 3 seconds
      setTimeout(() => {
        console.log('Auto-closing modal');
        setShowSuccessNotification(false);
        if (onSuccess) onSuccess();
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error in handlePaymentSuccess:', error);
      setLoading(false);
      Swal.fire({
        title: 'Payment Verification Failed',
        text: 'Payment was processed but verification failed. Please contact support.',
        icon: 'warning',
        confirmButtonColor: '#FF9800'
      });
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'High': return '#F44336';
      default: return '#757575';
    }
  };

  const renderBondSelection = () => (
    <Grid container spacing={2}>
      {availableBonds.map((bond) => (
        <Grid item xs={12} key={bond.id}>
          <Card
            sx={{
              cursor: 'pointer',
              border: selectedBond?.id === bond.id ? `2px solid ${bond.color}` : '1px solid rgba(255, 255, 255, 0.2)',
              bgcolor: selectedBond?.id === bond.id ? `${bond.color}20` : 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 8px 24px ${bond.color}40`
              }
            }}
            onClick={() => setSelectedBond(bond)}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Avatar sx={{ bgcolor: bond.color, width: 56, height: 56 }}>
                  {bond.icon}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ color: bond.color, fontWeight: 600, mb: 1 }}>
                    {bond.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#e0e0e0', mb: 2 }}>
                    {bond.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Chip label={bond.region} size="small" sx={{ bgcolor: `${bond.color}30`, color: bond.color }} />
                    <Chip label={bond.type} size="small" sx={{ bgcolor: `${bond.color}30`, color: bond.color }} />
                    <Chip 
                      label={bond.riskLevel} 
                      size="small" 
                      sx={{ bgcolor: `${getRiskColor(bond.riskLevel)}30`, color: getRiskColor(bond.riskLevel) }} 
                    />
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="caption" sx={{ color: '#bbb' }}>Min Investment</Typography>
                      <Typography variant="body2" sx={{ color: '#FFA500', fontWeight: 600 }}>
                        ${bond.minInvestment.toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="caption" sx={{ color: '#bbb' }}>Expected Returns</Typography>
                      <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 600 }}>
                        {bond.expectedReturns}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="caption" sx={{ color: '#bbb' }}>Maturity</Typography>
                      <Typography variant="body2" sx={{ color: '#2196F3', fontWeight: 600 }}>
                        {bond.maturityPeriod}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="caption" sx={{ color: '#bbb' }}>Risk Level</Typography>
                      <Typography variant="body2" sx={{ color: getRiskColor(bond.riskLevel), fontWeight: 600 }}>
                        {bond.riskLevel}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
      {errors.bond && (
        <Grid item xs={12}>
          <Alert severity="error">{errors.bond}</Alert>
        </Grid>
      )}
    </Grid>
  );

  const renderInvestmentAmount = () => (
    <Box>
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          Selected Bond: <strong>{selectedBond?.name}</strong><br/>
          Minimum Investment: <strong>${selectedBond?.minInvestment?.toLocaleString()}</strong><br/>
          Expected Returns: <strong>{selectedBond?.expectedReturns}</strong>
        </Typography>
      </Alert>
      
      <TextField
        fullWidth
        label="Investment Amount"
        type="number"
        value={investmentAmount}
        onChange={(e) => setInvestmentAmount(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        error={!!errors.amount}
        helperText={errors.amount || `Minimum: $${selectedBond?.minInvestment?.toLocaleString()}`}
        sx={{
          '& .MuiOutlinedInput-root': {
            color: '#fff',
            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
            '&:hover fieldset': { borderColor: '#FFA500' },
            '&.Mui-focused fieldset': { borderColor: '#FF4D4C' }
          },
          '& .MuiInputLabel-root': { color: '#e0e0e0' }
        }}
      />
      
      {investmentAmount && (
        <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(255, 165, 0, 0.1)', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ color: '#FFA500', mb: 2 }}>Investment Summary</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" sx={{ color: '#e0e0e0' }}>Investment Amount:</Typography>
              <Typography variant="h6" sx={{ color: '#FFA500' }}>${parseInt(investmentAmount || 0).toLocaleString()}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" sx={{ color: '#e0e0e0' }}>Expected Annual Return:</Typography>
              <Typography variant="h6" sx={{ color: '#4CAF50' }}>
                ${Math.round(parseInt(investmentAmount || 0) * 0.09).toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );

  const renderInvestorDetails = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Full Name"
          value={investorDetails.name}
          onChange={(e) => setInvestorDetails(prev => ({ ...prev, name: e.target.value }))}
          error={!!errors.name}
          helperText={errors.name}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#fff',
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
              '&:hover fieldset': { borderColor: '#FFA500' },
              '&.Mui-focused fieldset': { borderColor: '#FF4D4C' }
            },
            '& .MuiInputLabel-root': { color: '#e0e0e0' }
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Phone Number"
          value={investorDetails.phone}
          onChange={(e) => setInvestorDetails(prev => ({ ...prev, phone: e.target.value }))}
          error={!!errors.phone}
          helperText={errors.phone}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#fff',
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
              '&:hover fieldset': { borderColor: '#FFA500' },
              '&.Mui-focused fieldset': { borderColor: '#FF4D4C' }
            },
            '& .MuiInputLabel-root': { color: '#e0e0e0' }
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="PAN/Tax ID"
          value={investorDetails.panCard}
          onChange={(e) => setInvestorDetails(prev => ({ ...prev, panCard: e.target.value }))}
          error={!!errors.panCard}
          helperText={errors.panCard}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#fff',
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
              '&:hover fieldset': { borderColor: '#FFA500' },
              '&.Mui-focused fieldset': { borderColor: '#FF4D4C' }
            },
            '& .MuiInputLabel-root': { color: '#e0e0e0' }
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Address"
          multiline
          rows={3}
          value={investorDetails.address}
          onChange={(e) => setInvestorDetails(prev => ({ ...prev, address: e.target.value }))}
          error={!!errors.address}
          helperText={errors.address}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#fff',
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
              '&:hover fieldset': { borderColor: '#FFA500' },
              '&.Mui-focused fieldset': { borderColor: '#FF4D4C' }
            },
            '& .MuiInputLabel-root': { color: '#e0e0e0' }
          }}
        />
      </Grid>
    </Grid>
  );

  const renderPaymentSummary = () => (
    <Box>
      <Alert severity="success" sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          Ready to process your investment
        </Typography>
      </Alert>
      
      <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#FFA500', mb: 2 }}>Investment Summary</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ color: '#bbb' }}>Bond:</Typography>
              <Typography variant="body1" sx={{ color: '#FFA500', fontWeight: 600 }}>
                {selectedBond?.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ color: '#bbb' }}>Investment Amount:</Typography>
              <Typography variant="h6" sx={{ color: '#4CAF50', fontWeight: 600 }}>
                ${parseInt(investmentAmount).toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ color: '#bbb' }}>Expected Returns:</Typography>
              <Typography variant="body1" sx={{ color: '#4CAF50' }}>
                {selectedBond?.expectedReturns} annually
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ color: '#bbb' }}>Maturity Period:</Typography>
              <Typography variant="body1" sx={{ color: '#2196F3' }}>
                {selectedBond?.maturityPeriod}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ color: '#bbb' }}>Investor:</Typography>
              <Typography variant="body1" sx={{ color: '#FFA500' }}>
                {investorDetails.name} • {investorDetails.phone}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {!clientSecret ? (
        <Button
          fullWidth
          variant="contained"
          onClick={handlePayment}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : <PaymentOutlined />}
          sx={{
            background: loading ? 'rgba(255, 77, 76, 0.5)' : 'linear-gradient(135deg, #FF4D4C 0%, #FFA500 100%)',
            color: '#fff',
            py: 2,
            fontSize: '1.1rem',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              background: loading ? 'rgba(255, 77, 76, 0.5)' : 'linear-gradient(135deg, #FFA500 0%, #FF4D4C 100%)'
            }
          }}
        >
          {loading ? 'Creating Payment...' : 'Create Payment Intent'}
        </Button>
      ) : (
        <Box>
          <Typography variant="h6" sx={{ color: '#FFA500', mb: 2 }}>Payment Details</Typography>
          <Box sx={{ 
            bgcolor: 'rgba(255, 255, 255, 0.1)', 
            p: 2, 
            borderRadius: 2, 
            mb: 3,
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#ffffff',
                    backgroundColor: 'transparent',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </Box>
          
          <Button
            fullWidth
            variant="contained"
            onClick={handleStripePayment}
            disabled={loading || !stripe || !elements}
            startIcon={loading ? <CircularProgress size={20} /> : <PaymentOutlined />}
            sx={{
              background: loading ? 'rgba(255, 77, 76, 0.5)' : 'linear-gradient(135deg, #FF4D4C 0%, #FFA500 100%)',
              color: '#fff',
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                background: loading ? 'rgba(255, 77, 76, 0.5)' : 'linear-gradient(135deg, #FFA500 0%, #FF4D4C 100%)'
              }
            }}
          >
            {loading ? 'Processing Payment...' : `Pay $${parseInt(investmentAmount).toLocaleString()}`}
          </Button>
        </Box>
      )}
    </Box>
  );

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return renderBondSelection();
      case 1:
        return renderInvestmentAmount();
      case 2:
        return renderInvestorDetails();
      case 3:
        return renderPaymentSummary();
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          bgcolor: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#fff',
          minHeight: isMobile ? '100vh' : '80vh'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AccountBalance sx={{ color: '#FFA500' }} />
          <Typography variant="h5" sx={{ color: '#FFA500', fontWeight: 600 }}>
            New Iron Ore Investment
          </Typography>
        </Box>
        <Button onClick={onClose} sx={{ color: '#fff', minWidth: 'auto' }}>
          <Close />
        </Button>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Stepper activeStep={activeStep} orientation={isMobile ? 'vertical' : 'horizontal'} sx={{ mb: 4 }}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  '& .MuiStepLabel-label': { color: '#e0e0e0' },
                  '& .MuiStepLabel-label.Mui-active': { color: '#FFA500' },
                  '& .MuiStepLabel-label.Mui-completed': { color: '#4CAF50' }
                }}
              >
                {label}
              </StepLabel>
              {isMobile && (
                <StepContent>
                  {getStepContent(index)}
                </StepContent>
              )}
            </Step>
          ))}
        </Stepper>

        {!isMobile && (
          <Box sx={{ minHeight: 400 }}>
            {getStepContent(activeStep)}
          </Box>
        )}
      </DialogContent>

      {!isMobile && (
        <DialogActions sx={{ p: 3, borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ color: '#e0e0e0' }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {activeStep < steps.length - 1 && (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                background: 'linear-gradient(135deg, #FF4D4C 0%, #FFA500 100%)',
                color: '#fff',
                px: 4
              }}
            >
              Next
            </Button>
          )}
        </DialogActions>
      )}

      {/* Success Notification Overlay */}
      {showSuccessNotification && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            animation: 'fadeIn 0.3s ease-in-out'
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(135deg, #4CAF50 0%, #45A049 100%)',
              borderRadius: '16px',
              padding: '40px',
              textAlign: 'center',
              color: '#fff',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              animation: 'slideIn 0.5s ease-out, pulse 2s infinite',
              maxWidth: '400px',
              margin: '20px'
            }}
          >
            <CheckCircle sx={{ fontSize: 80, mb: 2, animation: 'bounce 1s ease-in-out' }} />
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
              Investment Successful!
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Your investment of ${parseInt(investmentAmount).toLocaleString()} in
            </Typography>
            <Typography variant="h6" sx={{ color: '#FFE082', fontWeight: 500 }}>
              {selectedBond?.name}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, opacity: 0.9 }}>
              has been confirmed successfully.
            </Typography>
          </Box>
        </Box>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateY(-30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes bounce {
          0%, 20%, 60%, 100% { transform: translateY(0); }
          40% { transform: translateY(-20px); }
          80% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </Dialog>
  );
};

export default BondInvestmentModal;