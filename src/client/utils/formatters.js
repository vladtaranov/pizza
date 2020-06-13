export const formatPrice = (price) => {
  return `${price.toFixed(2)}`;
};

export const formatTime = (date) => {
  if (date < 10) {
    return `0${date}`;
  }
  return date;
};
