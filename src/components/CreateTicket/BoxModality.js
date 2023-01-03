import styled from 'styled-components';

export default function BoxModality({ value, checkedModality, setCheckedModality }) {
  return (
    <ModalityContainer
      checkedModality={checkedModality}
      name={value.name}
      onClick={() => {
        setCheckedModality({ ...value });
      }}
    >
      <Name>{value.name}</Name>
      {
        value.priceDiff >= 0 ?
          <Price> + R$ {value.priceDiff / 100}</Price> :
          <Price>R$ {value.price / 100}</Price>
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

const Name = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  color: #454545;
  margin-bottom: 4px;
`;

const Price = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #898989;
`;
