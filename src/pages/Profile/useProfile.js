import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { PERSONAL_SECTION } from '@/config';
import { useAuth } from '@/context';
import { useTickets } from '@/hooks';

export const useProfile = () => {
  const { user, isAuthenticated, openLogin } = useAuth();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(
    () => location.state?.section ?? PERSONAL_SECTION
  );
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
    activeSection,
    selectSection: setActiveSection,
    upcomingCount: orders.filter((order) => order.isUpcoming).length,
  };
};
