import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import InputMask from 'react-input-mask';

export default function Input({ mask = '', maskChar = '', formatChars, variant = 'outlined', value = '', onChange = () => 0, onFocus, ...props }) {
  return (mask || maskChar) ? (
    <InputMask mask={mask} maskChar={maskChar} value={value} onChange={onChange} onFocus={onFocus} {...(formatChars && { formatChars })}>
      {() => <StyledTextField {...props} variant={variant} />}
    </InputMask>
  ) : (
    <StyledTextField {...props} value={value} onChange={onChange} variant={variant} />
  );
}

const StyledTextField = styled(TextField)`
 ${props => props.style}
  margin-top: 8px !important;
`;
