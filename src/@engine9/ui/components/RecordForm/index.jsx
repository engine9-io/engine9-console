/* eslint-disable no-console */
import React from 'react';
import AppCard from '@crema/components/AppCard';
import { useQuery } from '@tanstack/react-query';
import AppLoader from '@crema/components/AppLoader';
import Error404 from '@engine9/ui/errorPages/Error404';
import { message } from 'antd';
import { compileTemplate } from '@engine9/helpers/HandlebarsHelper';
import { useActionFunction } from '@engine9/ui/components/Actions';
import DynamicForm from '../DynamicForm';

import { useAuthenticatedAxios } from '../../AuthenticatedDataEndpoint';

function RecordForm(props) {
  const {
    properties, parameters = {},
  } = props;

  const table = parameters.table || properties.table;
  let id = parameters.id || properties.id;
  if (id === 'create' || id === 'new') id = 0;
  const { form, uiSchema = { } } = properties;
  let { title } = properties;
  const axios = useAuthenticatedAxios();
  const onSaveAction = useActionFunction(properties.onSave);

  const enabled = !!id;
  let initialData;
  if (!id) initialData = { data: [{}] };

  const {
    isPending, isFetching, error, data: response,
  } = useQuery({
    enabled,
    initialData,
    queryKey: [`${table}-${id}`],
    queryFn: () => axios
      .get(`/data/tables/${table}/${id}`)
      .then((results) => results.data?.data),
  });

  if (isPending || isFetching) return <AppLoader />;

  if (!!id && !response?.[0]) {
    return <Error404 />;
  }

  const record = response?.[0] || {};

  title = compileTemplate(title || 'No title template')({ record });

  return (
    <AppCard
      heightFull
      title={title}
      className="no-card-space-ltr-rtl"
    >
      {error && <div>Error retrieving data</div>}
      {!error
      && (
      <DynamicForm
        data={record}
        form={form}
        uiSchema={uiSchema}
        onSubmit={(formValues) => {
          axios({
            method: 'POST',
            url: `/data/tables/${table}/${id || ''}`,
            data: formValues,
          }).then(({ data }) => {
            message.success(`Saved ${table}`);
            onSaveAction({ record: data });
          }).catch((e) => {
            console.error(e);
            message.error(`Error saving ${table}`);
          });
        }}
      />
      )}

    </AppCard>
  );
}
export default RecordForm;
