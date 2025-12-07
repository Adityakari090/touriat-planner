import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
} from '@mui/material';
import { Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PackageCard = ({ packageData }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/booking/${packageData.destinationId}`, {
      state: { packageData },
    });
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={packageData.image}
        alt={packageData.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Chip
          label={packageData.category}
          size="small"
          color="secondary"
          sx={{ mb: 1, width: 'fit-content', fontWeight: 500 }}
        />

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          {packageData.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 0.5 }}>
          <MapPin size={16} color="#6B7280" />
          <Typography variant="body2" color="text.secondary">
            {packageData.destination}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 0.5 }}>
          <Clock size={16} color="#6B7280" />
          <Typography variant="body2" color="text.secondary">
            {packageData.duration}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, flexGrow: 1 }}
        >
          {packageData.description}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 'auto',
          }}
        >
          <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
            ${packageData.price}
          </Typography>
          <Button variant="contained" size="small" onClick={handleBookNow}>
            Book Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PackageCard;
