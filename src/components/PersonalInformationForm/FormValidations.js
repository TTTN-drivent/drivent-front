import { isValidCPF, isValidCEP, isValidLandlinePhone, isValidMobilePhone, isValidPhone } from '@brazilian-utils/brazilian-utils';

const validations = {
  name: {
    custom: {
      isValid: (value) => isValidString(value),
      message: 'Digite um nome válido',
    },
  },

  cpf: {
    custom: {
      isValid: (value) => isValidCPF(value?.replace('-', '')),
      message: 'Digite um CPF válido',
    },
  },

  phone: {
    custom: {
      isValid: (value) => isValidPhones(value),
      message: 'Digite um telefone válido',
    },
  },

  cep: {
    custom: {
      isValid: (value) => isValidCEP(value?.replaceAll('.', '')?.replace('-', '')),
      message: 'Digite um CEP válido',
    },
  },

  city: {
    custom: {
      isValid: (value) => isValidString(value),
      message: 'Digite uma cidade',
    },
  },

  neighborhood: {
    custom: {
      isValid: (value) => isValidString(value),
      message: 'Digite um bairro',
    },
  },

  street: {
    custom: {
      isValid: (value) => isValidString(value),
      message: 'Digite uma rua',
    },
  },

  state: {
    custom: {
      isValid: (value) => isValidString(value),
      message: 'Selecione um estado',
    },
  },

  birthday: {
    custom: {
      isValid: (value) => value || !isNaN(new Date(value?.split('-').join('-'))),
      message: 'Selecione uma data de aniversário',
    },
  },

  number: {
    custom: {
      isValid: (value) => Number(value),
      message: 'Digite um número válido',
    },
  },
};

export default validations;

function isValidString(value) {
  return value || value?.trim();
}

function isValidPhones(value) {
  const phone = value?.replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '').replaceAll('-', '');
  return isValidPhone(phone) || isValidMobilePhone(phone) || isValidLandlinePhone(phone);
}
