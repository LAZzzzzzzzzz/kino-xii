const FALLBACK_MESSAGE = 'Something went wrong. Please try again.';

const applyApiErrors = (error, setError, fallbackField = 'root') => {
  const { errors, message } = error.response?.data ?? {};

  if (errors) {
    Object.entries(errors).forEach(([name, [firstMessage]]) => {
      setError(name, { message: firstMessage });
    });

    return;
  }

  setError(fallbackField, { message: message ?? FALLBACK_MESSAGE });
};

export default applyApiErrors;
