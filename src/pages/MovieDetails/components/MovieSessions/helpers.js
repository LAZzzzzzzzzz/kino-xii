const DAYS_IN_PICKER = 7;
const SOLD_OUT_REASON = 'This session is sold out.';

const toIsoDate = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${date.getFullYear()}-${month}-${day}`;
};

export const getDateOptions = (availableDates = []) => {
  const today = new Date();

  return Array.from({ length: DAYS_IN_PICKER }, (_, offset) => {
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + offset
    );

    return {
      value: toIsoDate(date),
      weekday: date.toLocaleDateString('en-GB', { weekday: 'short' }),
      day: date.getDate(),
      label: date.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }),
      isAvailable: availableDates.includes(toIsoDate(date)),
    };
  });
};

export const getInitialDate = (dateOptions) => {
  const firstAvailable = dateOptions.find((option) => option.isAvailable);

  return firstAvailable?.value ?? dateOptions[0].value;
};

export const countSessions = (venues) => {
  return venues.reduce((total, group) => total + group.sessions.length, 0);
};

export const getSessionsSummary = ({
  isComingSoon,
  isPending,
  sessionCount,
  selectedLabel,
}) => {
  if (isComingSoon) {
    return 'This film is not yet showing. Tickets go on sale closer to release.';
  }

  if (isPending) {
    return `Loading sessions for ${selectedLabel}`;
  }

  const unit = sessionCount === 1 ? 'session' : 'sessions';

  return `${sessionCount} ${unit} on ${selectedLabel}`;
};

export const groupSessionsByHall = (sessions) => {
  const halls = new Map();

  sessions.forEach((session) => {
    const group = halls.get(session.hall.id);

    if (group) {
      group.sessions.push(session);

      return;
    }

    halls.set(session.hall.id, { hall: session.hall, sessions: [session] });
  });

  return [...halls.values()];
};

export const getSessionItems = (sessions, restrictionNotice) => {
  return sessions.map((session) => {
    const disabledReason =
      restrictionNotice ?? (session.isSoldOut ? SOLD_OUT_REASON : null);

    return {
      session,
      disabledReason,
      isDisabled: Boolean(disabledReason),
    };
  });
};

export const getSessionTicketProps = ({ isDisabled, disabledReason }) => {
  if (isDisabled) {
    return { 'aria-disabled': true, title: disabledReason };
  }

  return {};
};
