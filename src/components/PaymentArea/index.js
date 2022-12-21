import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { BsCheckCircleFill } from 'react-icons/bs';

import { useEffect, useState } from 'react';
import CardInformationForm from '../CardInformationForm';

export default function PaymentArea({ ticket }) {
  const [module, setModule] = useState('');
  const [paymentDone, setPaymentDone] = useState(false);

  useEffect(() => {
    if (ticket?.TicketType?.isRemote) {
      setModule('Online');
    } else if (!ticket?.TicketType?.includesHotel) {
      setModule('Presencial + Sem Hotel');
    } else {
      setModule('Presencial + Com Hotel');
    }

    if (ticket?.status === 'PAID') {
      setPaymentDone(true);
    }
  }, []);

  return (
    <>
      <StyledSubtitle variant="h6">Ingresso escolhido</StyledSubtitle>
      <PaymentCheckBox>
        <Typography variant='body1'>{module}</Typography>
        <Typography variant='body1' style={{ color: '#898989' }}>
          R$ {String(parseInt(ticket?.TicketType?.price) / 100).replace('.', ',')}
        </Typography>
      </PaymentCheckBox>
      <StyledSubtitle variant="h6">Pagamento</StyledSubtitle>
      {
        paymentDone
          ? <PaymentDoneContainer>
            <BsCheckCircleFill color='#36B853' size='2.5rem' />
            <div>
              <p><strong>Pagamento confirmado!</strong></p>
              <p>Prossiga para escolha de hospedagem e atividades</p>
            </div>
          </PaymentDoneContainer>
          : <CardInformationForm
            ticketId={ticket.id}
            setPaymentDone={setPaymentDone}
          />
      }
    </>
  );
}

const PaymentDoneContainer = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;

  p {
    font-size: 0.9rem;
    line-height: 19px;
  }
`;

const StyledSubtitle = styled(Typography)`
  color: #8E8E8E;
  margin-bottom: 17px!important;
`;

const PaymentCheckBox = styled.div`
  width: 290px;
  height: 108px;
  background: #FFEED2;
  border-radius: 20px;
  margin-bottom: 30px!important;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;
