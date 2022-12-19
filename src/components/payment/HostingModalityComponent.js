import styled from 'styled-components';
import { useState } from 'react';
import api from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BoxModality = ({ modality, checkedHosting, setCheckedHosting }) => {
  return (
    <ModalityContainer
      checkedHosting={checkedHosting}
      name={modality.name}
      onClick={() => {
        setCheckedHosting(modality.name);
      }}
      className="modality"
    >
      <p className="modality-name">{modality.name}</p>
      <p className="modality-price">+ R$ {modality.price}</p>
    </ModalityContainer>
  );
};

const BoxHospedagem = ({ checkedHosting, price, token }) => {
  async function ReservaTicket(checkedHosting) {
    try {
      const response = await api.get(`/tickets/types/${checkedHosting}`, {
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
    <StyledHodpedagem>
      <h2>
        Fechado! O total ficou em <strong>R$ {price}</strong>. Agora é só confirmar:
      </h2>
      <button
        onClick={() => {
          ReservaTicket(checkedHosting);
        }}
      >
        RESERVAR INGRESSO
      </button>
    </StyledHodpedagem>
  );
};

export default function HostingModalitityComponente({ modality }) {
  const [checkedHosting, setCheckedHosting] = useState('');

  const optionsHotel = [
    { name: 'Sem Hotel', price: 0 },
    { name: 'Com Hotel', price: 350 },
  ];

  const jasonuserdata = localStorage.getItem('userData');
  const userdata = JSON.parse(jasonuserdata);
  const token = userdata.token;

  return (
    <>
      <StyledModalidade>
        <ToastContainer autoClose={5000} pauseOnHover={false} />
        <div className="container-main">
          <h2>Ótimo! Agora escolha sua modalidade de hospedagem</h2>

          {optionsHotel.length > 0 ? (
            <div className="container-modalidade">
              {optionsHotel.map((modality, key) => (
                <BoxModality
                  checkedHosting={checkedHosting}
                  setCheckedHosting={setCheckedHosting}
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
      {checkedHosting === 'Com Hotel' ? (
        <BoxHospedagem token={token} checkedHosting={checkedHosting} price={600} />
      ) : checkedHosting === 'Sem Hotel' ? (
        <BoxHospedagem token={token} checkedHosting={checkedHosting} price={250} />
      ) : (
        ''
      )}
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

const ModalityContainer = styled.div`
  width: 145px;
  height: 145px;
  margin-right: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${({ checkedHosting, name }) => (checkedHosting === name ? '#FFEED2' : '#FFFFFF')};

  border: 1px solid #cecece;
  border-radius: 20px;
`;

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
