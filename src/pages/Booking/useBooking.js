import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  HOLD_QUERY_KEY,
  SEAT_MAP_QUERY_KEY,
  SESSION_QUERY_KEY,
} from '@/config';
import { useAuth } from '@/context';
import {
  getHoldId,
  getRestrictionNotice,
  removeHoldId,
  setHoldId,
} from '@/helpers';
import { useCountdown } from '@/hooks';
import {
  getHoldRequest,
  getSeatMapRequest,
  getSessionRequest,
  holdSeatsRequest,
  releaseHoldRequest,
} from '@/services';
import {
  CHECKOUT_STEP,
  EXPIRY_MESSAGE,
  FORBIDDEN_MESSAGE,
  getHoldError,
  getHoldSelection,
  getKeptSeats,
  getSessionSummary,
  toHoldPayload,
} from './helpers';

const SIGN_IN_NOTICE = 'Please log in to book seats for this session.';

export const useBooking = (step) => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, openLogin, requireAuth } = useAuth();
  const hasPromptedRef = useRef(false);
  const [holdId, setHoldIdState] = useState(() => getHoldId(sessionId));
  const [submittedSeats, setSubmittedSeats] = useState(null);
  const [recovery, setRecovery] = useState(null);
  const [seededSeats, setSeededSeats] = useState(null);
  const [seedId, setSeedId] = useState(0);
  const endedHoldIdRef = useRef(null);
  const paidHoldIdRef = useRef(null);
  const hasClosedRef = useRef(false);

  const [sessionQuery, seatMapQuery, holdQuery] = useQueries({
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
      {
        queryKey: [HOLD_QUERY_KEY, { holdId }],
        queryFn: () => getHoldRequest(holdId),
        select: (response) => response.data.data,
        enabled: Boolean(holdId),
        retry: false,
      },
    ],
  });

  const session = sessionQuery.data;
  const hold = holdQuery.data;
  const isLive = Boolean(hold?.isLive);
  const heldSelection =
    submittedSeats ?? getHoldSelection(hold?.seats, seatMapQuery.data);

  const invalidateSeatMap = () => {
    queryClient.invalidateQueries({
      queryKey: [SEAT_MAP_QUERY_KEY, { sessionId }],
    });
  };

  const dropHold = () => {
    removeHoldId(sessionId);
    setHoldIdState(null);
    setSubmittedSeats(null);
  };

  const reseed = (seats) => {
    setSeededSeats(seats);
    setSeedId((current) => current + 1);
  };

  // Guarded by hold id so the client countdown and a server `isLive: false`
  // cannot both run it for the same hold. The guard only applies when there is
  // a hold — a 409 from step 1's own POST ends nothing that was ever held.
  const endHold = (kind, message, seats) => {
    // A paid hold is consumed: nothing may end it afterwards, so a slow POST
    // that lands just after the countdown hits zero cannot put the expiry
    // banner over a completed order.
    if (paidHoldIdRef.current === holdId) {
      return;
    }

    if (holdId && endedHoldIdRef.current === holdId) {
      return;
    }

    endedHoldIdRef.current = holdId;
    reseed(seats);
    dropHold();
    invalidateSeatMap();
    setRecovery({ kind, message });
    navigate(`/sessions/${sessionId}/seats`);
  };

  const onExpire = () => endHold('expired', EXPIRY_MESSAGE, []);

  // `seats` defaults to what the live hold represents, which is what step 2
  // has. A 409 raised by step 1's own POST passes the submitted seats instead,
  // because nothing was ever held and heldSelection would be empty.
  const onContested = (contested, seats = heldSelection) =>
    endHold(
      'contested',
      getHoldError({ response: { data: { contested } } }).message,
      getKeptSeats(seats, contested)
    );

  // 403 on the order: the hold belongs to another account. Drop it and go back,
  // but not with the expiry wording — nothing of the user's ran out.
  const onForbidden = () => endHold('hold-failed', FORBIDDEN_MESSAGE, []);

  // Paid: the hold is consumed, so the stored id is cleared with no release
  // call, and the ending guard above refuses every later ending for it.
  const onPaid = () => {
    paidHoldIdRef.current = holdId;
    removeHoldId(sessionId);
  };

  const { secondsRemaining } = useCountdown(
    isLive ? hold.expiresAt : null,
    onExpire
  );

  useEffect(() => {
    if (isAuthenticated || hasPromptedRef.current) {
      return;
    }

    hasPromptedRef.current = true;
    openLogin();
  }, [isAuthenticated, openLogin]);

  // A 404 or 403 is another account's hold or no hold at all: drop the stored
  // id silently, with no notice and no recovery.
  useEffect(() => {
    if (!holdQuery.isError) {
      return;
    }

    removeHoldId(sessionId);
  }, [holdQuery.isError, sessionId]);

  // A 200 with isLive: false is the documented "ran out" — the same ending as
  // the countdown reaching zero, through the same guarded handler.
  const onExpireRef = useRef(onExpire);
  const hasLapsed = hold?.isLive === false;

  useEffect(() => {
    onExpireRef.current = onExpire;
  });

  useEffect(() => {
    if (!hasLapsed) {
      return;
    }

    onExpireRef.current();
  }, [hasLapsed]);

  const { mutate: holdSeats, isPending: isHolding } = useMutation({
    mutationFn: (selectedSeats) =>
      holdSeatsRequest(sessionId, toHoldPayload(selectedSeats)),
    onSuccess: ({ data }, selectedSeats) => {
      const nextHoldId = data.data.holdId;

      // The user closed the modal while the POST was in flight: release the
      // hold that just landed instead of stranding it for the full window.
      if (hasClosedRef.current) {
        releaseHoldRequest(nextHoldId).catch(() => {});

        return;
      }

      setHoldId(sessionId, nextHoldId);
      setHoldIdState(nextHoldId);
      setSubmittedSeats(selectedSeats);
      setRecovery(null);
      endedHoldIdRef.current = null;
      navigate(`/sessions/${sessionId}/checkout`);
    },
    onError: (error, selectedSeats) => {
      const { contested, message, seatErrors } = getHoldError(
        error,
        selectedSeats
      );

      if (contested.length) {
        onContested(contested, selectedSeats);

        return;
      }

      setRecovery({ kind: 'hold-failed', message, seatErrors });
    },
  });

  const restrictionNotice = session
    ? getRestrictionNotice(session.movie, isAuthenticated ? user : null)
    : null;

  return {
    session,
    summary: session ? getSessionSummary(session) : '',
    isPending: sessionQuery.isPending,
    isError: sessionQuery.isError,
    gateNotice: isAuthenticated ? restrictionNotice : SIGN_IN_NOTICE,
    hold: isLive ? hold : undefined,
    holdId,
    heldSelection,
    secondsRemaining,
    isHolding,
    expiryNotice: recovery?.kind === 'expired' ? recovery.message : null,
    stepNotice:
      recovery?.kind === 'expired' ? null : (recovery?.message ?? null),
    seatErrors: recovery?.seatErrors ?? {},
    seedId,
    seededSeats,
    onExpire,
    onForbidden,
    onPaid,
    onContested,
    // A disabled query still reports isPending, so the no-hold case is checked
    // separately rather than waiting for a fetch that will never run.
    isCheckoutUnreachable:
      step === CHECKOUT_STEP && !isLive && (!holdId || !holdQuery.isPending),
    // Built from the route param, not session.id — the guard can fire before
    // the session query resolves.
    seatStepPath: `/sessions/${sessionId}/seats`,
    holdSeats: (selectedSeats) => requireAuth(() => holdSeats(selectedSeats)),
    closeBooking: () => {
      hasClosedRef.current = true;

      if (holdId) {
        releaseHoldRequest(holdId).catch(() => {});
        removeHoldId(sessionId);
      }

      navigate(session ? `/movies/${session.movie.slug}` : '/sessions');
    },
  };
};
