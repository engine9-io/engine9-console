import React, { useState } from 'react';
import AppCard from '@crema/components/AppCard';
import { Table } from 'antd';
// import qs from 'qs';
import { useQuery } from '@tanstack/react-query';
import Handlebars from 'handlebars';

import { useActionFunction } from '../Actions';

import { useAuthenticatedAxios } from '../../AuthenticatedEndpoint';

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

function DataTable(props) {
  const { title, properties, parameters } = props;
  const table = parameters.table || properties.table;
  const axios = useAuthenticatedAxios();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const offset = (tableParams.pagination.current - 1) * 5;

  const {
    isPending, error, isFetching, data,
  } = useQuery({
    queryKey: [`${table}_list?${offset}`],
    queryFn: () => axios
      .get(`/data/tables/${table}?limit=5&offset=${offset}`)
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
    if (c.render) o.render = Handlebars.compile(c.render);
    return o;
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  let onClickAction = () => {};
  if (properties?.onRow?.onClick) {
    onClickAction = useActionFunction(properties?.onRow?.onClick);
  }

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
        dataSource={data.data}
        pagination={tableParams.pagination}
        loading={isPending || isFetching}
        onChange={handleTableChange}
      />
    </AppCard>
  );
}
export default DataTable;
