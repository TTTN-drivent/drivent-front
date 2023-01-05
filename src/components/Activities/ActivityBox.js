import styled from 'styled-components';
import { RiLoginBoxLine, RiCloseCircleLine, RiCheckboxCircleLine } from 'react-icons/ri';
import { useState, useEffect } from 'react';
import useActivityRegister from '../../hooks/api/useActivityRegister';
import useSaveActivity from '../../hooks/api/useSaveActivity';
import { toast } from 'react-toastify';

export default function ActivityBox({ activityData }) {
  const { activityRegisterData, getActivityRegister } = useActivityRegister();
  const { saveActivityLoading, saveActivity } = useSaveActivity();
  const [isFull, setIsFull] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [currentCapacity, setCurrentCapacity] = useState(activityData.capacity);
  const duration = ((activityData.endAt - activityData.startAt)/1000/60).toFixed(0);

  useEffect( () => {
    if(!activityRegisterData) {
      getActivityRegister(activityData.id);
    } else {
      checkActivityStatus();
    }
  }, [saveActivityLoading, activityRegisterData]);

  function checkActivityStatus() {
    const { registersCount } = activityRegisterData;

    if(registersCount >= activityData.capacity) {
      setIsFull(true);
    } else {
      setCurrentCapacity(activityData.capacity - registersCount);
    }
    setIsRegistered(activityRegisterData.isRegistered);
  };

  async function submitActivityRegister(activityId) {
    const body = {
      activityId,
    };
    
    try {
      await saveActivity(body);
      toast ('Registro realizado com sucesso');
    } catch (error) {
      toast ('Não foi possível realizar o seu registro');
    }
  };

  return (
    <ActivityWrapper duration={duration} isRegistered={isRegistered}>
      <ActivityInfos>
        <h3>
          {activityData.name}
        </h3>
        <p>
          {activityData.startAt.toTimeString().slice(0, 5)} - {activityData.endAt.toTimeString().slice(0, 5)}
        </p>
      </ActivityInfos>
      <ActivityCapacity isRegistered={isRegistered} isFull={isFull} onClick={() => submitActivityRegister(activityData.id)}>
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
  min-height: ${ ({ duration }) => ( duration <= 60 ? '80px' : `${duration/60*80}px`)};
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
  pointer-events: ${ ({ isRegistered, isFull }) => isRegistered || isFull ? 'none' : 'initial'};
  border-left: 1px solid #CFCFCF;
  margin-left: 10px;
  padding-left: 10px;

  p{
    font-family: 'Roboto', sans-serif;
    margin-top: 5px;
    font-size: 10px;
  }
`;

