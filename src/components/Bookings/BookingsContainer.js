import styled from 'styled-components';
import Button from '../Form/Button';
import BookingBox from './BookingBox';

export default function BookingsContainer({ data }) {
  return (
    <Wrapper>
      <h2>Você já escolheu seu quarto:</h2>
      <Container>
        <BookingBox userBooking={data.userBooking} roomBookings={data.roomBookings}/>
      </Container>
      <ButtonContainer>
        <Button>
          TROCAR DE QUARTO
        </Button>
      </ButtonContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  > h2 {
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    margin-top: 10px;
    line-height: 60px;
    color: #8e8e8e;
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  column-gap: 20px;
  width: 100%;
  height: 100%;
`;

const ButtonContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 100px;
`;
