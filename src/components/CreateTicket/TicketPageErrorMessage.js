import styled from 'styled-components';

export default function TicketPageErrorMessage() {
  return (
    <Wrapper>
      <h2>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</h2>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 75%;
  width: 100%;
  h2 {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #8e8e8e;
    text-align: center;
    width: 60%;
  }
`;
