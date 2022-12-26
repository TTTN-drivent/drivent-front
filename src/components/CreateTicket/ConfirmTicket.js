import { toast } from 'react-toastify';
import styled from 'styled-components';
import useSaveTicket from '../../hooks/api/useSaveTicket';
import Button from '../Form/Button';

export default function ConfirmTicket({ modality, setRefresh }) {
  const { saveTicket, saveTicketLoading } = useSaveTicket();

  return(
    <StyledOnline>
      <h2>
        Fechado! O total ficou em <strong>R$ {modality.price / 100}</strong>. Agora é só confirmar:
      </h2>
      <Button
        disabled={saveTicketLoading}
        onClick={async() => {
          try {
            await saveTicket({ ticketTypeId: modality.id });
            setRefresh(true);
            toast('Seu ticket foi reservado com sucesso!');
          } catch (error) {
            toast('Não foi possível reservar seu ticket!');
          }
        }}
      >
        reservar ingresso
      </Button>
    </StyledOnline>
  );
}

const StyledOnline = styled.div`
  h2 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
    margin-bottom: 17px;
  }
`;
