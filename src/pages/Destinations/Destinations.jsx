import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Paper,
  Chip,
  Rating,
} from '@mui/material';
import { useAppContext } from '../../context/AppContext';
import DestinationCard from '../../components/DestinationCard/DestinationCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import Loader from '../../components/Loader/Loader';

const Destinations = () => {
  const { destinations, filters, updateFilters } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [filteredDestinations, setFilteredDestinations] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    let result = [...destinations];

    if (filters.search) {
      result = result.filter(
        (dest) =>
          dest.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          dest.location.toLowerCase().includes(filters.search.toLowerCase()) ||
          dest.country.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.location && filters.location !== 'All') {
      result = result.filter((dest) => dest.location === filters.location);
    }

    if (filters.category && filters.category !== 'All') {
      result = result.filter((dest) => dest.category === filters.category);
    }

    result = result.filter(
      (dest) =>
        dest.price >= filters.priceRange[0] && dest.price <= filters.priceRange[1]
    );

    if (filters.minRating > 0) {
      result = result.filter((dest) => dest.rating >= filters.minRating);
    }

    setFilteredDestinations(result);
  }, [destinations, filters]);

  const locations = ['All', ...new Set(destinations.map((d) => d.location))];
  const categories = ['All', ...new Set(destinations.map((d) => d.category))];

  const handleSearchChange = (searchTerm) => {
    updateFilters({ search: searchTerm });
  };

  const handleLocationChange = (event) => {
    updateFilters({ location: event.target.value });
  };

  const handleCategoryChange = (event) => {
    updateFilters({ category: event.target.value });
  };

  const handlePriceChange = (event, newValue) => {
    updateFilters({ priceRange: newValue });
  };

  const handleRatingChange = (event, newValue) => {
    updateFilters({ minRating: newValue });
  };

  const clearFilters = () => {
    updateFilters({
      search: '',
      location: 'All',
      category: 'All',
      priceRange: [0, 5000],
      minRating: 0,
    });
  };

  if (loading) {
    return <Loader message="Loading destinations..." />;
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            Explore Destinations
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Discover amazing places around the world
          </Typography>
          <SearchBar
            onSearch={handleSearchChange}
            placeholder="Search by destination, location, or country..."
          />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 80 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Filters
                </Typography>
                <Chip
                  label="Clear"
                  size="small"
                  onClick={clearFilters}
                  sx={{ cursor: 'pointer' }}
                />
              </Box>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Location</InputLabel>
                <Select
                  value={filters.location}
                  label="Location"
                  onChange={handleLocationChange}
                >
                  {locations.map((location) => (
                    <MenuItem key={location} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={filters.category}
                  label="Category"
                  onChange={handleCategoryChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                  Price Range
                </Typography>
                <Slider
                  value={filters.priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={5000}
                  step={100}
                  marks={[
                    { value: 0, label: '$0' },
                    { value: 5000, label: '$5000' },
                  ]}
                />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    ${filters.priceRange[0]}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${filters.priceRange[1]}
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                  Minimum Rating
                </Typography>
                <Rating
                  value={filters.minRating}
                  onChange={handleRatingChange}
                  precision={0.5}
                  size="large"
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {filters.minRating > 0
                    ? `${filters.minRating}+ stars`
                    : 'Any rating'}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={9}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" color="text.secondary">
                {filteredDestinations.length} destination
                {filteredDestinations.length !== 1 ? 's' : ''} found
              </Typography>
            </Box>

            {filteredDestinations.length > 0 ? (
              <Grid container spacing={3}>
                {filteredDestinations.map((destination) => (
                  <Grid item xs={12} sm={6} lg={4} key={destination.id}>
                    <DestinationCard destination={destination} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Paper
                elevation={1}
                sx={{
                  p: 6,
                  textAlign: 'center',
                  bgcolor: 'background.paper',
                }}
              >
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  No destinations found
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Try adjusting your filters to see more results
                </Typography>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Destinations;
