import React, { useState } from 'react';
import AppCard from '@crema/components/AppCard';
import { Table } from 'antd';
// import qs from 'qs';
import './index.css';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { compileTemplate } from '@engine9/helpers/HandlebarsHelper';

import { useActionFunction } from '../Actions';

import { useAuthenticatedAxios } from '../../AuthenticatedDataEndpoint';

/* const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: (x, r) => `${r.given_name} ${r.family_name}`,
    width: '20%',
  },
  /*
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      {
        text: 'Male',
        value: 'male',
      },
      {
        text: 'Female',
        value: 'female',
      },
    ],
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },

];
*/

function RecordTable(props) {
  const { title, properties, parameters } = props;

  const table = parameters.table || properties.table;
  const { extensions, conditions } = properties;
  let renderedConditions = '';
  if (conditions) {
    const t = compileTemplate(JSON.stringify(conditions));
    renderedConditions = `conditions=${escape(t(parameters))}&`;
  }

  const [tableParams, setTableParams] = useState({
    pagination: {
      position: ['topRight'],
      onChange: (_page, _pageSize) => {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            page: _page,
            pageSize: _pageSize,
          },
        });
      },
      placeholderData: keepPreviousData,
      hideOnSinglePage: false,
      current: 1,
      pageSize: 25,
    },
  });
  const offset = (tableParams.pagination.current - 1) * 5;
  const axios = useAuthenticatedAxios();
  const {
    isPending, error, isFetching, data,
  } = useQuery({
    queryKey: [`${table}-list`, tableParams.pagination.current],
    queryFn: () => axios
      .get(`/data/tables/${table}?${renderedConditions}${extensions ? `extensions=${escape(JSON.stringify(extensions))}&` : ''}limit=${tableParams.pagination.pageSize}&offset=${offset}`)
      .then((results) => {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
        return results.data;
      }),
  });

  if (!Array.isArray(properties.columns)) return 'No column array specified';
  const columns = properties.columns.map((c) => {
    const o = { ...c };
    if (c.template) {
      if (typeof c.template !== 'string') throw new Error('column.template should be a string, not anything else');
      const renderTemplate = compileTemplate(c.template);
      o.render = (text, context) => renderTemplate(context);
    }
    return o;
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const onClickAction = useActionFunction(properties?.onRecord?.onClick);

  const onRow = (record, rowIndex) => ({
    onClick: (event) => {
      onClickAction({
        table, record, rowIndex, event,
      });

      // onDoubleClick: (event) => {}, // double click row
      // onContextMenu: (event) => {}, // right button click row
      // onMouseEnter: (event) => {}, // mouse enter row
      // onMouseLeave: (event) => {}, // mouse leave row
    },
  });
  return (
    <AppCard
      heightFull
      title={title}
      className="no-card-space-ltr-rtl"
    >
      {error && <div>Error retrieving data</div>}
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        onRow={onRow}
        dataSource={data?.data}
        pagination={tableParams.pagination}
        loading={isPending || isFetching}
        onChange={handleTableChange}
      />
    </AppCard>
  );
}
export default RecordTable;
