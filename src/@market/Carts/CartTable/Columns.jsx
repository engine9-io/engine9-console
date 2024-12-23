import React from 'react';
import { Avatar } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const Columns = [
  {
    title: 'Plugin',
    name: 'product',
    key: 'product',
    render: (product) => (
      <div className='cart-user'>
        <Avatar src={product.image} />
        <div className='cart-user-info'>
          <h3>{product.title}</h3>
          <p>Brand: {product.brand}</p>
        </div>
      </div>
    ),
  },
  {
    title: 'Unit Price',
    name: 'price',
    key: 'price',
    render: (price) => <>${+price.mrp - +price.discount}</>,
  },
  {
    title: 'QTY',
    name: 'count',
    key: 'count',
    render: (count, onIncrement, onDecrement) => (
      <div className='cart-inc-dec'>
        <PlusOutlined className='pointer' onClick={onIncrement} />
        <span>{count}</span>
        <MinusOutlined className='pointer' onClick={onDecrement} />
      </div>
    ),
  },
  {
    title: 'Total',
    name: 'total',
    key: 'total',
    render: (total) => <>${(+total.mrp - +total.discount) * +total.count}</>,
  },
];

export default Columns;
