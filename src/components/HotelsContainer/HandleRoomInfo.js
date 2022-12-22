
export default function handleRoomInfo(roomsData) {
  if (roomsData ===null) return; 
  const roomsCapacity = roomsData.Rooms.map((room) => room.capacity);
  const roomTypes = getRoomTypes(roomsCapacity);
  const roomsTotalCapacity = roomsCapacity.reduce((acc, curr) => acc + curr, 0); 
  const usedRooms = roomsData.Rooms.reduce((acc, curr) => acc + curr.Booking.length, 0);
  return { capacity: roomsTotalCapacity - usedRooms, roomTypes };
}

function getRoomTypes(roomsCapacity) {
  roomsCapacity?.sort();
  const roomTypes = [];
  roomsCapacity?.forEach((capacity) => {
    if (capacity === 1 && !roomTypes.includes('single')) {
      roomTypes.push('single');
    } else if (capacity === 2 && !roomTypes.includes('double')) {
      roomTypes.push('double');
    } else if (capacity === 3 && !roomTypes.includes('triple')) {
      roomTypes.push('triple');
    }
  });

  if(roomTypes.includes('single')) {
    if(roomTypes.includes('double')) {
      if(roomTypes.includes('triple')) {
        return 'Single, Double e Triple';
      };
      return 'Single e Double';
    };
    if(roomTypes.includes('triple')) {
      return 'Single e Triple';
    };
    return 'Simple';
  };

  if(roomTypes.includes('double')) {
    if(roomTypes.includes('triple')) {
      return 'Double e Triple';
    };
    return 'Double';
  };

  if(roomTypes.includes('triple')) {
    return 'Triple';
  };
}
