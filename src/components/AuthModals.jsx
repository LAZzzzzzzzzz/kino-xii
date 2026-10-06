import { LOGIN_MODAL, REGISTER_MODAL } from '@/config';
import { useAuth } from '@/context';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const AUTH_MODALS = {
  [LOGIN_MODAL]: LoginModal,
  [REGISTER_MODAL]: RegisterModal,
};

const AuthModals = () => {
  const { activeModal } = useAuth();

  const ActiveModal = AUTH_MODALS[activeModal];

  return ActiveModal ? <ActiveModal /> : null;
};

export default AuthModals;
