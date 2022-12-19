import styled from 'styled-components';
import { useState } from 'react';
import HostingModalityComponent from './HostingModalityComponent';
import api from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BoxModality = ({ modality, checkedModality, setCheckedModality }) => {
  return (
    <ModalityContainer
      checkedModality={checkedModality}
      name={modality.name}
      onClick={() => {
        setCheckedModality(modality.name);
      }}
      className="modality"
    >
      <p className="modality-name">{modality.name}</p>
      <p className="modality-price">R$ {modality.price}</p>
    </ModalityContainer>
  );
};

export default function CreatedTicket() {
  const [checkedModality, setCheckedModality] = useState('');

  const optionsModality = [
    { name: 'Presencial', price: 250 },
    { name: 'online', price: 100 },
  ];

  const jasonuserdata = localStorage.getItem('userData');
  const userdata = JSON.parse(jasonuserdata);
  const token = userdata.token;

  async function ReservaTicket(checkedModality) {
    try {
      const response = await api.get(`/tickets/types/${checkedModality}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const ticketTypeId = response.data.id;
      await api.post(
        '/tickets',
        { ticketTypeId },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast('Seu ticket foi reservado com sucesso!');
    } catch (error) {
      toast('Não foi possível reservar seu ticket!');
    }
  }

  return (
    <>
      <StyledModalidade>
        <ToastContainer autoClose={5000} pauseOnHover={false} />
        <h1>Ingresso e pagamento</h1>
        <div className="container-main">
          <h2>Primeiro, escolha sua modalidade de ingresso</h2>

          {optionsModality.length > 0 ? (
            <div className="container-modalidade">
              {optionsModality.map((modality, key) => (
                <BoxModality
                  checkedModality={checkedModality}
                  setCheckedModality={setCheckedModality}
                  key={key}
                  modality={modality}
                ></BoxModality>
              ))}
            </div>
          ) : (
            'Não existe modalidade de escolha!'
          )}
        </div>
      </StyledModalidade>
      {checkedModality === 'Presencial' ? (
        <HostingModalityComponent modality={checkedModality} />
      ) : checkedModality === 'online' ? (
        <StyledOnline>
          <h2>
            Fechado! O total ficou em <strong>R$ 100</strong>. Agora é só confirmar:
          </h2>
          <button
            onClick={() => {
              ReservaTicket(checkedModality);
            }}
          >
            RESERVAR INGRESSO
          </button>
        </StyledOnline>
      ) : (
        ''
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

const ModalityContainer = styled.div`
  width: 145px;
  height: 145px;
  margin-right: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${({ checkedModality, name }) => (checkedModality === name ? '#FFEED2' : '#FFFFFF')};

  border: 1px solid #cecece;
  border-radius: 20px;
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
