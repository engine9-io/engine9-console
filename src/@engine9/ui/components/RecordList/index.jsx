import React from 'react';
import AppLoader from '@crema/components/AppLoader';
import { List } from 'antd';
// import qs from 'qs';
import './index.css';
import { compileTemplate } from '@engine9/helpers/HandlebarsHelper';

import { useActionFunction } from '../Actions';

import { useRemoteData } from '../../AuthenticatedDataEndpoint';

function RecordList(props) {
  const { properties, parameters } = props;

  const onClickAction = useActionFunction(properties?.onRecord?.onClick);

  const table = parameters.table || properties.table;
  const { include, conditions, template } = properties;
  let renderedConditions = '';
  if (conditions) {
    const conditionTemplate = compileTemplate(JSON.stringify(conditions));
    renderedConditions = `conditions=${escape(conditionTemplate({ properties, parameters }))}&`;
  }
  const renderTemplate = compileTemplate(template || '<h3>{{record.name}}</h3>');

  const {
    isPending, error, isFetching, data,
  } = useRemoteData({
    uri: `/data/tables/${table}?${renderedConditions}${include ? `include=${escape(JSON.stringify(include))}&` : ''}`,
  });

  if (isPending || isFetching) return <AppLoader />;

  if (error) {
    // eslint-disable-next-line no-console
    console.error('RecordList: Error retrieving data', { properties, parameters });
    return <div>Error retrieving data</div>;
  }
  return (
    <>
      <List
        bordered={false}
        dataSource={data}
        pagination={{ position: 'bottom', align: 'end' }}
        renderItem={(item, index) => {
          const record = { ...item.attributes, ...item };

          return (
            <List.Item
              key={index}
              onClick={() => {
                onClickAction({ table, record, parameters });
              }}
            >
              <div
            // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: renderTemplate({ table, record, parameters }) }}
              />
            </List.Item>
          );
        }}
      />
      {data?.data?.length}
      {' '}
      records
    </>
  );
}
export default RecordList;
