import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import useListRoom from '../../hooks/api/useListRoom';

export default function HotelBox({ hotelData, selectedHotel, handleSelectHotel }) { 
  const [hotelRoomInfo, setHotelRoomInfo] = useState(null);

  async function handleRoomInfo() {
    const { roomsData } = await useListRoom(hotelData.id);
    if(roomsData!==null) return;
    const RoomTypes = [];
    roomsData?.Rooms.forEach((room) => {
      if(room.capacity ===1 && !RoomTypes.includes('single')) {
        RoomTypes.push('single');
      } else if (room.capacity=== 2 && !RoomTypes.includes('double')) {
        RoomTypes.push('double');
      } else if (room.capacity=== 3 && !RoomTypes.includes('triple')) {
        RoomTypes.push('triple');
      }
    });
    console.log(RoomTypes);
    //setHotelRoomInfo(RoomTypes);
  }
  handleRoomInfo();

  return (
    <Hotel selectedHotel={selectedHotel} boxHotel={hotelData} onClick={() => handleSelectHotel(hotelData)}>
      <img alt="hotelPic" src={hotelData.image} />
      <Info>
        <h3>{hotelData.name}</h3>
      </Info>
    </Hotel>
  );
}

const Hotel = styled.div`
  background-color: red;
  width: 195px;
  height: 265px;
  background-color: ${({ selectedHotel, boxHotel }) => (selectedHotel?.id === boxHotel.id ? '#FFEED2' : '#EBEBEB')};;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  > img {
    height: 40%;
    width: 100%;
    border-radius: 5px;
    margin-bottom: 10px;
  }
`;

const Info = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  > h3 {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #343434;
  }
`;

