import { useMutation, useQueries } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { SEAT_MAP_QUERY_KEY, SESSION_QUERY_KEY } from '@/config';
import { useAuth } from '@/context';
import { useFilterOptions } from '@/hooks';
import {
  getSeatMapRequest,
  getSessionRequest,
  holdSeatsRequest,
} from '@/services';
import {
  getHeldSeats,
  getHoldError,
  getKeptSeats,
  getRetypedSeats,
  getSessionSummary,
  getSubtotal,
  getTicketPrices,
  getTicketTypes,
  getToggledSeats,
  toHoldPayload,
} from './helpers';

const DEFAULT_MAX_SEATS = 3;

export const useSeats = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { requireAuth } = useAuth();
  const { data: options } = useFilterOptions();
  const [selection, setSelection] = useState(null);
  const [holdError, setHoldError] = useState(null);

  const [sessionQuery, seatMapQuery] = useQueries({
    queries: [
      {
        queryKey: [SESSION_QUERY_KEY, { sessionId }],
        queryFn: () => getSessionRequest(sessionId),
        select: (response) => response.data.data,
      },
      {
        queryKey: [SEAT_MAP_QUERY_KEY, { sessionId }],
        queryFn: () => getSeatMapRequest(sessionId),
        select: (response) => response.data.data,
      },
    ],
  });

  const session = sessionQuery.data;
  const seatMap = seatMapQuery.data;
  const maxSeats = options?.maxSeatsPerOrder ?? DEFAULT_MAX_SEATS;
  const ticketTypes = getTicketTypes(
    options?.ticketTypes ?? [],
    session?.movie.ageRating.minAge ?? 0
  );
  const prices = getTicketPrices(session?.price ?? 0, ticketTypes);
  const selectedSeats = selection ?? getHeldSeats(seatMap);

  const { mutate: holdSeats, isPending: isHolding } = useMutation({
    mutationFn: () => holdSeatsRequest(sessionId, toHoldPayload(selectedSeats)),
    onSuccess: ({ data }) =>
      navigate(`/sessions/${sessionId}/checkout`, {
        state: { holdId: data.data.holdId },
      }),
    onError: (error) => {
      const { contested, message } = getHoldError(error);

      setHoldError(message);

      if (contested.length) {
        setSelection(getKeptSeats(selectedSeats, contested));
        seatMapQuery.refetch();
      }
    },
  });

  const changeSelection = (seats) => {
    setHoldError(null);
    setSelection(seats);
  };

  return {
    session,
    sections: seatMap?.sections ?? [],
    summary: session ? getSessionSummary(session) : '',
    maxSeats,
    ticketTypes,
    prices,
    selectedSeats,
    selectedIds: selectedSeats.map(({ seatId }) => seatId),
    subtotal: getSubtotal(selectedSeats, prices),
    holdError,
    isHolding,
    isPending: sessionQuery.isPending || seatMapQuery.isPending,
    isError: sessionQuery.isError || seatMapQuery.isError,
    toggleSeat: (seat) =>
      changeSelection(getToggledSeats({ selectedSeats, seat, maxSeats })),
    selectTicketType: (seatId, ticketType) =>
      changeSelection(getRetypedSeats(selectedSeats, seatId, ticketType)),
    removeSeat: (seatId) =>
      changeSelection(selectedSeats.filter((seat) => seat.seatId !== seatId)),
    holdSelection: () => requireAuth(holdSeats),
  };
};
