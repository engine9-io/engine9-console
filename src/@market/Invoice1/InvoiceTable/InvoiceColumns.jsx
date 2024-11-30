import React from 'react';
import { StyledInvoiceTruncateView } from './index.styled';

const InvoiceColumns = [
  {
    title: 'Item & Description',
    name: 'item',
    key: 'item',
    render: (item) => (
      <>
        <h6>{item.itemTitle}</h6>
        {item.desc ? (
          <StyledInvoiceTruncateView>
            <span className='text-truncate'>{item.desc}</span>
          </StyledInvoiceTruncateView>
        ) : null}
      </>
    ),
  },
  {
    title: 'Assignment Type',
    name: 'type',
    key: 'type',
  },
  {
    title: 'Quantity',
    name: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Price',
    name: 'price',
    key: 'price',
  },
];

export default InvoiceColumns;
