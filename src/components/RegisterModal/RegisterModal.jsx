import { EMAIL_RULES, PASSWORD_RULES, USERNAME_RULES } from '@/config';
import Button from '../Button';
import Input from '../Input';
import { Modal, ModalHeader } from '../Modal';
import AvatarUpload from './AvatarUpload';
import { AVATAR_ACCEPT, AVATAR_RULES, CONFIRM_PASSWORD_RULES } from './helpers';
import useRegisterModal from './useRegisterModal';

const RegisterModal = () => {
  const {
    register,
    errors,
    validFields,
    avatarError,
    previewUrl,
    isSubmittable,
    isPending,
    onSubmit,
    closeModal,
    openLogin,
  } = useRegisterModal();

  return (
    <Modal onClose={closeModal} className="w-118.75">
      <ModalHeader
        title="Sign up"
        description="Welcome to Kino XII"
        onClose={closeModal}
      />

      <form onSubmit={onSubmit} className="flex w-full flex-col gap-8">
        <AvatarUpload
          previewUrl={previewUrl}
          error={avatarError}
          accept={AVATAR_ACCEPT}
          {...register('avatar', AVATAR_RULES)}
        />

        <div className="flex flex-col gap-6">
          <Input
            label="Username"
            autoComplete="username"
            placeholder="User"
            error={errors.username?.message}
            isValid={validFields.username}
            {...register('username', USERNAME_RULES)}
          />

          <Input
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="example@gmail.com"
            error={errors.email?.message}
            isValid={validFields.email}
            {...register('email', EMAIL_RULES)}
          />

          <div className="flex gap-3">
            <Input
              label="Password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              error={errors.password?.message}
              isValid={validFields.password}
              {...register('password', PASSWORD_RULES)}
            />

            <Input
              label="Confirm password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              error={errors.password_confirmation?.message}
              isValid={validFields.password_confirmation}
              {...register('password_confirmation', CONFIRM_PASSWORD_RULES)}
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <Button type="submit" disabled={!isSubmittable} className="w-full">
            {isPending ? 'Signing up' : 'Sign up'}
          </Button>

          <p className="flex items-center gap-1.25 text-sm">
            <span className="leading-body text-secondary">
              Already have an account?
            </span>
            <button
              type="button"
              onClick={openLogin}
              className="cursor-pointer font-extrabold text-red transition-opacity duration-150 ease-out hover:opacity-80"
            >
              Log in
            </button>
          </p>
        </div>
      </form>
    </Modal>
  );
};

export default RegisterModal;
