import { useEffect, useRef, useState } from 'react';

const TICK_MS = 1000;

const getSecondsRemaining = (expiresAt) => {
  if (!expiresAt) {
    return 0;
  }

  const target = new Date(expiresAt).getTime();

  if (Number.isNaN(target)) {
    return 0;
  }

  return Math.max(0, Math.ceil((target - Date.now()) / TICK_MS));
};

const useCountdown = (expiresAt, onExpire) => {
  const [, setTick] = useState(0);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    if (!expiresAt) {
      return;
    }

    // An expiresAt that is already in the past never reaches a tick, so the
    // callback fires straight away rather than waiting a second for nothing.
    if (getSecondsRemaining(expiresAt) === 0) {
      onExpireRef.current?.();

      return;
    }

    const interval = setInterval(() => {
      setTick((tick) => tick + 1);

      if (getSecondsRemaining(expiresAt) === 0) {
        clearInterval(interval);
        onExpireRef.current?.();
      }
    }, TICK_MS);

    return () => clearInterval(interval);
  }, [expiresAt]);

  const secondsRemaining = getSecondsRemaining(expiresAt);

  return {
    secondsRemaining,
    hasExpired: Boolean(expiresAt) && secondsRemaining === 0,
  };
};

export default useCountdown;
