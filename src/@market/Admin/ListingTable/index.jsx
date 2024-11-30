import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import { ellipsisLines } from '@crema/helpers/StringHelper';
import { useNavigate } from 'react-router';
import OrderActions from './OrderActions';
import { StyledListingStatus } from '../index.styled';
import { StyledOrderTable } from '../../Orders/index.styled';

const getPaymentStatusColor = (inStock) => {
  switch (inStock) {
    case true: {
      return '#43C888';
    }
    case false: {
      return '#F84E4E';
    }
  }
};

const getColumns = (navigate) => [
  {
    title: 'Plugin Name',
    name: 'id',
    key: 'id',
    render: (id, record) => (
      <Typography.Link
        onClick={() => navigate(`../plugins/${id}`)}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <img
          style={{
            width: '40px',
            height: '40px',
            objectFit: 'contain',
            marginRight: 10,
          }}
          src={record?.image?.[0]?.src}
          alt="crema-logo"
        />
        {ellipsisLines(record.title)}
      </Typography.Link>
    ),
  },
  {
    title: 'Plugin SKU',
    name: 'SKU',
    key: 'SKU',
  },
  {
    title: 'Created at',
    name: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Status',
    name: 'date',
    key: 'date',
    render: (data, record) => (
      <StyledListingStatus
        style={{
          color: getPaymentStatusColor(record?.inStock),
          backgroundColor: `${getPaymentStatusColor(record?.inStock)}44`,
        }}
      >
        {record?.inStock ? 'In Stock' : 'Out of Stock'}
      </StyledListingStatus>
    ),
  },
  {
    title: 'Price',
    name: 'mrp',
    key: 'mrp',
    render: (price) => (
      <span>
        $
        {price}
      </span>
    ),
  },
  {
    title: 'Actions',
    name: 'actions',
    key: 'actions',
    className: 'order-table-action',
    fixed: 'right',
    render: (text, record) => <OrderActions id={record.id} />,
  },
];

function PluginTable({ productData, loading }) {
  const navigate = useNavigate();

  return (
    <StyledOrderTable
      hoverColor
      data={productData}
      loading={loading}
      columns={getColumns(navigate)}
      scroll={{ x: 'auto' }}
    />
  );
}

export default PluginTable;

PluginTable.defaultProps = {
  productData: [],
};

PluginTable.propTypes = {
  productData: PropTypes.array,
  loading: PropTypes.bool,
};
