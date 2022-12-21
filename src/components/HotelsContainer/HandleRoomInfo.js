
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
  if (!roomTypes.includes('triple') && !roomTypes.includes('double')) return 'Single';
  if (!roomTypes.includes('triple')) return 'Single e Double'; 
  return 'Single, Double e Triple';
}
