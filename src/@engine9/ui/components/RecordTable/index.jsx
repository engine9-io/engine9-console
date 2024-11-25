import React, { useState } from 'react';
import AppCard from '@crema/components/AppCard';
import { Table, Collapse } from 'antd';
import { FilterOutlined, FilterFilled } from '@ant-design/icons';
// import qs from 'qs';
import './index.css';
import { keepPreviousData } from '@tanstack/react-query';
import { compileTemplate } from '@engine9/helpers/HandlebarsHelper';

import { useActionFunction } from '../Actions';
import QueryStringForm from '../QueryStringForm';

import { useRemoteData } from '../../AuthenticatedDataEndpoint';

const { Panel } = Collapse;

function RecordTable(props) {
  const { properties, parameters } = props;

  const table = parameters.table || properties.table;
  const { title, include, conditions } = properties;
  let renderedConditions = '';
  if (conditions) {
    const t = compileTemplate(JSON.stringify(conditions));
    renderedConditions = `conditions=${escape(t({ parameters, properties }))}&`;
  }

  const [tableParams, setTableParams] = useState({
    pagination: {
      position: ['bottomRight'],
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
  const {
    isPending, error, isFetching, data, schema,
  } = useRemoteData({
    uri: `/data/tables/${table}?schema=true&${renderedConditions}${include ? `include=${escape(JSON.stringify(include))}&` : ''}limit=${tableParams.pagination.pageSize}&offset=${offset}`,
    onComplete: () => {
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: 200,
          // 200 is mock data, you should read it from server
          // total: data.totalCount,
        },
      });
    },
  });

  if (!Array.isArray(properties.columns)) return 'No column array specified';
  const columns = properties.columns.map((c) => {
    const o = { ...c };
    if (c.template) {
      if (typeof c.template !== 'string') throw new Error('column.template should be a string, not anything else');
      const renderTemplate = compileTemplate(c.template);
      o.render = (text, context) => (
        renderTemplate({ table, record: context, parameters }) || '');
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
  const actionOpts = properties?.onRecord?.onClick;
  if (actionOpts && !actionOpts.action) {
    // eslint-disable-next-line no-console
    console.error("RecordTable: Invalid onClick -- no 'action':", actionOpts);
  }
  const onClickAction = useActionFunction(actionOpts);

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

  const filterQuery = {};
  const header = (
    <Collapse
      defaultActiveKey={[]}
      expandIconPosition="end"
      style={{ border: 0 }}
      // eslint-disable-next-line react/no-unstable-nested-components
      expandIcon={({ isActive }) => (isActive ? <FilterFilled /> : <FilterOutlined />)}
    >
      <Panel
        header={<h3>{title}</h3>}
        key="1"
        // extra={}
      >
        <div
          className="record-table-filter"
        >
          {!schema && 'No schema'}
          <QueryStringForm
            fields={(schema?.columns || []).map((c) => ({
              name: c.name,
              label: c.label,
              type: c.type,
            }))}
            data={filterQuery}
            onSubmit={(formValues) => {
              alert('Submitting ', formValues);
            }}
            onQueryChange={(q) => {
              console.log('Query changed:', q);
            }}
          />
        </div>
      </Panel>
    </Collapse>
  );

  return (
    <AppCard
      heightFull
      className="no-card-space-ltr-rtl record-table"
    >
      {error && <div>Error retrieving data</div>}
      {header}
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        onRow={onRow}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={isPending || isFetching}
        onChange={handleTableChange}
      />

    </AppCard>
  );
}
export default RecordTable;
