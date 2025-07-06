import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  LinearProgress,
  useTheme,
  useMediaQuery,
  Tooltip,
  Tabs,
  Tab
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Phone,
  Email,
  TrendingUp,
  TrendingDown,
  Star,
  Group,
  PersonAdd,
  Assignment,
  EmojiEvents,
  Timeline
} from '@mui/icons-material';

const TeamManagement = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Dummy team data
  const directReports = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Ore Syndicate Head",
      avatar: "SC",
      email: "sarah.chen@ironore.com",
      phone: "+1 (555) 234-5678",
      location: "Phoenix, AZ",
      joinDate: "2023-03-20",
      investment: 180000,
      monthlyTarget: 2000,
      monthlyActual: 2100,
      performance: 105,
      teamSize: 12,
      level: 2,
      status: "Active",
      specialization: "Mining Operations"
    },
    {
      id: 2,
      name: "Alex Thompson",
      role: "Field Excavation Officer",
      avatar: "AT",
      email: "alex.thompson@ironore.com",
      phone: "+1 (555) 890-1234",
      location: "Salt Lake City, UT",
      joinDate: "2023-02-28",
      investment: 165000,
      monthlyTarget: 2200,
      monthlyActual: 1950,
      performance: 89,
      teamSize: 8,
      level: 2,
      status: "Active",
      specialization: "Field Operations"
    }
  ];

  const teamPerformance = [
    { month: 'Jan', target: 4200, actual: 4050, achievement: 96 },
    { month: 'Feb', target: 4200, actual: 4480, achievement: 107 },
    { month: 'Mar', target: 4400, actual: 4680, achievement: 106 },
    { month: 'Apr', target: 4600, actual: 4920, achievement: 107 },
    { month: 'May', target: 4800, actual: 4650, achievement: 97 },
    { month: 'Jun', target: 5000, actual: 5250, achievement: 105 }
  ];

  const achievements = [
    {
      id: 1,
      member: "Sarah Chen",
      achievement: "Top Performer Q2 2024",
      date: "2024-06-30",
      type: "Performance",
      icon: <EmojiEvents />
    },
    {
      id: 2,
      member: "Alex Thompson",
      achievement: "Highest Team Growth",
      date: "2024-05-15",
      type: "Leadership",
      icon: <Group />
    },
    {
      id: 3,
      member: "Sarah Chen",
      achievement: "Innovation Award",
      date: "2024-04-20",
      type: "Innovation",
      icon: <Star />
    }
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getPerformanceColor = (performance) => {
    if (performance >= 100) return '#4CAF50';
    if (performance >= 90) return '#FF9800';
    return '#F44336';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#4CAF50';
      case 'On Leave': return '#FF9800';
      case 'Inactive': return '#F44336';
      default: return '#757575';
    }
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" sx={{ color: '#FFA500', fontWeight: 600 }}>
              Team Management
            </Typography>
            <Button
              startIcon={<PersonAdd />}
              onClick={() => setOpenAddDialog(true)}
              sx={{
                background: 'linear-gradient(135deg, #FF4D4C 0%, #FFA500 100%)',
                color: '#fff',
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Add Team Member
            </Button>
          </Box>
        </Grid>

        {/* Team Overview Cards */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <Card
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  textAlign: 'center'
                }}
              >
                <CardContent>
                  <Group sx={{ color: '#FFA500', fontSize: '2.5rem', mb: 1 }} />
                  <Typography variant="h5" sx={{ color: '#FFA500', fontWeight: 'bold' }}>
                    {directReports.length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                    Direct Reports
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  textAlign: 'center'
                }}
              >
                <CardContent>
                  <TrendingUp sx={{ color: '#4CAF50', fontSize: '2.5rem', mb: 1 }} />
                  <Typography variant="h5" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                    97%
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                    Avg Performance
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  textAlign: 'center'
                }}
              >
                <CardContent>
                  <Assignment sx={{ color: '#2196F3', fontSize: '2.5rem', mb: 1 }} />
                  <Typography variant="h5" sx={{ color: '#2196F3', fontWeight: 'bold' }}>
                    {directReports.reduce((sum, member) => sum + member.teamSize, 0)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                    Total Team Size
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  textAlign: 'center'
                }}
              >
                <CardContent>
                  <EmojiEvents sx={{ color: '#FFD700', fontSize: '2.5rem', mb: 1 }} />
                  <Typography variant="h5" sx={{ color: '#FFD700', fontWeight: 'bold' }}>
                    {achievements.length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                    Team Achievements
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Grid item xs={12}>
          <Card
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant={isMobile ? 'scrollable' : 'fullWidth'}
              scrollButtons={isMobile ? 'auto' : false}
              TabIndicatorProps={{
                style: { backgroundColor: '#FF4D4C', height: '3px' }
              }}
              sx={{
                '& .MuiTab-root': {
                  color: '#e0e0e0',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  '&.Mui-selected': { color: '#FF4D4C' }
                }
              }}
            >
              <Tab label="Team Members" />
              <Tab label="Performance" />
              <Tab label="Achievements" />
            </Tabs>

            {/* Team Members Tab */}
            <TabPanel value={activeTab} index={0}>
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: '#e0e0e0', fontWeight: 600 }}>Member</TableCell>
                        <TableCell sx={{ color: '#e0e0e0', fontWeight: 600 }}>Role</TableCell>
                        <TableCell sx={{ color: '#e0e0e0', fontWeight: 600 }}>Investment</TableCell>
                        <TableCell sx={{ color: '#e0e0e0', fontWeight: 600 }}>Performance</TableCell>
                        <TableCell sx={{ color: '#e0e0e0', fontWeight: 600 }}>Team Size</TableCell>
                        <TableCell sx={{ color: '#e0e0e0', fontWeight: 600 }}>Status</TableCell>
                        <TableCell sx={{ color: '#e0e0e0', fontWeight: 600 }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {directReports.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar
                                sx={{
                                  width: 40,
                                  height: 40,
                                  bgcolor: '#FF4D4C',
                                  fontSize: '1rem',
                                  fontWeight: 'bold'
                                }}
                              >
                                {member.avatar}
                              </Avatar>
                              <Box>
                                <Typography variant="body2" sx={{ color: '#FFA500', fontWeight: 600 }}>
                                  {member.name}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#bbb' }}>
                                  {member.location}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                              {member.role}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#bbb' }}>
                              {member.specialization}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography sx={{ color: '#e0e0e0' }}>
                              ${member.investment.toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {member.performance >= 100 ? (
                                <TrendingUp sx={{ color: '#4CAF50', fontSize: '1rem' }} />
                              ) : (
                                <TrendingDown sx={{ color: '#F44336', fontSize: '1rem' }} />
                              )}
                              <Typography sx={{ color: getPerformanceColor(member.performance) }}>
                                {member.performance}%
                              </Typography>
                            </Box>
                            <Typography variant="caption" sx={{ color: '#bbb' }}>
                              Target: ${member.monthlyTarget.toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography sx={{ color: '#2196F3' }}>
                              {member.teamSize}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={member.status}
                              size="small"
                              sx={{
                                bgcolor: `${getStatusColor(member.status)}20`,
                                color: getStatusColor(member.status),
                                border: `1px solid ${getStatusColor(member.status)}`
                              }}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Contact">
                              <IconButton size="small" sx={{ color: '#FFA500' }}>
                                <Phone />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <IconButton size="small" sx={{ color: '#2196F3' }}>
                                <Edit />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </TabPanel>

            {/* Performance Tab */}
            <TabPanel value={activeTab} index={1}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#FFA500', mb: 3, fontWeight: 600 }}>
                  Team Performance Tracking
                </Typography>
                <Grid container spacing={3}>
                  {teamPerformance.map((month, index) => (
                    <Grid item xs={6} md={2} key={index}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ color: '#FFA500', fontWeight: 'bold' }}>
                          ${month.actual.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#e0e0e0', mb: 1 }}>
                          {month.month} 2024
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min(month.achievement, 100)}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: month.achievement >= 100 ? '#4CAF50' : '#FF9800',
                              borderRadius: 4
                            }
                          }}
                        />
                        <Typography variant="caption" sx={{ color: '#bbb' }}>
                          {month.achievement}% of target
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#bbb', display: 'block' }}>
                          Target: ${month.target.toLocaleString()}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                {/* Individual Performance */}
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" sx={{ color: '#FFA500', mb: 3, fontWeight: 600 }}>
                    Individual Performance
                  </Typography>
                  <Grid container spacing={2}>
                    {directReports.map((member) => (
                      <Grid item xs={12} md={6} key={member.id}>
                        <Card
                          sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            p: 2
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Avatar
                              sx={{
                                width: 50,
                                height: 50,
                                bgcolor: '#FF4D4C',
                                fontSize: '1.2rem',
                                fontWeight: 'bold'
                              }}
                            >
                              {member.avatar}
                            </Avatar>
                            <Box>
                              <Typography variant="h6" sx={{ color: '#FFA500', fontWeight: 600 }}>
                                {member.name}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                                {member.role}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                              Monthly Target
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#FFA500' }}>
                              ${member.monthlyTarget.toLocaleString()}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                              Monthly Actual
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ color: member.monthlyActual >= member.monthlyTarget ? '#4CAF50' : '#F44336' }}
                            >
                              ${member.monthlyActual.toLocaleString()}
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={Math.min(member.performance, 100)}
                            sx={{
                              height: 10,
                              borderRadius: 5,
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: getPerformanceColor(member.performance),
                                borderRadius: 5
                              }
                            }}
                          />
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: getPerformanceColor(member.performance), 
                              textAlign: 'center', 
                              mt: 1,
                              fontWeight: 600 
                            }}
                          >
                            {member.performance}% Performance
                          </Typography>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </CardContent>
            </TabPanel>

            {/* Achievements Tab */}
            <TabPanel value={activeTab} index={2}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#FFA500', mb: 3, fontWeight: 600 }}>
                  Team Achievements & Recognition
                </Typography>
                <Grid container spacing={2}>
                  {achievements.map((achievement) => (
                    <Grid item xs={12} md={6} key={achievement.id}>
                      <Card
                        sx={{
                          bgcolor: 'rgba(255, 215, 0, 0.1)',
                          border: '1px solid rgba(255, 215, 0, 0.3)',
                          p: 2
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Box sx={{ color: '#FFD700', fontSize: '2rem' }}>
                            {achievement.icon}
                          </Box>
                          <Box>
                            <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 600 }}>
                              {achievement.achievement}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#FFA500' }}>
                              {achievement.member}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Chip
                            label={achievement.type}
                            size="small"
                            sx={{
                              bgcolor: 'rgba(255, 215, 0, 0.2)',
                              color: '#FFD700',
                              border: '1px solid #FFD700'
                            }}
                            variant="outlined"
                          />
                          <Typography variant="caption" sx={{ color: '#bbb' }}>
                            {new Date(achievement.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </TabPanel>
          </Card>
        </Grid>
      </Grid>

      {/* Add Member Dialog */}
      <Dialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff'
          }
        }}
      >
        <DialogTitle sx={{ color: '#FFA500', fontWeight: 600 }}>
          Add New Team Member
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
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
                label="Email"
                type="email"
                variant="outlined"
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
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#e0e0e0' }}>Role</InputLabel>
                <Select
                  label="Role"
                  sx={{
                    color: '#fff',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#FFA500' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#FF4D4C' }
                  }}
                >
                  <MenuItem value="ore-syndicate-head">Ore Syndicate Head</MenuItem>
                  <MenuItem value="field-excavation-officer">Field Excavation Officer</MenuItem>
                  <MenuItem value="bond-specialist">Iron Bond Specialist</MenuItem>
                  <MenuItem value="mining-advisor">Mining Investment Advisor</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)} sx={{ color: '#bbb' }}>
            Cancel
          </Button>
          <Button
            onClick={() => setOpenAddDialog(false)}
            sx={{
              background: 'linear-gradient(135deg, #FF4D4C 0%, #FFA500 100%)',
              color: '#fff',
              '&:hover': {
                background: 'linear-gradient(135deg, #FFA500 0%, #FF4D4C 100%)'
              }
            }}
          >
            Add Member
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeamManagement;