import styled from 'styled-components';
import Room from './Room';
import Button from '../Form/Button';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useBooking from '../../hooks/api/useBooking';
import useSaveBooking from '../../hooks/api/useSaveBooking';
import useUpdateBooking from '../../hooks/api/useUpdateBooking';

export default function RoomsContainer( { roomsData, setShowBooking } ) {
  const [ selectedRoom, setSelectedRoom ] = useState(null);
  const { saveBookingLoading, saveBooking } = useSaveBooking();
  const { updateBookingLoading, updateBooking } = useUpdateBooking();
  const { booking } = useBooking();

  async function submitBooking() {
    const body = {
      roomId: selectedRoom,
    };

    if(booking) {
      if(selectedRoom === booking.Booking.roomId) {
        toast('Sua reserva já é neste quarto!');
        return;
      }
      try {
        await updateBooking(booking.Booking.id, body);
        toast('Informações alteradas com sucesso!');
        setShowBooking(true);
      } catch (err) {
        toast('Não foi possível alterar suas informações!');
      }  
    } else {
      try {
        await saveBooking(body);
        toast('Informações salvas com sucesso!');
        setShowBooking(true);
      } catch (err) {
        toast('Não foi possível salvar suas informações!');
      }
    }
  };

  return (
    <RoomsWrapper>
      <RoomsTitle>
        Ótima pedida! Agora escolha seu quarto:
      </RoomsTitle>
      <RoomsBox>
        {roomsData?.map((room) => <Room key={room.id} roomData={room} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom}/>)}
      </RoomsBox>
      {selectedRoom ? (
        <Button disabled={saveBookingLoading || updateBookingLoading} onClick={() => submitBooking()}>
        RESERVAR QUARTO
        </Button>
      ) : <></>}
    </RoomsWrapper>
  );
}

const RoomsWrapper = styled.div `
  margin-top: 50px;
  margin-bottom: 150px;
`;

const RoomsTitle = styled.div `
  font-size: 400;
  font-size: 20px;
  color: #8E8E8E;
  margin-bottom: 33px;
`;

const RoomsBox = styled.div`
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 45px;
`;
