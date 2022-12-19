import useTicket from '../../../hooks/api/useTicket';
import PaymentArea from './paymentArea';
import CreatedTicket from '../../../components/payment/index';

export default function Payment() {
  const { ticket } = useTicket();

  return (
    <>
      {
        !ticket ?
          <CreatedTicket /> :
          <PaymentArea ticket={ticket} />
      }
    </>
  );
}
