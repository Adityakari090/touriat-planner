import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import { Compass, Shield, HeadphonesIcon, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import SearchBar from '../../components/SearchBar/SearchBar';
import DestinationCard from '../../components/DestinationCard/DestinationCard';
import PackageCard from '../../components/PackageCard/PackageCard';

const Home = () => {
  const navigate = useNavigate();
  const { destinations, packages, updateFilters } = useAppContext();

  const popularDestinations = destinations.slice(0, 6);
  const featuredPackages = packages.slice(0, 3);

  const handleSearch = (searchTerm) => {
    updateFilters({ search: searchTerm });
    navigate('/destinations');
  };

  const features = [
    {
      icon: <Compass size={40} />,
      title: 'Expert Guidance',
      description: 'Get personalized travel recommendations from our experienced team',
    },
    {
      icon: <Shield size={40} />,
      title: 'Secure Booking',
      description: 'Safe and secure payment processing for peace of mind',
    },
    {
      icon: <HeadphonesIcon size={40} />,
      title: '24/7 Support',
      description: 'Round-the-clock customer service for all your needs',
    },
    {
      icon: <Sparkles size={40} />,
      title: 'Best Prices',
      description: 'Competitive rates and exclusive deals on packages',
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          py: { xs: 8, md: 15 },
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: 'center',
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2rem', md: '3.5rem' },
              }}
            >
              Discover Your Next Adventure
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                opacity: 0.95,
                fontSize: { xs: '1rem', md: '1.5rem' },
              }}
            >
              Explore breathtaking destinations around the world with expertly
              crafted travel packages
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <SearchBar
                onSearch={handleSearch}
                placeholder="Where do you want to go?"
              />
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}
          >
            Popular Destinations
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Explore the most loved travel destinations chosen by thousands of
            travelers
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {popularDestinations.map((destination) => (
            <Grid item xs={12} sm={6} md={4} key={destination.id}>
              <DestinationCard destination={destination} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/destinations')}
            sx={{ px: 4, py: 1.5 }}
          >
            View All Destinations
          </Button>
        </Box>
      </Container>

      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              Featured Packages
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Handpicked travel packages designed for the perfect getaway
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {featuredPackages.map((pkg) => (
              <Grid item xs={12} md={4} key={pkg.id}>
                <PackageCard packageData={pkg} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            Why Choose TravelHub?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            We're committed to making your travel experience extraordinary
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  height: '100%',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 4,
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2,
                    color: 'primary.main',
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              Ready to Start Your Journey?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of happy travelers and create memories that last a
              lifetime
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/destinations')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 5,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
            >
              Explore Destinations
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
