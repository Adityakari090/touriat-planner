import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Alert,
  Divider,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { Calendar, Users, CreditCard, CheckCircle } from 'lucide-react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import useBooking from '../../hooks/useBooking';
import Loader from '../../components/Loader/Loader';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { destinations } = useAppContext();
  const { createBooking, calculatePrice, loading: bookingLoading } = useBooking();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    startDate: '',
    travelers: 1,
    specialRequests: '',
  });
  const [errors, setErrors] = useState({});
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const found = destinations.find((d) => d.id === parseInt(id));
      setDestination(found);
      setLoading(false);
    }, 500);
  }, [id, destinations]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    } else {
      const selectedDate = new Date(formData.startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.startDate = 'Start date must be in the future';
      }
    }

    if (formData.travelers < 1) {
      newErrors.travelers = 'At least 1 traveler is required';
    } else if (formData.travelers > 20) {
      newErrors.travelers = 'Maximum 20 travelers allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const totalPrice = calculatePrice(
        destination.price,
        parseInt(formData.travelers),
        destination.duration
      );

      const booking = await createBooking({
        ...formData,
        destinationId: destination.id,
        destinationName: destination.name,
        totalPrice,
        travelers: parseInt(formData.travelers),
      });

      setBookingId(booking.id);
      setBookingSuccess(true);
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  if (loading) {
    return <Loader message="Loading booking details..." />;
  }

  if (!destination) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error">Destination not found</Alert>
      </Container>
    );
  }

  if (bookingSuccess) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <CheckCircle size={80} color="#22C55E" style={{ marginBottom: 16 }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Booking Confirmed!
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Your booking ID is: <strong>#{bookingId}</strong>
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            We've sent a confirmation email to {formData.email} with all the
            details of your trip.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/dashboard')}
            >
              View My Bookings
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  const totalPrice = calculatePrice(
    destination.price,
    parseInt(formData.travelers) || 1,
    destination.duration
  );

  const today = new Date().toISOString().split('T')[0];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Complete Your Booking
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Just a few more details and you're all set!
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Traveler Information
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      error={!!errors.fullName}
                      helperText={errors.fullName}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      error={!!errors.phone}
                      helperText={errors.phone}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Start Date"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleChange}
                      error={!!errors.startDate}
                      helperText={errors.startDate}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: today }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Number of Travelers"
                      name="travelers"
                      type="number"
                      value={formData.travelers}
                      onChange={handleChange}
                      error={!!errors.travelers}
                      helperText={errors.travelers}
                      inputProps={{ min: 1, max: 20 }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Special Requests (Optional)"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      multiline
                      rows={3}
                      placeholder="Any dietary requirements, accessibility needs, or special occasions..."
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 4 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={bookingLoading}
                    sx={{ py: 1.5, fontSize: '1.1rem' }}
                  >
                    {bookingLoading ? (
                      'Processing...'
                    ) : (
                      <>
                        <CreditCard size={20} style={{ marginRight: 8 }} />
                        Confirm Booking
                      </>
                    )}
                  </Button>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', textAlign: 'center', mt: 2 }}
                  >
                    By confirming, you agree to our Terms of Service and Privacy
                    Policy
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={{ position: 'sticky', top: 80 }}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={destination.image}
                  alt={destination.name}
                />
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    {destination.name}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Duration
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {destination.duration}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Price per person
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        ${destination.price}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Number of travelers
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {formData.travelers}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Total Price
                    </Typography>
                    <Typography
                      variant="h5"
                      color="primary"
                      sx={{ fontWeight: 700 }}
                    >
                      ${totalPrice}
                    </Typography>
                  </Box>

                  <Alert severity="info" sx={{ mt: 2 }}>
                    Free cancellation up to 24 hours before departure
                  </Alert>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Booking;
