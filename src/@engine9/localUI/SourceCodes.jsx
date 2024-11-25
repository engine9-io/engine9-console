/* eslint-disable indent */
  export default {
      menu: {
        data: {
            children: {
                source_codes: {
                    title: 'Source Codes',
                    icon: 'forklift',
                    url: '/source_codes',
                },
            },
        },
      },
      routes: {
        source_codes: {
          layout: 'full_width',
          components: {
              main: [
                  {
                      component: 'RecordTable',
                      properties: {
                        title: 'Source Codes',
                          table: 'source_code_summary',
                          columns: [
                              {
                                  title: 'Source Code',
                                  dataIndex: 'source_code',
                                  sorter: true,
                                  template: '{{record.source_code}}',
                              },
                              {
                                title: 'Channel',
                                dataIndex: 'source_code_channel',
                                sorter: true,
                            },
                            {
                                title: 'Revenue',
                                dataIndex: 'revenue',
                                sorter: true,
                            },
                            {
                                title: 'Spend',
                                dataIndex: 'spend',
                                sorter: true,
                            },
                          ],
                      },
                  },
              ],
          },
      },
      },
  };
