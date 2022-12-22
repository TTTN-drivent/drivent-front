import styled from 'styled-components';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BoxModality from './BoxModality';
import ConfirmTicket from './ConfirmTicket';

export default function HostingModalitityComponent({ hotelsTicketTypes, setRefresh }) {
  const [checkedHosting, setCheckedHosting] = useState({});

  return (
    <>
      <StyledModalidade>
        <ToastContainer autoClose={5000} pauseOnHover={false} />
        <div className="container-main">
          <h2>Ótimo! Agora escolha sua modalidade de hospedagem</h2>

          {hotelsTicketTypes?.length > 0 ? (
            <div className="container-modalidade">
              {hotelsTicketTypes.map((value, key) => (
                <BoxModality
                  key={key}
                  value={value}
                  isHotelMode
                  checkedModality={checkedHosting}
                  setCheckedModality={setCheckedHosting}
                />
              ))}
            </div>
          ) : (
            'Não existe modalidade de escolha!'
          )}
        </div>
      </StyledModalidade>

      {checkedHosting.name ?
        <ConfirmTicket
          modality={checkedHosting}
          setRefresh={setRefresh}
        /> :
        <></>
      }
    </>
  );
}

const StyledModalidade = styled.div`
  margin-top: 40px;
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
