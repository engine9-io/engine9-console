import React from 'react';
import AppLoader from '@crema/components/AppLoader';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import axios from 'axios';
import LayoutHome from './layouts';

const queryClient = new QueryClient();
const endpoint = import.meta.env.VITE_ENGINE9_UI_ENDPOINT;

// Load up the routes and refer to the correct layout,
// passing the configuration of the elements to that layout

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
      <div>{isFetching ? 'Updating...' : ''}</div>
      <LayoutHome menuConfig={data.menu} routeConfig={data.routes} />
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
