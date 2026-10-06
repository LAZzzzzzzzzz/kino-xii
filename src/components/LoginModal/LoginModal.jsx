import { EMAIL_RULES, PASSWORD_RULES } from '@/config';
import Button from '../Button';
import Input from '../Input';
import { Modal, ModalHeader } from '../Modal';
import useLoginModal from './useLoginModal';

const LoginModal = () => {
  const {
    register,
    errors,
    validFields,
    isSubmittable,
    isPending,
    onSubmit,
    closeModal,
    openRegister,
  } = useLoginModal();

  return (
    <Modal onClose={closeModal}>
      <ModalHeader
        title="Log in"
        description="Welcome back to Kino XII"
        onClose={closeModal}
      />

      <form onSubmit={onSubmit} className="flex w-84.75 flex-col gap-8">
        <div className="flex flex-col gap-6">
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="example@gmail.com"
            error={errors.email?.message}
            isValid={validFields.email}
            {...register('email', EMAIL_RULES)}
          />

          <Input
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            error={errors.password?.message}
            isValid={validFields.password}
            {...register('password', PASSWORD_RULES)}
          />
        </div>

        <div className="flex flex-col items-center gap-6">
          <Button type="submit" disabled={!isSubmittable} className="w-full">
            {isPending ? 'Logging in' : 'Log in'}
          </Button>

          <p className="flex items-center gap-1.25 text-sm">
            <span className="leading-body text-secondary">
              Don't have an account?
            </span>
            <button
              type="button"
              onClick={openRegister}
              className="cursor-pointer font-extrabold text-red transition-opacity duration-150 ease-out hover:opacity-80"
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </Modal>
  );
};

export default LoginModal;
