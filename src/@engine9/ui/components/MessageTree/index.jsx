import React from 'react';
import AppLoader from '@crema/components/AppLoader';
import AppCard from '@crema/components/AppCard';
import Error404 from '@engine9/ui/errorPages/Error404';
import JSON5 from 'json5';
import Error500 from '@engine9/ui/errorPages/Error500';
import { relativeDate } from '@engine9/helpers/formatters';
import { useActionFunction } from '@engine9/ui/components/Actions';
import { useSearchParams } from 'react-router';

import { Tree } from 'antd';
import { useRemoteData, useRemoteObjects } from '../../AuthenticatedDataEndpoint';

const initTreeData = [
  {
    title: 'Expand to load',
    key: '0',
  },
  {
    title: 'Expand to load',
    key: '1',
  },
  {
    title: 'Tree Node',
    key: '2',
    isLeaf: true,
  },
];

export default function MessageTree(props) {
  const {
    properties, parameters = {},
  } = props;

  const [searchParams] = useSearchParams();

  const onClickAction = useActionFunction(
    {
      action: 'navigate',
      url: '/message/{{record.id}}/',
    },
  );

  let start = searchParams.get('start') || properties.start || '-7d';
  let end = searchParams.get('end') || properties.end || 'now';
  if (start.match(/^[+-]{1}$/)) start += '.start.day';
  if (end.match(/^[+-]{1}$/)) end += '.end.day';

  console.log({
    start,
    end,
    startRel: relativeDate(start),
    endRel: relativeDate(end),
  });

  const conditions = [
    { eql: `publish_date>='${relativeDate(start).toISOString()}'` },
    { eql: `publish_date<'${relativeDate(end).toISOString()}'` },
    { eql: 'message_set_id is not null' },

  ];

  const {
    isPending, error, data: messages,
  } = useRemoteData({
    uri: `/data/tables/message?conditions=${escape(JSON5.stringify(conditions))}`,
  });

  const msids = messages ? messages.map((m) => m.message_set_id) : undefined;

  const { isPending: msPending, error: msError, data: messageSets } = useRemoteObjects({ type: 'message_set', ids: msids });

  const e = error || msError;
  if (e) {
    return e.message ? e.message : <Error500 />;
  }

  if (isPending || msPending) return <AppLoader />;

  if (!Array.isArray(messages)) return <Error500 />;

  const onSelect = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };
  const onExpand = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };
  return JSON.stringify(messageSets);

  return (
    <AppCard
      heightFull
      className="no-card-space-ltr-rtl record-table"
    >
      <Tree
        multiple
        draggable
        defaultExpandAll
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={treeData}
      />
    </AppCard>
  );
}
