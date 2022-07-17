export const transformToUSMoney = (n1) => {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(n1);
};

export default ({ amount }) => ({
  amount: transformToUSMoney(amount),
});
