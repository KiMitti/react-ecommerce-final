export const formatPrice = (price) => {
  const formattedPrice = Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  }).format(price / 100);
  return formattedPrice;
};

export const getUniqueValues = () => {};
