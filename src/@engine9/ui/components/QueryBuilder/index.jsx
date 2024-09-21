/* eslint-disable no-console */
import React from 'react';
import AppCard from '@crema/components/AppCard';
import { useQuery } from '@tanstack/react-query';
import AppLoader from '@crema/components/AppLoader';
import Error404 from '@engine9/ui/errorPages/Error404';
import Error500 from '@engine9/ui/errorPages/Error500';
import { compileTemplate } from '@engine9/helpers/HandlebarsHelper';
import { useActionFunction } from '@engine9/ui/components/Actions';
import QueryBuilder from './RenderBuilder';

import { useAuthenticatedAxios, useRemoteData } from '../../AuthenticatedDataEndpoint';

function useQueryFields() {
  const axios = useAuthenticatedAxios();
  const {
    isPending, isFetching, error, data,
  } = useQuery({
    queryKey: ['query-fields'],
    queryFn: () => axios
      .get('/data/query/fields')
      .then((results) => results.data),
  });
  if (isPending || isFetching || error) return { isPending, isFetching, error };
  return { data };
}

function RecordForm(props) {
  const {
    properties, parameters = {},
  } = props;

  const table = parameters.table || properties.table;
  let id = parameters.id || properties.id;
  if (id === 'create' || id === 'new') id = 0;
  // const { fields } = properties;
  let { title } = properties;
  const onSaveAction = useActionFunction(properties.onSave);

  const {
    isPending: fieldPending, isFetching: fieldFetching, error: fieldError, data: fieldData,
  } = useQueryFields();
  const enabled = !!id && !fieldPending && !fieldFetching && !fieldError;
  let initialData;
  if (!id) initialData = { data: [{}] };

  const {
    isPending, isFetching, error, data: response,
  } = useRemoteData({
    enabled,
    initialData,
    uri: `/data/tables/${table}/${id}`,
  });

  if (fieldPending || fieldFetching) return <AppLoader />;
  if (fieldError) return <Error500 />;
  if (!fieldData.fields) return 'No fields available for query';

  if (isPending || isFetching) return <AppLoader />;

  if (!!id && !response?.[0]) {
    return <Error404 />;
  }

  const record = response?.[0] || {};

  title = compileTemplate(title || 'No title template')({ record });
  let query = record.query || '{}';
  if (typeof query === 'string') {
    try {
      query = JSON.parse(query);
    } catch (e) {
      return `Query ${id} has an invalid structure.`;
    }
  }

  return (
    <AppCard
      heightFull
      title={title}
      className="no-card-space-ltr-rtl"
    >
      {error && <div>Error retrieving data</div>}
      {!error
      && (
      <QueryBuilder
        query={query}
        fields={fieldData.fields}
        onSubmit={(newQuery) => {
          onSaveAction({
            table,
            id,
            data: newQuery,
          });
        }}
      />
      )}

    </AppCard>
  );
}
export default RecordForm;
