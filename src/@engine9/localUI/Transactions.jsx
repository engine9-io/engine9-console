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

                              },
                              {
                                title: 'Amount',
                                dataIndex: 'amount',
                                sorter: true,

                                },
                                {
                                    title: 'Source Channel',
                                    dataIndex: 'source_code_channel_label',
                                    sorter: true,
                                },

                            {
                                title: 'Form Name',
                                dataIndex: 'remote_page_name',
                                sorter: true,

                            }, {
                                title: 'Source Code',
                                dataIndex: 'transaction_source_code',
                                sorter: true,

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
