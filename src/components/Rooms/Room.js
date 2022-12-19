import styled from 'styled-components';
import { IoPersonOutline, IoPerson } from 'react-icons/io5';
import { useState } from 'react';

export default function Room({ roomdata, selectedRoom, setSelectedRoom }) {
  const roomNumber = roomdata.name;
  const roomCapacity = roomdata.capacity;
  // const roomBookings = roomdata.Booking.length;
  const roomBookings = 2;
  const isRoomFull = roomBookings>=roomCapacity;
  const capacityArray = [];
  const isSeletec = selectedRoom === roomdata.id;

  function capacityRender() {
    for(let i=roomBookings; i<roomCapacity; i++) {
      capacityArray.push(false);
    };
    for(let i=0; i<roomBookings; i++) {
      capacityArray.push(true);
    };
  };
  capacityRender();

  return (
    <RoomWrapper isFull={isRoomFull} isSeletec={isSeletec} onClick={() => setSelectedRoom(roomdata.id)}>
      <RoomNumber>
        {roomNumber}
      </RoomNumber>
      <RoomCapacity isFull={isRoomFull} isSeletec={isSeletec}>
        {capacityArray.map((booking, index) => booking ?  <IoPerson key={index}/> : <IoPersonOutline key={index}/>)}
      </RoomCapacity>
    </RoomWrapper>

  );
}

const RoomWrapper = styled.div`
  width: 190px;
  height: 45px;
  border: 1px solid #CECECE;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${ ({ isFull, isSeletec }) => isFull ? '#E9E9E9' : isSeletec ? '#FFEED2' : 'white'};
  cursor: pointer;
  pointer-events: ${ ({ isFull }) => isFull ? 'none' : 'initial'};
`;

const RoomNumber = styled.div`
  margin-left: 15px;
  font-weight: 700;
  font-size: 20px;
  color: ${ ({ isFull }) => isFull ? '#9D9D9D' : '#454545'};
`;

const RoomCapacity = styled.div`
  margin-right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  font-size: 22px;
  color: ${ ({ isFull }) => isFull ? '#8C8C8C' : 'black'};
`;
