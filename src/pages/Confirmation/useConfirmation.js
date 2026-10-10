import { useLocation, useNavigate, useParams } from 'react-router';
import { TICKETS_SECTION } from '@/config';
import { useTickets } from '@/hooks';

export const useConfirmation = () => {
  const { reference } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const paidOrder = location.state?.order;

  // There is no GET /orders/{order} in this API, so a cold load of the URL
  // falls back to the tickets list and finds the reference there.
  const {
    data: orders,
    isPending,
    isError,
  } = useTickets(!paidOrder && Boolean(reference));

  const order =
    paidOrder ??
    (orders ?? []).find((candidate) => candidate.reference === reference);

  return {
    order,
    isPending: !paidOrder && isPending,
    isError: !paidOrder && (isError || (Boolean(orders) && !order)),
    goToTickets: () =>
      navigate('/profile', { state: { section: TICKETS_SECTION } }),
    close: () => navigate('/'),
  };
};
