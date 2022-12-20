import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import useListRoom from '../../hooks/api/useListRoom';

export default function HotelBox({ hotelData, selectedHotel, handleSelectHotel }) {
  const [hotelRoomInfo, setHotelRoomInfo] = useState(null);
  const [hotelApi, setHotelApi] = useState(null);
  const { roomsData, getRooms } = useListRoom();

  const getDataFromApi = useCallback(async() => {await getRooms(hotelData.id);}, []);

  // const handleRoomInfo = useCallback(() => {
  //   const roomsCapacity = roomsData?.Rooms.map((room) => room.capacity);
  //   roomsCapacity?.sort();
  //   let roomTypes = [];
  //   roomsCapacity?.forEach((capacity) => {
  //     if (capacity === 1 && !roomTypes.includes('single')) {
  //       roomTypes.push('single');
  //     } else if (capacity === 2 && !roomTypes.includes('double')) {
  //       roomTypes.push('double');
  //     } else if (capacity === 3 && !roomTypes.includes('triple')) {
  //       roomTypes.push('triple');
  //     }
  //   });
  //   if (roomTypes.length === 1) roomTypes = 'Single';
  //   if (roomTypes.length === 2) roomTypes = 'Single e Double'; 
  //   if (roomTypes.length === 3) roomTypes = 'Single, Double e Triple'; 
  //   setHotelRoomInfo({ capacity: null, roomTypes });
  // }, [setHotelRoomInfo]);

  function handleRoomInfo() {
    const roomsCapacity = hotelApi?.Rooms.map((room) => room.capacity);
    roomsCapacity?.sort();
    let roomTypes = [];
    roomsCapacity?.forEach((capacity) => {
      if (capacity === 1 && !roomTypes.includes('single')) {
        roomTypes.push('single');
      } else if (capacity === 2 && !roomTypes.includes('double')) {
        roomTypes.push('double');
      } else if (capacity === 3 && !roomTypes.includes('triple')) {
        roomTypes.push('triple');
      }
    });
    if (roomTypes.length === 1) roomTypes = 'Single';
    if (roomTypes.length === 2) roomTypes = 'Single e Double'; 
    if (roomTypes.length === 3) roomTypes = 'Single, Double e Triple'; 
    setHotelRoomInfo({ capacity: null, roomTypes });
  }

  useEffect(() => {
    getDataFromApi();
    setHotelApi(roomsData);
  }, []);

  useEffect(() => {
    handleRoomInfo();
  }, [hotelApi]);

  console.log(roomsData);  

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
            <p>103</p>
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
    height: 45%;
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
