import React from 'react';
import { useQuery } from '@tanstack/react-query';
import AppLoader from '@crema/components/AppLoader';
import Error404 from '@engine9/ui/errorPages/Error404';
import Error500 from '@engine9/ui/errorPages/Error500';
import { useActionFunction } from '@engine9/ui/components/Actions';
import { Tabs } from 'antd';
import Email from './Email';

import { useAuthenticatedAxios } from '../../AuthenticatedDataEndpoint';

function RecordDisplay(props) {
  const {
    properties, parameters = {},

  } = props;

  if (!properties) {
    return 'No properties specified for RecordDisplay';
  }
  const table = parameters.table || properties.table;
  const id = parameters.id || properties.id;
  const axios = useAuthenticatedAxios();
  const saveMessage = useActionFunction({ action: 'table.upsert', table: 'message' });

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

  const items = [
    {
      label: 'Email Envelope',
      key: 'email-envelope',
      children: 'Email Envelope',
    },
    {
      label: 'Email Content',
      key: 'email-content',
      children: <Email
        message={data.data}
        saveMessage={saveMessage}
      />,
    },
  ];

  return (
    <Tabs
      defaultActiveKey={items[0].key}
      tabPosition="left"
        /* style={{height: 220}} */
      items={items}
    />

  );
}
export default RecordDisplay;
