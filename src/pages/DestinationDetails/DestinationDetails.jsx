import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Rating,
} from '@mui/material';
import {
  MapPin,
  Clock,
  DollarSign,
  Star,
  Check,
  Calendar,
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { destinations } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const found = destinations.find((d) => d.id === parseInt(id));
      setDestination(found);
      setLoading(false);
    }, 800);
  }, [id, destinations]);

  if (loading) {
    return <Loader message="Loading destination details..." />;
  }

  if (!destination) {
    return (
      <Error
        message="Destination not found"
        onRetry={() => navigate('/destinations')}
      />
    );
  }

  const images = [
    destination.image,
    destination.image,
    destination.image,
    destination.image,
  ];

  const reviews = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment:
        'Absolutely amazing experience! The destination exceeded all my expectations.',
      date: '2 weeks ago',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      name: 'Michael Chen',
      rating: 4.5,
      comment:
        'Great trip overall. Well organized and plenty of activities to enjoy.',
      date: '1 month ago',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      name: 'Emma Wilson',
      rating: 5,
      comment:
        'Perfect vacation! The scenery was breathtaking and the locals were so friendly.',
      date: '1 month ago',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <ImageGallery images={images} />
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 80 }}>
              <Chip
                label={destination.category}
                color="primary"
                sx={{ mb: 2, fontWeight: 500 }}
              />

              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                {destination.name}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <MapPin size={20} color="#6B7280" />
                <Typography variant="body1" color="text.secondary">
                  {destination.location}, {destination.country}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Star size={20} fill="#FFA500" color="#FFA500" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {destination.rating}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ({destination.reviews} reviews)
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Clock size={20} color="#2196F3" />
                  <Typography variant="body1">
                    <strong>Duration:</strong> {destination.duration}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                  <DollarSign size={32} color="#2196F3" />
                  <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
                    ${destination.price}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    / person
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={() => navigate(`/booking/${destination.id}`)}
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                <Calendar size={20} style={{ marginRight: 8 }} />
                Book Now
              </Button>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', textAlign: 'center' }}
              >
                Free cancellation up to 24 hours before departure
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={7}>
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                About This Destination
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {destination.description}
              </Typography>
            </Paper>

            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Highlights
              </Typography>
              <List>
                {destination.highlights.map((highlight, index) => (
                  <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Check size={20} color="#22C55E" />
                    </ListItemIcon>
                    <ListItemText
                      primary={highlight}
                      primaryTypographyProps={{
                        variant: 'body1',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>

            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                What's Included
              </Typography>
              <List>
                {destination.includes.map((item, index) => (
                  <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Check size={20} color="#2196F3" />
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{
                        variant: 'body1',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>

            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Customer Reviews
              </Typography>

              {reviews.map((review, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Avatar src={review.avatar} alt={review.name} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {review.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {review.date}
                      </Typography>
                    </Box>
                    <Rating value={review.rating} precision={0.5} readOnly />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {review.comment}
                  </Typography>
                  {index < reviews.length - 1 && <Divider sx={{ mt: 2 }} />}
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DestinationDetails;
