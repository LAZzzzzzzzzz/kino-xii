export const getTicketTypeLabel = ({ name, priceRatio }) => {
  return `${name} ${Math.round(priceRatio * 100)}%`;
};
