import React from 'react';
import AppLoader from '@crema/components/AppLoader';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { Routes, Route } from 'react-router-dom';
import LayoutHome from '@engine9/ui/layouts';

import AccountPicker from '../components/AccountPicker';
import AlternativeDataSource from '../components/AlternativeDataSource';
import Profile from '../components/Profile';

import { useAuthenticatedAxios } from '../AuthenticatedDataEndpoint';

import useLocalUIConfig from './TestingLocalUIConfig';

function DynamicAccountLayout() {
  const useLocal = true;
  const axios = useAuthenticatedAxios();
  const localUI = useLocalUIConfig();
  const {
    isPending, error, data, isFetching,
  } = useQuery({
    queryKey: ['dynamic-config'],
    queryFn: () => axios
      .get('/ui/console')
      .then((res) => res.data),
    enabled: !useLocal,
  });

  if (!useLocal && (isPending || isFetching)) return <AppLoader />;
  if (error) return `An error has occurred: ${error.message}`;
  if (!localUI) return 'Loading...';
  const d = data || localUI;
  let { routes } = d;
  if (!Array.isArray(routes)) {
    routes = [];
    Object.keys(d.routes).forEach((path) => {
      routes.push({ path, ...d.routes[path] });
    });
  }
  let { menu } = d;
  if (!Array.isArray(menu)) {
    menu = [];
    Object.keys(d.menu).forEach((id) => {
      const item = d.menu[id];

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
        <Route path="/datasource" element={<AlternativeDataSource />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/:accountId" element={<DynamicAccountLayout />} />
        <Route path="/:accountId/*" element={<DynamicAccountLayout />} />
        <Route path="*" element={<AccountPicker />} />
      </Routes>

    </QueryClientProvider>
  );
}
