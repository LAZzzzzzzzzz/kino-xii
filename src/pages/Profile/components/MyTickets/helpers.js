const REFUNDED_STATUS = 'refunded';
const REFUND_CUTOFF_HOURS = 2;
const REFUND_FAILED_MESSAGE =
  'This order could not be refunded. Please try again later.';

export const UPCOMING_FILTER = 'upcoming';
export const PAST_FILTER = 'past';

const formatDate = (date) => {
  const weekday = date.toLocaleDateString('en-GB', { weekday: 'short' });
  const month = date.toLocaleDateString('en-GB', { month: 'short' });

  return `${weekday} ${date.getDate()} ${month}`;
};

const formatTime = (date) => {
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const splitOrders = (orders) => ({
  [UPCOMING_FILTER]: orders.filter((order) => order.isUpcoming),
  [PAST_FILTER]: orders.filter((order) => !order.isUpcoming),
});

export const getFilterOptions = (groups) => [
  { value: UPCOMING_FILTER, label: 'Upcoming', count: groups.upcoming.length },
  { value: PAST_FILTER, label: 'Past', count: groups.past.length },
];

export const getSessionDateLabel = (session) => {
  const startsAt = new Date(session.startsAt);

  return `${formatDate(startsAt)} · ${formatTime(startsAt)}`;
};

export const getRefundNote = (order) => {
  if (order.status === REFUNDED_STATUS) {
    return 'This order has been refunded';
  }

  if (!order.isRefundable) {
    return `Refunds closed ${REFUND_CUTOFF_HOURS} hours before the session`;
  }

  const cutoff = new Date(order.session.startsAt);
  cutoff.setHours(cutoff.getHours() - REFUND_CUTOFF_HOURS);

  return `Refundable until ${formatTime(cutoff)}, ${formatDate(cutoff)}`;
};

export const getRefundErrorMessage = (error) => {
  if (!error) {
    return null;
  }

  return error.response?.data?.message ?? REFUND_FAILED_MESSAGE;
};

export const getEmptyMessage = (filter) => {
  if (filter === UPCOMING_FILTER) {
    return 'You have no upcoming tickets. Book a session to see it here.';
  }

  return 'You have no past tickets yet.';
};
