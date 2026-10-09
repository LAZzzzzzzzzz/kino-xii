import { useQuery } from '@tanstack/react-query';
import { TICKETS_QUERY_KEY } from '@/config';
import { getTicketsRequest } from '@/services';

const useTickets = (isEnabled = true) => {
  return useQuery({
    queryKey: [TICKETS_QUERY_KEY],
    queryFn: getTicketsRequest,
    select: (response) => response.data.data,
    enabled: isEnabled,
  });
};

export default useTickets;
