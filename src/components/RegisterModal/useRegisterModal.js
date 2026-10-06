import { useMutation } from '@tanstack/react-query';
import { useForm, useWatch } from 'react-hook-form';
import { EMAIL_RULES, PASSWORD_RULES, USERNAME_RULES } from '@/config';
import { useAuth } from '@/context';
import { applyApiErrors, isValueValid } from '@/helpers';
import { useObjectUrl } from '@/hooks';
import { registerRequest } from '@/services';
import { getAvatarError } from './helpers';

const useRegisterModal = () => {
  const { completeAuth, closeModal, openLogin } = useAuth();

  const { register, handleSubmit, setError, control, formState } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      avatar: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: registerRequest,
    onSuccess: ({ data }) => completeAuth(data.data),
    onError: (error) => applyApiErrors(error, setError),
  });

  const values = useWatch({ control });
  const {
    username,
    email,
    password,
    password_confirmation: confirmation,
  } = values;

  const avatarFile = values.avatar?.[0];
  const avatarError = getAvatarError(avatarFile);
  const previewUrl = useObjectUrl(avatarError ? null : avatarFile);

  return {
    register,
    errors: formState.errors,
    validFields: {
      username: isValueValid(username, USERNAME_RULES),
      email: isValueValid(email, EMAIL_RULES),
      password: isValueValid(password, PASSWORD_RULES),
      password_confirmation: Boolean(confirmation) && confirmation === password,
    },
    avatarError,
    previewUrl,
    isSubmittable:
      Boolean(username && email && password && confirmation) && !isPending,
    isPending,
    onSubmit: handleSubmit(({ avatar, ...fields }) =>
      mutate({ ...fields, avatar: avatar?.[0] })
    ),
    closeModal,
    openLogin,
  };
};

export default useRegisterModal;
