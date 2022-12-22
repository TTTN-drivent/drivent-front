import useTicket from '../../../hooks/api/useTicket';
import CreateTicket from '../../../components/CreateTicket';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import PaymentArea from '../../../components/PaymentArea';
import TicketPageErrorMessage from '../../../components/CreateTicket/TicketPageErrorMessage';

export default function Payment() {
  const { getTickets, ticketError } = useTicket();
  // console.log(ticketError);
  const [ refresh, setRefresh ] = useState(false);
  const [ ticket, setTicket ] = useState(null);

  useEffect(() => {
    const fetchData = async() => {
      const ticketData = await getTickets();
      setTicket(ticketData);
    };
    fetchData();
  }, [refresh]);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      {
        String(ticketError)?.slice(-3) === '403' ?
          (<TicketPageErrorMessage/>) : (
            !ticket ?
              <CreateTicket setRefresh={setRefresh}/> :
              <PaymentArea ticket={ticket} />
          )
      }
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 37px!important;
`;
