export const getSessionDateLabel = (session) => {
  const startsAt = new Date(session.startsAt);
  const weekday = startsAt.toLocaleDateString('en-GB', { weekday: 'short' });
  const month = startsAt.toLocaleDateString('en-GB', { month: 'short' });
  const time = startsAt.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${weekday} ${startsAt.getDate()} ${month} · ${time}`;
};

export const getOrderFields = (order) => [
  { label: 'Date', value: getSessionDateLabel(order.session) },
  {
    label: 'Venue',
    value: `${order.session.venue.name} · Hall ${order.session.hall.name}`,
  },
  {
    label: 'Format',
    value: `${order.session.format.name} · ${order.session.language.name}`,
  },
  { label: 'Paid', value: `₾ ${order.totalPrice}` },
];
