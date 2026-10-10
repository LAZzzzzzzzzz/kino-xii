import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';
import { SEAT_MAP_QUERY_KEY, SESSION_QUERY_KEY } from '@/config';
import { useFilterOptions } from '@/hooks';
import { getSeatMapRequest, getSessionRequest } from '@/services';
import {
  getHeldSeats,
  getRetypedSeats,
  getSubtotal,
  getTicketPrices,
  getTicketTypes,
  getToggledSeats,
  MAX_SEATS_REASON,
} from './helpers';

const DEFAULT_MAX_SEATS = 3;

export const useSeatStep = ({ seededSeats }) => {
  const { sessionId } = useParams();
  const { data: options } = useFilterOptions();
  const [selection, setSelection] = useState(seededSeats ?? null);
  const [capNotice, setCapNotice] = useState(null);

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

  return {
    sections: seatMap?.sections ?? [],
    maxSeats,
    ticketTypes,
    prices,
    selectedSeats,
    selectedIds: selectedSeats.map(({ seatId }) => seatId),
    subtotal: getSubtotal(selectedSeats, prices),
    isPending: seatMapQuery.isPending,
    isError: seatMapQuery.isError,
    capNotice,
    toggleSeat: (seat, section) => {
      const { seats, reason } = getToggledSeats({
        selectedSeats,
        seat,
        section,
        maxSeats,
      });

      setCapNotice(
        reason === MAX_SEATS_REASON
          ? `You can select up to ${maxSeats} seats per order.`
          : null
      );
      setSelection(seats);
    },
    selectTicketType: (seatId, ticketType) => {
      setCapNotice(null);
      setSelection(getRetypedSeats(selectedSeats, seatId, ticketType));
    },
    removeSeat: (seatId) => {
      setCapNotice(null);
      setSelection(selectedSeats.filter((seat) => seat.seatId !== seatId));
    },
  };
};
