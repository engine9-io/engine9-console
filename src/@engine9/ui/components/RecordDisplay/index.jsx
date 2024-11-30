import React from 'react';
import { compileTemplate } from '@engine9/helpers/HandlebarsHelper';
import AppLoader from '@crema/components/AppLoader';
import Error404 from '@engine9/ui/errorPages/Error404';
import Error500 from '@engine9/ui/errorPages/Error500';

import { useRemoteData } from '../../AuthenticatedDataEndpoint';

function RecordDisplay(props) {
  const {
    properties, parameters = {},

  } = props;

  if (!properties) {
    return 'No properties specified for RecordDisplay';
  }
  const table = parameters.table || properties.table;
  const id = parameters.id || properties.id;

  const {
    isPending, error, data,
  } = useRemoteData({
    uri: `/data/tables/${table}/${id}`,
  });

  if (isPending) return <AppLoader />;
  if (!data) return <AppLoader />;
  if (!data[0]) return <Error404 />;
  if (error) return <Error500 />;

  const renderTemplate = compileTemplate(properties.template);
  try {
    return renderTemplate(data[0]);
  } catch (e) {
    console.error('Error rendering template with data', data?.data?.[0], e);
    return 'Error with template';
  }
}
export default RecordDisplay;
