import React from 'react';
import AppLoader from '@crema/components/AppLoader';

// import Error404 from '@engine9/ui/errorPages/Error404';
import JSON5 from 'json5';
import Error500 from '@engine9/ui/errorPages/Error500';
import { relativeDate } from '@engine9/helpers/formatters';
// import { useActionFunction } from '@engine9/ui/components/Actions';
import QueryStringDateRange from '@engine9/ui/components/QueryStringDateRange';
import { useSearchParams } from 'react-router';
import { getIcon } from '@engine9/ui/Icons';

import { Tree, Tag, Empty } from 'antd';

import { useRemoteData, useRemoteObjects } from '../../AuthenticatedDataEndpoint';

export default function MessageTree(props) {
  const {
    properties,
    // parameters = {},
  } = props;

  const [searchParams] = useSearchParams();

  /* const onClickAction = useActionFunction(
    {
      action: 'navigate',
      url: '/message/{{record.id}}/',
    },
  );
  */

  let start = searchParams.get('start') || properties.start || '-7d';
  let end = searchParams.get('end') || properties.end || 'now';
  if (start.match(/^[+-]{1}$/)) start += '.start.day';
  if (end.match(/^[+-]{1}$/)) end += '.end.day';

  const conditions = [
    { eql: `publish_date>='${relativeDate(start).toISOString()}'` },
    { eql: `publish_date<'${relativeDate(end).toISOString()}'` },
    { eql: 'message_set_id is not null' },
  ];
  console.log(start, end, conditions);

  const {
    isPending, error, data: messages,
  } = useRemoteData({
    uri: `/data/tables/message?conditions=${escape(JSON5.stringify(conditions))}`,
  });

  const msids = messages ? messages.map((m) => m.message_set_id) : undefined;

  const { isPending: msPending, error: msError, data: messageSets } = useRemoteObjects({ type: 'message_set', ids: msids });

  const cids = messageSets ? messageSets.map((m) => m.campaign_id) : undefined;

  const { isPending: cPending, error: cError, data: campaigns } = useRemoteObjects({ type: 'campaign', ids: cids });

  const e = error || msError || cError;
  if (e) {
    return e.message ? e.message : <Error500 />;
  }

  if (isPending || msPending || cPending) return <AppLoader />;

  if (!Array.isArray(messages)) return <Error500 />;

  const onSelect = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };
  const onExpand = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };
  if (!campaigns) return <AppLoader />;
  const treeData = campaigns.map((c) => (
    {
      title: (
        <div>
          <h3>{c.name}</h3>
          <Tag color="orange">{c.channel}</Tag>
        </div>),
      // icon: getIcon('campaign'),
      key: `campaign:${c.id}`,
      children: messageSets.filter((ms) => ms.campaign_id === c.id).map((ms) => ({
        title: (
          <h4>
            {ms.name}
          </h4>
        ),
        key: `message_set:${ms.id}`,
        children: messages.filter((m) => m.message_set_id === ms.id).map((m) => ({
          title: m.name,
          icon: getIcon('message'),
          key: `message:${m.id}`,
          isLeaf: true,
        })),
      })),
    }
  ));

  return (
    <div>
      <QueryStringDateRange />
      {treeData.length > 0 ? (
        <Tree
          multiple
          defaultExpandAll
      // blockNode
          onSelect={onSelect}
          onExpand={onExpand}
          treeData={treeData}
        />
      ) : <Empty />}
    </div>

  );
}
