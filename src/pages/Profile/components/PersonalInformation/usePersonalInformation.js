import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, useWatch } from 'react-hook-form';
import { CURRENT_USER_QUERY_KEY } from '@/config';
import { applyApiErrors, normalizeMobileNumber } from '@/helpers';
import { updateProfileRequest } from '@/services';
import { getFormValues, getValidFields } from './helpers';

const usePersonalInformation = (user) => {
  const queryClient = useQueryClient();

  const { register, handleSubmit, setError, control, formState } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    values: getFormValues(user),
  });

  const values = useWatch({ control });

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfileRequest,
    onSuccess: ({ data }) =>
      queryClient.setQueryData([CURRENT_USER_QUERY_KEY], data.data),
    onError: (error) => applyApiErrors(error, setError, 'fullName'),
  });

  return {
    register,
    errors: formState.errors,
    validFields: getValidFields(values, formState),
    isSubmittable: formState.isDirty && formState.isValid && !isPending,
    isPending,
    onSubmit: handleSubmit((fields) =>
      mutate({
        ...fields,
        mobileNumber: normalizeMobileNumber(fields.mobileNumber),
      })
    ),
  };
};

export default usePersonalInformation;
