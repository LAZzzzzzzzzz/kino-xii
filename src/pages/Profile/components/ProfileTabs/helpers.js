import { PERSONAL_SECTION, TICKETS_SECTION } from '@/config';

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
