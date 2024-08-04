import React from 'react';
import AppLoader from '@crema/components/AppLoader';
import { List } from 'antd';
// import qs from 'qs';
import './index.css';
import { useQuery } from '@tanstack/react-query';
import { compileTemplate } from '@engine9/helpers/HandlebarsHelper';

import { useActionFunction } from '../Actions';

import { useAuthenticatedAxios } from '../../AuthenticatedDataEndpoint';

function RecordList(props) {
  const { properties, parameters } = props;

  const onClickAction = useActionFunction(properties?.onRecord?.onClick);

  const table = parameters.table || properties.table;
  const { extensions, conditions } = properties;
  let renderedConditions = '';
  if (conditions) {
    const t = compileTemplate(JSON.stringify(conditions));
    renderedConditions = `conditions=${escape(t(parameters))}&`;
  }

  const axios = useAuthenticatedAxios();
  const {
    isPending, error, isFetching, data,
  } = useQuery({
    queryKey: [`${table}-list`],
    queryFn: () => axios
      .get(`/data/tables/${table}?${renderedConditions}${extensions ? `extensions=${escape(JSON.stringify(extensions))}&` : ''}`)
      .then((results) => results.data),
  });

  if (isPending || isFetching) return <AppLoader />;

  if (error) return <div>Error retrieving data</div>;
  return (
    <List
      bordered={false}
      dataSource={data?.data}
      pagination={{ position: 'bottom', align: 'end' }}
      renderItem={(record, index) => (
        <List.Item
          key={index}
          onClick={() => {
            onClickAction({ table, record, parameters });
          }}
        >
          <h3>{record.name}</h3>
          {JSON.stringify(record)}
        </List.Item>
      )}
    />
  );
}
export default RecordList;
