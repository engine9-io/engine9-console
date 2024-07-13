import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { compileTemplate } from '@engine9/helpers/HandlebarsHelper';
import AppLoader from '@crema/components/AppLoader';
import Error404 from '@engine9/ui/errorPages/Error404';
import Error500 from '@engine9/ui/errorPages/Error500';

import { useAuthenticatedAxios } from '../../AuthenticatedEndpoint';

function RecordDisplay(props) {
  const {
    properties, parameters = {},

  } = props;

  if (!properties) {
    return 'No properties specified';
  }
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
  if (!data.data) return <AppLoader />;
  if (!data.data?.[0]) return <Error404 />;
  if (error) return <Error500 />;

  const renderTemplate = compileTemplate(properties.template);
  try {
    return renderTemplate(data.data?.[0]);
  } catch (e) {
    console.error('Error rendering template with data', data?.data?.[0], e);
    return 'Error with template';
  }
}
export default RecordDisplay;
