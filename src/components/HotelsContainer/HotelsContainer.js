import styled from 'styled-components';
import HotelBox from './HotelBox';
import { useState, useEffect } from 'react';
import RoomsContainer from '../Rooms/RoomsContainer';
import useListRoom from '../../hooks/api/useListRoom';

export default function HotelsContainer({ data }) {
  const [selectedHotel, setSelectedHotel]= useState(null);
  const { roomsData, getRooms } = useListRoom();
  
  useEffect(async() => {
    if(selectedHotel) {
      await getRooms(selectedHotel.id);
    }   
  }, [selectedHotel]);

  return (
    <Wrapper>
      <h2>Primeiro, escolha seu hotel</h2>
      <Container>
        {data.map((hotel) => <HotelBox key={hotel.id} hotelData={hotel} selectedHotel={selectedHotel} handleSelectHotel={setSelectedHotel}/>)}
      </Container>
      {roomsData ? <RoomsContainer roomsData={ roomsData.Rooms }/> : <></>}
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

