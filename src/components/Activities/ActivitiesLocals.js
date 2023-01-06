import styled from 'styled-components';

import useActivity from '../../hooks/api/useActivity';
import { useCallback, useEffect, useState } from 'react';
import ActivitiesList from './ActivitiesList';

export default function ActivitiesLocals({ selectedDate } ) {
  const { activity, getActivity } = useActivity();
  const [localsData, setLocalsData] = useState({});
  const [localsNames, setLocalsNames] = useState([]);

  const requestActivity = useCallback(async() => {
    return getActivity(selectedDate.id);
  }, [selectedDate, getActivity]);

  useEffect(() => {
    requestActivity();
  }, [selectedDate]);

  useEffect(() => {
    if(activity) {
      getLocals();
    }
  }, [selectedDate, activity]);

  function getLocals() {
    let dataObject = {};
    const localsArray = [];

    for(let i=0; i<activity.length; i++) {
      const localName = activity[i].ActivityLocal.name;
      if(dataObject[localName]) {
        dataObject[localName].push(activity[i]);
      } else {
        localsArray.push(localName);
        const newLocal = { [localName]: [activity[i]] };
        dataObject = { ...dataObject, ...newLocal };
      }
    }
    setLocalsData(dataObject);
    setLocalsNames(localsArray);
  }

  return (
    <ActivitiesWrapper>
      {localsNames.map((local, index) => <ActivitiesList key={index} localName={local} activitiesData={localsData[local]} />)}
    </ActivitiesWrapper>
  );
}

const ActivitiesWrapper = styled.div `
  width: 100%;
  height: 420px;
  display: flex;
  margin: 60px 0;
`;
