import React from 'react';
import AppLoader from '@crema/components/AppLoader';
import AppCard from '@crema/components/AppCard';
import Error404 from '@engine9/ui/errorPages/Error404';
import Error500 from '@engine9/ui/errorPages/Error500';
import throttle from 'throttleit';
import { useActionFunction } from '@engine9/ui/components/Actions';
import {
  JsonView, allExpanded, defaultStyles,
} from 'react-json-view-lite';

import Tabs from '../Tabs';
import DynamicForm from '../DynamicForm';
import EmailContent from './EmailContent';

import { useRemoteData } from '../../AuthenticatedDataEndpoint';
import 'react-json-view-lite/dist/index.css';

defaultStyles.container += ' noBackground';

export default function MessageDisplay(props) {
  const {
    properties, parameters = {},

  } = props;

  if (!properties) {
    return 'No properties specified for RecordDisplay';
  }

  const id = parameters.id || properties.id;
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
    isPending, error, data,
  } = useRemoteData({
    uri: `/data/tables/global_message_summary/${id}?include=${escape('{contents:{table:"message_content",foreign_id_field:"message_id"}}')}`,
  });

  if (isPending) return <AppLoader />;
  if (error) return <Error500 />;
  if (!data) return <Error500 />;
  const message = data[0];
  if (!message) return <Error404 />;
  if (!message.content) {
    message.content = message.contents?.[0]?.content || {};
    message.remote_data = message.contents?.[0]?.remote_data || {};
    if (typeof message.content === 'string') {
      message.content = JSON.parse(message.content);
    }
    if (typeof message.remote_data === 'string') {
      message.remote_data = JSON.parse(message.remote_data);
    }
    delete message.contents;
  }

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
      children: <EmailContent
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
    <AppCard
      heightFull
      className="no-card-space-ltr-rtl record-table"
    >
      <Tabs
        defaultActiveKey={items[0].key}
        tabPosition="left"
        /* style={{height: 220}} */
        items={items}
      />
    </AppCard>
  );
}
