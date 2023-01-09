import styled from 'styled-components';

import useActivity from '../../hooks/api/useActivity';
import useActivityLocals from '../../hooks/api/useActivityLocals';
import { useCallback, useEffect, useState } from 'react';
import ActivitiesList from './ActivitiesList';

export default function ActivitiesLocals({ selectedDate } ) {
  const { activity, getActivity } = useActivity();
  const { localsData } = useActivityLocals();
  const [activityLocalsData, setActivityLocalsData] = useState({});

  const requestActivity = useCallback(async() => {
    return getActivity(selectedDate.id);
  }, [selectedDate]);

  useEffect(() => {
    requestActivity();
  }, [selectedDate]);

  useEffect(() => {
    if(activity) {
      getLocalsInfo();
    }
  }, [activity]);

  function getLocalsInfo() {
    let dataObject = {};

    for(let i=0; i<activity.length; i++) {
      const localName = activity[i].ActivityLocal.name;
      if(dataObject[localName]) {
        dataObject[localName].push(activity[i]);
      } else {
        const newLocal = { [localName]: [activity[i]] };
        dataObject = { ...dataObject, ...newLocal };
      }
    }
    setActivityLocalsData(dataObject);
  }
  
  return (
    <ActivitiesWrapper>
      {localsData?.map((local, index) => <ActivitiesList key={index} localName={local.name} activitiesData={activityLocalsData[local.name]} />)}
    </ActivitiesWrapper>
  );
}

const ActivitiesWrapper = styled.div `
  width: 100%;
  height: 420px;
  display: flex;
  margin: 60px 0;
`;
