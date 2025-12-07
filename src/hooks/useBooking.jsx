import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const useBooking = () => {
  const { addBooking } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createBooking = (bookingData) => {
    const booking = {
      id: bookingData.id || `${Date.now()}`,
      user: bookingData.user,
      destination: bookingData.destination,
      date: bookingData.date,
      travelers: bookingData.travelers,
      price: bookingData.price,
      extras: bookingData.extras || [],
      createdAt: new Date().toISOString(),
    };

    // add to app state / localStorage
    addBooking(booking);

    // try to persist on server (non-blocking)
    fetch('http://localhost:3000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    }).catch((err) => {
      // if server not running, keep working with localStorage only
      console.warn('Could not persist booking to server', err);
    });

    return booking;
  };

  const calculatePrice = (basePrice, travelers, duration) => {
    const daysCount = parseInt(duration) || 7;
    return basePrice * travelers;
  };

  return {
    createBooking,
    calculatePrice,
    loading,
    error,
  };
};

export default useBooking;
