import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { TICKETS_QUERY_KEY } from '@/config';
import { useTickets } from '@/hooks';
import { refundOrderRequest } from '@/services';
import {
  UPCOMING_FILTER,
  getFilterOptions,
  getRefundErrorMessage,
  splitOrders,
} from './helpers';

const useMyTickets = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState(UPCOMING_FILTER);
  const { data: orders = [], isPending, isError } = useTickets();

  const {
    mutate,
    isPending: isRefunding,
    variables,
    error,
    reset,
  } = useMutation({
    mutationFn: refundOrderRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [TICKETS_QUERY_KEY] }),
  });

  const groups = splitOrders(orders);

  return {
    filter,
    selectFilter: (value) => {
      reset();
      setFilter(value);
    },
    filterOptions: getFilterOptions(groups),
    orders: groups[filter],
    isPending,
    isError,
    refundingReference: isRefunding ? variables : null,
    refundError: getRefundErrorMessage(error),
    refund: mutate,
  };
};

export default useMyTickets;
