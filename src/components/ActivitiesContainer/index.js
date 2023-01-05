import { Typography } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import Button from '../../components/Form/Button';
import useActivity from '../../hooks/api/useActivity';

//Componente só para exemplificar (RETIRAR DEPOIS)
function ActivityList({ selectedDate }) {
  const { activity, getActivity } = useActivity();

  const requestActivity = useCallback(async() => {
    return getActivity(selectedDate.id);
  }, [selectedDate, getActivity]);

  useEffect(() => {
    requestActivity();
  }, [selectedDate]);

  return (
    < >
      {activity?.map((value) => <div key={value.id}>{value.name}</div>)}
    </>
  );
}

export default function ActivitiesContainer({ dates }) {
  const [selectedDate, setSelectedDate] = useState();

  return (
    <>
      {
        !selectedDate ?
          <StyledSubtitle variant="h6">Primeiro, filtre pelo dia do evento:</StyledSubtitle> :
          null
      }
      <DateMenu>
        {dates?.map((date) =>
          <DateButton
            key={date.id}
            value={date.id}
            props={selectedDate}
            onClick={() => {
              setSelectedDate({ ...date });
            }}
          >{date.date}</DateButton>
        )}
      </DateMenu>
      {
        selectedDate ?
          <ActivityList selectedDate={selectedDate} /> :
          null
      }
    </>
  );
}

const StyledSubtitle = styled(Typography)`
  color: #8E8E8E;
  margin-bottom: 17px!important;
`;

const DateMenu = styled.div`
  display: flex;
  gap: 17px
`;

const DateButton = styled(Button)`
  width: 140px;
  height: 40px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25) !important;
  background: ${({ props, value }) => (props?.id === value ? '#FFD37D' : 'default')} !important;
  text-transform: none !important;
  `;
