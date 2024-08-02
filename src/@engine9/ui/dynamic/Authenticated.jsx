import React from 'react';
import AppLoader from '@crema/components/AppLoader';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { Routes, Route } from 'react-router-dom';
import LayoutHome from './layouts';

import AccountPicker from '../components/AccountPicker';
import Profile from '../components/Profile';

import { useAuthenticatedAxios } from '../AuthenticatedDataEndpoint';

function DynamicAccountLayout() {
  const axios = useAuthenticatedAxios();
  const {
    isPending, error, data, isFetching,
  } = useQuery({
    queryKey: ['dynamic-config'],
    queryFn: () => axios
      .get('/ui/console')
      .then((res) => res.data),
  });

  if (isPending || isFetching) return <AppLoader />;
  if (error) return `An error has occurred: ${error.message}`;
  let { routes } = data;
  if (!Array.isArray(routes)) {
    routes = [];
    Object.keys(data.routes).forEach((path) => {
      routes.push({ path, ...data.routes[path] });
    });
  }
  let { menu } = data;
  if (!Array.isArray(menu)) {
    menu = [];
    Object.keys(data.menu).forEach((id) => {
      const item = data.menu[id];

      if (item.children && !Array.isArray(item.children)) {
        const children = [];
        Object.keys(item.children).forEach((childId) => {
          children.push({ ...item.children[childId], ...{ id: childId } });
        });
        item.children = children;
      }

      menu.push({
        id, title: '(no title)', ...item,
      });
    });
  }
  const finalMenu = [{
    id: 'home',
    title: '',
    type: 'group',
    children: menu,
  }];

  return (
    <div>
      {isFetching ? <div>Updating...</div> : ''}
      <LayoutHome menuConfig={finalMenu} routeConfig={routes} />
    </div>
  );
}

const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        // Normal defaults cause sometimes odd behavior
        // like data refreshing when it doesn't need to
        refetchOnWindowFocus: false, // default: true
        staleTime: 5 * 60 * 10000, // default 0
      },
    },
  },

);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/:accountId" element={<DynamicAccountLayout />} />
        <Route path="/:accountId/*" element={<DynamicAccountLayout />} />
        <Route path="*" element={<AccountPicker />} />
      </Routes>

    </QueryClientProvider>
  );
}
