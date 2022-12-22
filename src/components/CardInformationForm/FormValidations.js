const validations = {
  cardNumber: {
    custom: {
      isValid: (value) => parseInt(value?.replaceAll('.', '')?.replace('-', '')?.length, 10) === 16,
      message: 'Digite um número de cartão válido',
    },
  },

  name: {
    custom: {
      isValid: (value) => isValidString(value),
      message: 'Digite um nome válido',
    },
  },

  expirationDate: {
    custom: {
      isValid: (value) => !value || !isNaN(new Date(value?.split('-').join('-'))),
      message: 'Digite uma data de validade válida',
    },
  },

  cvc: {
    custom: {
      isValid: (value) => parseInt(value?.length, 10) === 3,
      message: 'Digite um número cvc válido',
    },
  }
};

export default validations;

function isValidString(value) {
  return value || value?.trim();
}
