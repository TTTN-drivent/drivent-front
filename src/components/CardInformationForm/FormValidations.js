const validations = {
  number: {
    custom: {
      isValid: (value) => parseInt(value.replaceAll(' ', '')?.length, 10) === 16,
      message: 'Número de cartão inválido',
    },
  },

  name: {
    custom: {
      isValid: (value) => isValidString(value),
      message: 'Digite um nome válido',
    },
  },

  expiry: {
    custom: {
      isValid: (value) => expiryValidation(value),
      message: 'Digite uma data válida',
    },
  },

  cvc: {
    custom: {
      isValid: (value) => parseInt(value?.length, 10) === 3,
      message: 'CVC  inválido',
    },
  }
};

export default validations;

function isValidString(value) {
  return value || value?.trim();
}

function expiryValidation(value) {
  const numbers = value?.replace('/', '');
  if(numbers?.length === 4) {
    const month = Math.floor(parseInt(numbers, 10) / 100);
    if(month >=1 && month <= 12) {
      return parseInt(numbers, 10) % 100 > 22;
    }
    return false;
  }
  return false;
}
