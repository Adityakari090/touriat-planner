import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home/Home';
import Destinations from './pages/Destinations/Destinations';
import DestinationDetails from './pages/DestinationDetails/DestinationDetails';
import Booking from './pages/Booking/Booking';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'destinations',
        element: <Destinations />,
      },
      {
        path: 'destinations/:id',
        element: <DestinationDetails />,
      },
      {
        path: 'booking/:id',
        element: <Booking />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]);

export default router;
