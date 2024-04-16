import React from 'react';
import AppLoader from '@crema/components/AppLoader';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import LayoutHome from './layouts';
import { useAuthenticatedAxios } from '../AuthenticatedEndpoint';

function DynamicLayout() {
  const axios = useAuthenticatedAxios();
  const {
    isPending, error, data, isFetching,
  } = useQuery({
    queryKey: ['dynamic_config'],
    queryFn: () => axios
      .get('/ui/demo')
      .then((res) => res.data),
  });

  if (isPending || isFetching) return <AppLoader />;
  if (error) return `An error has occurred: ${error.message}`;

  return (
    <div>
      <div>{isFetching ? 'Updating...' : ''}</div>
      <LayoutHome menuConfig={data.menu} routeConfig={data.routes} />
    </div>
  );
}

const queryClient = new QueryClient();
// Load up the routes and refer to the correct layout,
// passing the configuration of the elements to that layout

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DynamicLayout />
    </QueryClientProvider>
  );
}
