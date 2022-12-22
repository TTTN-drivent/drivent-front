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

