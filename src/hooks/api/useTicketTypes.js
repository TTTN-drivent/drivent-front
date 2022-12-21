import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function useTicketType() {
  const token = useToken();

  const {
    data: ticketType,
    loading: ticketTypeLoading,
    error: ticketTypeError,
    act: getTicketTypes
  } = useAsync(() => ticketApi.getTicketType(token));

  return {
    ticketType,
    ticketTypeLoading,
    ticketTypeError,
    getTicketTypes
  };
}
