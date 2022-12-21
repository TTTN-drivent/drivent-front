import styled from 'styled-components';

export default function BoxModality({ value, checkedModality, setCheckedModality, isHotelMode = false }) {
  return (
    <ModalityContainer
      checkedModality={checkedModality}
      name={value.name}
      onClick={() => {
        setCheckedModality({ ...value });
      }}
      className="modality"
    >
      <p className="modality-name">{value.name}</p>
      {
        isHotelMode ?
          <p className="modality-price"> + R$ {value.priceDiff / 100}</p> :
          <p className="modality-price">R$ {value.price / 100}</p>
      }
    </ModalityContainer>
  );
};

const ModalityContainer = styled.div`
  width: 145px;
  height: 145px;
  margin-right: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${({ checkedModality, name }) => (checkedModality.name === name ? '#FFEED2' : '#FFFFFF')};

  border: 1px solid #cecece;
  border-radius: 20px;
`;
