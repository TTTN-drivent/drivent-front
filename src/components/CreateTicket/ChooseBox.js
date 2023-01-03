import styled from 'styled-components';

import BoxModality from './BoxModality';

export default function ChooseBoxContainer({ ticketTypes, checkedModality, setCheckedModality, isHotelMode = false }) {
  return(
    <StyledModality>
      <h2>{ticketTypes.title}</h2>

      {ticketTypes?.modalities?.length > 0 ? (
        <div className="container-modalidade">
          {ticketTypes.modalities.map((value, key) => (
            <BoxModality
              isHotelMode
              key={key}
              value={value}
              checkedModality={checkedModality}
              setCheckedModality={setCheckedModality}
            />
          ))}
        </div>
      ) : (
        'Não existe modalidade de escolha!'
      )}
    </StyledModality>
  );
}

const StyledModality = styled.div`
  margin-bottom: 40px;

  h2 {
    font-family: 'Roboto';
    color: #8e8e8e;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    margin-bottom: 17px;
  }

  div {
      display: flex;
    }
`;
