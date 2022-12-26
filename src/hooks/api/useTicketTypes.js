import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';
import { sortFirstTicketTypes, sortHotelsTicketTypes } from '../../components/CreateTicket/sortTicketTypes';

export default function useTicketType() {
  const token = useToken();

  const {
    data: ticketType,
    loading: ticketTypeLoading,
    error: ticketTypeError,
    act: getTicketTypes
  } = useAsync(() => ticketApi.getTicketType(token));

  const remoteModalities = {
    title: 'Primeiro, escolha sua modalidade de ingresso',
    modalities: sortFirstTicketTypes(ticketType)
  };
  const hotelModalities = {
    title: 'Ótimo! Agora escolha sua modalidade de hospedagem',
    modalities: sortHotelsTicketTypes(ticketType)
  };

  return {
    ticketType,
    ticketTypeLoading,
    ticketTypeError,
    getTicketTypes,
    remoteModalities,
    hotelModalities
  };
}
