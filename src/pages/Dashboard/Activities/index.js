import styled from 'styled-components';
import ActivitiesPageErrorMessage from '../../../components/ActivitiesPageErrorMessage/ActivitiesPageErrorMessage';
import useActivities from '../../../hooks/api/useActivities';

export default function Activities() {
  const { activitiesData, activitiesError } = useActivities();
  
  return (
    <Wrapper>
      <h1>Escolha de atividades</h1>
      {
        activitiesData === null ? (
          <ActivitiesPageErrorMessage errorMessage={activitiesError?.message}/>
        ) : (
          <></>
        )  
      }
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
