import styled from 'styled-components';
import ActivityBox from './ActivityBox';

export default function ActivitiesContainer() {
  return (
    <ActivitiesWrapper>
      <ActivitiesLocal>
        <h2>
          Auditório Principal
        </h2>
        <ActivitiesBoxWrapper>
          <ActivityBox/>
        </ActivitiesBoxWrapper>
      </ActivitiesLocal>
      <ActivitiesLocal>
        <h2>
          Auditório Lateral
        </h2>
        <ActivitiesBoxWrapper>
          <ActivityBox/>
          <ActivityBox/>
          <ActivityBox/>
          <ActivityBox/>
          <ActivityBox/>
          <ActivityBox/>
          <ActivityBox/>
          <ActivityBox/>
          <ActivityBox/>
          <ActivityBox/>
          <ActivityBox/>
        </ActivitiesBoxWrapper>
      </ActivitiesLocal>
      <ActivitiesLocal>
        <h2>
          Sala de Workshop
        </h2>
        <ActivitiesBoxWrapper>
          <ActivityBox/>
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
  height: 80%;

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
  align-items: center;
  gap: 10px;
  border: 1px solid #D7D7D7;
  overflow-y: auto;
`;
