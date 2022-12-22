import styled from 'styled-components';
import FormValidation from './FormValidations';
import Input from '../Form/Input';
import Button from '../Form/Button';
import { ErrorMsg } from '../PersonalInformationForm/ErrorMsg';
import { InputWrapper } from '../PersonalInformationForm/InputWrapper';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

import { useForm } from '../../hooks/useForm';
import useSavePayment from '../../hooks/api/useSavePayment';
import { toast } from 'react-toastify';

export default function CardInformationForm({ ticketId, setPaymentDone }) {
  const { savePaymentLoading, savePayment } = useSavePayment();

  const {
    handleSubmit,
    handleChange,
    handleFocus,
    handleBlur,
    handleCallback,
    focused,
    data,
    errors
  } = useForm({
    validations: FormValidation,

    onSubmit: async(data) => {
      const newData = {
        ticketId: ticketId,
        cardData: {
          issuer: data.issuer,
          number: data.number.replaceAll(' ', ''),
          name: data.name,
          expirationDate: data.expiry,
          cvv: data.cvc
        }
      };

      try {
        if(!data.issuer) {
          toast('Cartão inválido!');
          return;
        }
        await savePayment(newData);
        setPaymentDone(true);
        toast('Pagamento efetuado com sucesso!');
      } catch (err) {
        toast('Não foi possível processar o pagamento!');
      }
    },

    initialValues: {
      number: '',
      name: '',
      expiry: '',
      cvc: '',
      issuer: ''
    }
  });

  return (
    <PaymentForms>
      <form onSubmit={handleSubmit} onBlur={handleBlur()}>
        <InnerContainer>          
          <Cards
            number={data?.number.replaceAll(' ', '')}
            name={data?.name}
            expiry={data?.expiry}
            cvc={data?.cvc}
            focused={focused}
            callback={handleCallback}
          />
          <FormContainer>
            <InputWrapper>
              <Input
                label="Card Number"
                name="number"
                type="text"
                size='small'
                maxLength="19"
                mask='9999 9999 9999 9999'
                required
                value={data?.number || ''}
                onChange={handleChange('number')}
                onFocus={handleFocus()}
              />
              {errors.number && <ErrorMsg>{errors.number}</ErrorMsg>}
            </InputWrapper>
            <p>E.g.: 49..., 51..., 36..., 37...</p>
            <InputWrapper>
              <Input
                label="Name"
                name="name"
                type="text"
                size='small'
                required
                value={data?.name || ''}
                onChange={handleChange('name')}
                onFocus={handleFocus()}
              />
              {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
            </InputWrapper>
            <BottomFormWrapper>
              <InputWrapper>
                <Input
                  label="Valid Thru"
                  name="expiry"
                  type="text"
                  size='small'
                  mask="99/99"
                  maxLength='5'
                  required
                  value={data?.expiry || ''}
                  onChange={handleChange('expiry')}
                  onFocus={handleFocus()}
                />
                {errors.expiry && <ErrorMsg>{errors.expiry}</ErrorMsg>}
              </InputWrapper>
              <InputWrapper>
                <Input
                  label="CVC"
                  name="cvc"
                  type="text"
                  size='small'
                  mask='999'
                  maxLength="3"
                  required
                  value={data?.cvc || ''}
                  onChange={handleChange('cvc')}
                  onFocus={handleFocus()}
                />
                {errors.cvc && <ErrorMsg>{errors.cvc}</ErrorMsg>}
              </InputWrapper>
            </BottomFormWrapper>
          </FormContainer>
        </InnerContainer>
        <Button type="submit" disabled={savePaymentLoading}>FINALIZAR PAGAMENTO</Button>
      </form>
    </PaymentForms>
  );
}

const PaymentForms = styled.div`
  display: flex;
  `;

const InnerContainer = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 40px!important;
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
