const MAX_RETRIES = 3;
const CLIENT_ERROR_START = 400;
const CLIENT_ERROR_END = 500;

export const retryQuery = (failureCount, error) => {
  const status = error?.response?.status;

  if (status >= CLIENT_ERROR_START && status < CLIENT_ERROR_END) {
    return false;
  }

  return failureCount < MAX_RETRIES;
};
