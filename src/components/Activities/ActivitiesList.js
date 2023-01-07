import styled from 'styled-components';

import ActivityBox from './ActivityBox';

export default function ActivitiesList({ localName, activitiesData }) {
  return (
    <ActivitiesLocal>
      <h2>
        {localName}
      </h2>
      <ActivitiesBoxWrapper>
        {activitiesData?.map((activity) => <ActivityBox key={activity.id} activityData={activity}/>)}
      </ActivitiesBoxWrapper>
    </ActivitiesLocal>
  );
}

const ActivitiesLocal = styled.div`
  width: 100%;
  height: 90%;

  h2{
    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-size: 17px;
    font-weight: 400;
    color: #7B7B7B;
    margin-bottom: 10px;
  }

  :nth-child(n+1){
    margin-left: -1px;
  }
`;

const ActivitiesBoxWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex: none;
  gap: 10px;
  border: 1px solid #D7D7D7;
  overflow-y: auto;
`;
