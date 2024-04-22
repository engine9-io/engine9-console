import React from 'react';
import AppCard from '@crema/components/AppCard';
import { useQuery } from '@tanstack/react-query';
import AppLoader from '@crema/components/AppLoader';

import { useAuthenticatedAxios } from '../../AuthenticatedEndpoint';

function DataForm(props) {
  const {
    title, properties, parameters,
  } = props;
  const table = parameters.table || properties.table;
  const id = parameters.id || properties.id;
  const axios = useAuthenticatedAxios();

  const {
    isPending, error, isFetching, data,
  } = useQuery({
    queryKey: [`${table}-${id}}`],
    queryFn: () => axios
      .get(`/data/tables/${table}/${id}`)
      .then((results) => results.data),
  });

  if (isPending || isFetching) return <AppLoader />;
  return (
    <AppCard
      heightFull
      title={title}
      className="no-card-space-ltr-rtl"
    >
      {error && <div>Error retrieving data</div>}
      {JSON.stringify({
        data,
        properties,
      })}
    </AppCard>
  );
}
export default DataForm;
