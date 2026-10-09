import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/context';
import { useTickets } from '@/hooks';
import { PERSONAL_SECTION } from './components';

export const useProfile = () => {
  const { user, isAuthenticated, openLogin } = useAuth();
  const [activeSection, setActiveSection] = useState(PERSONAL_SECTION);
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
