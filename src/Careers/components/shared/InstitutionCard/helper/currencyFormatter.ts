export const currencyFormatter = (currency: number) => {
  const formattedCurrency = Intl.NumberFormat('en', { notation: 'compact' }).format(currency);

  return formattedCurrency;
};
