import React from 'react';
import { useQuery } from '@tanstack/react-query';
import AppLoader from '@crema/components/AppLoader';
import Error404 from '@engine9/ui/errorPages/Error404';
import Error500 from '@engine9/ui/errorPages/Error500';

import { useAuthenticatedAxios } from '../../AuthenticatedDataEndpoint';

function StatCard(props) {
  const {
    properties,
  } = props;

  if (!properties) {
    return 'No properties specified for StatCard';
  }
  const {
    table, columns, conditions, groupBy, orderBy, limit,
  } = { ...properties };
  const json = {
    table, columns, conditions, groupBy, orderBy, limit,
  };
  const axios = useAuthenticatedAxios();

  const {
    isPending, error, isFetching, data,
  } = useQuery({
    queryKey: [JSON.stringify(json)],
    queryFn: () => axios({
      method: 'POST',
      url: '/data/eql',
      data: json,
    })
      .then((results) => results.data),
  });

  if (isPending || isFetching) return <AppLoader />;
  if (!data.data) return <AppLoader />;
  if (!data.data?.[0]) return <Error404 />;
  if (error) return <Error500 />;

  return JSON.stringify(data.data?.[0]);
}
export default StatCard;
