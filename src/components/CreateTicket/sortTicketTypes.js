export function sortFirstTicketTypes(array) {
  array?.sort((a, b) => b.price - a.price);
  let firstModalities = array?.slice(-2);
  return firstModalities?.map((value) =>
    !value.isRemote ?
      { ...value, name: 'Presencial' } :
      { ...value, name: 'Online' }
  );
}

export function sortHotelsTicketTypes(array) {
  array?.sort((a, b) => a.price - b.price);
  let hotelsTicketType = array?.map((value, i, array) => {
    return {
      ...value,
      priceDiff: value.price - array[1].price
    };
  });
  return hotelsTicketType?.slice(-2);
}
