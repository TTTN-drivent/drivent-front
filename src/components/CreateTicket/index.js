import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import useTicketType from '../../hooks/api/useTicketTypes';
import ConfirmTicket from './ConfirmTicket';
import ChooseBoxContainer from './ChooseBox';

export default function CreateTicket({ setRefresh }) {
  const [checkedModality, setCheckedModality] = useState({});
  const [checkedHosting, setCheckedHosting] = useState({});
  const { remoteModalities, hotelModalities } = useTicketType();

  return (
    <>
      <ChooseBoxContainer 
        ticketTypes={remoteModalities}
        checkedModality={checkedModality}
        setCheckedModality={setCheckedModality}
      />

      {
        checkedModality.isRemote !== undefined ?
          (!checkedModality?.isRemote ? 
            (<>
              <ChooseBoxContainer 
                isHotelMode
                ticketTypes={hotelModalities}
                checkedModality={checkedHosting}
                setCheckedModality={setCheckedHosting}
              /> {
                checkedHosting.isRemote !== undefined ?
                  <ConfirmTicket
                    modality={checkedHosting}
                    setRefresh={setRefresh}
                  /> :
                  (null)
              }
            </>
            ) :  
            <ConfirmTicket
              modality={checkedModality}
              setRefresh={setRefresh}
            />) :
          (null)
      }
    </>
  );
}
