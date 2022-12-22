
/* export default function handleRoomInfo(roomsData) {
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
    return 'Single';
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
 */

export default function getRoomsInfo(roomsData) {
  if (roomsData === null) return;

  let roomTypes = Array(3).fill(undefined);
  const { totalCapacity, bookings } = roomsData.Rooms.reduce(
    (acc, current) => {
      const { capacity, Booking } = current;

      if (capacity === 1) roomTypes[0] = 'Single';
      else if (capacity === 2) roomTypes[1] = 'Double';
      else if (capacity === 3) roomTypes[2] = 'Triple';

      acc.totalCapacity += capacity;
      acc.bookings += Booking.length;
      return acc;
    },
    { totalCapacity: 0, bookings: 0 }
  );
  roomTypes = roomTypes.filter((type) => type !== undefined);
  return { roomTypes: new Intl.ListFormat('pt').format(roomTypes), availableBookings: totalCapacity - bookings };
}
