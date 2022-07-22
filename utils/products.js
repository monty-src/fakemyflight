const { PRICE_ID_ADULTS, PRICE_ID_CHILDREN } = process.env;

export const adultPrice = (quantity) => ({
  price: PRICE_ID_ADULTS,
  quantity,
});

export const childPrice = (quantity) => ({
  price: PRICE_ID_CHILDREN,
  quantity,
});
