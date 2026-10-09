export const PERSONAL_SECTION = 'personal-information';
export const TICKETS_SECTION = 'my-tickets';

export const PROFILE_SECTIONS = [
  {
    value: PERSONAL_SECTION,
    label: 'Personal Information',
    hasProfileAlert: true,
    hasTicketCount: false,
  },
  {
    value: TICKETS_SECTION,
    label: 'My Tickets',
    hasProfileAlert: false,
    hasTicketCount: true,
  },
];
