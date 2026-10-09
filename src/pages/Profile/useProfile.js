import { useEffect, useRef } from 'react';
import { useAuth } from '@/context';

export const useProfile = () => {
  const { user, isAuthenticated, openLogin } = useAuth();
  const hasPromptedRef = useRef(false);

  useEffect(() => {
    if (isAuthenticated || hasPromptedRef.current) {
      return;
    }

    hasPromptedRef.current = true;
    openLogin();
  }, [isAuthenticated, openLogin]);

  return { user: isAuthenticated ? user : undefined };
};
