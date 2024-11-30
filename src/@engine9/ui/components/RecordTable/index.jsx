import React, { useState } from 'react';
import AppCard from '@crema/components/AppCard';
import { Table, Collapse } from 'antd';
import { FilterOutlined, FilterFilled } from '@ant-design/icons';
import { getFormattedDate } from '@crema/helpers/DateHelper';

import JSON5 from 'json5';

import { keepPreviousData } from '@tanstack/react-query';
import { compileTemplate } from '@engine9/helpers/HandlebarsHelper';
import { defaultOperators, formatQuery } from 'react-querybuilder';

import { useSearchParams } from 'react-router';
import { useActionFunction } from '../Actions';
import { QueryStringForm } from '../QueryStringForm';
import { useRemoteData } from '../../AuthenticatedDataEndpoint';
import './index.css';

const { Panel } = Collapse;

function RecordTable(props) {
  const { properties, parameters } = props;
  const table = parameters.table || properties.table;
  const {
    title, include, conditions: conditionsProperty, orderBy,
  } = properties;
  const conditions = [];
  if (conditionsProperty) {
    const t = compileTemplate(JSON.stringify(conditions));
    conditions.push(t({ parameters, properties }));
  }
  const [searchParams] = useSearchParams();
  let rules = searchParams.get('rules');

  if (rules) {
    rules = JSON5.parse(rules);
    const eql = formatQuery({ combinator: 'and', rules }, { format: 'sql' });

    conditions.push({ eql });
  }

  let renderedConditions = '';
  renderedConditions = `conditions=${escape(JSON5.stringify(conditions))}&`;
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
  let orderByClause = '';
  if (orderBy && orderBy.length > 0) {
    orderByClause = `&orderBy=${escape(JSON5.stringify(orderBy))}`;
  }

  const offset = (tableParams.pagination.current - 1) * 5;
  const {
    isPending, error, data, schema,
  } = useRemoteData({
    uri: `/data/tables/${table}?schema=true&${renderedConditions}${include ? `include=${escape(JSON.stringify(include))}&` : ''}limit=${tableParams.pagination.pageSize}&offset=${offset}${orderByClause}`,
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
  const usd = Intl.NumberFormat('en', { currency: 'USD', style: 'currency' }).format;

  if (!Array.isArray(properties.columns)) return 'No column array specified';
  const columns = properties.columns.map((c) => {
    const o = { ...c };
    if (c.name) o.dataIndex = c.name;
    if (c.template) {
      if (typeof c.template !== 'string') throw new Error('column.template should be a string, not anything else');
      const renderTemplate = compileTemplate(c.template);
      o.render = (text, context) => (
        renderTemplate({ table, record: context, parameters }) || '');
    } else {
      const match = schema?.columns.find((col) => col.column_name === c.name);
      if (match) {
        const type = match.column_type;
        switch (type) {
          case 'decimal':
            o.render = ((v) => usd(parseFloat(v)));
            break;
          case 'date':
          case 'datetime':
          case 'timestamp':
            o.render = ((v) => getFormattedDate(v));
            break;
          default:
            break;
        }
      }
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
  const fields = (schema?.columns || []).map((c) => ({
    name: c.column_name,
    label: `${c.label}`,
    type: c.column_type,
  }));
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
        extra={rules?.length && fields?.length ? (
          <div style={{ padding: '0px 20px' }}>
            {formatQuery({ combinator: 'and', rules }, {
              format: 'natural_language',
              parseNumbers: true,
              getOperators: () => defaultOperators,
              fields,
            })}
          </div>
        ) : ''}
      >
        <div
          className="record-table-filter"
        >
          <QueryStringForm
            fields={fields}
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
        loading={isPending}
        onChange={handleTableChange}
      />

    </AppCard>
  );
}
export default RecordTable;
