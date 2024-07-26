import React from 'react';
import { useQuery } from '@tanstack/react-query';
import AppLoader from '@crema/components/AppLoader';
import Error500 from '@engine9/ui/errorPages/Error500';

import { useAuthenticatedAxios } from '../../AuthenticatedEndpoint';

function Profile(props) {
  const {
    properties,
  } = props;

  if (!properties) {
    return 'No properties specified';
  }

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

  return JSON.stringify(data);
}
export default Profile;
