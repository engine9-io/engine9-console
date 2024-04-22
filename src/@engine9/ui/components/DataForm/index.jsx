import React from 'react';
import AppCard from '@crema/components/AppCard';
import { useQuery } from '@tanstack/react-query';
import AppLoader from '@crema/components/AppLoader';
import Error404 from '@engine9/ui/errorPages/Error404';
import DynamicForm from '../DynamicForm';

import { useAuthenticatedAxios } from '../../AuthenticatedEndpoint';

function DataForm(props) {
  const {
    title, properties, parameters,

  } = props;
  const table = parameters.table || properties.table;
  const id = parameters.id || properties.id;
  const { form } = properties;// form configuration
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
  if (!data.data) return <AppLoader />;
  if (!data.data?.[0]) return <Error404 />;

  return (
    <AppCard
      heightFull
      title={title}
      className="no-card-space-ltr-rtl"
    >
      {error && <div>Error retrieving data</div>}
      {!error && <DynamicForm data={data.data?.[0]} form={form} />}

    </AppCard>
  );
}
export default DataForm;
