import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';
import destinationsData from '../data/destinations.json';
import packagesData from '../data/packages.json';

const initialState = {
  destinations: destinationsData,
  packages: packagesData,
  bookings: [],
  user: {
    name: 'John Traveler',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  filters: {
    search: '',
    location: 'All',
    category: 'All',
    priceRange: [0, 5000],
    minRating: 0,
  },
};

const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      dispatch({
        type: 'LOAD_BOOKINGS',
        payload: JSON.parse(savedBookings),
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(state.bookings));
  }, [state.bookings]);

  const addBooking = (booking) => {
    dispatch({
      type: 'ADD_BOOKING',
      payload: booking,
    });
  };

  const cancelBooking = (id) => {
    dispatch({
      type: 'CANCEL_BOOKING',
      payload: id,
    });
  };

  const updateFilters = (filters) => {
    dispatch({
      type: 'UPDATE_FILTERS',
      payload: filters,
    });
  };

  const updateUser = (userData) => {
    dispatch({
      type: 'UPDATE_USER',
      payload: userData,
    });
  };

  const value = {
    destinations: state.destinations,
    packages: state.packages,
    bookings: state.bookings,
    user: state.user,
    filters: state.filters,
    addBooking,
    cancelBooking,
    updateFilters,
    updateUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export default AppContext;
