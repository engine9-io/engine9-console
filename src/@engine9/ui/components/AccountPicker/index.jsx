import React from 'react';
import { useQuery } from '@tanstack/react-query';
import AppLoader from '@crema/components/AppLoader';
import Error500 from '@engine9/ui/errorPages/Error500';

import { useAuthenticatedAxios } from '../../AuthenticatedDataEndpoint';

function Profile() {
  const axios = useAuthenticatedAxios();

  const {
    isPending, error, isFetching, data,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => axios
      .get('/user')
      .then((results) => results.data),
  });

  if (isPending || isFetching) return <AppLoader />;
  if (error) return <Error500 />;
  return (
    <div>
      <h1>Account Picker</h1>
      {JSON.stringify(data)}
    </div>
  );
}
export default Profile;
