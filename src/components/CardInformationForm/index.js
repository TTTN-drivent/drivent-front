import styled from 'styled-components';

import FormValidation from './FormValidations';
import Input from '../Form/Input';
import Button from '../Form/Button';
import { ErrorMsg } from '../PersonalInformationForm/ErrorMsg';
import { InputWrapper } from '../PersonalInformationForm/InputWrapper';

import { useForm } from '../../hooks/useForm';
import useSavePayment from '../../hooks/api/useSavePayment';
import { toast } from 'react-toastify';

export default function CardInformationForm({ ticketId, setPaymentDone }) {
  const { savePaymentLoading, savePayment } = useSavePayment();

  const {
    handleSubmit,
    handleChange,
    data,
    errors
  } = useForm({
    validations: FormValidation,

    onSubmit: async(data) => {
      const newData = {
        ticketId: ticketId,
        cardData: {
          issuer: 'VISA',
          number: data.cardNumber,
          name: data.name,
          expirationDate: data.expirationDate,
          cvv: data.cvc
        }
      };

      try {
        await savePayment(newData);
        setPaymentDone(true);
        toast('Pagamento efetuado com sucesso!');
      } catch (err) {
        toast('Não foi possível processar o pagamento!');
      }
    },

    initialValues: {
      cardNumber: '',
      name: '',
      expirationDate: '',
      cvc: ''
    }
  });

  return (
    <PaymentForms>
      <Card></Card>
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <InputWrapper>
            <Input
              label="Card Number"
              name="cardNumber"
              type="text"
              size='small'
              value={data?.cardNumber || ''}
              mask='9999.9999.9999.9999'
              onChange={handleChange('cardNumber')}
            />
            {errors.cardNumber && <ErrorMsg>{errors.cardNumber}</ErrorMsg>}
          </InputWrapper>
          <p>E.g.: 49..., 51..., 36..., 37...</p>
          <InputWrapper>
            <Input
              label="Name"
              name="name"
              type="text"
              size='small'
              value={data?.name || ''}
              onChange={handleChange('name')}

            />
            {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
          </InputWrapper>
          <BottomFormWrapper>
            <InputWrapper>
              <Input
                label="Valid Thru"
                name="expirationDate"
                type="text"
                size='small'
                format="MM-yy"
                maxLength="4"
                value={data?.expirationDate || ''}
                onChange={handleChange('expirationDate')}
              />
              {errors.expirationDate && <ErrorMsg>{errors.expirationDate}</ErrorMsg>}
            </InputWrapper>
            <InputWrapper>
              <Input
                label="CVC"
                name="cvc"
                type="text"
                size='small'
                maxLength="3"
                value={data?.cvc || ''}
                onChange={handleChange('cvc')}
              />
              {errors.cvc && <ErrorMsg>{errors.cvc}</ErrorMsg>}
            </InputWrapper>
          </BottomFormWrapper>
        </FormContainer>
        <Button type="submit" disabled={savePaymentLoading}>FINALIZAR PAGAMENTO</Button>
      </form>
    </PaymentForms>
  );
}

const PaymentForms = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 40px!important;
`;

const Card = styled.div`
    min-width: 290px;
    height: 180px;
    background-color: #8E8E8E;
    border-radius: 20px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 180px;
  width: 350px;

  p {
    color: #898989;
    font-size: 14px;
    margin-top: 3px;
    margin-bottom: 1px;
  }
`;

const BottomFormWrapper = styled.div`
  display: flex;
  gap: 20px;
  > * {
      &:first-child {
         width: 65%;
      }
      &:last-child {
         width: 35%;
      }
    }
`;
