import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  Snackbar,
  useTheme,
  useMediaQuery,
  Paper
} from "@mui/material";
import {
  Add,
  Delete,
  Edit,
  PersonAdd,
  Refresh,
  AccountBalance
} from "@mui/icons-material";
import { supabase } from "../../../config/index_supabase";

const MockInvestorsAdmin = () => {
  const [mockInvestors, setMockInvestors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingInvestor, setEditingInvestor] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    total_bonds: 1,
    total_invested: 250,
    bond_type: 'India Starter',
    avatar_color: '#FF6B35'
  });

  const bondTypes = [
    'India Starter',
    'Brazil Growth', 
    'Australia Premium',
    'South Africa Platinum'
  ];

  const avatarColors = [
    '#FF6B35', '#4ECDC4', '#45B7D1', '#96CEB4', 
    '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
  ];

  const fetchMockInvestors = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('mock_investors')
        .select('*')
        .eq('is_active', true)
        .order('joined_date', { ascending: false });

      if (error) {
        console.error('Error fetching mock investors:', error);
        setNotification({
          open: true,
          message: 'Error fetching mock investors',
          severity: 'error'
        });
        return;
      }

      setMockInvestors(data || []);
    } catch (error) {
      console.error('Error:', error);
      setNotification({
        open: true,
        message: 'Error connecting to database',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMockInvestors();
  }, []);

  const handleOpenDialog = (investor = null) => {
    if (investor) {
      setEditingInvestor(investor);
      setFormData({
        name: investor.name,
        email: investor.email,
        total_bonds: investor.total_bonds,
        total_invested: investor.total_invested,
        bond_type: investor.bond_type || 'India Starter',
        avatar_color: investor.avatar_color || '#FF6B35'
      });
    } else {
      setEditingInvestor(null);
      setFormData({
        name: '',
        email: '',
        total_bonds: 1,
        total_invested: 250,
        bond_type: 'India Starter',
        avatar_color: '#FF6B35'
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingInvestor(null);
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      setNotification({
        open: true,
        message: 'Name and email are required',
        severity: 'error'
      });
      return;
    }

    try {
      const investorData = {
        ...formData,
        last_investment: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      if (editingInvestor) {
        // Update existing investor
        const { error } = await supabase
          .from('mock_investors')
          .update(investorData)
          .eq('id', editingInvestor.id);

        if (error) throw error;

        setNotification({
          open: true,
          message: 'Mock investor updated successfully!',
          severity: 'success'
        });
      } else {
        // Create new investor
        const { error } = await supabase
          .from('mock_investors')
          .insert([investorData]);

        if (error) throw error;

        setNotification({
          open: true,
          message: 'Mock investor added successfully!',
          severity: 'success'
        });
      }

      handleCloseDialog();
      fetchMockInvestors();
    } catch (error) {
      console.error('Error saving mock investor:', error);
      setNotification({
        open: true,
        message: 'Error saving mock investor',
        severity: 'error'
      });
    }
  };

  const handleDelete = async (investor) => {
    if (!window.confirm(`Are you sure you want to delete ${investor.name}?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('mock_investors')
        .update({ is_active: false })
        .eq('id', investor.id);

      if (error) throw error;

      setNotification({
        open: true,
        message: 'Mock investor deleted successfully!',
        severity: 'success'
      });
      
      fetchMockInvestors();
    } catch (error) {
      console.error('Error deleting mock investor:', error);
      setNotification({
        open: true,
        message: 'Error deleting mock investor',
        severity: 'error'
      });
    }
  };

  const getInvestorInitials = (name) => {
    if (!name) return 'A';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMs = now - new Date(date);
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return `${diffInDays}d ago`;
    }
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
        minHeight: '100vh',
        color: '#fff',
        p: { xs: 2, md: 3 }
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: '#FFA500',
            fontFamily: 'Inter, sans-serif',
            mb: 1
          }}
        >
          Mock Investors Admin
        </Typography>
        <Typography variant="h6" sx={{ color: '#e0e0e0' }}>
          Manage mock investors for demo purposes
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{
            bgcolor: '#FFA500',
            color: '#000',
            fontWeight: 'bold',
            '&:hover': { bgcolor: '#FF8C00' }
          }}
        >
          Add Mock Investor
        </Button>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={fetchMockInvestors}
          sx={{
            borderColor: '#FFA500',
            color: '#FFA500',
            '&:hover': { borderColor: '#FF8C00', bgcolor: 'rgba(255, 165, 0, 0.1)' }
          }}
        >
          Refresh
        </Button>
      </Box>

      {/* Mock Investors List */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{
            bgcolor: 'rgba(33, 33, 33, 0.8)',
            border: '1px solid rgba(255, 165, 0, 0.2)',
            borderRadius: 2
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#FFA500', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <PersonAdd />
                Mock Investors ({mockInvestors.length})
              </Typography>

              {loading ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography sx={{ color: '#bbb' }}>Loading mock investors...</Typography>
                </Box>
              ) : mockInvestors.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <PersonAdd sx={{ fontSize: 48, color: '#555', mb: 2 }} />
                  <Typography variant="body1" sx={{ color: '#bbb', mb: 1 }}>
                    No mock investors found
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog()}
                    sx={{ bgcolor: '#FFA500', color: '#000' }}
                  >
                    Add First Mock Investor
                  </Button>
                </Box>
              ) : (
                <List sx={{ maxHeight: 600, overflow: 'auto' }}>
                  {mockInvestors.map((investor) => (
                    <ListItem
                      key={investor.id}
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.02)',
                        mb: 1,
                        borderRadius: 1,
                        border: '1px solid rgba(255, 165, 0, 0.1)',
                        '&:hover': {
                          bgcolor: 'rgba(255, 165, 0, 0.05)',
                          border: '1px solid rgba(255, 165, 0, 0.2)'
                        }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: investor.avatar_color,
                            width: 50,
                            height: 50,
                            fontSize: '1rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {getInvestorInitials(investor.name)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                            <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>
                              {investor.name}
                            </Typography>
                            <Chip
                              label={investor.bond_type}
                              size="small"
                              sx={{
                                bgcolor: 'rgba(255, 165, 0, 0.2)',
                                color: '#FFA500',
                                height: 20,
                                fontSize: '0.7rem'
                              }}
                            />
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 0.5 }}>
                            <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                              {investor.email}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#FFA500', fontWeight: 500 }}>
                              {investor.total_bonds} bonds • ${investor.total_invested} invested
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#bbb' }}>
                              Joined {formatTimeAgo(investor.joined_date)}
                            </Typography>
                          </Box>
                        }
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <IconButton
                          onClick={() => handleOpenDialog(investor)}
                          sx={{ color: '#4CAF50', '&:hover': { bgcolor: 'rgba(76, 175, 80, 0.1)' } }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(investor)}
                          sx={{ color: '#f44336', '&:hover': { bgcolor: 'rgba(244, 67, 54, 0.1)' } }}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Info Panel */}
        <Grid item xs={12} md={4}>
          <Paper sx={{
            bgcolor: 'rgba(33, 33, 33, 0.8)',
            border: '1px solid rgba(255, 165, 0, 0.2)',
            borderRadius: 2,
            p: 3
          }}>
            <Typography variant="h6" sx={{ color: '#FFA500', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccountBalance />
              Admin Info
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ color: '#bbb', mb: 1 }}>
                Total Mock Investors:
              </Typography>
              <Typography variant="h4" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                {mockInvestors.length}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ color: '#bbb', mb: 1 }}>
                Total Mock Investment:
              </Typography>
              <Typography variant="h4" sx={{ color: '#FFA500', fontWeight: 'bold' }}>
                ${mockInvestors.reduce((sum, inv) => sum + parseFloat(inv.total_invested || 0), 0).toFixed(0)}
              </Typography>
            </Box>
            <Alert severity="info" sx={{ mt: 2 }}>
              Mock investors will appear in the "Recent Investor Activity" section on the main dashboard.
            </Alert>
          </Paper>
        </Grid>
      </Grid>

      {/* Add/Edit Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#1a1a1a',
            color: '#fff',
            border: '1px solid rgba(255, 165, 0, 0.3)'
          }
        }}
      >
        <DialogTitle sx={{ color: '#FFA500' }}>
          {editingInvestor ? 'Edit Mock Investor' : 'Add New Mock Investor'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={(e) => handleFormChange('name', e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': { color: '#fff' },
                  '& .MuiInputLabel-root': { color: '#bbb' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleFormChange('email', e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': { color: '#fff' },
                  '& .MuiInputLabel-root': { color: '#bbb' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Total Bonds"
                type="number"
                value={formData.total_bonds}
                onChange={(e) => handleFormChange('total_bonds', parseInt(e.target.value) || 1)}
                sx={{
                  '& .MuiOutlinedInput-root': { color: '#fff' },
                  '& .MuiInputLabel-root': { color: '#bbb' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Total Invested ($)"
                type="number"
                value={formData.total_invested}
                onChange={(e) => handleFormChange('total_invested', parseFloat(e.target.value) || 0)}
                sx={{
                  '& .MuiOutlinedInput-root': { color: '#fff' },
                  '& .MuiInputLabel-root': { color: '#bbb' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#bbb' }}>Bond Type</InputLabel>
                <Select
                  value={formData.bond_type}
                  onChange={(e) => handleFormChange('bond_type', e.target.value)}
                  sx={{
                    color: '#fff',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' }
                  }}
                >
                  {bondTypes.map(type => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="body2" sx={{ color: '#bbb', mb: 1 }}>
                  Avatar Color
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {avatarColors.map(color => (
                    <Box
                      key={color}
                      onClick={() => handleFormChange('avatar_color', color)}
                      sx={{
                        width: 30,
                        height: 30,
                        bgcolor: color,
                        borderRadius: '50%',
                        cursor: 'pointer',
                        border: formData.avatar_color === color ? '3px solid #FFA500' : '2px solid #555',
                        '&:hover': { transform: 'scale(1.1)' }
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: '#bbb' }}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            sx={{ bgcolor: '#FFA500', color: '#000' }}
          >
            {editingInvestor ? 'Update' : 'Add'} Investor
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MockInvestorsAdmin;