import styled from 'styled-components';
import HotelPageErrorMessage from '../../../components/HotelPageErrorMessage/HotelPageErrorMessage';
import useHotel from '../../../hooks/api/useHotel';

export default function Hotel() {
  const { hotelsData, hotelsError } = useHotel();
  
  return (
    <Wrapper>
      <h1>Escolha de Quarto e Hotel</h1>
      {hotelsData === null ? (
        <HotelPageErrorMessage errorMessage={hotelsError}/>
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

