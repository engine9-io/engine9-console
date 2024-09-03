import React from 'react';
import { useQuery } from '@tanstack/react-query';
import AppLoader from '@crema/components/AppLoader';
import Error500 from '@engine9/ui/errorPages/Error500';

import { useAlternateDataSourceAuthenticatedAxios } from '../../AuthenticatedDataEndpoint';

function AlternativeDataSource() {
  const axios = useAlternateDataSourceAuthenticatedAxios();

  const {
    isPending, error, isFetching, data,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => axios
      .get('https://services.frakture.com:4000/objects/job?fields[job]=_id')
      .then((results) => results.data),
  });

  if (isPending || isFetching) return <AppLoader />;
  if (error) return <Error500 />;
  return (
    <div>
      <h1>Third Party Endpoint</h1>
      {JSON.stringify(data)}
    </div>
  );
}
export default AlternativeDataSource;
