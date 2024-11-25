/* eslint-disable indent */
  export default {
      menu: {
        data: {
            children: {
                transactions: {
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
              main: [
                  {
                      component: 'RecordTable',
                      properties: {
                          title: 'Transactions',
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
                          orderBy: [
                            { column: 'ts', orderByDirection: 'desc' },
                          ],
                      },
                  },
              ],
          },
      },
      },
  };
