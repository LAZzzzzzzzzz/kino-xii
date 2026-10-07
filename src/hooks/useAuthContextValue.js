import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { CURRENT_USER_QUERY_KEY, LOGIN_MODAL, REGISTER_MODAL } from '@/config';
import { getToken, removeToken, setToken } from '@/helpers';
import {
  getCurrentUserRequest,
  logoutRequest,
  setUnauthorizedHandler,
} from '@/services';

const useAuthContextValue = () => {
  const [token, setTokenState] = useState(getToken);
  const [activeModal, setActiveModal] = useState(null);
  const queryClient = useQueryClient();
  const pendingActionRef = useRef(null);

  const { data: user, isError } = useQuery({
    queryKey: [CURRENT_USER_QUERY_KEY],
    queryFn: async () => (await getCurrentUserRequest()).data.data,
    enabled: Boolean(token),
    retry: false,
  });

  const isAuthenticated = Boolean(token) && !isError;

  useEffect(() => {
    setUnauthorizedHandler(() => {
      setTokenState(null);
      queryClient.removeQueries({ queryKey: [CURRENT_USER_QUERY_KEY] });
      setActiveModal(LOGIN_MODAL);
    });
  }, [queryClient]);

  const clearSession = () => {
    removeToken();
    setTokenState(null);
    queryClient.removeQueries({ queryKey: [CURRENT_USER_QUERY_KEY] });
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } finally {
      clearSession();
    }
  };

  const openLogin = () => setActiveModal(LOGIN_MODAL);

  const openRegister = () => setActiveModal(REGISTER_MODAL);

  const closeModal = () => {
    pendingActionRef.current = null;
    setActiveModal(null);
  };

  const requireAuth = (action) => {
    if (isAuthenticated) {
      action();

      return;
    }

    pendingActionRef.current = action;
    setActiveModal(LOGIN_MODAL);
  };

  const completeAuth = ({ token: nextToken, user: nextUser }) => {
    setToken(nextToken);
    setTokenState(nextToken);
    queryClient.setQueryData([CURRENT_USER_QUERY_KEY], nextUser);
    setActiveModal(null);

    const pendingAction = pendingActionRef.current;
    pendingActionRef.current = null;
    pendingAction?.();
  };

  return {
    user,
    isAuthenticated,
    activeModal,
    openLogin,
    openRegister,
    closeModal,
    requireAuth,
    completeAuth,
    logout,
  };
};

export default useAuthContextValue;
