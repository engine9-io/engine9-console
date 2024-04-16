import React, { useState } from 'react';
import AppCard from '@crema/components/AppCard';
import { Table } from 'antd';
// import qs from 'qs';
import { useQuery } from '@tanstack/react-query';
import { useAuthenticatedAxios } from '../../AuthenticatedEndpoint';

const columns = [
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
  */
];

function App(props) {
  const { title, properties, parameters } = props;

  const table = parameters.table || properties.table;
  const axios = useAuthenticatedAxios();
  const [data, setData] = useState();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const offset = (tableParams.pagination.current - 1) * 5;

  const {
    isPending, error, isFetching,
  } = useQuery({
    queryKey: [`${table}_list?${offset}`],
    queryFn: () => axios
      .get(`/data/tables/${table}?limit=5&offset=${offset}`)
      .then((results) => {
        setData(results.data?.data);
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

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
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
        dataSource={data}
        pagination={tableParams.pagination}
        loading={isPending || isFetching}
        onChange={handleTableChange}
      />
    </AppCard>
  );
}
export default App;
