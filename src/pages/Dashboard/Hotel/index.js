import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../contexts/UserContext';
import { toast } from 'react-toastify';
import * as hotelsService from '../../../services/hotelApi';
import styled from 'styled-components';

export default function Hotel() {
  const { userData } = useContext(UserContext);
  const [hotelsData, setHotelsData] = useState(null);

  useEffect(async() => {
    try {
      const res = await hotelsService.list(userData.token);
      setHotelsData(res);
    } catch (error) {
      toast('Não foi possível consultar a lista de hotéis!');
    }
  }, [setHotelsData]);

  return (
    <Wrapper>
      <h1>Escolha de Quarto e Hotel</h1>
      {hotelsData === null ? (
        <Contei>
          <h2>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</h2>
        </Contei>
      ) : (
        <HotelsContainer>
          <h1>hoteis</h1>
        </HotelsContainer>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  h1 {
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
    color: #000000;
  }
`;

const HotelsContainer = styled.div``;

const Contei = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  h2 {
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #8e8e8e;
    width: 80%;
  }
`;
