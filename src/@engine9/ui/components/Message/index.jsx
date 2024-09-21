import React from 'react';
import { useQuery } from '@tanstack/react-query';
import AppLoader from '@crema/components/AppLoader';
import Error404 from '@engine9/ui/errorPages/Error404';
import Error500 from '@engine9/ui/errorPages/Error500';
import throttle from 'throttleit';
import { useActionFunction } from '@engine9/ui/components/Actions';
import {
  JsonView, allExpanded, defaultStyles,
} from 'react-json-view-lite';

import Tabs from '../Tabs';
import DynamicForm from '../DynamicForm';
import Email from './Email';

import { useAuthenticatedAxios } from '../../AuthenticatedDataEndpoint';
import 'react-json-view-lite/dist/index.css';

export default function MessageDisplay(props) {
  const {
    properties, parameters = {},

  } = props;

  if (!properties) {
    return 'No properties specified for RecordDisplay';
  }

  const id = parameters.id || properties.id;
  const axios = useAuthenticatedAxios();
  const throttledSaveToDatabase = throttle(useActionFunction({
    action: 'table.upsert',
    table: 'message',
    onStart: () => console.log('Starting message save ...'),
    onComplete: () => console.log('Completed message save.'),
    onError: () => console.log('Error saving to database'),
  }), 5000);

  const saveMessage = (m) => {
    console.log('Called saveMessage', JSON.stringify(m));
    throttledSaveToDatabase({ data: m });
  };

  const {
    isPending, error, isFetching, data: message,
  } = useQuery({
    queryKey: [`message-${id}}`],
    queryFn: () => axios
      .get(`/data/tables/message/${id}?include=${escape('{content:{table:"message_content"}}')}`)
      .then((results) => {
        const d = results.data?.data?.[0];
        if (!d) return null;
        const m = { id: d.id, ...d.attributes };
        const content = results.data?.includes?.find((x) => x.type === 'message_content' && x.attributes?.message_id === d.id);
        delete content.id;
        Object.assign(m, content.attributes);

        return m;
      }),
  });

  if (isPending || isFetching) return <AppLoader />;
  if (!message) return <Error404 />;
  if (error) return <Error500 />;

  const items = [
    {
      label: 'Email Envelope',
      key: 'email-envelope',
      children: <DynamicForm
        form={{
          title: 'Edit Email',
          type: 'object',
          required: [],
          properties: {
            name: {
              type: 'string',
              title: 'Message Name',
              default: '',
            },
          },
        }}
        uiSchema={{}}
        data={message}
        onSubmit={(formValues) => {
          saveMessage({ ...formValues, id });
        }}
      />,
    },
    {
      label: 'Email Content',
      key: 'email-content',
      children: <Email
        message={message}
        saveMessage={saveMessage}
      />,
    },
    {
      label: 'Raw Content',
      key: 'message-content',
      children: <JsonView data={message} shouldExpandNode={allExpanded} style={defaultStyles} />,
    },
    {
      label: 'Publish',
      key: 'publish',
      children: <DynamicForm
        form={{
          title: 'Publish Message',
          type: 'object',
          required: [],
          properties: {
            status: {
              type: 'hidden',
              default: '',
            },
          },
        }}
        data={message}
        onSubmit={(formValues) => {
          saveMessage({ ...formValues, id });
        }}
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
