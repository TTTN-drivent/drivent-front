import styled from 'styled-components';
import HotelPageErrorMessage from '../../../components/HotelPageErrorMessage/HotelPageErrorMessage';
import Room from '../../../components/Rooms/Room';
import useHotel from '../../../hooks/api/useHotel';
import useListRoom from '../../../hooks/api/useListRoom';
import Button from '../../../components/Form/Button';
import { useState } from 'react';

export default function Hotel() {
  const { hotelsData, hotelsError } = useHotel();
  const [ selectedRoom, setSelectedRoom ] = useState(null);
  const { roomsData } = useListRoom(3);

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
      <RoomsWrapper>
        <RoomsTitle>
          Ótima pedida! Agora escolha seu quarto:
        </RoomsTitle>
        <RoomsContainer>
          {roomsData?.Rooms.map((room) => <Room key={room.id} roomdata={room} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom}/>)}
        </RoomsContainer>
        {selectedRoom ? (
          <Button onClick={() => console.log(selectedRoom)}>
            RESERVAR QUARTO
          </Button>
        ): ''}
      </RoomsWrapper>
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

const RoomsWrapper = styled.div `
  margin-top: 50px;
`;

const RoomsTitle = styled.div `
  font-size: 400;
  font-size: 20px;
  color: #8E8E8E;
  margin-bottom: 33px;
`;

const RoomsContainer = styled.div`
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 45px;
`;
