import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Alert,
} from '@mui/material';
import {
  Calendar,
  MapPin,
  Users,
  Trash2,
  Menu,
  LayoutDashboard,
  User,
  LogOut,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { bookings, cancelBooking, user } = useAppContext();

  const [selectedTab, setSelectedTab] = useState('bookings');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, bookingId: null });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCancelBooking = () => {
    cancelBooking(deleteDialog.bookingId);
    setDeleteDialog({ open: false, bookingId: null });
  };

  const menuItems = [
    { id: 'bookings', label: 'My Bookings', icon: <Calendar size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
  ];

  const sidebarContent = (
    <Box sx={{ width: 250, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Dashboard
        </Typography>
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              selected={selectedTab === item.id}
              onClick={() => {
                setSelectedTab(item.id);
                if (isMobile) setDrawerOpen(false);
                if (item.id === 'profile') navigate('/profile');
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/')}>
            <ListItemIcon>
              <LogOut size={20} />
            </ListItemIcon>
            <ListItemText primary="Back to Home" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {isMobile ? (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          {sidebarContent}
        </Drawer>
      ) : (
        <Paper
          elevation={2}
          sx={{
            width: 250,
            flexShrink: 0,
            position: 'sticky',
            top: 64,
            height: 'calc(100vh - 64px)',
          }}
        >
          {sidebarContent}
        </Paper>
      )}

      <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
        <Container maxWidth="lg">
          {isMobile && (
            <Button
              startIcon={<Menu />}
              onClick={() => setDrawerOpen(true)}
              sx={{ mb: 2 }}
            >
              Menu
            </Button>
          )}

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 4,
            }}
          >
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                Welcome back, {user.name}!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Manage your bookings and travel plans
              </Typography>
            </Box>
          </Box>

          {bookings.length === 0 ? (
            <Paper elevation={2} sx={{ p: 6, textAlign: 'center' }}>
              <Calendar size={64} color="#9CA3AF" style={{ marginBottom: 16 }} />
              <Typography variant="h5" gutterBottom>
                No Bookings Yet
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Start planning your next adventure!
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/destinations')}
              >
                Explore Destinations
              </Button>
            </Paper>
          ) : (
            <>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Your Bookings ({bookings.length})
                </Typography>
              </Box>

              <Grid container spacing={3}>
                {bookings.map((booking) => (
                  <Grid item xs={12} key={booking.id}>
                    <Card
                      elevation={2}
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: 4,
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          width: { xs: '100%', sm: 200 },
                          height: { xs: 200, sm: 'auto' },
                        }}
                        image={`https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=400`}
                        alt={booking.destinationName}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            mb: 2,
                          }}
                        >
                          <Box>
                            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                              {booking.destinationName}
                            </Typography>
                            <Chip
                              label={booking.status}
                              color={booking.status === 'confirmed' ? 'success' : 'default'}
                              size="small"
                              sx={{ textTransform: 'capitalize' }}
                            />
                          </Box>
                          <Typography
                            variant="h5"
                            color="primary"
                            sx={{ fontWeight: 700 }}
                          >
                            ${booking.totalPrice}
                          </Typography>
                        </Box>

                        <Grid container spacing={2} sx={{ mb: 2 }}>
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Calendar size={18} color="#6B7280" />
                              <Typography variant="body2" color="text.secondary">
                                <strong>Start Date:</strong>{' '}
                                {new Date(booking.startDate).toLocaleDateString()}
                              </Typography>
                            </Box>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Users size={18} color="#6B7280" />
                              <Typography variant="body2" color="text.secondary">
                                <strong>Travelers:</strong> {booking.travelers}
                              </Typography>
                            </Box>
                          </Grid>

                          <Grid item xs={12}>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Booking ID:</strong> #{booking.id}
                            </Typography>
                          </Grid>

                          {booking.specialRequests && (
                            <Grid item xs={12}>
                              <Typography variant="body2" color="text.secondary">
                                <strong>Special Requests:</strong> {booking.specialRequests}
                              </Typography>
                            </Grid>
                          )}
                        </Grid>

                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() =>
                              navigate(`/destinations/${booking.destinationId}`)
                            }
                          >
                            View Details
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            startIcon={<Trash2 size={16} />}
                            onClick={() =>
                              setDeleteDialog({ open: true, bookingId: booking.id })
                            }
                          >
                            Cancel
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Container>
      </Box>

      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, bookingId: null })}
      >
        <DialogTitle>Cancel Booking</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to cancel this booking? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialog({ open: false, bookingId: null })}
          >
            Keep Booking
          </Button>
          <Button onClick={handleCancelBooking} color="error" variant="contained">
            Cancel Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
