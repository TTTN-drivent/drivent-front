import styled from 'styled-components';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTicketType from '../../hooks/api/useTicketTypes';
import { sortFirstTicketTypes, sortHotelsTicketTypes } from './sortTicketTypes';
import BoxModality from './BoxModality';
import HostingModalitityComponent from './HostingModalityComponent';
import ConfirmTicket from './ConfirmTicket';

export default function CreateTicket({ setRefresh }) {
  const [checkedModality, setCheckedModality] = useState({});
  const { ticketType } = useTicketType();
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
          setRefresh={setRefresh}
        />
      ) : checkedModality.name === 'Online' ? (
        <ConfirmTicket
          modality={checkedModality}
          setRefresh={setRefresh}
        />
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
