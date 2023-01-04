import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import useListRoom from '../../hooks/api/useListRoom';
import getRoomsInfo from './getRoomsInfo';

export default function HotelBox({ hotelData, selectedHotel, handleSelectHotel }) {
  const [hotelRoomInfo, setHotelRoomInfo] = useState(null);
  const { roomsData, getRooms } = useListRoom();

  useEffect(async() => {
    if(!roomsData) {
      await getRooms(hotelData.id);
    };
  }, []);

  useEffect(() => {
    const roomsInfo = getRoomsInfo(roomsData);
    setHotelRoomInfo(roomsInfo);
  }, [roomsData]);

  return (
    <Hotel selectedHotel={selectedHotel} boxHotel={hotelData} onClick={() => handleSelectHotel(hotelData)}>
      <img alt="hotelPic" src={hotelData.image} />
      <Info>
        <h3>{hotelData.name}</h3>
        <RoomTypeInfo>
          <h4>Tipos de acomodação:</h4>
          <div>
            <p>{hotelRoomInfo?.roomTypes}</p>
          </div>
        </RoomTypeInfo>
        <CapacityInfo>
          <h4>Vagas disponíveis:</h4>
          <div>
            <p>{hotelRoomInfo?.availableBookings}</p>
          </div>
        </CapacityInfo>
      </Info>
    </Hotel>
  );
}

const Hotel = styled.div`
  background-color: red;
  width: 195px;
  height: 265px;
  background-color: ${({ selectedHotel, boxHotel }) => (selectedHotel?.id === boxHotel.id ? '#FFEED2' : '#EBEBEB')};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  > img {
    height: 110px;
    width: 100%;
    border-radius: 5px;
    margin-bottom: 10px;
    object-fit: cover;
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

const RoomTypeInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 15px 0 15px 0;
  h4 {
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    color: #3c3c3c;
  }
  > div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    p {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      color: #3c3c3c;
    }
  }
`;

const CapacityInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  h4 {
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    color: #3c3c3c;
  }
  > div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    p {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      color: #3c3c3c;
    }
  }
`;
