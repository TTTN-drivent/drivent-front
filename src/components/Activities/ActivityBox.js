import styled from 'styled-components';
import { RiLoginBoxLine, RiCloseCircleLine, RiCheckboxCircleLine } from 'react-icons/ri';
import { useState, useEffect } from 'react';
import useActivityRegister from '../../hooks/api/useActivityRegister';

export default function ActivityBox({ activityData }) {
  const { activityRegisterData, getActivityRegister } = useActivityRegister();
  const [isFull, setIsFull] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [currentCapacity, setCurrentCapacity] = useState(activityData.capacity);
  const duration = 60;
  //const duration = ((activityData.endAt - activityData,startAt)/1000/60).toFixed(0);

  useEffect( () => {
    getActivityRegister(1);
    checkActivityStatus();
  }, [activityRegisterData]);

  function checkActivityStatus() {
    const registersCount = activityRegisterData.length();
    // fazer a lógica se o usuário já tá inscrito
    if(registersCount >= activityData.capacity) {
      setIsFull(true);
    } else {
      setCurrentCapacity(activityData.capacity - registersCount);
    }
  };

  return (
    <ActivityWrapper duration={duration} isRegistered={isRegistered}>
      <ActivityInfos>
        <h3>
          {/* {activityData.name} */}
          Minecraft: Montando o PC ideal
        </h3>
        <p>
          {/*{activityData.startAt.toTimeString().slice(0,5)};
          -
          {activityData.endAt.toTimeString().slice(0,5)}; */}
          09:00 - 10:00
        </p>
      </ActivityInfos>
      <ActivityCapacity isRegistered={isRegistered} isFull={isFull}>
        { isRegistered ? (<RiCheckboxCircleLine/>) : (isFull ? ( <RiCloseCircleLine /> ) : ( <RiLoginBoxLine /> )) }
        <p>
          { isRegistered ? ('Inscrito') : (isFull ? 'Esgotado' : `${currentCapacity} Vagas`)}
        </p>
      </ActivityCapacity>
    </ActivityWrapper>
  );
};

const ActivityWrapper = styled.div`
  width: 100%;
  min-height: 80px;
  height: ${ ({ duration }) => (`${duration/60*80}px`)};
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background-color: ${ ({ isRegistered }) => isRegistered ? '#D0FFDB' : '#F1F1F1'};
  border-radius: 5px;
`;

const ActivityInfos = styled.div`
  width: 100%;
  font-family: 'Roboto', sans-serif;
  color: #343434;
  font-size: 12px;
  font-weight: 700;

  p{
    margin-top: 5px;
    font-weight: 400;
  }
`;

const ActivityCapacity = styled.div`
  color: ${ ({ isRegistered, isFull }) => isRegistered ? '#078632' : isFull ? '#CC6666' : '#078632'};
  width: 75px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  cursor: ${ ({ isRegistered, isFull }) => isRegistered || isFull ? 'initial' : 'pointer'};
  border-left: 1px solid #CFCFCF;
  margin-left: 10px;
  padding-left: 10px;

  p{
    font-family: 'Roboto', sans-serif;
    margin-top: 5px;
    font-size: 10px;
  }
`;

