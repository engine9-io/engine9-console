/* eslint-disable no-console */
import React from 'react';
import AppCard from '@crema/components/AppCard';
import AppLoader from '@crema/components/AppLoader';
import Error404 from '@engine9/ui/errorPages/Error404';
import { compileTemplate } from '@engine9/helpers/HandlebarsHelper';
import { useActionFunction } from '@engine9/ui/components/Actions';
import DynamicForm from '../DynamicForm';

import { useRemoteData } from '../../AuthenticatedDataEndpoint';

function RecordForm(props) {
  const {
    properties, parameters = {},
  } = props;

  const table = parameters.table || properties.table;
  let id = parameters.id || properties.id;
  if (id === 'create' || id === 'new') id = 0;
  const { form, uiSchema = { } } = properties;
  let { title } = properties;
  const afterSaveAction = useActionFunction(properties.onSave);
  const saveAction = useActionFunction({
    action: 'table.upsert',
    table,
    onComplete: (({ data }) => {
      afterSaveAction({ record: data });
    }),
  });

  const enabled = !!id;
  let initialData;
  if (!id) initialData = { data: [{}] };

  const {
    isPending, error, data: response,
  } = useRemoteData({
    enabled,
    initialData,
    uri: `/data/tables/${table}/${id}`,
  });

  if (isPending) return <AppLoader />;

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
        onSubmit={(formValues) => saveAction({
          data: { id, ...formValues },
        })}
      />
      )}

    </AppCard>
  );
}
export default RecordForm;
