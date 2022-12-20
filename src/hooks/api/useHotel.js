import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelApi from '../../services/hotelApi';

export default function useHotel() {
  const token = useToken();

  const {
    data: hotelsData,
    loading: hotelsLoading,
    error: hotelsError,
    act: getHotels
  } = useAsync(() => hotelApi.list(token));

  return {
    hotelsData,
    hotelsLoading,
    hotelsError,
    getHotels
  };
}
