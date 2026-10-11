import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { PERSONAL_SECTION } from '@/config';
import { useAuth } from '@/context';
import { useTickets } from '@/hooks';

export const useProfile = () => {
  const { user, isAuthenticated, openLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { data: orders = [] } = useTickets(isAuthenticated);
  const hasPromptedRef = useRef(false);

  useEffect(() => {
    if (isAuthenticated || hasPromptedRef.current) {
      return;
    }

    hasPromptedRef.current = true;
    openLogin();
  }, [isAuthenticated, openLogin]);

  return {
    user: isAuthenticated ? user : undefined,
    activeSection: location.state?.section ?? PERSONAL_SECTION,
    selectSection: (section) =>
      navigate(location.pathname, { state: { section }, replace: true }),
    upcomingCount: orders.filter((order) => order.isUpcoming).length,
  };
};
