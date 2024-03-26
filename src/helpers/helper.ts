const formatNumberToLocale = (number: number) =>
  new Intl.NumberFormat(undefined, {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);

export { formatNumberToLocale };
