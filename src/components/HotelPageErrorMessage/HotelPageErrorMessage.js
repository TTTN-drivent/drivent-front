import styled from 'styled-components';

export default function HotelPageErrorMessage({ errorMessage }) {
  const errorStatus = errorMessage?.slice(-3);

  return (
    <Wrapper>
      {errorStatus === '402' ? (
        <h2>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</h2>
      ) : (
        <h2>Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades</h2>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
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
    text-align: center;
    width: 60%;
  }
`;
