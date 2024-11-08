/* eslint-disable indent */
  export default {
      menu: {
        data: {
            children: {
                source_code: {
                    title: 'Transactions',
                    icon: 'transaction',
                    url: '/transactions',
                },
            },
        },
      },
      routes: {
        transactions: {
          layout: 'full_width',
          components: {
              header: [
                  'Transactions',
              ],
              main: [
                  {
                      component: 'RecordTable',
                      properties: {
                          table: 'transaction_summary',
                          columns: [
                              {
                                  title: 'Date',
                                  dataIndex: 'ts',
                                  sorter: true,
                                  width: '40%',
                              },
                              {
                                title: 'Amount',
                                dataIndex: 'amount',
                                sorter: true,
                                width: '40%',
                                },
                              {
                                title: 'ID',
                                dataIndex: 'transaction_id',
                                sorter: true,
                                width: '40%',
                            },
                          ],
                      },
                  },
              ],
          },
      },
      },
  };
