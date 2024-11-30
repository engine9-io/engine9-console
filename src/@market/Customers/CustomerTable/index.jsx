import React from 'react';
import PropTypes from 'prop-types';
import { StarFilled } from '@ant-design/icons';
import OrderActions from './OrderActions';
import { StyledCustomerTable } from '../index.styled';

const CustomerTable = ({ customers, loading }) => {
  const columns = [
    {
      title: 'Name',
      name: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      name: 'email',
      key: 'email',
    },
    {
      title: 'Last Item',
      name: 'lastItem',
      key: 'lastItem',
    },
    {
      title: 'Last Order',
      name: 'lastOrder',
      key: 'lastOrder',
    },
    {
      title: 'Rating',
      name: 'rating',
      key: 'rating',
      render: (rating) => (
        <span className='badge'>
          {rating} <StarFilled style={{ fontSize: 12, marginLeft: 2 }} />
        </span>
      ),
    },
    {
      title: 'Wallet Balance',
      name: 'balance',
      key: 'balance',
    },
    {
      title: 'Address',
      name: 'address',
      key: 'address',
    },
    {
      title: 'Join Date',
      name: 'joinDate',
      key: 'joinDate',
    },
    {
      title: 'Actions',
      name: 'actions',
      key: 'actions',
      className: 'customer-table-actions',
      fixed: 'right',
      render: () => <OrderActions />,
    },
  ];
  return (
    <StyledCustomerTable
      hoverColor
      data={customers}
      columns={columns}
      loading={loading}
      scroll={{ x: 'auto' }}
    />
  );
};

export default CustomerTable;

CustomerTable.defaultProps = {
  customers: [],
};

CustomerTable.propTypes = {
  customers: PropTypes.array,
  loading: PropTypes.bool,
};
