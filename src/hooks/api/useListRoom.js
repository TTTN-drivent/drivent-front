import useAsync from '../useAsync';
import useToken from '../useToken';

import * as roomApi from '../../services/roomApi';

export default function useListRoom(hotelId) {
  const token = useToken();

  const {
    data: roomsData,
    loading: roomLoading,
    error: roomError,
    act: listRoom
  } = useAsync(() => roomApi.getRoom(hotelId, token));

  return {
    roomsData,
    roomLoading,
    roomError,
    listRoom
  };
}
