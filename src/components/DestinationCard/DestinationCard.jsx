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
import { MapPin, Star, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DestinationCard = ({ destination }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/destinations/${destination.id}`);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 6,
        },
      }}
      onClick={handleViewDetails}
    >
      <CardMedia
        component="img"
        height="220"
        image={destination.image}
        alt={destination.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 1 }}>
          <Chip
            label={destination.category}
            size="small"
            color="primary"
            sx={{ fontWeight: 500 }}
          />
        </Box>

        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
          {destination.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 0.5 }}>
          <MapPin size={16} color="#6B7280" />
          <Typography variant="body2" color="text.secondary">
            {destination.location}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Star size={16} fill="#FFA500" color="#FFA500" />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {destination.rating}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ({destination.reviews})
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {destination.description}
        </Typography>

        <Box
          sx={{
            mt: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <DollarSign size={20} color="#2196F3" />
            <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
              ${destination.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              / person
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;
