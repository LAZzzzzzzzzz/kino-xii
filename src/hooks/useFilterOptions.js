import { useQuery } from '@tanstack/react-query';
import { FILTER_OPTIONS_QUERY_KEY } from '@/config';
import { getFilterOptionsRequest } from '@/services';

const useFilterOptions = () => {
  return useQuery({
    queryKey: [FILTER_OPTIONS_QUERY_KEY],
    queryFn: getFilterOptionsRequest,
    select: (response) => response.data.data,
  });
};

export default useFilterOptions;
