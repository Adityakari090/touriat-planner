const AppReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_BOOKING':
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
      };

    case 'CANCEL_BOOKING':
      return {
        ...state,
        bookings: state.bookings.filter((booking) => booking.id !== action.payload),
      };

    case 'LOAD_BOOKINGS':
      return {
        ...state,
        bookings: action.payload,
      };

    case 'UPDATE_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    default:
      return state;
  }
};

export default AppReducer;
