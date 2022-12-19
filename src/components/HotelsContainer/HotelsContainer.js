import styled from 'styled-components';
import HotelBox from './HotelBox';
import { useState, useEffect } from 'react';

export default function HotelsContainer({ data }) {
  const [selectedHotel, setSelectedHotel]= useState(null);  

  useEffect(async() => {
    //quando mudar o selectedHotel faz uma nova requisição no banco para puxar os rooms
    //if selectedHotel!== null useRooms
  }, [selectedHotel]);

  return (
    <Wrapper>
      <h2>Primeiro, escolha seu hotel</h2>
      <Container>
        {data.map((hotel) => <HotelBox hotelData={hotel} selectedHotel={selectedHotel} handleSelectHotel={setSelectedHotel}/>)}
      </Container>
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

