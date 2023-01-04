import styled from 'styled-components';
import HotelPageErrorMessage from '../../../components/HotelPageErrorMessage/HotelPageErrorMessage';
import useHotel from '../../../hooks/api/useHotel';
import HotelsContainer from '../../../components/HotelsContainer/HotelsContainer';
import useBooking from '../../../hooks/api/useBooking';
import BookingsContainer from '../../../components/Bookings/BookingsContainer';
import { useState, useEffect } from 'react';

export default function Hotel() {
  const { hotelsData, hotelsError } = useHotel();
  const { booking } = useBooking();
  const [ showBooking, setShowBooking ] = useState(false);
  
  useEffect(() => {
    if(booking) {
      setShowBooking(true);
    } else {
      setShowBooking(false);
    }
  }, [booking]);

  return (
    <Wrapper>
      <h1>Escolha de Quarto e Hotel</h1>
      {showBooking ? (
        <BookingsContainer setShowBooking={setShowBooking}/>
      ) : (  
        hotelsData === null ? (
          <HotelPageErrorMessage errorMessage={hotelsError?.message}/>
        ) : (
          <HotelsContainer data={hotelsData} setShowBooking={setShowBooking}/>
        )  
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  h1 {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
    color: #000000;
  }
`;
