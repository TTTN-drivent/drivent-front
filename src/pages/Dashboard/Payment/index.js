import useTicket from '../../../hooks/api/useTicket';
import PaymentArea from './paymentArea';

export default function Payment() {
  const { ticket } = useTicket();

  return (
    <>
      {
        !ticket ?
          'No ticket Found' :
          <PaymentArea ticket={ticket} />
      }
    </>
  );
}
