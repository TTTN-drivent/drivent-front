import useAsync from '../useAsync';
import useToken from '../useToken';

import * as roomApi from '../../services/roomApi';

export default function useListRoom() {
  const token = useToken();

  const {
    data: roomsData,
    loading: roomLoading,
    error: roomError,
    act: getRooms
  } = useAsync((hotelId) => roomApi.getRoom(hotelId, token));

  return {
    roomsData,
    roomLoading,
    roomError,
    getRooms
  };
}
