import React from 'react';

import InvoiceColumns from './InvoiceColumns';
import { invoiceData } from '@crema/mockapi/fakedb/extraPages';
import { StyledInvoiceTable } from './index.styled';

const InvoiceTable = () => {
  return (
    <StyledInvoiceTable data={invoiceData.plugins} columns={InvoiceColumns} />
  );
};

export default InvoiceTable;
