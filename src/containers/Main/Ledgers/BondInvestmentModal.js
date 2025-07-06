import React, { useState, useEffect } from 'react';
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
import { useRazorpay } from 'react-razorpay';
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { userSession } = useSelector(state => state.public);
  const { Razorpay } = useRazorpay();

  // Available bond types for investment
  const availableBonds = [
    {
      id: 'pilbara-premium',
      name: 'Australia Pilbara Premium Iron Bond',
      region: 'Australia',
      type: 'Premium',
      minInvestment: 50000,
      expectedReturns: '8-10%',
      maturityPeriod: '24 months',
      riskLevel: 'Low',
      description: 'High-grade iron ore mining operations in Australia\'s Pilbara region with proven reserves.',
      features: [
        'Quarterly dividend payments',
        'Insurance coverage included',
        'Direct access to mining reports',
        'Exit options after 12 months'
      ],
      color: '#4CAF50',
      icon: <Terrain />
    },
    {
      id: 'brazil-growth',
      name: 'Brazil Minas Gerais Growth Bond',
      region: 'Brazil',
      type: 'Growth',
      minInvestment: 25000,
      expectedReturns: '10-12%',
      maturityPeriod: '18 months',
      riskLevel: 'Medium',
      description: 'Expanding iron ore operations in Brazil\'s premier mining region with sustainable practices.',
      features: [
        'Monthly progress updates',
        'ESG compliance reporting',
        'Growth participation bonus',
        'Flexible investment terms'
      ],
      color: '#FF9800',
      icon: <TrendingUp />
    },
    {
      id: 'india-starter',
      name: 'India Goa Starter Iron Bond',
      region: 'India',
      type: 'Starter',
      minInvestment: 10000,
      expectedReturns: '6-8%',
      maturityPeriod: '12 months',
      riskLevel: 'Low',
      description: 'Entry-level investment in established Indian iron ore mining with steady returns.',
      features: [
        'Low minimum investment',
        'Beginner-friendly terms',
        'Regular performance updates',
        'Local market expertise'
      ],
      color: '#2196F3',
      icon: <Security />
    },
    {
      id: 'safrica-premium',
      name: 'South Africa Premium Mining Bond',
      region: 'South Africa',
      type: 'Premium',
      minInvestment: 75000,
      expectedReturns: '12-15%',
      maturityPeriod: '36 months',
      riskLevel: 'High',
      description: 'High-yield investment in South African mining operations with premium return potential.',
      features: [
        'Highest return potential',
        'Professional risk management',
        'Premium investor services',
        'Advanced analytics access'
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
          newErrors.amount = `Minimum investment is ₹${selectedBond?.minInvestment?.toLocaleString()}`;
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

      // Initialize Razorpay payment
      const options = {
        key: process.env.REACT_APP_RP_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "AuricMine",
        description: `${selectedBond.name} Investment`,
        order_id: orderData.id,
        prefill: {
          name: investorDetails.name,
          email: userSession?.user?.email,
          contact: investorDetails.phone
        },
        theme: {
          color: "#FF4D4C"
        },
        handler: async (response) => {
          await handlePaymentSuccess(response, orderData);
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          }
        }
      };

      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
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
        process.env.REACT_APP_BE_BASE_URL + "/payments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const razorpayOrder = await response.json();

      // Store order in Supabase
      const { data, error } = await supabase
        .from('bond_investments')
        .insert({
          user_id: userSession?.user?.id || 'anonymous',
          user_email: userSession?.user?.email || 'anonymous@example.com',
          bond_id: selectedBond.id,
          bond_name: selectedBond.name,
          investment_amount: investmentAmount,
          investor_details: investorDetails,
          status: 'pending',
          razorpay_order_id: razorpayOrder.id,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      return {
        ...razorpayOrder,
        database_id: data.id
      };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const handlePaymentSuccess = async (paymentResponse, orderData) => {
    try {
      // Update investment status in database
      const { error } = await supabase
        .from('bond_investments')
        .update({
          status: 'completed',
          payment_id: paymentResponse.razorpay_payment_id,
          razorpay_order_id: paymentResponse.razorpay_order_id,
          razorpay_signature: paymentResponse.razorpay_signature,
          completed_at: new Date().toISOString()
        })
        .eq('id', orderData.database_id);

      if (error) throw error;

      setLoading(false);
      
      // Show success message
      await Swal.fire({
        title: 'Investment Successful!',
        text: `Your investment of ₹${parseInt(investmentAmount).toLocaleString()} in ${selectedBond.name} has been confirmed.`,
        icon: 'success',
        confirmButtonColor: '#4CAF50',
        confirmButtonText: 'View Dashboard'
      });

      // Call success callback and close modal
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating payment status:', error);
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
                        ₹{bond.minInvestment.toLocaleString()}
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
          Minimum Investment: <strong>₹{selectedBond?.minInvestment?.toLocaleString()}</strong><br/>
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
          startAdornment: <InputAdornment position="start">₹</InputAdornment>,
        }}
        error={!!errors.amount}
        helperText={errors.amount || `Minimum: ₹${selectedBond?.minInvestment?.toLocaleString()}`}
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
              <Typography variant="h6" sx={{ color: '#FFA500' }}>₹{parseInt(investmentAmount || 0).toLocaleString()}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" sx={{ color: '#e0e0e0' }}>Expected Annual Return:</Typography>
              <Typography variant="h6" sx={{ color: '#4CAF50' }}>
                ₹{Math.round(parseInt(investmentAmount || 0) * 0.09).toLocaleString()}
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
                ₹{parseInt(investmentAmount).toLocaleString()}
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
        {loading ? 'Processing Payment...' : `Pay ₹${parseInt(investmentAmount).toLocaleString()}`}
      </Button>
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
    </Dialog>
  );
};

export default BondInvestmentModal;