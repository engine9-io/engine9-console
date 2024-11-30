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
                                  name: 'ts',
                                  sorter: true,

                              },
                              {
                                title: 'Amount',
                                name: 'amount',
                                sorter: true,

                                },
                                {
                                    title: 'Source Channel',
                                    name: 'source_code_channel_label',
                                    sorter: true,
                                },

                            {
                                title: 'Form Name',
                                name: 'remote_page_name',
                                sorter: true,

                            }, {
                                title: 'Source Code',
                                name: 'transaction_source_code',
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
