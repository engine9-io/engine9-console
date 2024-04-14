import React from 'react';
import AppLoader from '@crema/components/AppLoader';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';

const queryClient = new QueryClient();
const endpoint = import.meta.env.VITE_ENGINE9_UI_ENDPOINT;

function DynamicLayout() {
  const {
    isPending, error, data, isFetching,
  } = useQuery({
    queryKey: ['dynamic_config'],
    queryFn: () => axios
      .get(`${endpoint}/demo`)
      .then((res) => res.data),
  });

  if (isPending || isFetching) return <AppLoader />;
  if (error) return `An error has occurred: ${error.message}`;

  return (
    <div>
      <p>{JSON.stringify(data)}</p>
      <div>{isFetching ? 'Updating...' : ''}</div>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DynamicLayout />
    </QueryClientProvider>
  );
}
