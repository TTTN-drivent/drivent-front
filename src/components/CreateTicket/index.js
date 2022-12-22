import styled from 'styled-components';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTicketType from '../../hooks/api/useTicketTypes';
import { sortFirstTicketTypes, sortHotelsTicketTypes } from './sortTicketTypes';
import BoxModality from './BoxModality';
import HostingModalitityComponent from './HostingModalityComponent';
import useSaveTicket from '../../hooks/api/useSaveTicket';

export default function CreateTicket({ setTicket }) {
  const [checkedModality, setCheckedModality] = useState({});
  const { ticketType } = useTicketType();
  const { saveTicket } = useSaveTicket();
  const firstTicketTypes = sortFirstTicketTypes(ticketType);
  const hotelsTicketTypes = sortHotelsTicketTypes(ticketType);

  return (
    <>
      <StyledModalidade>
        <ToastContainer autoClose={5000} pauseOnHover={false} />
        <div className="container-main">
          <h2>Primeiro, escolha sua modalidade de ingresso</h2>

          {firstTicketTypes?.length > 0 ? (
            <div className="container-modalidade">
              {firstTicketTypes.map((value, key) => (
                <BoxModality
                  key={key}
                  value={value}
                  checkedModality={checkedModality}
                  setCheckedModality={setCheckedModality}
                />
              ))}
            </div>
          ) : (
            'Não existe modalidade de escolha!'
          )}
        </div>
      </StyledModalidade>

      {checkedModality.name === 'Presencial' ? (
        <HostingModalitityComponent
          hotelsTicketTypes={hotelsTicketTypes}
          setTicket={setTicket}
        />
      ) : checkedModality.name === 'Online' ? (
        <StyledOnline>
          <h2>
            Fechado! O total ficou em <strong>R$ {checkedModality.price / 100}</strong>. Agora é só confirmar:
          </h2>
          <button
            onClick={async() => {
              try {
                const result = await saveTicket({ ticketTypeId: checkedModality.id });
                toast('Seu ticket foi reservado com sucesso!');
                setTicket(result.data);
              } catch (error) {
                toast('Não foi possível reservar seu ticket!');
              }
            }}
          >
            RESERVAR INGRESSO
          </button>
        </StyledOnline>
      ) : (
        null
      )}
    </>
  );
}

const StyledModalidade = styled.div`
  h1 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
    margin-bottom: 35px;

    color: #000000;
  }

  .container-main h2 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    margin-bottom: 17px;

    color: #8e8e8e;
  }

  .container-modalidade {
    display: flex;
  }

  .modality-name {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    text-align: center;
    color: #454545;

    margin-bottom: 4px;
  }

  .modality-price {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #898989;
  }
`;

const StyledOnline = styled.div`
  h2 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
    margin-top: 44px;
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
