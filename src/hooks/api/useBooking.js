import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useBooking() {
  const token = useToken();
  
  const {
    data: booking,
    loading: bookingLoading,
    error: bookingError,
    act: getbooking
  } = useAsync(() => bookingApi.getUserBooking(token));

  return {
    booking,
    bookingLoading,
    bookingError,
    getbooking
  };
}