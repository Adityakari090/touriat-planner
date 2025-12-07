import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { AlertCircle } from 'lucide-react';

const Error = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        gap: 2,
        textAlign: 'center',
        p: 3,
      }}
    >
      <AlertCircle size={64} color="#ef4444" />
      <Typography variant="h5" color="error">
        Oops!
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
      {onRetry && (
        <Button variant="contained" onClick={onRetry} sx={{ mt: 2 }}>
          Try Again
        </Button>
      )}
    </Box>
  );
};

export default Error;
