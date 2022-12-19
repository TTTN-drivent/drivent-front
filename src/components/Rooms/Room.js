import styled from 'styled-components';
import { IoPersonOutline, IoPerson } from 'react-icons/io5';

export default function Room({ roomData, selectedRoom, setSelectedRoom }) {
  const roomNumber = roomData.name;
  const roomCapacity = roomData.capacity;
  //const roomBookings = roomData.Booking.length;
  const roomBookings = 2;
  const isRoomFull = roomBookings>=roomCapacity;
  const capacityArray = [];
  const isSeletec = selectedRoom === roomData.id;

  function capacityRender() {
    for(let i=roomBookings; i<roomCapacity; i++) {
      capacityArray.push('empty');
    };
    for(let i=0; i<roomBookings; i++) {
      capacityArray.push('filled');
    };
    if(isSeletec) {
      capacityArray.shift();
      capacityArray.unshift('selected');
    }
  };

  capacityRender();

  return (
    <RoomWrapper isFull={isRoomFull} isSeletec={isSeletec} onClick={() => setSelectedRoom(roomData.id)}>
      <RoomNumber>
        {roomNumber}
      </RoomNumber>
      <RoomCapacity isFull={isRoomFull} isSeletec={isSeletec}>
        {capacityArray.map((booking, index) => {
          if(booking === 'empty') {
            return <IoPersonOutline key={index}/>;
          } else if (booking === 'filled') {
            return <IoPerson key={index}/>;
          } else {
            return <div key={index}><IoPerson/></div>;
          }
        })
        }
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

  div{
    color: ${ ({ isSeletec }) => isSeletec ? 'pink' : 'black'};
  }
`;
