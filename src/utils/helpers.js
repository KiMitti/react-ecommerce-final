export const formatPrice = (price) => {
  const formattedPrice = Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  }).format(price / 100);
  return formattedPrice;
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  if (type === 'colors') {
    unique = unique.flat();
  }
  return ['all', ...new Set(unique)];
};
