import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

export default function BookingBox({ bookingData }) {
  const [roomType, setRoomType] = useState(null);
  const [bookingsNumber, setBookingsNumber] = useState(null);

  function makeRoomTypes() {
    if(bookingData.Room.capacity === 1) {
      setRoomType('(Single)');
    } else if (bookingData.Room.capacity === 2) {
      setRoomType('(Double)');
    } else {
      setRoomType('(Triple)');
    };
  };

  function makeRoomBookings() {
    if(bookingData.Room.roomBookings === 1) {
      setBookingsNumber('Somente você');
    } else {
      setBookingsNumber(`Você e mais ${bookingData.Room.roomBookings-1} pessoas`);
    }
  };

  useEffect( () => {
    if(bookingData) {
      makeRoomTypes();
      makeRoomBookings();
    };
  }, [bookingData]);
  
  return (
    <Hotel>
      <img alt="hotelPic" src={bookingData.Hotel.image} />
      <Info>
        <h3>{bookingData.Hotel.name}</h3>
        <RoomTypeInfo>
          <h4>Quarto reservado</h4>
          <div>
            <p>{bookingData.Room.name} {roomType}</p>
          </div>
        </RoomTypeInfo>
        <CapacityInfo>
          <h4>Pessoas no seu quarto</h4>
          <div>
            <p>{bookingsNumber}</p>
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
  background-color: #FFEED2;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
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
