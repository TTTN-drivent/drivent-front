import { Typography } from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Form/Button';
import useActivityDates from '../../../hooks/api/useActivityDates';

export default function Activities() {
  const [selectedDate, setSelectedDate] = useState();
  const { dates, dateLoading } = useActivityDates();

  return (
    <>
      {
        dateLoading ?
          <></> :
          <>
            < StyledTypography variant="h4" > Escolha de atividades</StyledTypography >
            {
              !selectedDate ?
                <StyledSubtitle variant="h6">Primeiro, filtre pelo dia do evento:</StyledSubtitle> :
                null
            }
            <DateMenu>
              {dates?.map((date) =>
                <DateButton
                  key={date.id}
                  variant='contained'
                  onClick={() => { setSelectedDate({ ...date }); }}
                  selectedDate={selectedDate}
                  value={date.id}
                >{date.date}</DateButton>
              )}
            </DateMenu>
          </>
      }
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 37px!important;
`;
const StyledSubtitle = styled(Typography)`
  color: #8E8E8E;
  margin-bottom: 17px!important;
`;

const DateMenu = styled.div`
  display: flex;
  gap: 17px
`;

const DateButton = styled(Button)`
  width: 131px;
  height: 37px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25) !important;
  background: ${({ selectedDate, value }) => (selectedDate?.id === value ? '#FFD37D' : 'default')} !important;
`;
