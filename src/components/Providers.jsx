import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';
import { retryQuery } from '@/config';
import { AuthContextProvider } from '@/context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: retryQuery },
  },
});

const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>{children}</AuthContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default Providers;
