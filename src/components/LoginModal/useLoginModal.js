import { useMutation } from '@tanstack/react-query';
import { useForm, useWatch } from 'react-hook-form';
import { EMAIL_RULES, PASSWORD_RULES } from '@/config';
import { useAuth } from '@/context';
import { applyApiErrors, isValueValid } from '@/helpers';
import { loginRequest } from '@/services';

const useLoginModal = () => {
  const { completeAuth, closeModal, openRegister } = useAuth();

  const { register, handleSubmit, setError, control, formState } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: loginRequest,
    onSuccess: ({ data }) => completeAuth(data.data),
    onError: (error) => applyApiErrors(error, setError, 'password'),
  });

  const { email, password } = useWatch({ control });

  return {
    register,
    errors: formState.errors,
    validFields: {
      email: isValueValid(email, EMAIL_RULES),
      password: isValueValid(password, PASSWORD_RULES),
    },
    isSubmittable: Boolean(email && password) && !isPending,
    isPending,
    onSubmit: handleSubmit((credentials) => mutate(credentials)),
    closeModal,
    openRegister,
  };
};

export default useLoginModal;
