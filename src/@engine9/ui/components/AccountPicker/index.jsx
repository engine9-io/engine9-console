import React from 'react';
import { useQuery } from '@tanstack/react-query';
import AppLoader from '@crema/components/AppLoader';
import Error500 from '@engine9/ui/errorPages/Error500';
import { Link } from 'react-router-dom';

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
      <Link to="/engine9">Engine9 Development</Link>
      <hr />
      {Object.entries(data?.user?.accounts || {}).map(([accountId, account]) => <div><Link to={`/${accountId}`}>{account.name}</Link></div>)}
    </div>
  );
}
export default Profile;
