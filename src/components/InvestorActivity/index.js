import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery
} from "@mui/material";
import {
  PersonAdd,
  TrendingUp,
  Refresh
} from "@mui/icons-material";
import { supabase } from "../../config/index_supabase";

const InvestorActivity = ({ refreshTrigger = 0 }) => {
  const [newInvestors, setNewInvestors] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const fetchNewInvestors = async () => {
    setLoading(true);
    try {
      // Fetch both real payments and mock investors
      const [paymentsResponse, mockInvestorsResponse] = await Promise.all([
        supabase
          .from('stripe_payments')
          .select('*')
          .eq('status', 'succeeded')
          .order('created_at', { ascending: false })
          .limit(10),
        supabase
          .from('mock_investors')
          .select('*')
          .eq('is_active', true)
          .order('joined_date', { ascending: false })
          .limit(10)
      ]);

      const { data: recentPayments, error: paymentsError } = paymentsResponse;
      const { data: mockInvestors, error: mockError } = mockInvestorsResponse;

      if (paymentsError) {
        console.error('Error fetching recent payments:', paymentsError);
      }
      if (mockError) {
        console.error('Error fetching mock investors:', mockError);
      }

      const allInvestors = [];

      // Process real payments
      if (recentPayments && !paymentsError) {
        const investorMap = new Map();
        
        recentPayments.forEach(payment => {
          const key = payment.user_id || payment.user_email;
          if (key) {
            if (investorMap.has(key)) {
              const investor = investorMap.get(key);
              investor.totalBonds += 1;
              investor.totalInvested += payment.amount / 100;
              investor.lastInvestment = new Date(payment.created_at);
            } else {
              investorMap.set(key, {
                id: `real_${key}`,
                name: payment.user_email ? 
                  (payment.user_email.split('@')[0].charAt(0).toUpperCase() + 
                   payment.user_email.split('@')[0].slice(1)) : 
                  'Anonymous',
                email: payment.user_email || 'anonymous@auricmine.com',
                totalBonds: 1,
                totalInvested: payment.amount / 100,
                joinedDate: new Date(payment.created_at),
                lastInvestment: new Date(payment.created_at),
                isNew: true,
                isMock: false,
                avatar_color: '#FF6B35'
              });
            }
          }
        });

        allInvestors.push(...Array.from(investorMap.values()));
      }

      // Process mock investors
      if (mockInvestors && !mockError) {
        const processedMockInvestors = mockInvestors.map(mock => ({
          id: `mock_${mock.id}`,
          name: mock.name,
          email: mock.email,
          totalBonds: mock.total_bonds,
          totalInvested: parseFloat(mock.total_invested),
          joinedDate: new Date(mock.joined_date),
          lastInvestment: new Date(mock.last_investment || mock.joined_date),
          isNew: true,
          isMock: true,
          avatar_color: mock.avatar_color || '#FF6B35',
          bond_type: mock.bond_type
        }));

        allInvestors.push(...processedMockInvestors);
      }

      // Sort all investors by join date (newest first) and limit to 8
      const sortedInvestors = allInvestors
        .sort((a, b) => b.joinedDate - a.joinedDate)
        .slice(0, 8);

      setNewInvestors(sortedInvestors);
    } catch (error) {
      console.error('Error fetching investor activity:', error);
      setNewInvestors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewInvestors();
  }, [refreshTrigger]);

  const getInvestorInitials = (name) => {
    if (!name || name === 'Anonymous') return 'A';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMs = now - date;
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

  if (loading) {
    return (
      <Card sx={{
        bgcolor: 'rgba(33, 33, 33, 0.8)',
        border: '1px solid rgba(255, 165, 0, 0.2)',
        borderRadius: 2,
        height: 400
      }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#FFA500', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonAdd />
            Recent Investor Activity
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
            <Typography sx={{ color: '#bbb' }}>Loading investor activity...</Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{
      bgcolor: 'rgba(33, 33, 33, 0.8)',
      border: '1px solid rgba(255, 165, 0, 0.2)',
      borderRadius: 2,
      height: 400
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ color: '#FFA500', display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonAdd />
            Recent Investor Activity
          </Typography>
          <Tooltip title="Refresh investor data">
            <IconButton 
              onClick={fetchNewInvestors} 
              size="small"
              sx={{ color: '#FFA500', '&:hover': { bgcolor: 'rgba(255, 165, 0, 0.1)' } }}
            >
              <Refresh />
            </IconButton>
          </Tooltip>
        </Box>

        {newInvestors.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <PersonAdd sx={{ fontSize: 48, color: '#555', mb: 2 }} />
            <Typography variant="body1" sx={{ color: '#bbb' }}>
              No recent investor activity
            </Typography>
            <Typography variant="body2" sx={{ color: '#888', mt: 1 }}>
              New investors will appear here once they join
            </Typography>
          </Box>
        ) : (
          <List sx={{ maxHeight: 320, overflow: 'auto', '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#FFA500', borderRadius: '2px' } }}>
            {newInvestors.map((investor, index) => (
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
                      bgcolor: investor.avatar_color || `hsl(${(index * 137.5) % 360}, 60%, 45%)`,
                      width: 40,
                      height: 40,
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {getInvestorInitials(investor.name)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                      <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 600 }}>
                        {investor.name}
                      </Typography>
                      {investor.isNew && (
                        <Chip
                          label="New"
                          size="small"
                          sx={{
                            bgcolor: '#4CAF50',
                            color: '#fff',
                            height: 20,
                            fontSize: '0.7rem',
                            fontWeight: 'bold'
                          }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box sx={{ mt: 0.5 }}>
                      <Typography variant="body2" sx={{ color: '#FFA500', fontWeight: 500 }}>
                        {investor.totalBonds} bond{investor.totalBonds > 1 ? 's' : ''} • ${investor.totalInvested.toFixed(0)} invested
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#bbb' }}>
                        Joined {formatTimeAgo(investor.joinedDate)}
                      </Typography>
                    </Box>
                  }
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 1 }}>
                  <TrendingUp sx={{ color: '#4CAF50', fontSize: 20 }} />
                </Box>
              </ListItem>
            ))}
          </List>
        )}

        {newInvestors.length > 0 && (
          <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(255, 165, 0, 0.1)' }}>
            <Typography variant="caption" sx={{ color: '#888', textAlign: 'center', display: 'block' }}>
              Showing {newInvestors.length} recent investor{newInvestors.length > 1 ? 's' : ''}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default InvestorActivity;