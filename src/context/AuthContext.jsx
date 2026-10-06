import { createContext, use } from 'react';
import { useAuthContextValue } from '@/hooks';

const defaults = {
  user: undefined,
  isAuthenticated: false,
  activeModal: null,
  openLogin: () => {},
  openRegister: () => {},
  closeModal: () => {},
  requireAuth: () => {},
  completeAuth: () => {},
  logout: () => {},
};

export const AuthContext = createContext(defaults);

export const useAuth = () => use(AuthContext);

const AuthContextProvider = ({ children }) => {
  const {
    user,
    isAuthenticated,
    activeModal,
    openLogin,
    openRegister,
    closeModal,
    requireAuth,
    completeAuth,
    logout,
  } = useAuthContextValue();

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        activeModal,
        openLogin,
        openRegister,
        closeModal,
        requireAuth,
        completeAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
