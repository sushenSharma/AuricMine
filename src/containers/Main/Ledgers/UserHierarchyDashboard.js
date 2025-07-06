import React, { useState, useRef, useEffect } from 'react';
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
  useTheme,
  useMediaQuery,
  Tooltip
} from '@mui/material';
import {
  ExpandMore,
  ExpandLess,
  Person,
  Group,
  TrendingUp,
  Phone,
  Email,
  LocationOn,
  Star,
  Add
} from '@mui/icons-material';
import Tree from 'react-d3-tree';

const UserHierarchyDashboard = ({ currentUser }) => {
  const [viewMode, setViewMode] = useState('tree'); // 'tree' or 'table'
  const [selectedNode, setSelectedNode] = useState(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const treeRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Helper functions to get user info from session
  const getUserInitials = (user) => {
    // Try to get initials from actual name first
    if (user?.user_metadata?.full_name) {
      const nameParts = user.user_metadata.full_name.split(' ');
      if (nameParts.length >= 2) {
        return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
      }
      return user.user_metadata.full_name.substring(0, 2).toUpperCase();
    }
    
    // Try first and last name
    if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      return (user.user_metadata.first_name[0] + user.user_metadata.last_name[0]).toUpperCase();
    }
    
    // Fallback to email-based initials
    if (!user?.email) return "U";
    const name = user.email.split('@')[0];
    const parts = name.split(/[._-]/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getUserDisplayName = (user) => {
    // Try to get the actual name from user metadata
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    
    // Try first and last name combination
    if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      return `${user.user_metadata.first_name} ${user.user_metadata.last_name}`;
    }
    
    // Try just first name
    if (user?.user_metadata?.first_name) {
      return user.user_metadata.first_name;
    }
    
    // Try display name
    if (user?.user_metadata?.name) {
      return user.user_metadata.name;
    }
    
    // Fallback to email-based name
    if (!user?.email) return "User";
    const name = user.email.split('@')[0];
    const parts = name.split(/[._-]/);
    if (parts.length >= 2) {
      return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  // Hierarchy data with actual logged-in user as root
  const hierarchyData = {
    name: currentUser.name,
    role: "Senior Mine Director",
    level: 3,
    avatar: currentUser.avatar,
    email: currentUser.email,
    phone: "+1 (555) 123-4567",
    location: "Denver, CO",
    totalInvestment: 245000,
    monthlyEarnings: 2850,
    teamSize: 24,
    joiningDate: "2023-01-15",
    performance: 110,
    children: [
      {
        name: "Sarah Chen",
        role: "Ore Syndicate Head",
        level: 2,
        avatar: "SC",
        email: "sarah.chen@ironore.com",
        phone: "+1 (555) 234-5678",
        location: "Phoenix, AZ",
        totalInvestment: 180000,
        monthlyEarnings: 2100,
        teamSize: 12,
        joiningDate: "2023-03-20",
        performance: 105,
        children: [
          {
            name: "James Wilson",
            role: "Field Excavation Officer",
            level: 1,
            avatar: "JW",
            email: "james.wilson@ironore.com",
            phone: "+1 (555) 345-6789",
            location: "Austin, TX",
            totalInvestment: 85000,
            monthlyEarnings: 1200,
            teamSize: 6,
            joiningDate: "2023-05-10",
            performance: 95,
            children: [
              {
                name: "Lisa Park",
                role: "Iron Bond Specialist",
                level: 0,
                avatar: "LP",
                email: "lisa.park@ironore.com",
                phone: "+1 (555) 456-7890",
                location: "Dallas, TX",
                totalInvestment: 45000,
                monthlyEarnings: 650,
                teamSize: 3,
                joiningDate: "2023-07-15",
                performance: 88
              },
              {
                name: "David Kim",
                role: "Mining Investment Advisor",
                level: 0,
                avatar: "DK",
                email: "david.kim@ironore.com",
                phone: "+1 (555) 567-8901",
                location: "Houston, TX",
                totalInvestment: 52000,
                monthlyEarnings: 720,
                teamSize: 2,
                joiningDate: "2023-06-01",
                performance: 92
              }
            ]
          },
          {
            name: "Maria Garcia",
            role: "Regional Bond Coordinator",
            level: 1,
            avatar: "MG",
            email: "maria.garcia@ironore.com",
            phone: "+1 (555) 678-9012",
            location: "San Antonio, TX",
            totalInvestment: 95000,
            monthlyEarnings: 1350,
            teamSize: 5,
            joiningDate: "2023-04-12",
            performance: 102,
            children: [
              {
                name: "Robert Taylor",
                role: "Bond Sales Associate",
                level: 0,
                avatar: "RT",
                email: "robert.taylor@ironore.com",
                phone: "+1 (555) 789-0123",
                location: "El Paso, TX",
                totalInvestment: 38000,
                monthlyEarnings: 580,
                teamSize: 1,
                joiningDate: "2023-08-20",
                performance: 85
              }
            ]
          }
        ]
      },
      {
        name: "Alex Thompson",
        role: "Field Excavation Officer",
        level: 2,
        avatar: "AT",
        email: "alex.thompson@ironore.com",
        phone: "+1 (555) 890-1234",
        location: "Salt Lake City, UT",
        totalInvestment: 165000,
        monthlyEarnings: 1950,
        teamSize: 8,
        joiningDate: "2023-02-28",
        performance: 98,
        children: [
          {
            name: "Emily Davis",
            role: "Mining Operations Specialist",
            level: 1,
            avatar: "ED",
            email: "emily.davis@ironore.com",
            phone: "+1 (555) 901-2345",
            location: "Boise, ID",
            totalInvestment: 72000,
            monthlyEarnings: 980,
            teamSize: 4,
            joiningDate: "2023-06-15",
            performance: 93
          }
        ]
      }
    ]
  };

  useEffect(() => {
    if (treeRef.current) {
      const dimensions = treeRef.current.getBoundingClientRect();
      setTranslate({
        x: dimensions.width / 2,
        y: 100
      });
    }
  }, [viewMode]);

  const flattenHierarchy = (node, level = 0, parent = null) => {
    const flattened = [{
      ...node,
      level,
      parentName: parent?.name || null
    }];
    
    if (node.children) {
      node.children.forEach(child => {
        flattened.push(...flattenHierarchy(child, level + 1, node));
      });
    }
    
    return flattened;
  };

  const flatData = flattenHierarchy(hierarchyData);

  const getPerformanceColor = (performance) => {
    if (performance >= 100) return '#4CAF50';
    if (performance >= 90) return '#FF9800';
    return '#F44336';
  };

  const getLevelColor = (level) => {
    const colors = ['#2196F3', '#4CAF50', '#FF9800', '#9C27B0'];
    return colors[level] || '#757575';
  };

  const handleNodeClick = (nodeData) => {
    setSelectedNode(nodeData.data);
  };

  const customNodeElement = ({ nodeDatum, toggleNode }) => (
    <g>
      <circle
        r={30}
        fill={getLevelColor(nodeDatum.level)}
        stroke="#fff"
        strokeWidth="2"
        onClick={toggleNode}
        style={{ cursor: 'pointer' }}
      />
      <text
        fill="#fff"
        strokeWidth="0"
        x="0"
        y="5"
        textAnchor="middle"
        fontSize="12"
        fontWeight="bold"
      >
        {nodeDatum.avatar}
      </text>
      <text
        fill="#333"
        strokeWidth="0"
        x="0"
        y="50"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
      >
        {nodeDatum.name}
      </text>
      <text
        fill="#666"
        strokeWidth="0"
        x="0"
        y="70"
        textAnchor="middle"
        fontSize="12"
      >
        {nodeDatum.role}
      </text>
      <text
        fill={getPerformanceColor(nodeDatum.performance)}
        strokeWidth="0"
        x="0"
        y="90"
        textAnchor="middle"
        fontSize="12"
        fontWeight="bold"
      >
        {nodeDatum.performance}% Performance
      </text>
    </g>
  );

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Header with View Toggle */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" sx={{ color: '#FFA500', fontWeight: 600 }}>
              My Network
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant={viewMode === 'tree' ? 'contained' : 'outlined'}
                onClick={() => setViewMode('tree')}
                sx={{
                  bgcolor: viewMode === 'tree' ? '#FF4D4C' : 'transparent',
                  borderColor: '#FF4D4C',
                  color: viewMode === 'tree' ? '#fff' : '#FF4D4C',
                  textTransform: 'none'
                }}
              >
                Tree View
              </Button>
              <Button
                variant={viewMode === 'table' ? 'contained' : 'outlined'}
                onClick={() => setViewMode('table')}
                sx={{
                  bgcolor: viewMode === 'table' ? '#FF4D4C' : 'transparent',
                  borderColor: '#FF4D4C',
                  color: viewMode === 'table' ? '#fff' : '#FF4D4C',
                  textTransform: 'none'
                }}
              >
                Table View
              </Button>
            </Box>
          </Box>
        </Grid>

        {viewMode === 'tree' ? (
          <>
            {/* Tree Visualization */}
            <Grid item xs={12} lg={8}>
              <Card
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  height: 600
                }}
              >
                <CardContent sx={{ height: '100%', p: 1 }}>
                  <Box ref={treeRef} sx={{ width: '100%', height: '100%' }}>
                    <Tree
                      data={hierarchyData}
                      translate={translate}
                      orientation="vertical"
                      pathFunc="step"
                      zoomable
                      zoom={0.8}
                      nodeSize={{ x: 300, y: 200 }}
                      separation={{ siblings: 1.5, nonSiblings: 2 }}
                      renderCustomNodeElement={customNodeElement}
                      onNodeClick={handleNodeClick}
                      styles={{
                        links: {
                          stroke: '#ccc',
                          strokeWidth: 2
                        }
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Node Details Panel */}
            <Grid item xs={12} lg={4}>
              <Card
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  height: 600
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#FFA500', mb: 3, fontWeight: 600 }}>
                    {selectedNode ? 'Team Member Details' : 'Network Overview'}
                  </Typography>
                  
                  {selectedNode ? (
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <Avatar
                          sx={{
                            width: 60,
                            height: 60,
                            bgcolor: getLevelColor(selectedNode.level),
                            fontSize: '1.5rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {selectedNode.avatar}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ color: '#FFA500', fontWeight: 600 }}>
                            {selectedNode.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                            {selectedNode.role}
                          </Typography>
                          <Chip
                            label={`Level ${selectedNode.level}`}
                            size="small"
                            sx={{
                              bgcolor: `${getLevelColor(selectedNode.level)}20`,
                              color: getLevelColor(selectedNode.level),
                              border: `1px solid ${getLevelColor(selectedNode.level)}`,
                              mt: 1
                            }}
                            variant="outlined"
                          />
                        </Box>
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Email sx={{ color: '#FFA500', fontSize: '1rem' }} />
                          <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                            {selectedNode.email}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Phone sx={{ color: '#FFA500', fontSize: '1rem' }} />
                          <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                            {selectedNode.phone}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <LocationOn sx={{ color: '#FFA500', fontSize: '1rem' }} />
                          <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                            {selectedNode.location}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" sx={{ color: '#FFA500', fontWeight: 600, mb: 2 }}>
                          Performance Metrics
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                              Total Investment
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#FFA500', fontWeight: 600 }}>
                              ${selectedNode.totalInvestment?.toLocaleString()}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                              Monthly Earnings
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 600 }}>
                              ${selectedNode.monthlyEarnings?.toLocaleString()}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                              Team Size
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#2196F3', fontWeight: 600 }}>
                              {selectedNode.teamSize} members
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                              Performance
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: getPerformanceColor(selectedNode.performance), 
                                fontWeight: 600 
                              }}
                            >
                              {selectedNode.performance}%
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Button
                        fullWidth
                        startIcon={<Phone />}
                        sx={{
                          background: 'linear-gradient(135deg, #FF4D4C 0%, #FFA500 100%)',
                          color: '#fff',
                          textTransform: 'none',
                          borderRadius: 2
                        }}
                      >
                        Contact Member
                      </Button>
                    </Box>
                  ) : (
                    <Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h4" sx={{ color: '#FFA500', fontWeight: 'bold', mb: 1 }}>
                          {flatData.length}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                          Total Network Members
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h4" sx={{ color: '#4CAF50', fontWeight: 'bold', mb: 1 }}>
                          {flatData.reduce((sum, member) => sum + (member.teamSize || 0), 0)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                          Total Team Size
                        </Typography>
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h4" sx={{ color: '#2196F3', fontWeight: 'bold', mb: 1 }}>
                          ${flatData.reduce((sum, member) => sum + (member.totalInvestment || 0), 0).toLocaleString()}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                          Network Total Investment
                        </Typography>
                      </Box>

                      <Typography variant="body2" sx={{ color: '#bbb', textAlign: 'center', mt: 4 }}>
                        Click on any node in the tree to view detailed information
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </>
        ) : (
          /* Table View */
          <Grid item xs={12}>
            <Card
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: '#e0e0e0', fontWeight: 600 }}>Member</TableCell>
                        <TableCell sx={{ color: '#e0e0e0', fontWeight: 600 }}>Role</TableCell>
                        <TableCell sx={{ color: '#e0e0e0', fontWeight: 600 }}>Level</TableCell>
                        <TableCell sx={{ color: '#e0e0e0', fontWeight: 600 }}>Investment</TableCell>
                        <TableCell sx={{ color: '#e0e0e0', fontWeight: 600 }}>Monthly Earnings</TableCell>
                        <TableCell sx={{ color: '#e0e0e0', fontWeight: 600 }}>Team Size</TableCell>
                        <TableCell sx={{ color: '#e0e0e0', fontWeight: 600 }}>Performance</TableCell>
                        <TableCell sx={{ color: '#e0e0e0', fontWeight: 600 }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {flatData.map((member, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar
                                sx={{
                                  width: 40,
                                  height: 40,
                                  bgcolor: getLevelColor(member.level),
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
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={`Level ${member.level}`}
                              size="small"
                              sx={{
                                bgcolor: `${getLevelColor(member.level)}20`,
                                color: getLevelColor(member.level),
                                border: `1px solid ${getLevelColor(member.level)}`
                              }}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Typography sx={{ color: '#e0e0e0' }}>
                              ${member.totalInvestment?.toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography sx={{ color: '#4CAF50' }}>
                              ${member.monthlyEarnings?.toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography sx={{ color: '#2196F3' }}>
                              {member.teamSize}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography 
                              sx={{ 
                                color: getPerformanceColor(member.performance),
                                fontWeight: 600 
                              }}
                            >
                              {member.performance}%
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Contact">
                              <IconButton
                                size="small"
                                sx={{ color: '#FFA500' }}
                              >
                                <Phone />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="View Details">
                              <IconButton
                                size="small"
                                sx={{ color: '#2196F3' }}
                              >
                                <Person />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default UserHierarchyDashboard;