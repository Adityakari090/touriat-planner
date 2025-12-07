import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  Paper,
} from '@mui/material';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch, placeholder = 'Search destinations...' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={3}
      sx={{
        p: 0.5,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 3,
        maxWidth: 600,
        width: '100%',
      }}
    >
      <TextField
        fullWidth
        variant="standard"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start" sx={{ ml: 2 }}>
              <Search size={24} color="#9CA3AF" />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiInputBase-input': {
            padding: '16px 12px',
            fontSize: '1rem',
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          minWidth: 100,
          height: 48,
          borderRadius: 2,
          mr: 0.5,
        }}
      >
        Search
      </Button>
    </Paper>
  );
};

export default SearchBar;
