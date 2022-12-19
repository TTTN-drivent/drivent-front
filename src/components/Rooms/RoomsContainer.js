import styled from 'styled-components';
import Room from './Room';
import useListRoom from '../../hooks/api/useListRoom';
import Button from '../Form/Button';
import { useState } from 'react';

export default function RoomsContainer() {
  const [ selectedRoom, setSelectedRoom ] = useState(null);
  const { roomsData } = useListRoom(3);

  return (
    <RoomsWrapper>
      <RoomsTitle>
        Ótima pedida! Agora escolha seu quarto:
      </RoomsTitle>
      <RoomsBox>
        {roomsData?.Rooms.map((room) => <Room key={room.id} roomdata={room} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom}/>)}
      </RoomsBox>
      {selectedRoom ? (
        <Button onClick={() => console.log(selectedRoom)}>
        RESERVAR QUARTO
        </Button>
      ) : <></>}
    </RoomsWrapper>
  );
}

const RoomsWrapper = styled.div `
  margin-top: 50px;
`;

const RoomsTitle = styled.div `
  font-size: 400;
  font-size: 20px;
  color: #8E8E8E;
  margin-bottom: 33px;
`;

const RoomsBox = styled.div`
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 45px;
`;
