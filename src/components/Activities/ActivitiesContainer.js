import styled from 'styled-components';
import ActivityBox from './ActivityBox';

const activityData = {
  id: 6,
  name: 'LoL: Montando o PC ideal',
  capacity: 1,
  startAt: new Date('2023-01-23T09:00:00'),
  endAt: new Date('2023-01-23T11:00:00'),
  activityDateId: 2,
  activityLocalId: 2
};

export default function ActivitiesContainer() {
  return (
    <ActivitiesWrapper>
      <ActivitiesLocal>
        <h2>
          Auditório Principal
        </h2>
        <ActivitiesBoxWrapper>
          <ActivityBox activityData={activityData}/>
        </ActivitiesBoxWrapper>
      </ActivitiesLocal>
      <ActivitiesLocal>
        <h2>
          Auditório Lateral
        </h2>
        <ActivitiesBoxWrapper>
          <ActivityBox activityData={activityData}/>
          <ActivityBox activityData={activityData}/>
          <ActivityBox activityData={activityData}/>
          <ActivityBox activityData={activityData}/>
          <ActivityBox activityData={activityData}/>
          <ActivityBox activityData={activityData}/>
          <ActivityBox activityData={activityData}/>
          <ActivityBox activityData={activityData}/>
          <ActivityBox activityData={activityData}/>
          <ActivityBox activityData={activityData}/>
        </ActivitiesBoxWrapper>
      </ActivitiesLocal>
      <ActivitiesLocal>
        <h2>
          Sala de Workshop
        </h2>
        <ActivitiesBoxWrapper>
          <ActivityBox activityData={activityData}/>
        </ActivitiesBoxWrapper>
      </ActivitiesLocal>
    </ActivitiesWrapper>
    
  );
};

const ActivitiesWrapper = styled.div `
  width: 100%;
  height: 100%;
  display: flex;
`;

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
