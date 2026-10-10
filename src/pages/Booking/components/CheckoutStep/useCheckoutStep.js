import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAuth } from '@/context';
import { applyApiErrors } from '@/helpers';
import { createOrderRequest } from '@/services';
import {
  CONTESTED,
  EXPIRED,
  FIELDS,
  FORBIDDEN,
  getCheckoutError,
} from '../../helpers';
import { getFormValues, maskExpiry } from './helpers';

const useCheckoutStep = ({
  holdId,
  onExpire,
  onContested,
  onForbidden,
  onPaid,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, setError, formState } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    values: getFormValues(user),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (fields) => createOrderRequest({ holdId, ...fields }),
    onSuccess: ({ data }) => {
      const order = data.data;

      onPaid();
      navigate(`/orders/${order.reference}`, { state: { order } });
    },
    onError: (error) => {
      const { outcome, contested, message } = getCheckoutError(error);

      if (outcome === FIELDS) {
        applyApiErrors(error, setError);

        return;
      }

      if (outcome === EXPIRED) {
        onExpire();

        return;
      }

      if (outcome === CONTESTED) {
        onContested(contested);

        return;
      }

      if (outcome === FORBIDDEN) {
        onForbidden();

        return;
      }

      setError('root', { message });
    },
  });

  return {
    register,
    errors: formState.errors,
    isSubmitting: isPending,
    onExpiryChange: (event) =>
      setValue('expiry', maskExpiry(event.target.value), {
        shouldValidate: formState.isSubmitted,
      }),
    onSubmit: handleSubmit((fields) => mutate(fields)),
  };
};

export default useCheckoutStep;
