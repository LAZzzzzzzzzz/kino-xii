import { useEffect, useMemo } from 'react';

const useObjectUrl = (file) => {
  const url = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    if (!url) {
      return;
    }

    return () => URL.revokeObjectURL(url);
  }, [url]);

  return url;
};

export default useObjectUrl;
