import { toast } from 'react-toastify';
import styled from 'styled-components';
import useSaveTicket from '../../hooks/api/useSaveTicket';

export default function BoxHospedagem({ checkedHosting, setTicket }) {
  const { saveTicket } = useSaveTicket();

  return (
    <StyledHodpedagem>
      <h2>
        Fechado! O total ficou em <strong>R$ {checkedHosting.price / 100}</strong>. Agora é só confirmar:
      </h2>
      <button
        onClick={async() => {
          try {
            const result = await saveTicket({ ticketTypeId: checkedHosting.id });
            toast('Seu ticket foi reservado com sucesso!');
            setTicket(result.data);
          } catch (error) {
            toast('Não foi possível reservar seu ticket!');
          }
        }}
      >
        RESERVAR INGRESSO
      </button>
    </StyledHodpedagem>
  );
};

const StyledHodpedagem = styled.div`
  h2 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
    margin-top: 34px;
    margin-bottom: 17px;
  }

  button {
    width: 162px;
    height: 37px;
    background: #e0e0e0;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    cursor: pointer;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;

    color: #000000;
  }
`;
